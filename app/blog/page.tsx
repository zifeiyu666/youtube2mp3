import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { BlogHeader } from "./BlogHeader";
import styles from "./blog.module.css";
import { blogPosts } from "./posts";
import cover1 from "./covers/ScreenShot_2026-04-21_165855_193.png";
import cover2 from "./covers/ScreenShot_2026-04-21_165927_084.png";

export const metadata: Metadata = {
  title: "Blog — YouTube to MP3 & MP4 Converter",
  description: "Learn how to use YouTube to MP3 converter and understand the technology behind it.",
};

const existingPosts = [
  {
    href: "/blog/how-to-convert-youtube",
    title: "How to Convert YouTube to MP3 & MP4",
    description:
      "A step-by-step walkthrough for converting public YouTube links into MP3 audio or MP4 video files with youtube2mp3.io.",
    tag: "Guide",
    createdAt: "April 2, 2026",
    coverImage: cover1,
    coverAlt: "Guide cover showing a YouTube URL conversion workflow for MP3 and MP4 downloads",
  },
  {
    href: "/blog/how-it-works",
    title: "How It Works: FFmpeg & yt-dlp",
    description:
      "Learn how FFmpeg and yt-dlp fit into the conversion pipeline and why that combination remains popular for handling public video links.",
    tag: "Tech",
    createdAt: "April 1, 2026",
    coverImage: cover2,
    coverAlt: "Technical cover image illustrating FFmpeg and yt-dlp working in a YouTube conversion pipeline",
  },
] as const;

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <BlogHeader />
        <div className={styles.heroShell}>
          <Link className={styles.back} href="/">
            Back to youtube2mp3.io
          </Link>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.lede}>
            Guides, comparisons, legality explainers, mobile workflows, and offline listening tips
            for people who use YouTube to MP3 and MP4 tools in 2026.
          </p>
        </div>

        <div className={styles.grid}>
          {existingPosts.map((post) => (
            <Link key={post.href} className={styles.card} href={post.href}>
              <Image className={styles.cardImage} src={post.coverImage} alt={post.coverAlt} />
              <div className={styles.metaRow}>
                <span className={styles.meta}>{post.tag}</span>
                <span className={styles.date}>{post.createdAt}</span>
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardText}>{post.description}</p>
            </Link>
          ))}

          {blogPosts.map((post) => (
            <Link key={post.slug} className={styles.card} href={`/blog/${post.slug}`}>
              <Image className={styles.cardImage} src={post.coverImage} alt={post.imageAlt} />
              <div className={styles.metaRow}>
                <span className={styles.meta}>{post.tag}</span>
                <span className={styles.date}>{post.createdAt}</span>
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardText}>{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
