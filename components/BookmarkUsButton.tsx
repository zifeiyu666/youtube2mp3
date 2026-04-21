"use client";

import { useEffect, useState } from "react";
import styles from "./bookmark-us-button.module.css";

export function BookmarkUsButton() {
  const [modifier, setModifier] = useState("ctrl");
  const [label, setLabel] = useState("Bookmark us!");

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.platform.toUpperCase().includes("MAC")) {
      setModifier("cmd");
    }
  }, []);

  const handleClick = () => {
    const shortcut = `${modifier} + d`;
    setLabel(`Press ${shortcut}`);
    window.setTimeout(() => {
      setLabel("Bookmark us!");
    }, 1800);
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick} aria-label="Bookmark this site">
      <span className={styles.key}>{modifier}</span>
      <span className={styles.plus}>+</span>
      <span className={styles.key}>d</span>
      <span className={styles.text}>{label}</span>
    </button>
  );
}
