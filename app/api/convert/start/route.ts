import { NextResponse } from "next/server";
import { ensureSeoVideoRecord } from "@/lib/seo-videos";
import { extractYouTubeVideoId } from "@/lib/youtube";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };

    if (!body.url) {
      return NextResponse.json(
        { success: false, error: "A YouTube URL is required." },
        { status: 400 },
      );
    }

    const videoId = extractYouTubeVideoId(body.url);
    if (videoId) {
      void ensureSeoVideoRecord(videoId).catch(() => {});
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Direct server-side conversion has been removed. Use the embedded converter flow in the UI instead.",
      },
      { status: 410 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to prepare the embedded converter flow." },
      { status: 502 },
    );
  }
}
