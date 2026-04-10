import type { Metadata } from "next";
import RessourcesClient from "./RessourcesClient";

export const metadata: Metadata = {
  title: "Ressources gratuites — guides, templates, études recrutement",
  description:
    "6 ressources gratuites : guides RPO, templates scorecards, grilles salariales Tech 2026, KPIs recrutement. Par des experts avec 200+ recrutements.",
  alternates: { canonical: "/ressources" },
};

export default function Page() {
  const ressourcesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ressources gratuites Rocket4RPO",
    description: "Guides, templates et études conçus par des experts Talent Acquisition",
    url: "https://rocket4rpo.com/ressources",
    numberOfItems: 6,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guide : RPO vs Cabinet — Le comparatif complet" },
      { "@type": "ListItem", position: 2, name: "Template : Scorecard de recrutement" },
      { "@type": "ListItem", position: 3, name: "Étude : Grille de rémunération Tech 2026" },
      { "@type": "ListItem", position: 4, name: "Checklist : Les 10 étapes d'un onboarding réussi" },
      { "@type": "ListItem", position: 5, name: "Template : Brief de poste parfait" },
      { "@type": "ListItem", position: 6, name: "Guide : KPIs recrutement — Le dashboard essentiel" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ressourcesSchema) }} />
      <RessourcesClient />
    </>
  );
}
