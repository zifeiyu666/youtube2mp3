import type { StaticImageData } from "next/image";
import cover1 from "./covers/ScreenShot_2026-04-21_165919_370.png";
import cover2 from "./covers/ScreenShot_2026-04-21_165827_895.png";
import cover3 from "./covers/ScreenShot_2026-04-21_165818_176.png";
import cover4 from "./covers/ScreenShot_2026-04-21_165837_283.png";
import cover5 from "./covers/ScreenShot_2026-04-21_165903_294.png";
import cover6 from "./covers/ScreenShot_2026-04-21_165855_193.png";
import cover7 from "./covers/ScreenShot_2026-04-21_165800_037.png";
import cover8 from "./covers/ScreenShot_2026-04-21_165927_084.png";
import cover9 from "./covers/ScreenShot_2026-04-21_165911_535.png";
import cover10 from "./covers/ScreenShot_2026-04-21_165846_283.png";

export type BlogSection =
  | {
      type: "paragraphs";
      heading: string;
      paragraphs: string[];
    }
  | {
      type: "list";
      heading: string;
      intro?: string;
      items: string[];
    }
  | {
      type: "table";
      heading: string;
      intro?: string;
      columns: string[];
      rows: string[][];
    }
  | {
      type: "faq";
      heading: string;
      items: { question: string; answer: string }[];
    };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  coverImage: StaticImageData;
  imageAlt: string;
  imageLabel: string;
  createdAt: string;
  tag: string;
  sourceFile: string;
  lede: string;
  sections: BlogSection[];
  includeBgmgenLink: boolean;
};

const coverPool = [cover7, cover2, cover9, cover4, cover1, cover8, cover5, cover10, cover3, cover6];

