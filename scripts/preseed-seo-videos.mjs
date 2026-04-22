import fs from "node:fs/promises";
import path from "node:path";

const DATA_ROOT = path.join(process.cwd(), "data", "seo-videos");
const VIDEO_ROOT = path.join(DATA_ROOT, "videos");
const INDEX_FILE = path.join(DATA_ROOT, "index.json");
const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

function slugifyVideoTitle(title) {
  const cleaned = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const parts = cleaned
    .split(" ")
    .filter((part) => part && !STOP_WORDS.has(part))
    .slice(0, 12);

  return parts.join("-") || "youtube-video";
}

function composeDescription(title, channelTitle) {
  const base = `Download ${title} as MP3 from YouTube with a fast online converter. Streamline audio capture from ${channelTitle} with a clean workflow, no software install, and instant access on desktop or mobile.`;
  return base.length <= 160 ? base : `${base.slice(0, 157).trimEnd()}...`;
}

async function ensureStorage() {
  await fs.mkdir(VIDEO_ROOT, { recursive: true });

  try {
    await fs.access(INDEX_FILE);
  } catch {
    await fs.writeFile(INDEX_FILE, JSON.stringify({ videos: [] }, null, 2), "utf8");
  }
}

async function readJson(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return fallback;
    }

    throw error;
  }
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function fetchOEmbed(videoId) {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const oEmbedUrl = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`;
  const response = await fetch(oEmbedUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`oEmbed ${response.status}`);
  }

  return response.json();
}

async function buildRecord(videoId) {
  const payload = await fetchOEmbed(videoId);
  const now = new Date().toISOString();
  const title = payload.title || "YouTube video";
  const channelTitle = payload.author_name || "Unknown channel";
  const thumbnailUrl = payload.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    videoId,
    slug: slugifyVideoTitle(title),
    title,
    description: composeDescription(title, channelTitle),
    channelTitle,
    publishedAt: "",
    duration: "PT0S",
    thumbnails: {
      maxres: {
        url: thumbnailUrl,
        width: payload.thumbnail_width || 480,
        height: payload.thumbnail_height || 360,
      },
    },
    tags: [],
    statistics: {},
    source: "youtube-public-page",
    lastFetchedAt: now,
    lastIndexedAt: now,
  };
}

async function main() {
  await ensureStorage();

  const rawInput = process.argv[2];
  if (!rawInput) {
    console.error("Usage: node scripts/preseed-seo-videos.mjs '[\"videoId1\",\"videoId2\"]'");
    process.exit(1);
  }

  const parsed = JSON.parse(rawInput);
  const ids = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.videoIds)
      ? parsed.videoIds
      : [];

  const uniqueIds = [...new Set(ids.map((value) => String(value).trim()).filter((value) => YOUTUBE_VIDEO_ID_PATTERN.test(value)))];
  const index = await readJson(INDEX_FILE, { videos: [] });
  const byId = new Map(index.videos.map((video) => [video.videoId, video]));
  const successes = [];
  const failures = [];

  for (const [position, videoId] of uniqueIds.entries()) {
    try {
      const record = await buildRecord(videoId);
      await writeJson(path.join(VIDEO_ROOT, `${videoId}.json`), record);

      byId.set(videoId, {
        videoId: record.videoId,
        slug: record.slug,
        title: record.title,
        channelTitle: record.channelTitle,
        publishedAt: record.publishedAt,
        tags: record.tags,
        lastFetchedAt: record.lastFetchedAt,
        lastIndexedAt: record.lastIndexedAt,
      });

      successes.push(videoId);
      console.log(`[${position + 1}/${uniqueIds.length}] seeded ${videoId} -> /mp3/${record.slug}-${record.videoId}`);
    } catch (error) {
      failures.push({ videoId, error: error instanceof Error ? error.message : String(error) });
      console.error(`[${position + 1}/${uniqueIds.length}] failed ${videoId}: ${failures.at(-1).error}`);
    }
  }

  const videos = [...byId.values()].sort((a, b) => {
    return new Date(b.lastIndexedAt).getTime() - new Date(a.lastIndexedAt).getTime();
  });

  await writeJson(INDEX_FILE, { videos });

  console.log(JSON.stringify({
    requested: ids.length,
    unique: uniqueIds.length,
    seeded: successes.length,
    failed: failures.length,
    failures,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
