"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./popular-downloads-search.module.css";

type PopularDownloadItem = {
  videoId: string;
  title: string;
  channelTitle: string;
  tags: string[];
  publishedAt: string;
  path: string;
};

type PopularDownloadsSearchProps = {
  videos: PopularDownloadItem[];
};

function formatDate(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function PopularDownloadsSearch({ videos }: PopularDownloadsSearchProps) {
  const [query, setQuery] = useState("");

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return videos;
    }

    return videos.filter((video) => {
      return (
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.channelTitle.toLowerCase().includes(normalizedQuery) ||
        video.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [query, videos]);

  return (
    <section className={styles.shell}>
      <div className={styles.searchCard}>
        <label htmlFor="popular-downloads-search" className={styles.label}>
          Search generated download pages
        </label>
        <input
          id="popular-downloads-search"
          className={styles.input}
          type="search"
          placeholder="Search by title, channel, or keyword"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className={styles.count}>
          Showing {filteredVideos.length} of {videos.length} generated pages
        </p>
      </div>

      <div className={styles.list}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => {
            const publishedLabel = formatDate(video.publishedAt);

            return (
              <Link
                key={video.videoId}
                href={video.path}
                className={styles.card}
              >
                <strong>{video.title}</strong>
                <span>{video.channelTitle}</span>
                <span className={styles.meta}>
                  {publishedLabel ? `Published ${publishedLabel}` : "Generated SEO landing page"}
                </span>
              </Link>
            );
          })
        ) : (
          <div className={styles.empty}>
            <strong>No generated pages match this search.</strong>
            <span>Generate a few video landing pages from the homepage and they will appear here.</span>
          </div>
        )}
      </div>
    </section>
  );
}
