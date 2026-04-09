import type { Metadata } from "next";
import RessourcesClient from "./RessourcesClient";

export const metadata: Metadata = {
  title: "Ressources gratuites — guides, templates, études recrutement",
  description:
    "Téléchargez nos guides gratuits sur le RPO, les scorecards, et les KPIs recrutement. Conçus par des experts avec 7+ ans d'expérience.",
  alternates: { canonical: "/ressources" },
};

export default function Page() {
  const ressourcesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ressources gratuites Rocket4RPO",
    url: "https://www.rocket4rpo.com/ressources",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Guide : RPO vs Cabinet — Le comparatif complet",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Template : Scorecard de recrutement",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Étude : Grille de rémunération Sales & Tech 2026",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Checklist : Les 10 étapes d'un onboarding réussi",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ressourcesSchema) }} />
      <RessourcesClient />
    </>
  );
}
