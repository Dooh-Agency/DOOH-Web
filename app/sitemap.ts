import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = blogPosts.map((post) => post.publishedAt).sort().at(-1);

  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: latestPost, changeFrequency: "monthly", priority: 0.8 },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${encodeURIComponent(post.slug)}`,
      lastModified: post.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
