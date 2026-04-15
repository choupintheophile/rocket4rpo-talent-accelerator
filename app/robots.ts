import type { MetadataRoute } from "next";

/**
 * v22.3 — robots.txt optimisé pour SEO + AEO.
 *
 * - Autorise explicitement les bots LLM (GPTBot, ClaudeBot, Perplexity, etc.)
 *   pour que le contenu soit cité dans les réponses ChatGPT/Claude/Perplexity.
 * - Bloque /api/ et /webapp-testing/ (endpoints internes).
 * - Bloque /cv/ (contenu privé candidats).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/webapp-testing/", "/cv/"],
      },
      // Bots LLM : autorisés explicitement (AEO)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: [
      "https://rocket4rpo.com/sitemap.xml",
      "https://rocket4rpo.com/image-sitemap.xml",
    ],
    host: "https://rocket4rpo.com",
  };
}
