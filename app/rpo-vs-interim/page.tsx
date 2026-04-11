import type { Metadata } from "next";
import { faqSchema } from "@/lib/seo";
import RpoVsInterimClient from "./RpoVsInterimClient";

export const metadata: Metadata = {
  title: "RPO vs Intérim / Staffing — quelle solution de recrutement ?",
  description:
    "RPO ou intérim ? Comparez intégration, expertise, modèle de coût et flexibilité pour choisir la meilleure solution d'externalisation de vos recrutements.",
  alternates: { canonical: "/rpo-vs-interim" },
};

const faqs = [
  {
    question: "Quelle est la différence entre un RPO et un intérimaire en recrutement ?",
    answer:
      "Le RPO est un expert Talent Acquisition intégré à votre équipe qui pilote le process de recrutement de A à Z (stratégie, sourcing, entretiens, négociation). L'intérimaire exécute des tâches assignées sans autonomie sur le process global.",
  },
  {
    question: "Le RPO coûte-t-il plus cher que l'intérim ?",
    answer:
      "Pas forcément. Le TJM d'un RPO (550 €/j) est transparent et sans marge cachée. L'intérim applique un coefficient de 1.8 à 2.2 (soit 80 à 120 % de marge), ce qui peut revenir plus cher pour un niveau d'expertise équivalent.",
  },
  {
    question: "Peut-on utiliser un RPO pour un besoin court terme ?",
    answer:
      "Oui. Chez Rocket4RPO, l'engagement minimum recommandé est de 3 mois, mais le RPO peut être utilisé sur des périodes courtes (3-6 mois) contrairement à un recruteur en CDI.",
  },
  {
    question: "Le RPO apporte-t-il un vivier de candidats ?",
    answer:
      "Oui. Rocket4RPO s'appuie sur une méthodologie de sourcing éprouvée, avec une équipe cumulant 200+ recrutements tous secteurs. L'intérimaire ne dispose généralement pas de cette expertise.",
  },
  {
    question: "L'intérim est-il adapté pour recruter des profils spécialisés ?",
    answer:
      "L'intérim est peu adapté au recrutement de profils spécialisés. Ces profils demandent une connaissance approfondie du marché, des compétences de sourcing avancées et un réseau sectoriel que seul un RPO expérimenté peut offrir.",
  },
  {
    question: "Qui pilote le process de recrutement avec un RPO vs un intérimaire ?",
    answer:
      "Le RPO pilote le process en autonomie : il définit la stratégie de sourcing, qualifie les candidats, coordonne les entretiens et négocie les offres. L'intérimaire attend les instructions et exécute les tâches qu'on lui confie.",
  },
];

export default function RpoVsInterimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <RpoVsInterimClient />
    </>
  );
}
