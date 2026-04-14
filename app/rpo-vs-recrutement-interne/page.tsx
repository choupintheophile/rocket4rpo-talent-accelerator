import type { Metadata } from "next";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import RpoVsRecrutementInterneClient from "./RpoVsRecrutementInterneClient";

export const metadata: Metadata = {
  title: "RPO vs Recrutement interne — Comparatif 2026",
  description:
    "RPO ou recruteur interne en CDI ? Comparez coûts, délais de démarrage, flexibilité et expertise pour faire le bon choix de recrutement.",
  alternates: { canonical: "/rpo-vs-recrutement-interne" },
};

const faqs = [
  {
    question: "Le RPO peut-il remplacer un recruteur interne ?",
    answer:
      "Oui, un RPO peut assurer exactement les mêmes missions qu'un recruteur interne (sourcing, pré-qualification, coordination des entretiens, négociation) tout en apportant une expertise sectorielle et un vivier de candidats immédiatement mobilisable.",
  },
  {
    question: "Combien coûte un RPO par rapport à un recruteur en CDI ?",
    answer:
      "Un recruteur en CDI coûte 60-75 K€/an charges comprises, soit 5 000-6 250 €/mois. Un RPO à temps partagé (2 jours/semaine par exemple) revient significativement moins cher si votre flux de recrutement ne justifie pas un temps plein permanent. Tarification précise sur devis.",
  },
  {
    question: "En combien de temps un RPO peut-il démarrer ?",
    answer:
      "Chez Rocket4RPO, le démarrage se fait en 48 h après signature. Recruter un recruteur interne prend en moyenne 2 à 3 mois (publication de l'offre, entretiens, préavis).",
  },
  {
    question: "Que se passe-t-il si mon besoin de recrutement diminue ?",
    answer:
      "Avec un RPO, vous ajustez le nombre de jours par semaine ou mettez la mission en pause. Avec un CDI, vous continuez à payer le salaire même sans besoin de recrutement, ou vous engagez une rupture coûteuse.",
  },
  {
    question: "Le RPO est-il adapté pour une startup qui recrute ses premiers commerciaux ?",
    answer:
      "C'est même le cas d'usage idéal. La startup bénéficie immédiatement d'un expert recrutement sans prendre le risque d'un CDI recruteur, avec une flexibilité totale pour adapter la mission à sa croissance.",
  },
  {
    question: "Le RPO peut-il travailler à temps plein comme un recruteur interne ?",
    answer:
      "Oui. Le RPO peut intervenir de 1 à 5 jours par semaine selon vos besoins. À 5 jours/semaine, il fonctionne exactement comme un recruteur interne, avec l'avantage de pouvoir réduire ou arrêter sans les contraintes d'un CDI.",
  },
];

export default function RpoVsRecrutementInternePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Comparatifs", url: "/comparateur" },
    { name: "RPO vs Recrutement interne", url: "/rpo-vs-recrutement-interne" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema(faqs), breadcrumb]) }}
      />
      <RpoVsRecrutementInterneClient />
    </>
  );
}
