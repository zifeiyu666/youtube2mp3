"use client";

import { FormEvent, useRef, useState } from "react";
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

export function Converter() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Paste a YouTube link to begin.");
  const [downloadPath, setDownloadPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const intervalRef = useRef<number | null>(null);

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
    setStatus("Contacting the conversion service...");

    const id = extractVideoId(url);
    if (!id) {
      setIsLoading(false);
      setStatus("Invalid YouTube URL. Please check and try again.");
      return;
    }

    setVideoId(id);

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
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Fast MP3 & MP4 export</p>
        <h1>YouTube to MP3 & MP4 converter for quick downloads.</h1>
        <p className={styles.lead}>
          youtube2mp3.io converts public YouTube videos to MP3 audio or MP4 video. Paste a URL,
          convert, and download — supports both formats side by side.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
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

        {isLoading ? (
          <div className={styles.progressCard} aria-live="polite">
            <div className={styles.progressHeader}>
              <span>Status</span>
              <span>{progress}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <p className={styles.status}>{status}</p>
            {title ? <p className={styles.title}>Current title: {title}</p> : null}
            {downloadPath ? (
              <div className={styles.actionButtons}>
                <a className={styles.downloadLink} href={downloadPath}>
                  Download MP3
                </a>
                <a
                  className={styles.editMusicLink}
                  href="https://bgmgen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit Music with AI
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </form>

      {videoId ? (
        <div className={styles.fallbackCard}>
          <p className={styles.fallbackCardTitle}>Alternative download — MP3 &amp; MP4</p>
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
      ) : null}

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
    </section>
  );
}
