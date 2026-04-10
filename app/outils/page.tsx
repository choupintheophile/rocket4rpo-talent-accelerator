import type { Metadata } from "next";
import OutilsClient from "./OutilsClient";

export const metadata: Metadata = {
  title: "Outils RPO gratuits — Comparateur & Calculateur",
  description:
    "Outils RPO gratuits : comparateur, calculateur ROI, diagnostic recrutement, démo interactive. Évaluez vos besoins →",
  alternates: { canonical: "/outils" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Outils RPO gratuits — Rocket4RPO",
    description: "4 outils gratuits pour évaluer vos besoins RPO",
    url: "https://rocket4rpo.com/outils",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Démo interactive", url: "https://rocket4rpo.com/demo" },
      { "@type": "ListItem", position: 2, name: "Comparateur RPO", url: "https://rocket4rpo.com/comparateur" },
      { "@type": "ListItem", position: 3, name: "Calculateur ROI", url: "https://rocket4rpo.com/calculateur" },
      { "@type": "ListItem", position: 4, name: "Diagnostic recrutement", url: "https://rocket4rpo.com/assessment" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <OutilsClient />
    </>
  );
}
