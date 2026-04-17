import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { getBlogPosts } from "@/lib/db";
import { isAutoGenThin } from "@/lib/blog-canonicals";
import { sitemapRoutes } from "@/data/routes";

const SITE_URL = "https://rocket4rpo.com";

/**
 * POST /api/indexnow
 *
 * Body : { urls: string[] } — liste d'URLs absolues à soumettre à IndexNow
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const urls: unknown = body?.urls;

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: "body.urls (string[]) requis" },
        { status: 400 },
      );
    }

    const urlStrings = urls.filter((u): u is string => typeof u === "string");
    const result = await submitToIndexNow(urlStrings);

    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
    });
  } catch (e) {
    console.error("IndexNow route error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * GET /api/indexnow — v23 : soumet TOUTES les pages qui méritent d'être indexées.
 *
 * Stratégie :
 *   - Pages statiques = sitemapRoutes (single source of truth)
 *   - Articles éditoriaux (pas p2-*, extra-*, -N, <300 mots)
 *
 * Appelable via Vercel Cron (lundis 9h17) ou manuellement.
 */
export async function GET() {
  try {
    // ── Pages statiques prioritaires ──
    // v23.4 — Single source of truth : sitemapRoutes (évite la dérive manuelle).
    const coreUrls = sitemapRoutes.map((r) => `${SITE_URL}${r.path}`);

    // ── Articles éditoriaux (exclut thin content) ──
    let editorialUrls: string[] = [];
    try {
      const posts = await getBlogPosts();
      editorialUrls = posts
        .filter((post) => {
          const plain = stripHtml(post.content || "");
          return !isAutoGenThin(post.slug, plain);
        })
        .map((post) => `${SITE_URL}/blog/${post.slug}`);
    } catch {
      // DB indisponible — on soumet quand même les pages statiques
    }

    const allUrls = [...coreUrls, ...editorialUrls];
    const result = await submitToIndexNow(allUrls);

    return NextResponse.json({
      ok: result.ok,
      submitted: result.submitted,
      corePages: coreUrls.length,
      editorialArticles: editorialUrls.length,
      total: allUrls.length,
      status: result.status,
      message: result.ok
        ? `${allUrls.length} URLs de qualité soumises (${coreUrls.length} core + ${editorialUrls.length} articles)`
        : `Erreur : ${result.error || result.status}`,
    });
  } catch (e) {
    console.error("IndexNow GET error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
