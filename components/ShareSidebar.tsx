"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { SimpleIcon } from "simple-icons";
import {
  siBluesky,
  siBlogger,
  siBuffer,
  siFacebook,
  siFlipboard,
  siGmail,
  siInstapaper,
  siLine,
  siPinterest,
  siReddit,
  siTelegram,
  siTumblr,
  siVk,
  siWhatsapp,
  siX,
  siDigg,
} from "simple-icons";
import styles from "./share-sidebar.module.css";

type ShareTarget = {
  label: string;
  icon?: SimpleIcon;
  color: string;
  action: "link" | "copy" | "native";
  href?: (shareUrl: string, shareText: string) => string;
};

const SHARE_TEXT = "Convert public YouTube videos to MP3 or MP4 with youtube2mp3.io.";
const MAIL_SUBJECT = "youtube2mp3.io";
const SHARE_COUNT = 598;

const QUICK_TARGETS: ShareTarget[] = [
  {
    label: "Facebook",
    icon: siFacebook,
    color: `#${siFacebook.hex}`,
    action: "link",
    href: (shareUrl) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  },
  {
    label: "X",
    icon: siX,
    color: `#${siX.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
        shareText,
      )}`,
  },
  {
    label: "WhatsApp",
    icon: siWhatsapp,
    color: `#${siWhatsapp.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  },
  {
    label: "Pinterest",
    icon: siPinterest,
    color: `#${siPinterest.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        shareUrl,
      )}&description=${encodeURIComponent(shareText)}`,
  },
  {
    label: "Telegram",
    icon: siTelegram,
    color: `#${siTelegram.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
        shareText,
      )}`,
  },
  {
    label: "Copy Link",
    color: "#A6D92D",
    action: "copy",
  },
];

const ALL_TARGETS: ShareTarget[] = [
  ...QUICK_TARGETS.slice(0, 5),
  {
    label: "Reddit",
    icon: siReddit,
    color: `#${siReddit.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
        shareText,
      )}`,
  },
  {
    label: "LINE",
    icon: siLine,
    color: `#${siLine.hex}`,
    action: "link",
    href: (shareUrl) =>
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`,
  },
  {
    label: "Gmail",
    icon: siGmail,
    color: `#${siGmail.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(
        MAIL_SUBJECT,
      )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
  },
  {
    label: "Blogger",
    icon: siBlogger,
    color: `#${siBlogger.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://www.blogger.com/blog-this.g?u=${encodeURIComponent(
        shareUrl,
      )}&n=${encodeURIComponent(shareText)}`,
  },
  {
    label: "Bluesky",
    icon: siBluesky,
    color: `#${siBluesky.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  },
  {
    label: "Buffer",
    icon: siBuffer,
    color: `#${siBuffer.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://buffer.com/add?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
        shareText,
      )}`,
  },
  {
    label: "VK",
    icon: siVk,
    color: `#${siVk.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
        MAIL_SUBJECT,
      )}&comment=${encodeURIComponent(shareText)}`,
  },
  {
    label: "Digg",
    icon: siDigg,
    color: `#${siDigg.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://digg.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(
        shareText,
      )}`,
  },
  {
    label: "Instapaper",
    icon: siInstapaper,
    color: `#${siInstapaper.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://www.instapaper.com/edit?url=${encodeURIComponent(
        shareUrl,
      )}&title=${encodeURIComponent(shareText)}`,
  },
  {
    label: "Flipboard",
    icon: siFlipboard,
    color: `#${siFlipboard.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://share.flipboard.com/bookmarklet/popout?v=2&title=${encodeURIComponent(
        shareText,
      )}&url=${encodeURIComponent(shareUrl)}`,
  },
  {
    label: "Tumblr",
    icon: siTumblr,
    color: `#${siTumblr.hex}`,
    action: "link",
    href: (shareUrl, shareText) =>
      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
        shareUrl,
      )}&title=${encodeURIComponent(MAIL_SUBJECT)}&caption=${encodeURIComponent(shareText)}`,
  },
  {
    label: "Copy Link",
    color: "#1F7A34",
    action: "copy",
  },
  {
    label: "More",
    color: "#4B8CF7",
    action: "native",
  },
];

function BrandIcon({ icon }: { icon?: SimpleIcon }) {
  if (!icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.7 3.3a1 1 0 0 1 1.4 1.4l-2 2 2.6 2.6 2-2a1 1 0 1 1 1.4 1.4l-2 2 1.2 1.2a3 3 0 0 1 0 4.2l-4.4 4.4a3 3 0 0 1-4.2 0L8 19a1 1 0 1 1 1.4-1.4l3.5 3.5a1 1 0 0 0 1.4 0l4.4-4.4a1 1 0 0 0 0-1.4l-1.2-1.2-2 2a1 1 0 0 1-1.4-1.4l2-2-2.6-2.6-2 2A1 1 0 0 1 8 10.7l2-2-1.2-1.2a3 3 0 0 0-4.2 0L.2 11.9a3 3 0 0 0 0 4.2L3.7 20a1 1 0 1 1-1.4 1.4L-1.1 18a5 5 0 0 1 0-7l4.4-4.4a5 5 0 0 1 7 0l1.2 1.2 2-2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

export function ShareSidebar() {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setShareUrl(window.location.href);
    setCopied(false);
    setIsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const quickTargets = useMemo(
    () =>
      QUICK_TARGETS.map((target) =>
        target.action === "copy" && copied ? { ...target, label: "Copied" } : target,
      ),
    [copied],
  );

  const handleCopy = async () => {
    if (!shareUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl || typeof navigator.share !== "function") {
      return;
    }

    try {
      await navigator.share({
        title: MAIL_SUBJECT,
        text: SHARE_TEXT,
        url: shareUrl,
      });
    } catch {
      // ignore cancelled share sheets
    }
  };

  const runAction = async (target: ShareTarget) => {
    if (target.action === "copy") {
      await handleCopy();
      return;
    }

    if (target.action === "native") {
      await handleNativeShare();
      return;
    }

    if (!target.href || !shareUrl) {
      return;
    }

    window.open(target.href(shareUrl, SHARE_TEXT), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <aside className={styles.sidebar} aria-label="Share this page">
        <div className={styles.stack}>
          <div className={styles.statsCard} aria-hidden="true">
            <strong>{SHARE_COUNT}</strong>
            <span>Shares</span>
          </div>

          {quickTargets.map((target) => (
            <button
              key={target.label}
              type="button"
              className={styles.tab}
              style={{ "--tab-color": target.color } as React.CSSProperties}
              onClick={() => {
                void runAction(target);
              }}
              aria-label={target.label}
            >
              <span className={styles.iconWrap}>
                <BrandIcon icon={target.icon} />
              </span>
              <span className={styles.label}>{target.label}</span>
            </button>
          ))}

          <button
            type="button"
            className={`${styles.tab} ${styles.shareToggle}`}
            style={{ "--tab-color": "#4B8CF7" } as React.CSSProperties}
            onClick={() => setIsExpanded(true)}
            aria-label="Open all share options"
            aria-expanded={isExpanded}
          >
            <span className={styles.iconWrap}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 16a3 3 0 0 0-2.39 1.19l-6.8-3.4a3.3 3.3 0 0 0 0-1.58l6.8-3.4A3 3 0 1 0 15 7a3.3 3.3 0 0 0 .07.64l-6.8 3.4a3 3 0 1 0 0 1.92l6.8 3.4A3 3 0 1 0 18 16Z" />
              </svg>
            </span>
            <span className={styles.label}>Share</span>
          </button>
        </div>
      </aside>

      {isExpanded ? (
        <div
          className={styles.overlay}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsExpanded(false);
            }
          }}
        >
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Share options">
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.dialogEyebrow}>Share this page</p>
                <h2>Pick a platform</h2>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsExpanded(false)}
                aria-label="Close share options"
              >
                ×
              </button>
            </div>

            <div className={styles.grid}>
              {ALL_TARGETS.map((target) => (
                <button
                  key={target.label}
                  type="button"
                  className={styles.gridItem}
                  style={{ "--tab-color": target.color } as React.CSSProperties}
                  onClick={() => {
                    void runAction(target);
                  }}
                >
                  <span className={styles.gridIcon}>
                    <BrandIcon icon={target.icon} />
                  </span>
                  <span>{target.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
