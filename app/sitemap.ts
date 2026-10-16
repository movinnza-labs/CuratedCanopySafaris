import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blog";
import { destinations } from "@/lib/data/destinations";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/safari-packages"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/team"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/blogs"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/refund-cancellation-policy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms-and-conditions"), changeFrequency: "yearly", priority: 0.3 },
  ];
  const staticPages = staticEntries.map((entry) => ({ ...entry, lastModified: now }));

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const schedulePages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}/schedule`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...destinationPages, ...schedulePages, ...posts];
}
