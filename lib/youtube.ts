const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "by",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

export function isYouTubeVideoId(value: string): boolean {
  return YOUTUBE_VIDEO_ID_PATTERN.test(value);
}

export function extractYouTubeVideoId(input: string): string | null {
  const trimmed = input.trim();

  if (isYouTubeVideoId(trimmed)) {
    return trimmed;
  }

  try {
    const parsedUrl = new URL(trimmed);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const shortId = parsedUrl.pathname.split("/").filter(Boolean)[0];
      return shortId && isYouTubeVideoId(shortId) ? shortId : null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const directId = parsedUrl.searchParams.get("v");
      if (directId && isYouTubeVideoId(directId)) {
        return directId;
      }

      const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
      const shortsId = pathSegments[0] === "shorts" ? pathSegments[1] : null;
      const embedId = pathSegments[0] === "embed" ? pathSegments[1] : null;
      const candidate = shortsId || embedId;

      return candidate && isYouTubeVideoId(candidate) ? candidate : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function buildYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function slugifyVideoTitle(title: string): string {
  const cleaned = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const parts = cleaned
    .split(" ")
    .filter((part) => part && !STOP_WORDS.has(part))
    .slice(0, 12);

  return parts.join("-") || "youtube-video";
}

export function parseVideoSlugParam(value: string): { routeSlug: string; videoId: string } | null {
  const match = /^(.+)-([A-Za-z0-9_-]{11})$/.exec(value);

  if (!match) {
    return null;
  }

  return {
    routeSlug: match[1],
    videoId: match[2],
  };
}

export function formatIsoDuration(duration: string): string {
  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(duration);

  if (!match) {
    return duration;
  }

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const parts = [];

  if (hours) {
    parts.push(`${hours}h`);
  }
  if (minutes) {
    parts.push(`${minutes}m`);
  }
  if (seconds || parts.length === 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(" ");
}
