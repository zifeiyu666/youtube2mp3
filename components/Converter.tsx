"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { extractYouTubeVideoId } from "@/lib/youtube";
import styles from "./converter.module.css";

const HISTORY_KEY = "yt2mp3_history";
const MAX_HISTORY = 20;

type SeoResponse = {
  canonicalPath?: string;
  title?: string;
  error?: string;
};

type ConverterProps = {
  initialUrl?: string;
  headingLevel?: "h1" | "h2";
  showMusicTools?: boolean;
};

export function Converter({
  initialUrl = "",
  headingLevel = "h1",
  showMusicTools = true,
}: ConverterProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isFallbackOpen, setIsFallbackOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [seoPagePath, setSeoPagePath] = useState("");
  const HeadingTag = headingLevel;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFallbackOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const saveToHistory = (newUrl: string) => {
    try {
      const updated = [newUrl, ...history.filter((h) => h !== newUrl)].slice(0, MAX_HISTORY);
      setHistory(updated);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const ensureSeoPage = async (id: string) => {
    try {
      const response = await fetch(`/api/seo/video/${encodeURIComponent(id)}`, {
        cache: "no-store",
      });

      const data = (await response.json()) as SeoResponse;

      if (response.ok && data.canonicalPath) {
        setSeoPagePath(data.canonicalPath);
      }
    } catch {
      // ignore SEO cache warm failures on the client
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setVideoId("");
    setIsFallbackOpen(false);
    setSeoPagePath("");

    saveToHistory(url);

    const id = extractYouTubeVideoId(url);
    if (!id) {
      setIsLoading(false);
      return;
    }

    setVideoId(id);
    setIsFallbackOpen(true);
    await ensureSeoPage(id);
    setIsLoading(false);
  };

  return (
    <section className={styles.shell}>
      <div className={styles.sideBySide}>
        <div className={styles.formCol}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Fast MP3 & MP4 export</p>
            <HeadingTag>YouTube to MP3 & MP4 converter for quick downloads.</HeadingTag>
            <p className={styles.lead}>
              Convert public YouTube links to MP3 audio or MP4 video in a few clicks.
            </p>
          </div>

          <form id="converter-form" className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="youtube-url">
              YouTube video URL
            </label>
            <input
              id="youtube-url"
              className={styles.input}
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
            />

            <button className={styles.button} type="submit" disabled={isLoading}>
              {isLoading ? "Opening..." : "Open YouTube to MP3 Converter"}
            </button>
            {seoPagePath ? (
              <Link className={styles.seoPageLink} href={seoPagePath}>
                Open the indexed video landing page
              </Link>
            ) : null}
            <a
              className={styles.aiButton}
              href="https://bgmgen.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Free AI Music Generator
            </a>
          </form>

          <div className={styles.historySection} style={{ marginTop: "1rem" }}>
            <div className={styles.historyHeader}>
              <span>Recent</span>
              {history.length > 0 && (
                <button className={styles.historyClear} onClick={clearHistory}>
                  Clear
                </button>
              )}
            </div>
            <ul className={styles.historyList}>
              {history.length === 0 ? (
                <li className={styles.historyEmpty}>No recent URLs</li>
              ) : (
                history.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className={styles.historyItem}
                      onClick={() => {
                        setUrl(item);
                        const form = document.getElementById("converter-form") as HTMLFormElement | null;
                        if (form) void form.requestSubmit();
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

      </div>

      {showMusicTools ? (
        <div className={styles.bgmGenSection}>
          <p className={styles.bgmGenTitle}>Free AI Music Tools — Royalty-Free for Commercial Use</p>
          <div className={styles.bgmGenButtons}>
            <a
              href="https://bgmgen.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bgmGenButton}
            >
              AI BgmGen
            </a>
            <a
              href="https://bgmgen.com/workspace/create"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bgmGenButton}
            >
              AI Music Generator
            </a>
            <a
              href="https://bgmgen.com/workspace/create-bgm"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bgmGenButton}
            >
              Royalty-Free Background Music
            </a>
            <a
              href="https://bgmgen.com/workspace/create-bgm"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bgmGenButton}
            >
              Add Commercial-Use Audio
            </a>
            <a
              href="https://bgmgen.com/workspace/vocal-remover"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bgmGenButton}
            >
              Free Vocal Remover
            </a>
            <a
              href="https://bgmgen.com/workspace/create-mix"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bgmGenButton}
            >
              Mix Music for Commercial Projects
            </a>
          </div>
        </div>
      ) : null}

      {videoId && isFallbackOpen ? (
        <div
          className={styles.fallbackOverlay}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsFallbackOpen(false);
            }
          }}
        >
          <div className={styles.fallbackModal} role="dialog" aria-modal="true" aria-label="Backup converter">
            <div className={styles.fallbackModalHeader}>
              <div>
                <p className={styles.fallbackEyebrow}>Backup converter</p>
                <h2>Open the embedded converter</h2>
              </div>
              <button
                type="button"
                className={styles.fallbackClose}
                onClick={() => setIsFallbackOpen(false)}
                aria-label="Close backup converter"
              >
                ×
              </button>
            </div>
            <div className={styles.fallbackIframeWrap}>
              <iframe
                src={`https://y2jar.cc/?id=${videoId}&appearance=dark`}
                className={styles.fallbackIframe}
                title="YouTube to MP3/MP4 Converter"
                sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
