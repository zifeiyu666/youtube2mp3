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
   For programmatic video SEO pages, `SEO_VIDEO_CACHE_TTL_HOURS` controls metadata refresh time and `SEO_VIDEO_SEED_IDS` accepts a comma-separated list of YouTube video IDs to preseed into the sitemap.

4. Start the app:

   ```bash
   npm run dev
   ```

## Notes

- Programmatic video SEO pages use YouTube's public oEmbed endpoint to fetch title, channel name, and thumbnails without a server-side API key.
- The site no longer proxies downloads through the suspended `yt2mp3-magic.onrender.com` service. Conversion is handled through the embedded provider shown in the UI.
- The AdSense blocks in [app/page.tsx](/Users/gymd/myProjects/youtube2mp3/app/page.tsx) now mirror the official `ins.adsbygoogle` plus `push({})` pattern for each slot.
- Google Analytics is loaded in [app/layout.tsx](/Users/gymd/myProjects/youtube2mp3/app/layout.tsx) only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.
- Legal pages are available at `/copyright`, `/privacy-policy`, and `/terms-of-service`.
- Programmatic SEO video pages live at `/mp3/[slug]-[videoId]` and are cached under [data/seo-videos](/Users/gymd/myProjects/youtube2mp3/data/seo-videos).
- You can warm a page manually by opening `/api/seo/video/<videoId>` in the running app, or by submitting the video through the homepage converter.

## Chrome Extension

This repo now includes a loadable Chrome extension under [chrome-extension](/Users/gymd/myProjects/youtube2mp3/chrome-extension).

### What it does

- Injects a floating `youtube2mp3` panel on YouTube watch and shorts pages.
- Lets the user click `Open Converter` and opens the same embedded converter iframe used on the site.
- Avoids relying on the `/api/convert/*` proxy routes.

### Load it in Chrome

1. Open `chrome://extensions`.
2. Enable `Developer mode`.
3. Click `Load unpacked`.
4. Select [chrome-extension](/Users/gymd/myProjects/youtube2mp3/chrome-extension).
