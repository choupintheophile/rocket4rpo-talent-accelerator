import type { Metadata } from "next";
import ROICalculatorClient from "./ROICalculatorClient";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calculateur ROI RPO — estimez vos économies",
  description:
    "Calculez combien vous pouvez économiser en passant au RPO avec Rocket4RPO. Comparez le coût du recrutement interne, cabinet et RPO.",
  alternates: { canonical: "/calculateur" },
};

const calculatorFaqs = [
  {
    question: "Comment est calculé le coût RPO ?",
    answer:
      "Le calculateur compare votre coût actuel de recrutement (basé sur un pourcentage du salaire annuel brut) avec le modèle RPO Rocket4RPO. Le RPO est significativement moins cher que les cabinets classiques qui facturent 15 à 25% du salaire. Les résultats sont indicatifs — pour un chiffrage précis adapté à votre contexte, réservez un diagnostic gratuit.",
  },
  {
    question: "Le calculateur est-il fiable ?",
    answer:
      "Le calculateur fournit une estimation basée sur les données réelles de tarification de Rocket4RPO et les moyennes du marché du recrutement en France. Les résultats sont indicatifs et chaque situation est unique. Pour une estimation personnalisée tenant compte de vos spécificités (secteur, séniorité des postes, localisation), nous recommandons de réserver un diagnostic gratuit avec un expert Rocket4RPO.",
  },
  {
    question: "Puis-je obtenir une estimation personnalisée ?",
    answer:
      "Oui. Réservez un diagnostic gratuit de 30 minutes avec un expert Rocket4RPO. Nous analysons votre contexte spécifique (volumétrie, types de postes, urgence, budget) et vous fournissons un chiffrage détaillé sous 1 semaine, sans engagement. Le diagnostic inclut une recommandation sur le modèle le plus adapté : RPO à temps partagé, RPO à temps plein, ou accompagnement ponctuel.",
  },
];

export default function Page() {
  const calcSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur ROI RPO — Rocket4RPO",
    description: "Calculez combien vous pouvez économiser avec le RPO",
    url: "https://rocket4rpo.com/calculateur",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Calculateur ROI", url: "/calculateur" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([calcSchema, faqSchema(calculatorFaqs), breadcrumb]) }} />
      <ROICalculatorClient faqs={calculatorFaqs} />
    </>
  );
}
