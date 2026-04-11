import { NextResponse } from "next/server";

const REMOTE_BASE_URL = "https://yt2mp3-magic.onrender.com";

type RemoteStatusResponse = {
  finished?: boolean;
  downloadUrl?: string;
  status?: string;
  progress?: number;
  error?: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "A conversion id is required." }, { status: 400 });
  }

  try {
    const remoteResponse = await fetch(
      `${REMOTE_BASE_URL}/api/status?id=${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );

    const data = (await remoteResponse.json()) as RemoteStatusResponse;

    return NextResponse.json(
      {
        finished: Boolean(data.finished),
        downloadUrl: data.downloadUrl,
        status: data.status,
        progress: data.progress,
        error: data.error,
      },
      { status: remoteResponse.status },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch conversion status from the upstream service." },
      { status: 502 },
    );
  }
}
