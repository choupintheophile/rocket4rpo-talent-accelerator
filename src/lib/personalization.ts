// Segment detection from URL params and referrer
export type VisitorSegment = "sales" | "tech" | "drh" | "ceo" | "default";

export function detectSegment(
  searchParams: Record<string, string | undefined>,
  referer?: string
): VisitorSegment {
  // Check UTM params first
  const utmContent = searchParams.utm_content || "";
  const utmCampaign = searchParams.utm_campaign || "";

  if (utmContent.includes("sales") || utmCampaign.includes("sales"))
    return "sales";
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
  sales: {
    badge: "Le seul RPO spécialisé Sales SaaS en France",
    headline: "Vos postes Sales SaaS restent ouverts trop longtemps ?",
    highlightedText: "Première shortlist en 48h",
    subtitle:
      "40 000 profils Sales pré-qualifiés. Un TA Specialist senior intégré à votre équipe. 92% de rétention à 12 mois.",
  },
  tech: {
    badge: "RPO spécialisé recrutement Tech & IT",
    headline: "Votre prochain dev senior signe dans 6 semaines",
    highlightedText: "pas dans 6 mois",
    subtitle:
      "Nos TA parlent votre stack. Sourcing GitHub, communautés tech, approche directe. 100% de rétention sur nos placements IT.",
  },
  drh: {
    badge: "Le RPO qui donne des résultats mesurables",
    headline: "Vos KPIs recrutement méritent mieux qu'un tableur",
    highlightedText: "Reporting hebdomadaire inclus",
    subtitle:
      "Process structuré, scorecards, dashboards. 200+ recrutements réalisés avec une méthodologie éprouvée. Diagnostic gratuit en 30 min.",
  },
  ceo: {
    badge: "3x moins cher qu'un cabinet. 2x plus rapide.",
    headline: "Arrêtez de brûler du cash en frais de recrutement",
    highlightedText: "~44 000€ pour 10 recrutements",
    subtitle:
      "vs 60 000 à 200 000€ avec un cabinet. Budget prévisible, résultats en 48h, zéro engagement long terme.",
  },
  default: {
    badge: "Le seul RPO spécialisé Sales SaaS en France",
    headline: "Vos postes Sales SaaS restent ouverts trop longtemps ?",
    highlightedText: "Première shortlist en 48h",
    subtitle:
      "Rocket4RPO intègre un Talent Acquisition Specialist senior dans votre équipe, armé d'une base de 40 000 profils Sales pré-qualifiés. Résultat : un time-to-hire divisé par 2 et un coût 3x inférieur aux cabinets.",
  },
};
