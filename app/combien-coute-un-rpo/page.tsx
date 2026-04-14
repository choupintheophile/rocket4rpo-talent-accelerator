import type { Metadata } from "next";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import CombienCouteUnRpoClient from "./CombienCouteUnRpoClient";

export const metadata: Metadata = {
  title: "Combien coûte un RPO en France ? Prix et modèles (2026)",
  description:
    "Combien coûte un RPO en France ? Modèles de facturation, prix par taille d'entreprise, scénario 10 recrutements vs cabinet. Guide tarifs RPO 2026.",
  alternates: { canonical: "/combien-coute-un-rpo" },
};

const faqs = [
  {
    question: "Combien coûte un RPO en France ?",
    answer:
      "La tarification d'un RPO est sur devis. Elle dépend du nombre de jours par semaine (à partir de 3 jours), de la durée de la mission et de la séniorité des profils recherchés. Sur un volume de 10 recrutements, un RPO est jusqu'à 5x moins cher qu'un cabinet classique qui facturerait 120 000 à 200 000 €.",
  },
  {
    question: "Quels sont les modèles de facturation d'un RPO ?",
    answer:
      "Trois modèles principaux : le TJM (taux journalier moyen), le forfait mensuel basé sur un nombre de jours par semaine, et la facturation à la mission ou au recrutement livré. Le forfait mensuel est le plus courant car il offre une visibilité budgétaire.",
  },
  {
    question: "Qu'est-ce qui est inclus dans le prix d'un RPO ?",
    answer:
      "Sont inclus : sourcing multicanal, qualification candidats, reporting KPI hebdomadaire, coordination avec les hiring managers, suivi des promesses d'embauche et onboarding. Sont exclus : les licences d'outils (ATS, LinkedIn Recruiter), certains jobboards premium, et les tests techniques externes.",
  },
  {
    question: "Le RPO est-il toujours moins cher qu'un cabinet ?",
    answer:
      "Pas toujours. Sur 1 ou 2 recrutements ponctuels, un cabinet avec success-fee peut être équivalent voire plus économique. À partir de 3-4 recrutements sur 6 mois, le RPO devient systématiquement plus rentable. L'écart se creuse au-delà de 10 recrutements.",
  },
  {
    question: "Comment négocier un contrat RPO ?",
    answer:
      "Quatre leviers : le nombre de jours par semaine (3, 4 ou 5), la durée d'engagement (plus longue = meilleur tarif), le volume de recrutements garantis, et le partage des outils (ATS, LinkedIn). Demandez toujours une clause de sortie mensuelle après 3 mois pour garder de la flexibilité.",
  },
  {
    question: "Y a-t-il des frais cachés dans un RPO ?",
    answer:
      "Non, c'est l'un des avantages du modèle : la facturation est forfaitaire et prévisible. Vérifiez toutefois dans votre contrat : les licences d'outils, les tests techniques externes (Codility, etc.) et les frais de déplacement si présentiel demandé.",
  },
];

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Combien coûte un RPO en France ? Prix, modèles et exemples (2026)",
      description:
        "Guide des prix RPO en France : modèles de facturation, fourchettes par taille d'entreprise, scénario 10 recrutements vs cabinet et interne.",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://rocket4rpo.com/combien-coute-un-rpo",
      },
      author: {
        "@type": "Organization",
        name: "Rocket4RPO",
        url: "https://rocket4rpo.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Rocket4RPO",
        url: "https://rocket4rpo.com",
        logo: {
          "@type": "ImageObject",
          url: "https://rocket4rpo.com/logo-rocket4rpo.webp",
        },
      },
      datePublished: "2026-04-14",
      dateModified: "2026-04-14",
      about: {
        "@type": "Thing",
        name: "Tarification RPO France",
      },
    },
    faqSchema(faqs),
    breadcrumbSchema([{ name: "Combien coûte un RPO", url: "/combien-coute-un-rpo" }]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CombienCouteUnRpoClient faqs={faqs} />
    </>
  );
}
