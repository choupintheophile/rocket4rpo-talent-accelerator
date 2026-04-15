import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

/**
 * POST /api/indexnow
 *
 * Body : { urls: string[] } — liste d'URLs absolues à soumettre à IndexNow
 *
 * Usage : appeler depuis un webhook de publication / cron / admin UI.
 * Pas d'authentification stricte (IndexNow filtre les URLs hors domaine).
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

/**
 * GET /api/indexnow — ping automatique de toutes les pages importantes
 * (sitemap + 10 derniers articles). Appelable via curl ou Vercel Cron.
 */
export async function GET() {
  try {
    // Liste des pages clés à pinger (pages piliers + homepage)
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
      "https://rocket4rpo.com/ressources",
      "https://rocket4rpo.com/blog",
      "https://rocket4rpo.com/a-propos",
      "https://rocket4rpo.com/rdv",
      "https://rocket4rpo.com/glossaire-rpo",
    ];

    const result = await submitToIndexNow(coreUrls);
    return NextResponse.json({
      ok: result.ok,
      submitted: result.submitted,
      status: result.status,
      message: result.ok
        ? "Pages clés soumises à IndexNow"
        : `Erreur : ${result.error || result.status}`,
    });
  } catch (e) {
    console.error("IndexNow GET error:", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
