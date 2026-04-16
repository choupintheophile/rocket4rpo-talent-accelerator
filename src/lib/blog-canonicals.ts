/**
 * Blog Canonicalization Map
 *
 * Maps "thin duplicate" blog slugs (articles that cannibalize pillar pages)
 * to their corresponding pillar URL. Returning a non-null canonical URL from
 * `getCanonicalForSlug` signals two things to the Next.js metadata layer:
 *   1. The canonical tag should point to the pillar page, not /blog/{slug}
 *   2. The article should be excluded from the sitemap
 *
 * Rules are evaluated top-to-bottom; the first match wins.
 * Each rule is a substring / pattern match against the slug.
 */

interface CanonicalRule {
  match: (slug: string) => boolean;
  canonicalPath: string;
}

const SITE_URL = "https://rocket4rpo.com";

const rules: CanonicalRule[] = [
  // Comparatifs — pages pilier
  {
    match: (s) => s.includes("rpo-vs-cabinet"),
    canonicalPath: "/rpo-vs-cabinet",
  },
  {
    match: (s) => s.includes("rpo-vs-interim"),
    canonicalPath: "/rpo-vs-interim",
  },
  {
    match: (s) => s.includes("rpo-vs-recrutement"),
    canonicalPath: "/rpo-vs-recrutement-interne",
  },
  // Coût / prix / tarif RPO → page pilier calculateur coût
  {
    match: (s) =>
      s.includes("cout-rpo") ||
      s.includes("prix-rpo") ||
      s.includes("tarif-rpo"),
    canonicalPath: "/combien-coute-un-rpo",
  },
  // Définition RPO → page pilier "qu'est-ce que le RPO"
  {
    match: (s) =>
      s.includes("rpo-definition") || s.includes("qu-est-ce-que-rpo"),
    canonicalPath: "/qu-est-ce-que-le-rpo",
  },
  // Avantages RPO → page offre
  {
    match: (s) =>
      s.includes("rpo-avantages") || s.includes("avantages-rpo"),
    canonicalPath: "/offre",
  },
  // Choix d'un prestataire RPO → page offre
  {
    match: (s) =>
      s.includes("choisir-rpo") || s.includes("prestataire-rpo"),
    canonicalPath: "/offre",
  },
  // Calculateur / simulateur RPO → page calculateur
  {
    match: (s) =>
      s.includes("calculateur-rpo") || s.includes("simulateur-rpo"),
    canonicalPath: "/calculateur",
  },
  // ROI RPO → page calculateur
  {
    match: (s) => s.includes("roi-rpo"),
    canonicalPath: "/calculateur",
  },
  // Diagnostic recrutement / assessment RPO → page assessment
  {
    match: (s) =>
      s.includes("diagnostic-recrutement") || s.includes("assessment-rpo"),
    canonicalPath: "/assessment",
  },
];

/**
 * Returns an absolute canonical URL (pillar page) if the slug matches a rule,
 * otherwise `null` — meaning the article keeps its own /blog/{slug} canonical.
 */
export function getCanonicalForSlug(slug: string): string | null {
  const normalized = slug.toLowerCase();
  for (const rule of rules) {
    if (rule.match(normalized)) {
      return `${SITE_URL}${rule.canonicalPath}`;
    }
  }
  return null;
}

/**
 * v23 — Détection du contenu auto-généré / thin.
 *
 * CONTEXTE CRITIQUE (GSC 10/04/2026) :
 *   - 726 URLs en sitemap → seulement 5 indexées (0.7%)
 *   - 37 pages "Crawled, not indexed" = Google a rejeté les p2-/extra-
 *   - 43 pages "Detected, not indexed" incluant des pages core (/offre, /assessment)
 *
 * STRATÉGIE v23 :
 *   Pour un site neuf sans autorité de domaine, MOINS = MIEUX.
 *   On noindex les articles auto-générés (p2-*, extra-*, slugs avec suffixe numérique)
 *   pour que Google concentre son crawl budget sur les ~50 pages de qualité.
 *
 *   C'est un RETOUR EN ARRIÈRE volontaire par rapport à v22 qui avait tout débloqué.
 *   v22 partait du principe que "plus = mieux" mais les données GSC prouvent le contraire.
 *
 * Critères :
 *   1. Slugs p2-* ou extra-* (lots auto-générés)
 *   2. Slugs avec suffixe numérique -N (ex: article-123) = généré par seed
 *   3. Contenu < 300 mots = stub
 */
export function isAutoGenThin(slug: string, plainText: string): boolean {
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  // Stubs vrais (<300 mots)
  if (wordCount < 300) return true;

  // Auto-gen batch : p2-* ou extra-*
  if (/^(p2|extra)-/.test(slug)) return true;

  // Seed batch : slug se termine par -N (nombre)
  if (/^.+-\d{1,4}$/.test(slug)) return true;

  return false;
}
