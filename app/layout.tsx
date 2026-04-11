import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const adsenseClient =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-8919343509754259";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "YouTube to MP3",
  description: "Convert YouTube videos to MP3 with a simple three-step flow.",
  openGraph: {
    title: "YouTube to MP3",
    description: "Paste a YouTube link and download the MP3 when conversion finishes.",
    url: siteUrl,
    siteName: "YouTube to MP3",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {adsenseClient ? (
          <Script
            id="google-adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
