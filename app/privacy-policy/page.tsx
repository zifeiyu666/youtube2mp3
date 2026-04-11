import Link from "next/link";
import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for youtube2mp3.io.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">
          Back to youtube2mp3.io
        </Link>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lede}>
          This Privacy Policy explains how youtube2mp3.io collects, uses, and protects limited
          information in connection with the website.
        </p>

        <section className={styles.section}>
          <h2>Information we process</h2>
          <ul>
            <li>Submitted video URLs needed to start a conversion request.</li>
            <li>Basic technical data such as browser type, IP-derived diagnostics, and request logs.</li>
            <li>Advertising-related data that may be processed by Google AdSense or similar partners.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How we use information</h2>
          <p>
            We use information to operate youtube2mp3.io, troubleshoot errors, prevent abuse,
            improve performance, and support advertising and analytics functions connected to the
            site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies and advertising</h2>
          <p>
            youtube2mp3.io may use cookies or similar technologies for site functionality, traffic
            measurement, and advertising. Third-party vendors, including Google, may use cookies to
            serve ads based on a user&apos;s visits to this and other sites.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Data sharing</h2>
          <p>
            We do not sell personal information as part of the core site experience. We may share
            limited technical data with infrastructure, analytics, or advertising providers as
            needed to operate youtube2mp3.io or comply with legal obligations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Policy updates</h2>
          <p>
            We may update this Privacy Policy from time to time by posting a revised version on
            youtube2mp3.io. Continued use of the website after changes become effective means you
            accept the updated policy.
          </p>
        </section>
      </div>
    </main>
  );
}
