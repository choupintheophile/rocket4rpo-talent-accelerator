import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/data/routes";
import { getBlogPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.rocket4rpo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = sitemapRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.priority && route.priority >= 0.8 ? "weekly" : "monthly",
    priority: route.priority ?? 0.5,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    const { blogPosts } = await import("@/data/blog");
    blogRoutes = blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...blogRoutes];
}
