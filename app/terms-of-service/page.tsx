import Link from "next/link";
import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for youtube2mp3.io.",
};

export default function TermsOfServicePage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">
          Back to youtube2mp3.io
        </Link>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lede}>
          By accessing or using youtube2mp3.io, you agree to these Terms of Service.
        </p>

        <section className={styles.section}>
          <h2>Service scope</h2>
          <p>
            youtube2mp3.io provides a web interface that helps users submit publicly accessible
            video links for audio conversion. The service may change, pause, or become unavailable
            at any time without notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Acceptable use</h2>
          <ul>
            <li>Use the website only for lawful purposes.</li>
            <li>Do not submit content you do not have the right to access or convert.</li>
            <li>Do not attempt to disrupt, overload, reverse engineer, or abuse the service.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Third-party content and services</h2>
          <p>
            youtube2mp3.io interacts with third-party platforms and supporting infrastructure. We
            are not responsible for the availability, legality, accuracy, or policies of
            third-party content, websites, or services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>No warranty</h2>
          <p>
            The site is provided on an as-is and as-available basis without warranties of any kind.
            We do not guarantee uninterrupted service, successful conversion, or compatibility with
            every device, browser, or source platform.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, youtube2mp3.io and its operators will not be
            liable for any indirect, incidental, special, consequential, or punitive damages arising
            from the use of the website or reliance on its output.
          </p>
        </section>
      </div>
    </main>
  );
}