export const blogPosts: BlogPost[] = [
  {
    slug: "youtube-to-mp3-on-mobile",
    title: "How to Use a YouTube to MP3 Converter on iPhone and Android in 2026",
    description:
      "Learn the easiest mobile workflow for converting public YouTube links to MP3 or MP4 on iPhone and Android browsers.",
    coverImage: coverPool[0],
    imageAlt:
      "Illustration of an iPhone and Android phone using a YouTube to MP3 converter interface for mobile audio downloads",
    imageLabel: "Mobile Guide",
    createdAt: "April 18, 2026",
    tag: "Mobile",
    sourceFile: "app/markdown/1.md",
    includeBgmgenLink: true,
    lede:
      "Mobile users often want the same fast conversion workflow they get on desktop. The good news is that modern mobile browsers can handle YouTube to MP3 and MP4 conversion smoothly when the page is optimized for touch input, shorter loading paths, and clear download actions.",
    sections: [
      {
        type: "paragraphs",
        heading: "Why Mobile Conversion Matters",
        paragraphs: [
          "A mobile-friendly converter is useful when you find a song, podcast clip, lecture, or interview while commuting and want to save it for offline listening later.",
          "Instead of sending the link to a computer first, you can copy the public YouTube URL, open youtube2mp3.io in Safari or Chrome, and start the conversion directly from your phone.",
        ],
      },
      {
        type: "list",
        heading: "Best Workflow on iPhone and Android",
        intro:
          "The fastest mobile workflow is simple and avoids unnecessary switching between apps:",
        items: [
          "Copy the public YouTube link from the YouTube share menu.",
          "Paste the link into the converter field on youtube2mp3.io.",
          "Choose whether you want audio-first listening with MP3 or offline playback with MP4.",
          "Wait for the conversion status to finish, then save the file from the download action or backup converter window.",
        ],
      },
      {
        type: "list",
        heading: "Tips for Better Results on Mobile",
        intro: "Small adjustments improve reliability on phones and tablets:",
        items: [
          "Use direct video URLs instead of complex playlist links when you only need one file.",
          "Keep the browser tab active until the first conversion status appears.",
          "Use Wi-Fi for longer videos so uploads, downloads, and previews stay stable.",
          "Choose MP3 when storage space matters more than keeping the original visuals.",
        ],
      },
      {
        type: "faq",
        heading: "Mobile Questions",
        items: [
          {
            question: "Does this work in Safari on iPhone?",
            answer:
              "Yes. Public YouTube links can be pasted into the converter from Safari, and the resulting file can then be opened or saved using the available browser download flow.",
          },
          {
            question: "Is Android easier for saving files?",
            answer:
              "Android browsers often expose download management more directly, but both iPhone and Android can use the same core conversion workflow.",
          },
        ],
      },
    ],
  },
  {
    slug: "is-it-legal-to-download-youtube-videos-as-mp3",
    title: "Is It Legal to Download YouTube Videos as MP3 in 2026?",
    description:
      "A practical 2026 guide to the legal side of YouTube to MP3 conversion, including safer use cases and licensing checks.",
    coverImage: coverPool[1],
    imageAlt:
      "Illustration of a legal checklist, copyright symbol, and YouTube to MP3 download workflow for responsible personal use",
    imageLabel: "Legal Guide",
    createdAt: "April 9, 2026",
    tag: "Legal",
    sourceFile: "app/markdown/2.md",
    includeBgmgenLink: false,
    lede:
      "The technology behind converting a video into audio is neutral. What matters is whether you have permission to save and use the underlying content. That is why legal questions around YouTube to MP3 are usually about rights, licenses, and intended use rather than the converter itself.",
    sections: [
      {
        type: "paragraphs",
        heading: "What Usually Makes a Download Safer",
        paragraphs: [
          "The lowest-risk situations include public domain recordings, Creative Commons uploads, your own videos, and content where the uploader clearly allows downloading or reuse.",
          "The risk rises when a file contains copyrighted music, film, or premium content that was not published with download permission. In those cases, personal conversion may still conflict with platform terms or local copyright rules.",
        ],
      },
      {
        type: "list",
        heading: "How to Check Before You Convert",
        intro: "A quick review helps you stay on the safer side:",
        items: [
          "Read the video description for license or download notices.",
          "Check whether the creator links to a direct download or reuse policy.",
          "Prefer official libraries, Creative Commons channels, or your own uploads.",
          "Avoid redistributing, reselling, or reposting converted files.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Why People Still Use a Web Converter",
        paragraphs: [
          "For permitted personal content, a browser-based tool is often the most practical option because it avoids extra software installation and works across desktop and mobile devices.",
          "A cleaner interface also reduces the chance of clicking unrelated ads or fake download buttons, which is one reason users look for minimal, direct tools.",
        ],
      },
      {
        type: "faq",
        heading: "Common Legal Questions",
        items: [
          {
            question: "Can I convert my own uploaded video into MP3?",
            answer:
              "Yes. If the video is your own content and you control the rights, exporting it as audio for personal or production use is generally the clearest case.",
          },
          {
            question: "Is YouTube Premium the safest alternative?",
            answer:
              "For official offline playback inside the YouTube ecosystem, yes. Premium is the clearest platform-approved option when supported in your region and use case.",
          },
        ],
      },
    ],
  },
  {
    slug: "best-youtube-to-mp3-converter-2026",
    title: "Best YouTube to MP3 Converter in 2026: What Actually Matters",
    description:
      "Compare what really separates a strong YouTube to MP3 converter from a weak one, including speed, mobile support, and ad experience.",
    coverImage: coverPool[2],
    imageAlt:
      "Illustration comparing multiple YouTube to MP3 converter options with speed, quality, and mobile support indicators",
    imageLabel: "Converter Review",
    createdAt: "April 11, 2026",
    tag: "Review",
    sourceFile: "app/markdown/2 copy.md",
    includeBgmgenLink: true,
    lede:
      "Most converter comparisons focus on huge feature lists, but everyday users usually care about a narrower set of factors: how fast the tool responds, whether it works on mobile, how clean the page feels, and whether the output is consistently usable.",
    sections: [
      {
        type: "table",
        heading: "What to Compare First",
        intro:
          "A practical comparison should focus on the parts that affect your real workflow instead of marketing claims:",
        columns: ["Factor", "Why It Matters", "What Good Looks Like"],
        rows: [
          ["Speed", "Shorter wait time from paste to download", "Fast status response and simple download flow"],
          ["No registration", "Less friction and better privacy", "Immediate use without account creation"],
          ["Mobile support", "Useful on iPhone and Android", "Responsive page and clean download actions"],
          ["Ad experience", "Reduces confusion and misclicks", "Minimal distractions and obvious main CTA"],
        ],
      },
      {
        type: "list",
        heading: "Signs a Converter Is Worth Keeping",
        items: [
          "The main input field is easy to find on first load.",
          "The site handles standard YouTube links, shortened links, and Shorts links.",
          "Status messaging is readable and does not bury the actual download step.",
          "The interface stays usable on phones, tablets, and laptops.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Why Cleaner Tools Usually Win",
        paragraphs: [
          "A cleaner converter reduces user hesitation. Instead of searching through banners, popups, and duplicate buttons, you paste a URL and understand what will happen next.",
          "That clarity matters as much as raw processing speed, especially when users are trying to convert one track quickly and move on.",
        ],
      },
    ],
  },
  {
    slug: "free-youtube-to-mp3-mp4-downloader-no-registration",
    title: "Free YouTube to MP3 and MP4 Downloader With No Registration Required",
    description:
      "See why no-registration YouTube downloaders remain popular in 2026 and how to use them efficiently across devices.",
    coverImage: coverPool[3],
    imageAlt:
      "Illustration of a no registration YouTube downloader page offering MP3 and MP4 options without sign-up fields",
    imageLabel: "No Sign-Up",
    createdAt: "April 6, 2026",
    tag: "Guide",
    sourceFile: "app/markdown/2 copy 2.md",
    includeBgmgenLink: false,
    lede:
      "One of the biggest reasons people abandon online converters is friction. If a page asks you to sign in, confirm an email address, or install an extension before doing anything useful, the workflow stops feeling fast. A no-registration downloader removes that delay.",
    sections: [
      {
        type: "list",
        heading: "Why No-Registration Tools Stay Popular",
        items: [
          "They let users start from a copied link immediately.",
          "They work better for quick one-off tasks.",
          "They reduce the amount of personal information a user has to share.",
          "They feel closer to a utility than a gated service.",
        ],
      },
      {
        type: "paragraphs",
        heading: "MP3 and MP4 in One Workflow",
        paragraphs: [
          "A flexible downloader should not force users to choose a different site for audio and video. If you want music, podcast segments, or lectures for offline listening, MP3 makes sense. If you want the original visuals for presentations or reference clips, MP4 is the better fit.",
          "Keeping both formats in the same workflow also makes the site easier to understand. One copied link can serve both audio-first and video-first needs.",
        ],
      },
      {
        type: "list",
        heading: "Best Practices for Cleaner Downloads",
        items: [
          "Use a public YouTube link instead of a private or membership-only URL.",
          "Choose the simplest format that matches your need so you do not download more than necessary.",
          "Prefer desktop Wi-Fi or stable mobile data for longer videos.",
          "Keep file use personal and permission-based.",
        ],
      },
    ],
  },
  {
    slug: "download-youtube-playlist-as-mp3",
    title: "How to Download a YouTube Playlist as MP3 More Efficiently",
    description:
      "A playlist-focused guide to converting multiple YouTube tracks into MP3 with less manual repetition and better audio consistency.",
    coverImage: coverPool[4],
    imageAlt:
      "Illustration of a YouTube playlist being converted into multiple MP3 files with organized track order and audio icons",
    imageLabel: "Playlist Workflow",
    createdAt: "April 14, 2026",
    tag: "Playlist",
    sourceFile: "app/markdown/2 copy 3.md",
    includeBgmgenLink: true,
    lede:
      "Playlist conversion matters when you are working with study playlists, long-form music collections, language learning tracks, or archived sessions. The goal is not just speed; it is also consistency in quality, naming, and overall workflow.",
    sections: [
      {
        type: "paragraphs",
        heading: "Why Playlists Need a Different Approach",
        paragraphs: [
          "A single video conversion is simple, but playlists introduce more variables: total length, mixed content types, duplicate uploads, and occasional unavailable videos.",
          "That means a playlist workflow should be organized from the start. It helps to decide whether you need the full list or only selected items before processing begins.",
        ],
      },
      {
        type: "list",
        heading: "A Smarter Playlist Process",
        items: [
          "Open the playlist and copy its URL or copy selected video links from it.",
          "Start with the tracks you actually need first, especially for long playlists.",
          "Use MP3 when your goal is offline music or spoken audio rather than video playback.",
          "Break very large playlists into smaller groups if conversion time becomes inconsistent.",
        ],
      },
      {
        type: "paragraphs",
        heading: "How to Keep Audio Quality Consistent",
        paragraphs: [
          "Consistency matters more in a playlist than in a one-off track. Mixed source quality can make volume, clarity, and encoding feel uneven across downloaded files.",
          "When possible, choose uploads from the same official source or creator channel so the original audio baseline is closer from one item to the next.",
        ],
      },
      {
        type: "faq",
        heading: "Playlist Questions",
        items: [
          {
            question: "Should I always paste the full playlist URL?",
            answer:
              "Not always. For smaller or well-structured playlists it can be efficient, but for very large lists, processing selected videos in parts can be more predictable.",
          },
          {
            question: "Is MP4 better for playlists with lectures?",
            answer:
              "Only if the visuals matter. For spoken content where audio is enough, MP3 is usually smaller and easier to organize.",
          },
        ],
      },
    ],
  },
  {
    slug: "youtube-to-mp3-vs-mp4",
    title: "YouTube to MP3 vs MP4: Which Format Should You Choose?",
    description:
      "A clear MP3 versus MP4 guide for music, lectures, podcasts, offline watching, and storage-conscious devices.",
    coverImage: coverPool[5],
    imageAlt:
      "Comparison illustration showing MP3 audio files on one side and MP4 video files on the other for YouTube conversion choices",
    imageLabel: "MP3 vs MP4",
    createdAt: "April 3, 2026",
    tag: "Formats",
    sourceFile: "app/markdown/2 copy 4.md",
    includeBgmgenLink: false,
    lede:
      "Choosing the right format before you convert saves time, storage, and follow-up editing. MP3 and MP4 both start from the same YouTube link, but they solve different problems once the download is complete.",
    sections: [
      {
        type: "table",
        heading: "Quick Format Comparison",
        columns: ["Format", "Best For", "Main Advantage"],
        rows: [
          ["MP3", "Music, podcasts, interviews, language lessons", "Smaller files and easier offline listening"],
          ["MP4", "Tutorials, lectures, performances, visual demos", "Keeps both audio and video"],
        ],
      },
      {
        type: "list",
        heading: "Choose MP3 When",
        items: [
          "You only need the soundtrack, voice, or spoken lesson.",
          "You want smaller file sizes for phones or car playback.",
          "You plan to trim, edit, or organize files as audio-only content.",
        ],
      },
      {
        type: "list",
        heading: "Choose MP4 When",
        items: [
          "The visuals explain the content, such as tutorials or walkthroughs.",
          "You want to keep slides, captions, or on-screen examples.",
          "You are saving a reference clip for later review rather than just listening.",
        ],
      },
      {
        type: "paragraphs",
        heading: "A Practical Rule",
        paragraphs: [
          "If you are unsure, ask whether you will ever need to watch the file. If the answer is no, MP3 is usually the cleaner default. If the answer is yes, MP4 saves you from reconverting later.",
        ],
      },
    ],
  },
  {
    slug: "how-to-trim-mp3-from-youtube-videos",
    title: "How to Trim an MP3 From a YouTube Video After Conversion",
    description:
      "Convert first, then trim cleanly. This guide explains the easiest way to cut a shorter MP3 clip from a YouTube source.",
    coverImage: coverPool[6],
    imageAlt:
      "Illustration of an audio waveform being trimmed after converting a YouTube video into an MP3 file",
    imageLabel: "Trim Audio",
    createdAt: "April 16, 2026",
    tag: "Editing",
    sourceFile: "app/markdown/2 copy 5.md",
    includeBgmgenLink: true,
    lede:
      "A lot of users do not need the entire source video as audio. They want the chorus of a song, a podcast quote, a lecture segment, or a short sound clip for personal reference. The easiest workflow is usually convert first, trim second.",
    sections: [
      {
        type: "list",
        heading: "Recommended Workflow",
        items: [
          "Convert the full public YouTube video to MP3 first.",
          "Open the resulting file in a basic audio editor or mobile trimming tool.",
          "Cut the beginning and end until only the section you need remains.",
          "Export the trimmed version under a clear name so it is easy to find later.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Why Full Conversion First Usually Works Better",
        paragraphs: [
          "Converting the entire file first gives you a stable source audio file. That means you can trim multiple versions later without repeating the download process.",
          "It is also easier to test where a clip should start and end when you already have the full waveform in front of you.",
        ],
      },
      {
        type: "list",
        heading: "Simple Editing Tools That Work Well",
        items: [
          "Audacity for desktop users who want precise trimming.",
          "Built-in mobile media editors for simple start and end cuts.",
          "Basic online trimmers when you only need a quick clip and no advanced editing.",
        ],
      },
    ],
  },
  {
    slug: "safe-and-legal-ways-to-get-mp3-music-from-youtube",
    title: "Safe and Legal Ways to Get MP3 Music From YouTube",
    description:
      "A practical guide to safer personal-use downloading, official alternatives, and better habits for offline music management.",
    coverImage: coverPool[7],
    imageAlt:
      "Illustration showing safe YouTube music download habits with shield icons, music notes, and legal permission markers",
    imageLabel: "Safe Use",
    createdAt: "April 8, 2026",
    tag: "Safety",
    sourceFile: "app/markdown/2 copy 6.md",
    includeBgmgenLink: false,
    lede:
      "Safety is not only about copyright. It is also about avoiding misleading ads, fake download buttons, suspicious redirects, and poor handling of your time or attention. A safer download workflow combines responsible content choices with a cleaner tool experience.",
    sections: [
      {
        type: "list",
        heading: "Safer Ways to Approach Offline Music",
        items: [
          "Use converters only for permitted personal content.",
          "Check whether the creator has provided permission or a separate download source.",
          "Look at official YouTube audio libraries and Creative Commons uploads.",
          "Use YouTube Premium when you want an officially supported offline option.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Why Interface Quality Matters for Safety",
        paragraphs: [
          "A cluttered download site increases the chance of accidental clicks and unnecessary redirects. Cleaner pages reduce confusion and help users focus on the main action.",
          "That is especially important for people converting audio on mobile devices, where screen space is limited and misleading elements are harder to distinguish.",
        ],
      },
      {
        type: "faq",
        heading: "Safer Download Questions",
        items: [
          {
            question: "Is a minimal-ad environment actually helpful?",
            answer:
              "Yes. Cleaner layouts reduce misclicks and lower the chance of sending users into unrelated pages while they are trying to finish one simple task.",
          },
          {
            question: "Should I keep downloaded files forever?",
            answer:
              "That depends on your rights to the material. For permitted personal use, organization is fine, but redistribution or commercial reuse should be avoided without explicit authorization.",
          },
        ],
      },
    ],
  },
  {
    slug: "mp3-streaming-vs-downloading",
    title: "MP3 Streaming vs Downloading: What Is Better for You in 2026?",
    description:
      "Compare offline MP3 downloading with streaming for travel, data savings, convenience, and personal media libraries.",
    coverImage: coverPool[8],
    imageAlt:
      "Illustration comparing streaming audio in the cloud versus downloaded MP3 files saved on a phone for offline playback",
    imageLabel: "Stream vs Download",
    createdAt: "April 12, 2026",
    tag: "Comparison",
    sourceFile: "app/markdown/2 copy 7.md",
    includeBgmgenLink: true,
    lede:
      "Streaming is perfect when your connection is stable and you do not want to manage files. Downloading wins when you care about offline access, repeated listening, and predictable playback in weak-signal environments.",
    sections: [
      {
        type: "table",
        heading: "Streaming and Downloading Compared",
        columns: ["Approach", "Best Use Case", "Tradeoff"],
        rows: [
          ["Streaming", "Quick access on a strong connection", "Needs data and can buffer"],
          ["Downloading", "Travel, archives, repeated listening", "Uses local storage"],
        ],
      },
      {
        type: "list",
        heading: "When Downloading Makes More Sense",
        items: [
          "Flights, trains, and long commutes with unreliable signal.",
          "Language learning and study sessions where you replay the same audio often.",
          "Personal archives you want available without reopening multiple apps.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Why the Choice Is Usually Situational",
        paragraphs: [
          "Most users do not need to choose one approach forever. Streaming is great for discovery, while downloading is stronger for repeat access to known content.",
          "That is why lightweight conversion tools remain useful even in a streaming-first world: they solve the offline case cleanly.",
        ],
      },
    ],
  },
  {
    slug: "best-free-online-youtube-to-mp3-converters-comparison",
    title: "Best Free Online YouTube to MP3 Converters Comparison for 2026",
    description:
      "A practical comparison of free online YouTube to MP3 converters, including speed, usability, mobile support, and output consistency.",
    coverImage: coverPool[9],
    imageAlt:
      "Illustration of multiple online YouTube to MP3 converter cards being compared by speed, cleanliness, and mobile compatibility",
    imageLabel: "Free Tools",
    createdAt: "April 5, 2026",
    tag: "Tools",
    sourceFile: "app/markdown/2 copy 8.md",
    includeBgmgenLink: false,
    lede:
      "The free converter market changes constantly. Some tools disappear, others become overloaded with ads, and a few stay useful because they focus on speed, clarity, and basic reliability instead of unnecessary complexity.",
    sections: [
      {
        type: "list",
        heading: "What a Free Converter Needs to Get Right",
        items: [
          "A clear first action with the input field above the fold.",
          "Consistent handling of standard YouTube URLs and shortened links.",
          "Reasonable loading speed on desktop and mobile.",
          "A download experience that does not feel buried under unrelated UI.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Where Many Free Tools Fall Short",
        paragraphs: [
          "A common problem is clutter. Pages become harder to trust when the main conversion flow is mixed with repeated download buttons, popups, or unclear redirects.",
          "Another issue is uneven mobile support. A converter may work technically, but still feel frustrating on phones if form elements, status panels, and download actions are poorly arranged.",
        ],
      },
      {
        type: "table",
        heading: "Good Comparison Criteria",
        columns: ["Criterion", "Why It Matters", "How to Judge It"],
        rows: [
          ["Usability", "Determines whether the tool feels fast", "Count how many steps it takes to convert one link"],
          ["Reliability", "Reduces retries and wasted time", "Test multiple public links and device types"],
          ["Output consistency", "Affects repeat use", "Check whether files remain usable across several conversions"],
          ["Mobile readiness", "Critical for casual users", "Try the full flow on iPhone or Android"],
        ],
      },
    ],
  },
  {
    slug: "bluesky-buffer-and-social-sharing-for-download-guides",
    title: "Where to Share Download Guides in 2026: From Bluesky to Buffer",
    description:
      "A modern distribution guide for sharing conversion tutorials and offline listening workflows across newer social platforms.",
    coverImage: coverPool[2],
    imageAlt:
      "Illustration of social sharing buttons for Bluesky, Buffer, VK, and other modern platforms promoting a download guide article",
    imageLabel: "Distribution",
    createdAt: "April 20, 2026",
    tag: "Sharing",
    sourceFile: "app/markdown/2 copy 9.md",
    includeBgmgenLink: true,
    lede:
      "Publishing a converter guide is only half the job. Distribution matters too. In 2026, audiences are spread across older social networks, newer text platforms, bookmarking services, and publishing tools. A useful guide should be easy to share across all of them.",
    sections: [
      {
        type: "list",
        heading: "Why Multi-Platform Sharing Helps",
        items: [
          "Different audiences discover tutorial content in different places.",
          "Some users prefer real-time social feeds, while others save posts to read later.",
          "A broader sharing panel makes utility content easier to distribute without rebuilding the same link logic repeatedly.",
        ],
      },
      {
        type: "paragraphs",
        heading: "Which Platforms Fit Utility Content Best",
        paragraphs: [
          "Text-first networks like X or Bluesky work well for short tips and quick tutorials. Messaging-oriented options such as Telegram or WhatsApp are useful for direct sharing between friends or teams.",
          "Bookmarking or queueing tools like Buffer and Instapaper fit users who plan content distribution or save guides for later reading.",
        ],
      },
      {
        type: "list",
        heading: "What Makes a Good Sharing UI",
        items: [
          "It should expose the most-used options immediately.",
          "It should provide a larger sheet for secondary platforms without overwhelming the main page.",
          "Brand colors and recognizable icons help users scan faster.",
          "Copy-link and native share options should always remain available as fallbacks.",
        ],
      },
    ],
  },
];

export const blogPostMap = new Map(blogPosts.map((post) => [post.slug, post]));
