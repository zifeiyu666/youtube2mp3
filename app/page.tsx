import { AdsenseSlot } from "@/components/AdsenseSlot";
import { Converter } from "@/components/Converter";
import styles from "./page.module.css";

export default function Home() {
  const topSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_TOP || "1234567890";
  const bottomSlot = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_BOTTOM || "1234567891";

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <header className={styles.topBar}>
          <p className={styles.brand}>YouTube to MP3</p>
          <p className={styles.miniNote}>Simple conversion flow powered by a remote service API.</p>
        </header>

        <AdsenseSlot className={styles.adTop} slot={topSlot} />

        <Converter />

        <AdsenseSlot className={styles.adBottom} slot={bottomSlot} />

        <footer className={styles.footer}>
          <span>Use your own AdSense client and slot IDs before going live.</span>
          <span>This app proxies conversion requests through local Next.js routes.</span>
        </footer>
      </div>
    </main>
  );
}
