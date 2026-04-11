# YouTube to MP3

A small Next.js app that converts public YouTube videos to MP3 by proxying the upstream service hosted at `yt2mp3-magic.onrender.com`.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Update `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` with your AdSense publisher ID and set your ad slot IDs.

4. Start the app:

   ```bash
   npm run dev
   ```

## Notes

- The frontend calls local route handlers under `/api/convert/*`.
- The local route handlers proxy requests to the upstream conversion service to avoid browser-side CORS issues.
- Replace the demo ad slot IDs in [app/page.tsx](/Users/gymd/myProjects/youtube2mp3/app/page.tsx) with your real Google AdSense slot IDs.
