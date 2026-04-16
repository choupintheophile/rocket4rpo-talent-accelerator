import type { Metadata } from "next";
import OutilsClient from "./OutilsClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Simulateurs RPO gratuits — Calculez votre ROI",
  description:
    "3 outils RPO gratuits : calculateur ROI recrutement, diagnostic Talent Acquisition, démo interactive du processus RPO. Résultats immédiats, sans inscription.",
  alternates: { canonical: "/simulateurs" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Simulateurs RPO gratuits — Rocket4RPO",
    description: "3 outils gratuits pour évaluer vos besoins RPO",
    url: "https://rocket4rpo.com/simulateurs",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Démo interactive", url: "https://rocket4rpo.com/demo" },
      { "@type": "ListItem", position: 2, name: "Calculateur ROI", url: "https://rocket4rpo.com/calculateur" },
      { "@type": "ListItem", position: 3, name: "Diagnostic recrutement", url: "https://rocket4rpo.com/assessment" },
    ],
  };
  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Simulateurs", url: "/simulateurs" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }} />
      <OutilsClient />
    </>
  );
}
