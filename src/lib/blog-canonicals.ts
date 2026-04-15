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
 * v22 — Detects VERY thin content only (editorial threshold).
 * Previously flagged by slug patterns `p2-*` or `*-N` (seed batches), but
 * these are false positives : the slug pattern alone doesn't indicate
 * low quality. Seed articles with 500+ words are perfectly indexable.
 *
 * Rules (kept minimal to maximize indexable content while protecting
 * against cannibalization) :
 *   - Word count of plainText < 300 words → noindex (truly empty / stub)
 *
 * Slug patterns (`p2-*`, `*-N`) are NO LONGER auto-flagged as thin.
 * Canonical-override articles are also now indexable (canonical tag
 * alone handles cannibalization per Google's own guidelines).
 */
export function isAutoGenThin(slug: string, plainText: string): boolean {
  void slug; // kept for API compat; no longer used
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  // Seuil assoupli de 600 → 300. Articles <300 mots = probablement stubs.
  if (wordCount < 300) return true;
  return false;
}
