import { NextResponse } from "next/server";
import { ensureSeoVideoRecord, getSeoVideoCanonicalPath } from "@/lib/seo-videos";
import { isYouTubeVideoId } from "@/lib/youtube";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ videoId: string }> },
) {
  const { videoId } = await params;

  if (!isYouTubeVideoId(videoId)) {
    return NextResponse.json({ error: "Invalid YouTube video id." }, { status: 400 });
  }

  try {
    const record = await ensureSeoVideoRecord(videoId);

    return NextResponse.json({
      videoId: record.videoId,
      title: record.title,
      canonicalPath: getSeoVideoCanonicalPath(record),
      lastFetchedAt: record.lastFetchedAt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate the SEO landing page for this video.",
      },
      { status: 502 },
    );
  }
}
