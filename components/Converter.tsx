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

export function Converter() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Paste a YouTube link to begin.");
  const [downloadPath, setDownloadPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const clearPolling = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearPolling();
    setIsLoading(true);
    setProgress(0);
    setTitle("");
    setDownloadPath("");
    setStatus("Contacting the conversion service...");

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
        throw new Error(startData.error || "Unable to start conversion.");
      }

      setTitle(startData.title);
      setStatus("Conversion started. Checking progress...");

      const runStatusCheck = async () => {
        const response = await fetch(
          `/api/convert/status?id=${encodeURIComponent(startData.pid as string)}`,
        );

        const statusData = (await response.json()) as StatusResponse;

        if (!response.ok) {
          throw new Error(statusData.error || "Unable to fetch conversion status.");
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
        }
      };

      await runStatusCheck();

      intervalRef.current = window.setInterval(() => {
        void runStatusCheck().catch((error: unknown) => {
          clearPolling();
          setIsLoading(false);
          setStatus(error instanceof Error ? error.message : "Conversion failed.");
        });
      }, POLL_MS);
    } catch (error) {
      clearPolling();
      setIsLoading(false);
      setStatus(error instanceof Error ? error.message : "Conversion failed.");
    }
  };

  return (
    <section className={styles.shell}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Fast MP3 export</p>
        <h1>YouTube to MP3 in one clean flow.</h1>
        <p className={styles.lead}>
          Paste a public YouTube URL, let the conversion finish, then download the audio file.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="youtube-url">
          Video URL
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
          {isLoading ? "Converting..." : "Convert to MP3"}
        </button>

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
            <a className={styles.downloadLink} href={downloadPath}>
              Download MP3
            </a>
          ) : null}
        </div>
      </form>
    </section>
  );
}
