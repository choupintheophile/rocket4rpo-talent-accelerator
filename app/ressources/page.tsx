import type { Metadata } from "next";
import RessourcesClient from "./RessourcesClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ressources RPO gratuites — Guides & PDF",
  description:
    "20 guides RPO gratuits : scorecards, grilles salariales Tech & Sales 2026, KPIs, IA recrutement. 200+ recrutements d'expertise.",
  alternates: { canonical: "/ressources" },
};

export default function Page() {
  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Ressources", url: "/ressources" },
  ]);
  const ressourcesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ressources gratuites Rocket4RPO",
    description: "20 guides, templates et études conçus par des experts Talent Acquisition avec 200+ recrutements",
    url: "https://rocket4rpo.com/ressources",
    numberOfItems: 20,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Guide : RPO vs Cabinet — Le comparatif complet" },
      { "@type": "ListItem", position: 2, name: "Template : Scorecard de recrutement" },
      { "@type": "ListItem", position: 3, name: "Étude : Grille de rémunération Tech 2026" },
      { "@type": "ListItem", position: 4, name: "Checklist : Les 10 étapes d'un onboarding réussi" },
      { "@type": "ListItem", position: 5, name: "Template : Brief de poste parfait" },
      { "@type": "ListItem", position: 6, name: "Guide : KPIs recrutement — Le dashboard essentiel" },
      { "@type": "ListItem", position: 7, name: "Template : 50 questions d'entretien structuré" },
      { "@type": "ListItem", position: 8, name: "Guide : Sourcing multicanal complet" },
      { "@type": "ListItem", position: 9, name: "Étude : Grille de salaires Sales & SaaS 2026" },
      { "@type": "ListItem", position: 10, name: "Template : Processus de recrutement complet" },
      { "@type": "ListItem", position: 11, name: "Checklist : RGPD pour le recrutement" },
      { "@type": "ListItem", position: 12, name: "Guide : L'IA en recrutement — Cas d'usage concrets" },
      { "@type": "ListItem", position: 13, name: "Template : Modèle d'offre d'emploi performante" },
      { "@type": "ListItem", position: 14, name: "Étude : Benchmark RPO France 2026" },
      { "@type": "ListItem", position: 15, name: "Checklist : Prise de références — 15 questions clés" },
      { "@type": "ListItem", position: 16, name: "Guide : Recrutement inclusif — Bonnes pratiques D&I" },
      { "@type": "ListItem", position: 17, name: "Template : Reporting recrutement pour le COMEX" },
      { "@type": "ListItem", position: 18, name: "Guide : Plan 30-60-90 jours pour nouvelles recrues" },
      { "@type": "ListItem", position: 19, name: "Étude : Time-to-hire par secteur en France 2026" },
      { "@type": "ListItem", position: 20, name: "Checklist : Recruteur freelance — Démarrer en RPO" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ressourcesSchema, breadcrumb]) }} />
      <RessourcesClient />
    </>
  );
}
