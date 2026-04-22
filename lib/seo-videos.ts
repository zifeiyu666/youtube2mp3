import fs from "node:fs/promises";
import path from "node:path";
import { buildYouTubeWatchUrl, isYouTubeVideoId, slugifyVideoTitle } from "@/lib/youtube";

type YoutubeOEmbedResponse = {
  title?: string;
  author_name?: string;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
};

export type SeoVideoIndexEntry = {
  videoId: string;
  slug: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  tags: string[];
  lastFetchedAt: string;
  lastIndexedAt: string;
};

export type SeoVideoRecord = SeoVideoIndexEntry & {
  description: string;
  duration: string;
  thumbnails: Record<
    string,
    {
      url: string;
      width?: number;
      height?: number;
    }
  >;
  statistics: Record<string, string>;
  source: "youtube-public-page";
};

type SeoVideoIndex = {
  videos: SeoVideoIndexEntry[];
};

const DATA_ROOT = path.join(process.cwd(), "data", "seo-videos");
const VIDEO_ROOT = path.join(DATA_ROOT, "videos");
const INDEX_FILE = path.join(DATA_ROOT, "index.json");
const DEFAULT_CACHE_TTL_HOURS = 168;
const DEFAULT_SITE_URL = "https://youtube2mp3.io";

let writeQueue: Promise<void> = Promise.resolve();
let seedPromise: Promise<void> | null = null;

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}

function getCacheTtlHours() {
  const parsed = Number(process.env.SEO_VIDEO_CACHE_TTL_HOURS || DEFAULT_CACHE_TTL_HOURS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CACHE_TTL_HOURS;
}

function getIndexEntryPath(videoId: string) {
  return path.join(VIDEO_ROOT, `${videoId}.json`);
}

function getCanonicalPath(slug: string, videoId: string) {
  return `/mp3/${slug}-${videoId}`;
}

async function ensureStorage() {
  await fs.mkdir(VIDEO_ROOT, { recursive: true });

  try {
    await fs.access(INDEX_FILE);
  } catch {
    await fs.writeFile(INDEX_FILE, JSON.stringify({ videos: [] }, null, 2), "utf8");
  }
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return fallback;
    }

    throw error;
  }
}

function queueWrite(task: () => Promise<void>) {
  const nextTask = writeQueue.then(task, task);
  writeQueue = nextTask.catch(() => {});
  return nextTask;
}

function getPrimaryThumbnail(thumbnails: SeoVideoRecord["thumbnails"]) {
  return (
    thumbnails.maxres ||
    thumbnails.standard ||
    thumbnails.high ||
    thumbnails.medium ||
    thumbnails.default ||
    null
  );
}

function composeDescription(record: Pick<SeoVideoRecord, "title" | "channelTitle">) {
  const base = `Download ${record.title} as MP3 from YouTube with a fast online converter. Streamline audio capture from ${record.channelTitle} with a clean workflow, no software install, and instant access on desktop or mobile.`;
  return base.length <= 160 ? base : `${base.slice(0, 157).trimEnd()}...`;
}

function isFresh(record: Pick<SeoVideoRecord, "lastFetchedAt">) {
  const fetchedAt = new Date(record.lastFetchedAt).getTime();
  const ttlMs = getCacheTtlHours() * 60 * 60 * 1000;
  return Number.isFinite(fetchedAt) && Date.now() - fetchedAt < ttlMs;
}

function parseSeedIds() {
  return (process.env.SEO_VIDEO_SEED_IDS || "")
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .filter(isYouTubeVideoId);
}

async function readIndex() {
  await ensureStorage();
  return readJson<SeoVideoIndex>(INDEX_FILE, { videos: [] });
}

async function writeIndex(index: SeoVideoIndex) {
  await ensureStorage();
  await fs.writeFile(INDEX_FILE, `${JSON.stringify(index, null, 2)}\n`, "utf8");
}

async function readRecord(videoId: string) {
  await ensureStorage();
  return readJson<SeoVideoRecord | null>(getIndexEntryPath(videoId), null);
}

async function writeRecord(record: SeoVideoRecord) {
  await ensureStorage();
  await fs.writeFile(getIndexEntryPath(record.videoId), `${JSON.stringify(record, null, 2)}\n`, "utf8");
}

async function upsertIndexEntry(record: SeoVideoRecord) {
  await queueWrite(async () => {
    const index = await readIndex();
    const entry: SeoVideoIndexEntry = {
      videoId: record.videoId,
      slug: record.slug,
      title: record.title,
      channelTitle: record.channelTitle,
      publishedAt: record.publishedAt,
      tags: record.tags,
      lastFetchedAt: record.lastFetchedAt,
      lastIndexedAt: record.lastIndexedAt,
    };

    const nextVideos = index.videos.filter((video) => video.videoId !== record.videoId);
    nextVideos.push(entry);
    nextVideos.sort((a, b) => {
      const publishedDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return Number.isNaN(publishedDiff) ? a.title.localeCompare(b.title) : publishedDiff;
    });

    await writeRecord(record);
    await writeIndex({ videos: nextVideos });
  });
}

