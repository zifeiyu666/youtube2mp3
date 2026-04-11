import Link from "next/link";
import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Copyright",
  description: "Copyright notice and claims policy for youtube2mp3.io.",
};

export default function CopyrightPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link className={styles.back} href="/">
          Back to youtube2mp3.io
        </Link>
        <h1 className={styles.title}>Copyright Notice</h1>
        <p className={styles.lede}>
          youtube2mp3.io respects the intellectual property rights of others and expects users of
          the service to do the same.
        </p>

        <section className={styles.section}>
          <h2>User responsibility</h2>
          <p>
            Users are solely responsible for the links they submit and for ensuring that they have
            the legal right to access, convert, or download the content they request through
            youtube2mp3.io. The service is intended for lawful personal use only.
          </p>
        </section>

        <section className={styles.section}>
          <h2>No content hosting</h2>
          <p>
            youtube2mp3.io does not claim ownership of third-party media and does not present
            itself as the publisher of videos or audio files available on external platforms. The
            site provides a conversion interface and does not grant users any copyright license.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Claims and notices</h2>
          <p>
            If you believe that material accessed through youtube2mp3.io infringes your copyright,
            you may send a notice that includes enough information for us to identify the work, the
            allegedly infringing material, and your contact details. We review good-faith notices
            and may restrict access to reported material or features where appropriate.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Repeat infringement</h2>
          <p>
            We reserve the right to block abusive usage, suspend access, or take other reasonable
            technical measures when we receive repeated or credible infringement complaints related
            to the service.
          </p>
        </section>
      </div>
    </main>
  );
}
