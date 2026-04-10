import type { Metadata } from "next";
import ComparateurClient from "./ComparateurClient";

export const metadata: Metadata = {
  title: "RPO vs Cabinet vs Interne — Comparatif 2026",
  description:
    "Comparez le coût, la flexibilité et l'efficacité du RPO Rocket4RPO face aux cabinets de recrutement et au recrutement interne. Chiffres concrets.",
  alternates: { canonical: "/comparateur" },
};

export default function ComparateurPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "RPO vs Cabinet vs Recrutement interne — Comparatif",
    description: "Comparaison détaillée des modèles RPO, cabinet et recrutement interne",
    url: "https://rocket4rpo.com/comparateur",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://rocket4rpo.com" },
        { "@type": "ListItem", position: 2, name: "Comparateur", item: "https://rocket4rpo.com/comparateur" },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ComparateurClient />
    </>
  );
}
