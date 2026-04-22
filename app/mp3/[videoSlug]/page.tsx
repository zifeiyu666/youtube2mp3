import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { redirect, notFound } from "next/navigation";
import { BookmarkUsButton } from "@/components/BookmarkUsButton";
import { Converter } from "@/components/Converter";
import {
  ensureSeoVideoRecord,
  getRelatedSeoVideos,
  getSeoVideoCanonicalPath,
  getSeoVideoCanonicalUrl,
  getSeoVideoDescription,
  getSeoVideoThumbnail,
  getSeoVideoWatchUrl,
  type SeoVideoRecord,
} from "@/lib/seo-videos";
import { formatIsoDuration, parseVideoSlugParam } from "@/lib/youtube";
import homeStyles from "@/app/page.module.css";
import styles from "./video-page.module.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function formatPublishedDate(value: string) {
  if (!value) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoSlug: string }>;
}): Promise<Metadata> {
  const { videoSlug } = await params;
  const parsed = parseVideoSlugParam(videoSlug);

  if (!parsed) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  try {
    const record = await ensureSeoVideoRecord(parsed.videoId);
    const description = getSeoVideoDescription(record);
    const thumbnail = getSeoVideoThumbnail(record);
    const canonicalUrl = getSeoVideoCanonicalUrl(record);

    return {
      title: `${record.title} MP3 Download - Free YouTube to MP3 Converter`,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${record.title} MP3 Download`,
        description,
        url: canonicalUrl,
        type: "video.other",
        images: thumbnail ? [{ url: thumbnail.url, width: thumbnail.width, height: thumbnail.height }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: `${record.title} MP3 Download`,
        description,
        images: thumbnail ? [thumbnail.url] : [],
      },
    };
  } catch {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function SeoVideoPage({
  params,
}: {
  params: Promise<{ videoSlug: string }>;
}) {
  const { videoSlug } = await params;
  const parsed = parseVideoSlugParam(videoSlug);

  if (!parsed) {
    notFound();
  }

  let record: SeoVideoRecord;

  try {
    record = await ensureSeoVideoRecord(parsed.videoId);
  } catch {
    notFound();
  }

  const canonicalSlug = record.slug;
  const canonicalPath = getSeoVideoCanonicalPath(record);

  if (parsed.routeSlug !== canonicalSlug) {
    redirect(canonicalPath);
  }

  const relatedVideos = await getRelatedSeoVideos(record.videoId, 10);
  const description = getSeoVideoDescription(record);
  const thumbnail = getSeoVideoThumbnail(record);
  const watchUrl = getSeoVideoWatchUrl(record.videoId);
  const publishedLabel = formatPublishedDate(record.publishedAt);
  const durationLabel = formatIsoDuration(record.duration);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: record.title,
    description,
    thumbnailUrl: thumbnail ? [thumbnail.url] : [],
    uploadDate: record.publishedAt,
    duration: record.duration,
    embedUrl: watchUrl,
    publisher: {
      "@type": "Organization",
      name: record.channelTitle,
    },
    potentialAction: {
      "@type": "WatchAction",
      target: watchUrl,
    },
  };

  return (
    <main className={homeStyles.page}>
      <div className={homeStyles.frame}>
        <header className={homeStyles.topBar}>
          <p className={homeStyles.brand}>youtube2mp3.io</p>
          <div className={homeStyles.topBarActions}>
            <BookmarkUsButton />
            <nav className={homeStyles.nav}>
              <Link href="/" className={homeStyles.navLink}>
                Home
              </Link>
              <Link href="/popular-downloads" className={homeStyles.navLink}>
                Popular Downloads
              </Link>
              <Link href="/blog" className={homeStyles.navLink}>
                Blog
              </Link>
              <a
                href="https://bgmgen.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${homeStyles.navLink} ${homeStyles.navLinkPrimary}`}
              >
                AI Music Generator
              </a>
            </nav>
          </div>
        </header>

        <Script
          id={`video-schema-${record.videoId}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Programmatic video landing page</p>
            <h1>{record.title} MP3 Download</h1>
            <p className={styles.summary}>
              Convert this YouTube video into MP3 with a direct browser workflow, a crawlable landing
              page, and metadata tailored to this specific video and channel.
            </p>

            <div className={styles.metaRow}>
              <span>Channel: {record.channelTitle}</span>
              {publishedLabel ? <span>Published: {publishedLabel}</span> : null}
              {record.duration !== "PT0S" ? <span>Duration: {durationLabel}</span> : null}
            </div>

            {thumbnail ? (
              <div className={styles.thumbnailCard}>
                <Image
                  src={thumbnail.url}
                  alt={`${record.title} thumbnail`}
                  width={thumbnail.width || 1280}
                  height={thumbnail.height || 720}
                  className={styles.thumbnail}
                  priority
                />
              </div>
            ) : null}
          </div>

          <aside className={styles.converterCard}>
            <h2>Download this video as MP3 or MP4</h2>
            <p className={styles.converterIntro}>
              The converter is prefilled with the canonical YouTube URL for this video so users can
              start immediately.
            </p>
            <Converter initialUrl={watchUrl} headingLevel="h2" showMusicTools={false} />
          </aside>
        </section>

        <section className={styles.contentGrid}>
          <article className={styles.card}>
            <h2>About this MP3 download page</h2>
            <p>
              This landing page is built around <strong>{record.title}</strong>, a YouTube upload from{" "}
              <strong>{record.channelTitle}</strong>. The page combines the original video metadata
              with downloader-focused copy so search engines can understand the page topic without
              treating it as a generic thin template.
            </p>
            <p>
              Users searching for queries like "{record.title} mp3 download" or "youtube to mp3{" "}
              {record.channelTitle.toLowerCase()}" land on a page that includes the thumbnail, channel,
              publish context, and the actual conversion UI.
            </p>
          </article>

          <article className={styles.card}>
            <h2>How to convert {record.title} to MP3</h2>
            <ol className={styles.steps}>
              <li>Keep the prefilled YouTube URL or replace it with another public video link.</li>
              <li>Start the conversion from the built-in YouTube to MP3 converter.</li>
              <li>Wait while the service processes the request and prepares the audio file.</li>
              <li>Download the MP3 when the converter reports that the file is ready.</li>
            </ol>
          </article>

          <article className={styles.card}>
            <h2>Why this page is unique</h2>
            <p>
              Unlike a generic download page, this URL is indexed around one video id, one title, and
              one canonical slug. The metadata is generated from YouTube video data and refreshed over
              time, which helps the page stay aligned with the source video.
            </p>
            <ul className={styles.bullets}>
              <li>Unique title and description built from the actual video metadata.</li>
              <li>Dedicated thumbnail, publish date, channel name, and watch URL context.</li>
              <li>Internal links to related videos so crawlers can discover the wider page cluster.</li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2>Safe-use reminder</h2>
            <p>
              Use this converter only for content you have permission to access, convert, or download.
              Copyright ownership stays with the original creator or rights holder, and this site does
              not claim ownership of third-party media.
            </p>
          </article>

          <article className={styles.card}>
            <h2>Video metadata snapshot</h2>
            <dl className={styles.definitionList}>
              <div>
                <dt>Video ID</dt>
                <dd>{record.videoId}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{record.source}</dd>
              </div>
              <div>
                <dt>Watch URL</dt>
                <dd>
                  <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                    Open on YouTube
                  </a>
                </dd>
              </div>
              <div>
                <dt>Cached</dt>
                <dd>{formatPublishedDate(record.lastFetchedAt)}</dd>
              </div>
            </dl>
            {record.tags.length > 0 ? (
              <>
                <h3 className={styles.tagsHeading}>Related tags</h3>
                <div className={styles.tagList}>
                  {record.tags.slice(0, 12).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </article>

          <article className={styles.card}>
            <h2>FAQ</h2>
            <div className={styles.faqList}>
              <div>
                <h3>Does this page only work for {record.title}?</h3>
                <p>
                  The landing page is optimized for this video, but the converter accepts other public
                  YouTube video URLs as well.
                </p>
              </div>
              <div>
                <h3>Why does this page include YouTube metadata?</h3>
                <p>
                  The metadata gives search engines and users clear context about the specific video,
                  which avoids presenting a vague or duplicate download page.
                </p>
              </div>
              <div>
                <h3>Can I share this page directly?</h3>
                <p>
                  Yes. This URL is the canonical landing page for the video and is intended to be a
                  stable entry point for future visits.
                </p>
              </div>
            </div>
          </article>
        </section>

        {relatedVideos.length > 0 ? (
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <h2>Related video download pages</h2>
              <p>Explore nearby long-tail pages and keep crawling depth inside the video cluster.</p>
            </div>
            <div className={styles.relatedGrid}>
              {relatedVideos.map((video) => (
                <Link key={video.videoId} href={getSeoVideoCanonicalPath(video)} className={styles.relatedCard}>
                  <strong>{video.title}</strong>
                  <span>{video.channelTitle}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <footer className={homeStyles.footer}>
          <span>youtube2mp3.io provides a simple interface for starting audio and video conversions.</span>
          <nav className={homeStyles.footerNav} aria-label="Legal">
            <Link href="/copyright">Copyright</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
