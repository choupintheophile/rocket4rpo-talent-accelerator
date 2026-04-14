// Segment detection from URL params and referrer
export type VisitorSegment = "tech" | "drh" | "ceo" | "default";

export function detectSegment(
  searchParams: Record<string, string | undefined>,
  referer?: string
): VisitorSegment {
  // Check UTM params first
  const utmContent = searchParams.utm_content || "";
  const utmCampaign = searchParams.utm_campaign || "";

  if (
    utmContent.includes("tech") ||
    utmCampaign.includes("tech") ||
    utmCampaign.includes("it")
  )
    return "tech";
  if (utmContent.includes("drh") || utmCampaign.includes("rh")) return "drh";
  if (utmContent.includes("ceo") || utmCampaign.includes("dirigeant"))
    return "ceo";

  // Check referrer
  if (referer?.includes("linkedin")) return "drh";
  if (referer?.includes("google") && utmContent.includes("rpo")) return "drh";

  return "default";
}

export interface HeroContent {
  badge: string;
  headline: string;
  highlightedText: string;
  subtitle: string;
}

export const heroContent: Record<VisitorSegment, HeroContent> = {
  tech: {
    badge: "RPO — Recrutement externalisé sur-mesure",
    headline: "Vos postes Tech restent ouverts trop longtemps\ ?",
    highlightedText: "Première shortlist en 48h",
    subtitle:
      "Nos TA parlent votre stack. Sourcing GitHub, communautés tech, approche directe. Une équipe cumulant 200+ recrutements, 92\ % de rétention à 12 mois.",
  },
  drh: {
    badge: "RPO — Recrutement externalisé sur-mesure",
    headline: "Vos KPIs recrutement méritent mieux qu\’un tableur",
    highlightedText: "Reporting hebdomadaire inclus",
    subtitle:
      "Process structuré, scorecards, dashboards. Une équipe cumulant 200+ recrutements avec une méthodologie éprouvée. Diagnostic gratuit en 30 min.",
  },
  ceo: {
    badge: "Jusqu\’à 5x moins cher qu\’un cabinet. 2x plus rapide.",
    headline: "Arrêtez de brûler du cash en frais de recrutement",
    highlightedText: "~44\ 000€ pour 10 recrutements",
    subtitle:
      "vs 120\ 000 à 200\ 000€ avec un cabinet. Budget prévisible, résultats en 1 semaine, zéro engagement long terme.",
  },
  default: {
    badge: "RPO — Recrutement externalisé sur-mesure",
    headline: "Vos recrutements freinent votre ",
    highlightedText: "croissance\ ?",
    subtitle:
      "Rocket4RPO intègre des Talent Acquisition Specialists seniors directement dans vos équipes. Résultat\ : des recrutements plus rapides, des profils mieux qualifiés, et un coût maîtrisé.",
  },
};
