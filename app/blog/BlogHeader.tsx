import Link from "next/link";
import styles from "./blog.module.css";

export function BlogHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.headerBrand} href="/">
        youtube2mp3.io
      </Link>
      <nav className={styles.headerNav} aria-label="Blog navigation">
        <Link className={styles.headerLink} href="/">
          Home
        </Link>
        <Link className={styles.headerLink} href="/blog">
          Blog
        </Link>
      </nav>
    </header>
  );
}
