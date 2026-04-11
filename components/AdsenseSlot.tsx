"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdsenseSlotProps = {
  className?: string;
  slot: string;
  format?: string;
  responsive?: boolean;
};

export function AdsenseSlot({
  className,
  slot,
  format = "auto",
  responsive = true,
}: AdsenseSlotProps) {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

  useEffect(() => {
    if (!client) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore duplicate initialization errors while preserving render.
    }
  }, [client]);

  if (!client) {
    return (
      <div className={className} data-placeholder="adsense-slot">
        Ad space
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`.trim()}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    />
  );
}
