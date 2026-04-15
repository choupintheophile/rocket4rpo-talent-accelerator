import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/db";

/**
 * v22.3 — Image Sitemap Google (https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
 *
 * Permet à Google Images d'indexer correctement les visuels des articles
 * de blog. Exposé sur /image-sitemap.xml (référencé dans robots.ts via
 * sitemap: ... mais c'est Google Search Console qui doit l'ingérer).
 */

const SITE_URL = "https://rocket4rpo.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const revalidate = 3600;

export async function GET() {
  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    posts = await getBlogPosts();
  } catch {
    return new NextResponse("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\"/>", {
      headers: { "Content-Type": "application/xml" },
    });
  }

  const items = posts
    .filter((p) => !!p.imageUrl)
    .map((p) => {
      const loc = `${SITE_URL}/blog/${p.slug}`;
      const imageUrl = p.imageUrl!.startsWith("http")
        ? p.imageUrl!
        : `${SITE_URL}${p.imageUrl}`;
      const caption = escapeXml(p.excerpt?.slice(0, 160) || p.title);
      const title = escapeXml(p.title);
      return `
  <url>
    <loc>${loc}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${caption}</image:caption>
    </image:image>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${items}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