async function fetchYoutubeVideoRecord(videoId: string): Promise<SeoVideoRecord> {
  const watchUrl = buildYouTubeWatchUrl(videoId);
  const oEmbedUrl = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`;
  const oEmbedResponse = await fetch(oEmbedUrl, { cache: "no-store" });

  if (!oEmbedResponse.ok) {
    throw new Error(`YouTube oEmbed request failed with status ${oEmbedResponse.status}.`);
  }

  const oEmbedPayload = (await oEmbedResponse.json()) as YoutubeOEmbedResponse;
  const now = new Date().toISOString();
  const title = oEmbedPayload.title || "YouTube video";
  const channelTitle = oEmbedPayload.author_name || "Unknown channel";
  const description = composeDescription({ title, channelTitle });
  const primaryThumbnailUrl = oEmbedPayload.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const thumbnailWidth = oEmbedPayload.thumbnail_width || 480;
  const thumbnailHeight = oEmbedPayload.thumbnail_height || 360;

  return {
    videoId,
    slug: slugifyVideoTitle(title),
    title,
    description,
    channelTitle,
    publishedAt: "",
    duration: "PT0S",
    thumbnails: {
      maxres: {
        url: primaryThumbnailUrl,
        width: Number.isFinite(thumbnailWidth) ? thumbnailWidth : undefined,
        height: Number.isFinite(thumbnailHeight) ? thumbnailHeight : undefined,
      },
    },
    tags: [],
    statistics: {},
    source: "youtube-public-page",
    lastFetchedAt: now,
    lastIndexedAt: now,
  };
}

export async function ensureSeoVideoRecord(videoId: string) {
  if (!isYouTubeVideoId(videoId)) {
    throw new Error("Invalid YouTube video id.");
  }

  const existing = await readRecord(videoId);

  if (existing && isFresh(existing)) {
    return existing;
  }

  try {
    const refreshed = await fetchYoutubeVideoRecord(videoId);
    await upsertIndexEntry(refreshed);
    return refreshed;
  } catch (error) {
    if (existing) {
      return existing;
    }

    throw error;
  }
}

export async function getSeoVideoRecord(videoId: string) {
  return readRecord(videoId);
}

export async function listSeoVideoIndexEntries() {
  const index = await readIndex();
  return index.videos;
}

export async function ensureSeedVideoRecords() {
  if (seedPromise) {
    return seedPromise;
  }

  seedPromise = (async () => {
    const seedIds = parseSeedIds();

    if (seedIds.length === 0) {
      return;
    }

    await Promise.allSettled(seedIds.map((videoId) => ensureSeoVideoRecord(videoId)));
  })();

  return seedPromise;
}

export function getSeoVideoCanonicalPath(video: Pick<SeoVideoIndexEntry, "slug" | "videoId">) {
  return getCanonicalPath(video.slug, video.videoId);
}

export function getSeoVideoCanonicalUrl(video: Pick<SeoVideoIndexEntry, "slug" | "videoId">) {
  return `${getSiteUrl()}${getCanonicalPath(video.slug, video.videoId)}`;
}

export function getSeoVideoThumbnail(record: SeoVideoRecord) {
  return getPrimaryThumbnail(record.thumbnails);
}

export function getSeoVideoDescription(record: SeoVideoRecord) {
  return composeDescription(record);
}

export function getSeoVideoWatchUrl(videoId: string) {
  return buildYouTubeWatchUrl(videoId);
}

export async function getRelatedSeoVideos(videoId: string, limit = 10) {
  const index = await readIndex();
  const current = index.videos.find((video) => video.videoId === videoId);
  const currentTags = new Set((current?.tags || []).map((tag) => tag.toLowerCase()));

  return index.videos
    .filter((video) => video.videoId !== videoId)
    .map((video) => {
      const sharedTags = video.tags.reduce((count, tag) => {
        return currentTags.has(tag.toLowerCase()) ? count + 1 : count;
      }, 0);

      return {
        ...video,
        score: sharedTags,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, limit);
}

export async function getSeoVideoSitemapEntries() {
  const index = await readIndex();

  return index.videos.map((video) => ({
    url: getSeoVideoCanonicalUrl(video),
    lastModified: new Date(video.lastFetchedAt || video.lastIndexedAt || video.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));
}
