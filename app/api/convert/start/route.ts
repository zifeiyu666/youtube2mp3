import { NextResponse } from "next/server";

const REMOTE_BASE_URL = "https://yt2mp3-magic.onrender.com";

type RemoteStartResponse = {
  success?: boolean;
  pid?: string;
  title?: string;
  error?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };

    if (!body.url) {
      return NextResponse.json(
        { success: false, error: "A YouTube URL is required." },
        { status: 400 },
      );
    }

    const remoteResponse = await fetch(`${REMOTE_BASE_URL}/api/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: body.url }),
      cache: "no-store",
    });

    const data = (await remoteResponse.json()) as RemoteStartResponse;

    return NextResponse.json(
      {
        success: Boolean(data.success),
        pid: data.pid,
        title: data.title,
        error: data.error,
      },
      { status: remoteResponse.status },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "The conversion service is temporarily unavailable." },
      { status: 502 },
    );
  }
}
