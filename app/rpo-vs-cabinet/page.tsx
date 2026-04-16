import type { Metadata } from "next";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import RpoVsCabinetClient from "./RpoVsCabinetClient";

export const metadata: Metadata = {
  title: "RPO vs Cabinet — Comparatif recrutement 2026",
  description:
    "RPO vs cabinet de recrutement : comparatif détaillé des coûts, délais, flexibilité et intégration. Chiffres 2026 pour choisir le bon modèle de recrutement.",
  alternates: { canonical: "/rpo-vs-cabinet" },
};

const faqs = [
  {
    question: "Quelle est la principale différence entre un RPO et un cabinet de recrutement ?",
    answer:
      "Le RPO s'intègre directement dans votre équipe et travaille en continu sur vos recrutements, comme un recruteur interne externalisé. Le cabinet intervient ponctuellement, mission par mission, sans intégration à vos process internes.",
  },
  {
    question: "Le RPO est-il moins cher qu'un cabinet de recrutement ?",
    answer:
      "Oui, en général. Un cabinet classique facture 15-25 % du salaire annuel brut, ce qui représente 120 000 à 200 000 € pour 10 recrutements. Le RPO est facturé sur un modèle prévisible et transparent, jusqu'à 5x moins cher. Plus le volume est élevé, plus l'écart se creuse en faveur du RPO.",
  },
  {
    question: "Peut-on combiner RPO et cabinet de recrutement ?",
    answer:
      "Absolument. Beaucoup d'entreprises utilisent un RPO pour le flux récurrent (commerciaux, développeurs) et un cabinet pour des profils rares ou C-level. Les deux approches sont complémentaires.",
  },
  {
    question: "Quelle est la durée minimum d'un engagement RPO ?",
    answer:
      "Chez Rocket4RPO, nous recommandons un minimum de 3 mois pour avoir un impact mesurable. Le cabinet, lui, fonctionne mission par mission sans durée minimum fixe.",
  },
  {
    question: "Le RPO a-t-il accès à mes outils internes (ATS, Slack, etc.) ?",
    answer:
      "Oui, c'est même l'un des principes fondamentaux du RPO. Le recruteur RPO utilise vos outils (ATS, Slack, outils de sourcing) et participe à vos rituels d'équipe comme un collaborateur interne.",
  },
  {
    question: "Le RPO peut-il recruter des profils C-level ?",
    answer:
      "Oui. Bien que le cabinet excelle sur les profils très rares ou C-level, un RPO expérimenté est tout à fait capable de piloter ces recrutements stratégiques, avec l'avantage d'une immersion totale dans votre culture d'entreprise.",
  },
];

export default function RpoVsCabinetPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Comparatifs", url: "/comparateur" },
    { name: "RPO vs Cabinet", url: "/rpo-vs-cabinet" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema(faqs), breadcrumb]) }}
      />
      <RpoVsCabinetClient />
    </>
  );
}
