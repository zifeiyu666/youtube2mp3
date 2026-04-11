import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://youtube2mp3.io";
const adsenseClient =
  process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT || "ca-pub-8919343509754259";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "youtube2mp3.io",
    template: "%s | youtube2mp3.io",
  },
  description: "youtube2mp3.io converts public YouTube videos to MP3 with a simple web flow.",
  openGraph: {
    title: "youtube2mp3.io",
    description: "Paste a YouTube link and download the MP3 when conversion finishes.",
    url: siteUrl,
    siteName: "youtube2mp3.io",
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
