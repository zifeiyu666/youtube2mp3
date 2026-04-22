export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const downloadUrl = searchParams.get("downloadUrl");

  if (!downloadUrl) {
    return new Response("A download URL is required.", { status: 400 });
  }

  return new Response(
    "Direct MP3 proxy downloads have been removed. Use the embedded converter provider instead.",
    { status: 410 },
  );
}
