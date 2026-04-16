import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { getBlogPosts } from "@/lib/db";
import { isAutoGenThin } from "@/lib/blog-canonicals";

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
 *   - 19 pages statiques (core business)
 *   - Tous les articles éditoriaux (pas p2-*, extra-*, -N)
 *   - Exclut le thin content pour ne pas polluer le signal
 *
 * Appelable via Vercel Cron (lundis 9h17) ou manuellement.
 */
export async function GET() {
  try {
    // ── Pages statiques prioritaires ──
    const coreUrls = [
      "https://rocket4rpo.com/",
      "https://rocket4rpo.com/offre",
      "https://rocket4rpo.com/calculateur",
      "https://rocket4rpo.com/assessment",
      "https://rocket4rpo.com/qu-est-ce-que-le-rpo",
      "https://rocket4rpo.com/combien-coute-un-rpo",
      "https://rocket4rpo.com/rpo-vs-cabinet",
      "https://rocket4rpo.com/rpo-vs-interim",
      "https://rocket4rpo.com/rpo-vs-recrutement-interne",
      "https://rocket4rpo.com/comparateur",
      "https://rocket4rpo.com/simulateurs",
      "https://rocket4rpo.com/ressources",
      "https://rocket4rpo.com/blog",
      "https://rocket4rpo.com/a-propos",
      "https://rocket4rpo.com/glossaire-rpo",
      "https://rocket4rpo.com/contact",
      "https://rocket4rpo.com/recrutement",
      "https://rocket4rpo.com/demo",
      "https://rocket4rpo.com/rdv",
    ];

    // ── Articles éditoriaux (exclut thin content) ──
    let editorialUrls: string[] = [];
    try {
      const posts = await getBlogPosts();
      editorialUrls = posts
        .filter((post) => {
          const plain = stripHtml(post.content || "");
          return !isAutoGenThin(post.slug, plain);
        })
        .map((post) => `https://rocket4rpo.com/blog/${post.slug}`);
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
