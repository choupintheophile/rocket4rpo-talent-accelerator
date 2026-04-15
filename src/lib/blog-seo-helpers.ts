/**
 * Helpers SEO pour les articles de blog :
 * - Extraction FAQ automatique depuis le HTML (H2/H3 en forme de question)
 * - Trouver des articles similaires (topic cluster)
 * - Générer les breadcrumbs
 */

export interface FAQEntry {
  question: string;
  answer: string;
}

/**
 * Extrait les paires Q/A depuis un content HTML de blog.
 * Détecte les H2/H3 qui se terminent par "?" + leur paragraphe suivant.
 * Retourne jusqu'à 8 FAQs (cap recommandé par Google).
 *
 * Pour que Google affiche la rich snippet FAQPage :
 * - Au moins 2 Q/A
 * - Les réponses doivent avoir du contenu (≥20 caractères)
 * - Les questions se terminent par "?"
 */
export function extractFAQs(html: string): FAQEntry[] {
  const faqs: FAQEntry[] = [];

  // Match H2/H3 contenant "?" suivi de contenu jusqu'au prochain H2/H3
  // Pattern : <h[23][^>]*>Question ?</h[23]> (content until next h[23])
  const sectionRe = /<h([23])[^>]*>([^<]*\?[^<]*)<\/h\1>([\s\S]*?)(?=<h[23]|$)/gi;
  let m: RegExpExecArray | null;

  while ((m = sectionRe.exec(html)) !== null) {
    const question = m[2].trim();
    if (!question.endsWith("?") || question.length < 8 || question.length > 200) continue;

    // Strip HTML dans la réponse + tronque à ~300 caractères
    const rawAnswer = m[3].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (rawAnswer.length < 20) continue;

    const answer = rawAnswer.length > 500 ? rawAnswer.slice(0, 497) + "..." : rawAnswer;

    faqs.push({ question, answer });
    if (faqs.length >= 8) break;
  }

  return faqs;
}

/**
 * Génère le schema.org FAQPage pour un article.
 * Retourne null si moins de 2 FAQs (pas éligible rich snippet).
 */
export function faqPageSchema(faqs: FAQEntry[]): object | null {
  if (faqs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * Génère le schema.org BreadcrumbList pour un article.
 */
export function breadcrumbSchemaForBlog(
  siteUrl: string,
  articleTitle: string,
  articleSlug: string,
  category?: string,
): object {
  const items: { "@type": string; position: number; name: string; item: string }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: `${siteUrl}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${siteUrl}/blog`,
    },
  ];

  if (category) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: category,
      item: `${siteUrl}/blog?category=${encodeURIComponent(category)}`,
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: articleTitle,
    item: `${siteUrl}/blog/${articleSlug}`,
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Trouve les articles similaires parmi un pool.
 * Matching par catégorie + mots-clés dans le slug (Jaccard simple).
 * Retourne jusqu'à N articles (défaut : 4).
 */
export function findRelatedArticles<T extends { slug: string; title: string; category: string }>(
  currentSlug: string,
  currentCategory: string,
  pool: T[],
  limit = 4,
): T[] {
  const currentTokens = new Set(
    currentSlug
      .toLowerCase()
      .split("-")
      .filter((t) => t.length >= 4),
  );

  const scored = pool
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      // Score : +3 si même catégorie, +1 par token slug partagé
      let score = p.category === currentCategory ? 3 : 0;
      const tokens = p.slug.toLowerCase().split("-").filter((t) => t.length >= 4);
      for (const t of tokens) {
        if (currentTokens.has(t)) score++;
      }
      return { article: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.article);
}
