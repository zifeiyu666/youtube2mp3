import Link from "next/link";
import type { Metadata } from "next";
import styles from "../../legal.module.css";

export const metadata: Metadata = {
  title: "How to Convert YouTube to MP3 & MP4 — youtube2mp3.io",
  description: "Step-by-step guide to converting YouTube videos to MP3 audio or MP4 video format.",
};

export default function HowToConvertPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/blog">
          Back to Blog
        </Link>
        <h1 className={styles.title}>How to Convert YouTube to MP3 & MP4</h1>
        <p className={styles.lede}>
          A complete guide to converting YouTube videos into MP3 audio or MP4 video files using youtube2mp3.io.
        </p>

        <section className={styles.section}>
          <h2>What You Need</h2>
          <p>
            Before you begin, make sure you have a public YouTube video link. The conversion service works with any publicly available YouTube video — no account or software installation required.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Step 1: Copy the YouTube URL</h2>
          <p>
            Go to YouTube and find the video you want to convert. Click the share button and copy the link, or simply copy the URL from your browser address bar. Supported formats include standard YouTube URLs, shortened youtu.be links, and YouTube Shorts links.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Step 2: Paste the URL</h2>
          <p>
            Return to youtube2mp3.io and paste the YouTube link into the input field at the top of the page. The input accepts any valid YouTube video URL format.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Step 3: Start Conversion</h2>
          <p>
            Click the "Use YouTube to MP3 Converter" button to start the conversion process. The service will contact the conversion backend, extract the audio or video from the YouTube source, and prepare it for download. You will see a progress indicator as the conversion completes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Step 4: Download Your File</h2>
          <p>
            Once the conversion is complete, a download button will appear. Click it to download your MP3 audio file or MP4 video file directly to your device. The file is delivered through our secure download endpoint.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Alternative Download Options</h2>
          <p>
            After submitting a URL, an alternative download panel appears alongside the main converter. This panel provides additional download options through a third-party conversion interface, giving you more flexibility in format and quality choices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Supported Formats</h2>
          <p>
            youtube2mp3.io supports both MP3 audio and MP4 video formats. MP3 is ideal for music and podcasts where you only need the audio track. MP4 is best when you want to keep the video component or need a higher quality output with both audio and visual elements.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Tips for Best Results</h2>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: "1.8", color: "var(--text)" }}>
            <li>Use direct video URLs rather than playlist links for more reliable conversion</li>
            <li>Longer videos may take more time to convert depending on their length</li>
            <li>Check the alternative download panel for additional format options</li>
            <li>The service works on both desktop and mobile browsers</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Frequently Asked Questions</h2>
          <p>
            <strong>Is this service free?</strong><br />
            Yes, youtube2mp3.io is free to use with no registration required.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <strong>What about video quality?</strong><br />
            Output quality depends on the original YouTube source. The conversion process preserves the best available quality from the source video.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <strong>Can I use this on my phone?</strong><br />
            Yes, the converter works on mobile browsers including iPhone Safari and Android Chrome.
          </p>
        </section>
      </div>
    </main>
  );
}
