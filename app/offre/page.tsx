import type { Metadata } from "next";
import OffreClient from "./OffreClient";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "RPO, CDD & CDI — Top 1% recruteurs en 1 semaine",
  description:
    "RPO, CDD ou CDI : le top 1% des Talent Acquisition de France intégré à vos équipes en 1 semaine. Dès 550€/j. 200+ recrutements. Diagnostic gratuit →",
  alternates: { canonical: "/offre" },
};

export default function Page() {
  const schemas = [
    serviceSchema(
      "RPO — Recruteur externalisé intégré à votre équipe",
      "Intégrez un Talent Acquisition senior dans vos équipes de 1 à 5 jours par semaine. Première shortlist en 5-7 jours, engagement flexible.",
      "/offre"
    ),
    faqSchema([
      { question: "Quelle est la différence entre RPO et cabinet ?", answer: "Un cabinet travaille en externe sur des missions ponctuelles au succès. Le RPO intègre un recruteur directement dans vos équipes, vos outils et vos rituels. Il recrute comme un membre de votre entreprise." },
      { question: "Combien ça coûte ?", answer: "À partir de 550€/jour. Pour 10 recrutements sur 4 mois, comptez environ 44 000€ — soit jusqu'à 5x moins cher qu'un cabinet classique (120 000 à 200 000€)." },
      { question: "Combien de temps pour être opérationnel ?", answer: "48h. Le TA Specialist rejoint vos outils (ATS, Slack, Teams) et vos rituels dès le premier jour. Première shortlist qualifiée sous 1 semaine." },
      { question: "Et si le TA ne convient pas ?", answer: "Nous le remplaçons sous 1 semaine. Notre réseau de freelances TA nous permet de réagir immédiatement." },
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
