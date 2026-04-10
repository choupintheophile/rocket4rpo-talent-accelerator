import type { Metadata } from "next";
import OffreClient from "./OffreClient";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Notre offre — Recruteur externalisé intégré à votre équipe",
  description:
    "Rocket4RPO intègre un Talent Acquisition Specialist senior dans votre équipe pour recruter à votre place. De 1 à 5 jours par semaine, première shortlist en 48h, à partir de 550€/jour.",
  alternates: { canonical: "/offre" },
};

export default function Page() {
  const schemas = [
    serviceSchema(
      "RPO — Recruteur externalisé intégré à votre équipe",
      "Intégrez un Talent Acquisition senior dans vos équipes de 1 à 5 jours par semaine. Première shortlist en 48h, engagement flexible.",
      "/offre"
    ),
    faqSchema([
      { question: "Quelle est la différence entre RPO et cabinet ?", answer: "Un cabinet travaille en externe sur des missions ponctuelles au succès. Le RPO intègre un recruteur directement dans vos équipes, vos outils et vos rituels. Il recrute comme un membre de votre entreprise." },
      { question: "Combien ça coûte ?", answer: "À partir de 550€/jour. Pour 10 recrutements sur 4 mois, comptez environ 44 000€ — soit 3x moins qu'un cabinet classique (120 000 à 240 000€)." },
      { question: "Combien de temps pour être opérationnel ?", answer: "48h. Le TA Specialist rejoint vos outils (ATS, Slack, Teams) et vos rituels dès le premier jour. Première shortlist qualifiée sous 48h." },
      { question: "Et si le TA ne convient pas ?", answer: "Nous le remplaçons sous 48h. Notre réseau de freelances TA nous permet de réagir immédiatement." },
      { question: "Quels types de postes recrutez-vous ?", answer: "Tous. Sales, Tech, Finance, Marketing, Support, Product, Data, Management. Nos TA sont généralistes avec des spécialisations sectorielles." },
      { question: "Quelle durée d'engagement ?", answer: "3 mois minimum recommandé pour des résultats solides. Pas d'engagement rigide — préavis d'1 mois." },
    ]),
    breadcrumbSchema([{ name: "Notre offre", url: "/offre" }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <OffreClient />
    </>
  );
}
