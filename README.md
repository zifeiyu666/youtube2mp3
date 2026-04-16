# YouTube to MP3

A small Next.js app for `youtube2mp3.io` that converts public YouTube videos to MP3 by proxying the upstream service hosted at `yt2mp3-magic.onrender.com`.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Update `NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT` with your AdSense publisher ID and set your ad slot IDs. If you want Google Analytics, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (for example, `G-XXXXXXXXXX`).

4. Start the app:

   ```bash
   npm run dev
   ```

## Notes

- The frontend calls local route handlers under `/api/convert/*`.
- The local route handlers proxy requests to the upstream conversion service to avoid browser-side CORS issues.
- The AdSense blocks in [app/page.tsx](/Users/gymd/myProjects/youtube2mp3/app/page.tsx) now mirror the official `ins.adsbygoogle` plus `push({})` pattern for each slot.
- Google Analytics is loaded in [app/layout.tsx](/Users/gymd/myProjects/youtube2mp3/app/layout.tsx) only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
- Legal pages are available at `/copyright`, `/privacy-policy`, and `/terms-of-service`.
