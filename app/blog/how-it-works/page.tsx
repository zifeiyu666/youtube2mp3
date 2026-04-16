import Link from "next/link";
import type { Metadata } from "next";
import styles from "../../legal.module.css";

export const metadata: Metadata = {
  title: "How It Works: FFmpeg & yt-dlp — youtube2mp3.io",
  description: "Understanding the technology behind YouTube conversion with FFmpeg and yt-dlp.",
};

export default function HowItWorksPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/blog">
          Back to Blog
        </Link>
        <h1 className={styles.title}>How It Works: FFmpeg & yt-dlp</h1>
        <p className={styles.lede}>
          A technical overview of how YouTube to MP3/MP4 conversion works using FFmpeg and yt-dlp.
        </p>

        <section className={styles.section}>
          <h2>Overview</h2>
          <p>
            Converting YouTube videos to MP3 or MP4 involves two main components: a YouTube downloader and an audio/video transcoder. In our architecture, these are handled by yt-dlp and FFmpeg respectively. Understanding how these tools work together helps explain why conversion is fast, reliable, and maintains high quality.
          </p>
        </section>

        <section className={styles.section}>
          <h2>yt-dlp: YouTube Downloader</h2>
          <p>
            yt-dlp is an open-source command-line tool for downloading audio and video from YouTube and hundreds of other sites. It is actively maintained by a large community and is known for its reliability and frequent updates to handle changes in video platform architectures.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            When you submit a YouTube URL, yt-dlp communicates with YouTube's servers to extract the available media streams. YouTube provides multiple quality levels and formats for every video. yt-dlp selects the best available audio-only stream (typically in m4a or webm format) for MP3 conversion, or the best video+audio stream for MP4 conversion.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Key advantages of yt-dlp include adaptive stream selection, support for cookies and authentication, and resistance to rate limiting through intelligent request patterns.
          </p>
        </section>

        <section className={styles.section}>
          <h2>FFmpeg: Audio & Video Processing</h2>
          <p>
            FFmpeg is the industry-standard tool for multimedia processing. It handles the conversion from the raw YouTube stream into the final MP3 or MP4 file. When yt-dlp downloads the audio stream, FFmpeg takes over to encode it into the target format.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            For MP3 conversion, FFmpeg decodes the source audio and re-encodes it using the LAME MP3 encoder. The encoding process supports variable bitrates and can preserve high quality (up to 320kbps depending on source availability). FFmpeg also handles metadata embedding — adding the video title, artist, and thumbnail to the resulting MP3 file.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            For MP4 conversion, FFmpeg muxes (combines) the video and audio streams into an MP4 container using the H.264 video codec and AAC audio codec. This ensures broad compatibility across devices and players.
          </p>
        </section>

        <section className={styles.section}>
          <h2>The Conversion Pipeline</h2>
          <p>
            Here is the typical flow when you convert a YouTube video:
          </p>
          <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem", lineHeight: "1.8", color: "var(--text)" }}>
            <li><strong>URL Validation:</strong> The server validates that the submitted URL is a valid YouTube video link.</li>
            <li><strong>Stream Extraction:</strong> yt-dlp queries YouTube to discover available streams and selects the best audio or video+audio stream.</li>
            <li><strong>Download:</strong> The selected stream is downloaded to a temporary file on the server.</li>
            <li><strong>Transcoding:</strong> FFmpeg processes the downloaded file, converting the audio to MP3 or muxing to MP4 with appropriate encoding settings.</li>
            <li><strong>Delivery:</strong> The converted file is made available for download through a secure, time-limited endpoint.</li>
            <li><strong>Cleanup:</strong> Temporary files are automatically deleted after download or after a short expiration period to free up server storage.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Quality Considerations</h2>
          <p>
            The quality of the output file depends primarily on the quality of the source YouTube stream. YouTube typically offers audio at 128kbps for standard streams and up to 256kbps or higher for some content. Our conversion process preserves this quality without additional compression artifacts.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            FFmpeg is configured to use high-quality encoding presets that balance file size with audio fidelity. For MP3, we use the LAME encoder with quality settings that maintain near-lossless quality at typical bitrates.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Security & Privacy</h2>
          <p>
            All conversions happen on the server side. Your YouTube browsing activity and account information are never exposed to our service. The download requests are processed anonymously, and temporary files are purged regularly to ensure no data persists on the server.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            The service is designed to work with publicly available YouTube content only. Private or restricted videos cannot be accessed through this converter.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Open Source Foundations</h2>
          <p>
            Both yt-dlp and FFmpeg are open-source projects with active communities. yt-dlp is hosted on GitHub and is released under the Unlicense (public domain). FFmpeg is released under LGPL/GPL depending on the components used. These tools power millions of conversions daily across the web and represent the state of the art in open multimedia processing.
          </p>
        </section>
      </div>
    </main>
  );
}
