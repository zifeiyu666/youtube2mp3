import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "A conversion id is required." }, { status: 400 });
  }

  return NextResponse.json(
    {
      error:
        "Conversion status polling is no longer available because the upstream conversion proxy was removed.",
    },
    { status: 410 },
  );
}
