import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/data/routes";
import { blogPosts } from "@/data/blog";
import { getCaseStudies } from "@/lib/db";

const SITE_URL = "https://rocket4rpo.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = sitemapRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.priority && route.priority >= 0.8 ? "weekly" : "monthly",
    priority: route.priority ?? 0.5,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudies = await getCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/cas-clients/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
