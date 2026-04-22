import type { MetadataRoute } from "next";
import { ensureSeedVideoRecords, getSeoVideoSitemapEntries } from "@/lib/seo-videos";
import { blogPosts } from "./blog/posts";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://youtube2mp3.io").replace(/\/$/, "");

const staticRoutes = [
  {
    path: "",
    changeFrequency: "daily" as const,
    priority: 1,
  },
  {
    path: "/blog",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  {
    path: "/popular-downloads",
    changeFrequency: "daily" as const,
    priority: 0.85,
  },
  {
    path: "/blog/how-to-convert-youtube",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/blog/how-it-works",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  {
    path: "/copyright",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    path: "/privacy-policy",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
  {
    path: "/terms-of-service",
    changeFrequency: "monthly" as const,
    priority: 0.5,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await ensureSeedVideoRecords();

  const now = new Date();
  const blogRoutes = blogPosts.map((post) => {
    const parsedDate = new Date(post.createdAt);

    return {
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsedDate.getTime()) ? now : parsedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });
  const seoVideoRoutes = await getSeoVideoSitemapEntries();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...blogRoutes,
    ...seoVideoRoutes,
  ];
}
