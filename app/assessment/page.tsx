import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Diagnostic recrutement gratuit — 2 min",
  description:
    "Évaluez votre processus de recrutement en 2 minutes. 7 questions pour identifier vos forces, axes d'amélioration et recommandations personnalisées.",
  alternates: { canonical: "/assessment" },
};

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Diagnostic recrutement Rocket4RPO",
      description: "Évaluez votre maturité Talent Acquisition en 7 questions. Score personnalisé et recommandations.",
      url: "https://rocket4rpo.com/assessment",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      provider: { "@type": "Organization", name: "Rocket4RPO", url: "https://rocket4rpo.com" },
    },
    faqSchema([
      { question: "Combien de temps dure le diagnostic ?", answer: "2 minutes. 7 questions à choix multiples avec résultat immédiat." },
      { question: "Le diagnostic est-il gratuit ?", answer: "Oui, 100% gratuit, sans inscription et sans engagement." },
      { question: "Que contient le résultat ?", answer: "Un score sur 21, votre niveau (Débutant à Expert), vos 3 axes d'amélioration prioritaires avec recommandations." },
    ]),
    breadcrumbSchema([{ name: "Diagnostic recrutement", url: "/assessment" }]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <AssessmentClient />
    </>
  );
}
