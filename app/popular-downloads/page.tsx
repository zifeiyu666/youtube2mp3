import type { Metadata } from "next";
import Link from "next/link";
import { BookmarkUsButton } from "@/components/BookmarkUsButton";
import { PopularDownloadsSearch } from "@/components/PopularDownloadsSearch";
import {
  ensureSeedVideoRecords,
  getSeoVideoCanonicalPath,
  listSeoVideoIndexEntries,
} from "@/lib/seo-videos";
import homeStyles from "@/app/page.module.css";
import styles from "./popular-downloads.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://youtube2mp3.io";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Popular MP3 Downloads",
  description:
    "Browse the generated YouTube to MP3 landing pages on youtube2mp3.io and search by video title or channel.",
  alternates: {
    canonical: `${siteUrl.replace(/\/$/, "")}/popular-downloads`,
  },
  openGraph: {
    title: "Popular MP3 Downloads | youtube2mp3.io",
    description:
      "Browse the generated YouTube to MP3 landing pages on youtube2mp3.io and search by video title or channel.",
    url: `${siteUrl.replace(/\/$/, "")}/popular-downloads`,
  },
};

export default async function PopularDownloadsPage() {
  await ensureSeedVideoRecords();
  const videos = await listSeoVideoIndexEntries();
  const listItems = videos.map((video) => ({
    videoId: video.videoId,
    title: video.title,
    channelTitle: video.channelTitle,
    tags: video.tags,
    publishedAt: video.publishedAt,
    path: getSeoVideoCanonicalPath(video),
  }));

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
              <Link href="/popular-downloads" className={`${homeStyles.navLink} ${styles.activeNavLink}`}>
                Popular Downloads
              </Link>
              <Link href="/blog" className={homeStyles.navLink}>
                Blog
              </Link>
            </nav>
          </div>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Generated landing pages</p>
          <h1>Popular MP3 downloads</h1>
          <p className={styles.summary}>
            This page lists every generated video landing page in the SEO index. New pages appear here
            as soon as a video is generated, and the same index is used by the sitemap route.
          </p>
        </section>

        <PopularDownloadsSearch videos={listItems} />
      </div>
    </main>
  );
}
