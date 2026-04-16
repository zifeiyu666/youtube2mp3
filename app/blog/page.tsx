import Link from "next/link";
import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Blog — YouTube to MP3 & MP4 Converter",
  description: "Learn how to use YouTube to MP3 converter and understand the technology behind it.",
};

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">
          Back to youtube2mp3.io
        </Link>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.lede}>
          Guides, tutorials, and technical insights about YouTube to MP3/MP4 conversion.
        </p>

        <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
          <article style={{ padding: "1.5rem", border: "1px solid var(--panel-border)", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.5)" }}>
            <Link href="/blog/how-to-convert-youtube" style={{ textDecoration: "none", color: "inherit" }}>
              <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem", color: "var(--brand)" }}>How to Convert YouTube to MP3 & MP4</h2>
              <p style={{ margin: "0 0 1rem", color: "var(--muted)", lineHeight: "1.6" }}>
                A step-by-step guide to converting YouTube videos to MP3 audio or MP4 video format using youtube2mp3.io.
              </p>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Read more →</span>
            </Link>
          </article>

          <article style={{ padding: "1.5rem", border: "1px solid var(--panel-border)", borderRadius: "var(--radius-lg)", background: "rgba(255,255,255,0.5)" }}>
            <Link href="/blog/how-it-works" style={{ textDecoration: "none", color: "inherit" }}>
              <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem", color: "var(--brand)" }}>How It Works: FFmpeg & yt-dlp</h2>
              <p style={{ margin: "0 0 1rem", color: "var(--muted)", lineHeight: "1.6" }}>
                Understanding the technology behind YouTube conversion — how FFmpeg and yt-dlp work together to deliver high-quality audio and video.
              </p>
              <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Read more →</span>
            </Link>
          </article>
        </div>
      </div>
    </main>
  );
}
