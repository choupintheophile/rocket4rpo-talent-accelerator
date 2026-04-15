import type { MetadataRoute } from "next";
import { sitemapRoutes } from "@/data/routes";
import { getBlogPosts } from "@/lib/db";
import { getCanonicalForSlug, isAutoGenThin } from "@/lib/blog-canonicals";

// Revalidate hourly instead of forcing a dynamic build on every request.
// The blog DB is relatively stable; hourly regeneration is plenty fresh.
export const revalidate = 3600;

const SITE_URL = "https://rocket4rpo.com";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = sitemapRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency:
      route.priority && route.priority >= 0.8 ? "weekly" : "monthly",
    priority: route.priority ?? 0.5,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogRoutes = posts
      .filter((post) => {
        // v22 — Inclut tous les articles SAUF les vrais stubs (<300 mots).
        // Les articles avec canonical override RESTENT dans le sitemap :
        // Google les découvre, voit le canonical tag et priorise la page pilier.
        // Ça évite les "Detected but not indexed" de Google Search Console.
        const plainText = stripHtml(post.content || "");
        if (isAutoGenThin(post.slug, plainText)) return false;
        return true;
      })
      .map((post) => {
        const hasCanonical = !!getCanonicalForSlug(post.slug);
        return {
          url: `${SITE_URL}/blog/${post.slug}`,
          lastModified: post.updatedAt || post.date,
          changeFrequency: "monthly" as const,
          // Priorité réduite pour canonical-override (la page pilier est
          // la cible principale, l'article blog est secondaire)
          priority: hasCanonical ? 0.3 : 0.6,
        };
      });
  } catch {
    // Fallback to static blog list if the DB is unreachable at build time.
    const { blogPosts } = await import("@/data/blog");
    blogRoutes = blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: getCanonicalForSlug(post.slug) ? 0.3 : 0.6,
    }));
  }

  return [...staticRoutes, ...blogRoutes];
}
