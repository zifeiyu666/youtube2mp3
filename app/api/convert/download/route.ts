const REMOTE_BASE_URL = "https://yt2mp3-magic.onrender.com";

function sanitizeFileName(title: string) {
  return `${title || "youtube-audio"}`
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const downloadUrl = searchParams.get("downloadUrl");
  const title = searchParams.get("title") || "youtube-audio";

  if (!downloadUrl) {
    return new Response("A download URL is required.", { status: 400 });
  }

  try {
    const body = new URLSearchParams({
      downloadUrl,
      title,
    });

    const remoteResponse = await fetch(`${REMOTE_BASE_URL}/api/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      cache: "no-store",
    });

    if (!remoteResponse.ok || !remoteResponse.body) {
      return new Response("Unable to download the MP3 file.", { status: 502 });
    }

    const headers = new Headers();
    headers.set("Content-Type", remoteResponse.headers.get("content-type") || "audio/mpeg");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${sanitizeFileName(title)}.mp3"`,
    );

    return new Response(remoteResponse.body, {
      status: 200,
      headers,
    });
  } catch {
    return new Response("The download service is temporarily unavailable.", { status: 502 });
  }
}
