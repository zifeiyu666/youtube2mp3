"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./converter.module.css";

type StartResponse = {
  success: boolean;
  pid?: string;
  title?: string;
  error?: string;
};

type StatusResponse = {
  finished?: boolean;
  downloadUrl?: string;
  status?: string;
  progress?: number;
  error?: string;
};

const POLL_MS = 6000;
const HISTORY_KEY = "yt2mp3_history";
const MAX_HISTORY = 20;

export function Converter() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Paste a YouTube link to begin.");
  const [downloadPath, setDownloadPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isFallbackOpen, setIsFallbackOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

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

  const clearPolling = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const extractVideoId = (input: string): string | null => {
    if (input.includes("youtube.com/")) {
      const match = /v=([a-zA-Z0-9\-_]{11})/.exec(input);
      if (match) return match[1];
      const shortMatch = /youtube\.com\/shorts\/([a-zA-Z0-9\-_]{11})/.exec(input);
      if (shortMatch) return shortMatch[1];
    }
    if (input.includes("youtu.be/")) {
      const match = /youtu\.be\/([a-zA-Z0-9\-_]{11})/.exec(input);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearPolling();
    setIsLoading(true);
    setProgress(0);
    setTitle("");
    setDownloadPath("");
    setVideoId("");
    setIsFallbackOpen(false);
    setStatus("Contacting the conversion service...");

    saveToHistory(url);

    const id = extractVideoId(url);
    if (!id) {
      setIsLoading(false);
      setStatus("Invalid YouTube URL. Please check and try again.");
      return;
    }

    setVideoId(id);
    setIsFallbackOpen(true);

    try {
      const startResponse = await fetch("/api/convert/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const startData = (await startResponse.json()) as StartResponse;

      if (!startResponse.ok || !startData.success || !startData.pid || !startData.title) {
        setIsLoading(false);
        setStatus("Conversion service unavailable. Use the alternative below.");
        return;
      }

      setTitle(startData.title);
      setStatus("Conversion started. Checking progress...");

      const runStatusCheck = async () => {
        const response = await fetch(
          `/api/convert/status?id=${encodeURIComponent(startData.pid as string)}`,
        );

        const statusData = (await response.json()) as StatusResponse;

        if (!response.ok) {
          clearPolling();
          setIsLoading(false);
          setStatus("Conversion service unavailable. Use the alternative below.");
          return;
        }

        const safeProgress = Math.min(Math.max(statusData.progress ?? 0, 0), 1000);
        setProgress(Math.floor(safeProgress / 10));
        setStatus(statusData.status || "Converting...");

        if (statusData.downloadUrl) {
          clearPolling();
          setProgress(100);
          setStatus("Ready. Your MP3 is available.");
          setDownloadPath(
            `/api/convert/download?downloadUrl=${encodeURIComponent(
              statusData.downloadUrl,
            )}&title=${encodeURIComponent(startData.title as string)}`,
          );
          setIsLoading(false);
          return;
        }
      };

      await runStatusCheck();

      intervalRef.current = window.setInterval(() => {
        void runStatusCheck().catch(() => {
          clearPolling();
          setIsLoading(false);
          setStatus("Conversion service unavailable. Use the alternative below.");
        });
      }, POLL_MS);
    } catch {
      clearPolling();
      setIsLoading(false);
      setStatus("Conversion service unavailable. Use the alternative below.");
    }
  };

  return (
    <section className={styles.shell}>
      <div className={styles.sideBySide}>
        <div className={styles.formCol}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Fast MP3 & MP4 export</p>
            <h1>YouTube to MP3 & MP4 converter for quick downloads.</h1>
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
              {isLoading ? "Converting..." : "Use YouTube to MP3 Converter"}
            </button>
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
