import Script from "next/script";
import { Converter } from "@/components/Converter";
import styles from "./page.module.css";

export default function Home() {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-8919343509754259";
  const bottomSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BOTTOM || "7300951301";
  const squareSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_SQUARE || "1599624955";

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <header className={styles.topBar}>
          <p className={styles.brand}>YouTube to MP3</p>
          <p className={styles.miniNote}>Simple conversion flow powered by a remote service API.</p>
        </header>

        <Converter />

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
          <span>Use your own AdSense client and slot IDs before going live.</span>
          <span>This app proxies conversion requests through local Next.js routes.</span>
        </footer>
      </div>

      <div className={styles.adSquareShell}>
        <ins
          className={`adsbygoogle ${styles.adSquareFixed}`}
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={squareSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <Script id="adsense-square-push" strategy="afterInteractive">
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </Script>
      </div>
    </main>
  );
}
