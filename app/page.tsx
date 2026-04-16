import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Converter } from "@/components/Converter";
import styles from "./page.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://youtube2mp3.io";

export const metadata: Metadata = {
  title: "YouTube to MP3 & MP4 Converter Free | YouTube Downloader",
  description:
    "youtube2mp3.io is a free YouTube to MP3 and MP4 converter and downloader. Convert YouTube links to MP3 audio or MP4 video online with a simple converter site.",
  keywords: [
    "youtube to mp3 converter",
    "youtube to mp4 converter",
    "youtube to mp3",
    "youtube to mp4",
    "convert youtube to mp3",
    "convert youtube to mp4",
    "free youtube to mp3 converter",
    "free youtube to mp4 converter",
    "youtube downloader",
    "youtube to mp3 converter free",
    "youtube to mp3 downloader",
    "youtube to mp3 converter site",
    "youtube link to mp3 converter",
    "online youtube to mp3 converter tool",
    "youtube playlist to mp3",
    "youtube to mp3 320 kbps",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "YouTube to MP3 & MP4 Converter Free | youtube2mp3.io",
    description:
      "Use youtube2mp3.io as a free YouTube to MP3 and MP4 converter site to convert YouTube links into audio or video online.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube to MP3 & MP4 Converter Free | youtube2mp3.io",
    description:
      "A free YouTube to MP3 and MP4 converter and downloader for public video links.",
  },
};

export default function Home() {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-8919343509754259";
  const bottomSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BOTTOM || "7300951301";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "youtube2mp3.io",
    url: siteUrl,
    description:
      "youtube2mp3.io is a free YouTube to MP3 converter site and online YouTube to MP3 converter tool for public video links.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?url={url}`,
      "query-input": "required name=url",
    },
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I convert YouTube to MP3 or MP4?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paste a public YouTube video link into youtube2mp3.io, start the conversion, wait for processing to finish, and then download the MP3 or MP4 file.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this YouTube to MP3/MP4 converter on iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. youtube2mp3.io can be used in mobile browsers, including iPhone browsers, for supported public YouTube links.",
        },
      },
      {
        "@type": "Question",
        name: "Does youtube2mp3.io support YouTube playlist to MP3 conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Single public video links work best. Playlist behavior may vary depending on the supplied URL and the upstream conversion service.",
        },
      },
      {
        "@type": "Question",
        name: "Does youtube2mp3.io guarantee YouTube to MP3 320 kbps output?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No fixed bitrate is guaranteed. Output quality depends on the original source and the conversion service handling the request.",
        },
      },
    ],
  };

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <header className={styles.topBar}>
          <p className={styles.brand}>youtube2mp3.io</p>
          <p className={styles.miniNote}>Convert YouTube to MP3 & MP4 — fast downloads for audio and video.</p>
        </header>

        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />

        <Converter />

        <section className={styles.contentGrid} aria-label="SEO content">
          <article className={styles.infoCard}>
            <h2>Free YouTube to MP3 & MP4 converter and downloader</h2>
            <p>
              youtube2mp3.io is built as a free YouTube to MP3 and MP4 converter and downloader
              for people who want a direct workflow. Paste a public video URL, start the conversion,
              track progress, and download the MP3 audio or MP4 video file once it is ready.
            </p>
          </article>

          <article className={styles.infoCard}>
            <h2>How to convert YouTube to MP3 or MP4 online</h2>
            <ol className={styles.steps}>
              <li>Copy a public YouTube video link.</li>
              <li>Paste the link into the YouTube to MP3/MP4 converter field.</li>
              <li>Wait while the conversion finishes.</li>
              <li>Download the generated MP3 audio or MP4 video file from our converter site.</li>
            </ol>
          </article>

          <article className={styles.infoCard}>
            <h2>Online YouTube to MP3/MP4 converter tool FAQ</h2>
            <div className={styles.faqList}>
              <div>
                <h3>Can I use this YouTube to MP3/MP4 converter on mobile and iPhone?</h3>
                <p>
                  Yes. youtube2mp3.io is designed to work on desktop and mobile browsers, including
                  iPhone browsers, so you can start a conversion from either environment.
                </p>
              </div>
              <div>
                <h3>Does this YouTube converter site support playlist links?</h3>
                <p>
                  Public single-video URLs are the safest option. If you are testing playlist
                  behavior, results may vary depending on the supplied URL and the upstream conversion
                  service.
                </p>
              </div>
              <div>
                <h3>What about YouTube to MP3 320 kbps or HD quality?</h3>
                <p>
                  Some users search for phrases like YouTube to MP3 320 kbps or YouTube to MP4 HD,
                  but final quality depends on the original source and the conversion service.
                  youtube2mp3.io does not guarantee a fixed bitrate.
                </p>
              </div>
              <div>
                <h3>Does youtube2mp3.io host original video content?</h3>
                <p>
                  No. youtube2mp3.io provides a web interface for conversion requests and does not
                  position itself as the original publisher of third-party content.
                </p>
              </div>
            </div>
          </article>

          <article className={styles.infoCard}>
            <h2>Why choose youtube2mp3.io?</h2>
            <p>
              youtube2mp3.io offers a fast, free, and easy way to download YouTube videos as MP3 or
              MP4. No registration required, no software to install — just paste a link and download.
              Works on desktop and mobile, supporting both MP3 and MP4 formats for your convenience.
            </p>
          </article>
        </section>

        <div className={styles.adBottomWrap}>
          <ins
            className={`adsbygoogle ${styles.adBottom}`}
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={bottomSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <Script id="adsense-bottom-push" strategy="afterInteractive">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
        </div>

        <footer className={styles.footer}>
          <span>youtube2mp3.io provides a simple interface for starting audio and video conversions.</span>
          <nav className={styles.footerNav} aria-label="Legal">
            <Link href="/copyright">Copyright</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </nav>
          <nav className={styles.footerNav} aria-label="Friendly Links">
            <a href="https://bgmgen.com" target="_blank" rel="noopener noreferrer">BgmGen</a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
