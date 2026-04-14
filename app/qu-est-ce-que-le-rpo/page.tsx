import type { Metadata } from "next";
import { faqSchema, breadcrumbSchema } from "@/lib/seo";
import QuEstCeQueLeRpoClient from "./QuEstCeQueLeRpoClient";

export const metadata: Metadata = {
  title: "Qu'est-ce que le RPO ? Définition et coût (2026)",
  description:
    "RPO (Recruitment Process Outsourcing) : définition, fonctionnement, coût et cas d'usage. Guide 2026 pour choisir son modèle de recrutement.",
  alternates: { canonical: "/qu-est-ce-que-le-rpo" },
};

const faqs = [
  {
    question: "Qu'est-ce qu'un RPO ?",
    answer:
      "Le RPO (Recruitment Process Outsourcing) est l'externalisation du processus de recrutement. Un recruteur senior s'intègre directement dans votre équipe, utilise vos outils et pilote vos recrutements comme un collaborateur interne. Contrairement à un cabinet, il travaille en continu sur votre pipeline plutôt que mission par mission.",
  },
  {
    question: "Quelle est la différence entre un RPO et un cabinet de recrutement ?",
    answer:
      "Un cabinet travaille en externe sur des missions ponctuelles avec une facturation au succès (15-25% du salaire). Le RPO intègre un recruteur dans vos équipes, sur un modèle forfaitaire prévisible, avec un suivi KPI hebdomadaire. Le RPO est jusqu'à 5x moins cher sur un volume de 10+ recrutements.",
  },
  {
    question: "Combien coûte un RPO ?",
    answer:
      "La tarification d'un RPO est sur devis, basée sur le nombre de jours par semaine et la durée de la mission. À volume égal (10 recrutements), le RPO est jusqu'à 5x moins cher qu'un cabinet classique qui facturerait 120 000 à 200 000 €.",
  },
  {
    question: "Quelle est la durée moyenne d'une mission RPO ?",
    answer:
      "Une mission RPO dure généralement entre 3 et 12 mois. 3 mois est le minimum recommandé pour des résultats mesurables. Au-delà de 12 mois, beaucoup d'entreprises choisissent d'internaliser leur Talent Acquisition.",
  },
  {
    question: "Quelles entreprises utilisent le RPO ?",
    answer:
      "Le RPO est utilisé principalement par les startups en hyper-croissance, les scale-ups post-levée de fonds, les ETI avec des pics de recrutement, et les entreprises Tech/SaaS. En France, le modèle s'est démocratisé à partir de 2010 auprès des entreprises de 20 à 500 salariés.",
  },
  {
    question: "Quels sont les avantages et inconvénients du RPO ?",
    answer:
      "Avantages : coût prévisible jusqu'à 5x moins cher qu'un cabinet, démarrage rapide (1 semaine), intégration aux outils internes, transfert de compétences. Inconvénients : durée minimale recommandée de 3 mois, moins adapté pour un seul recrutement ponctuel ou des profils C-level très rares où un cabinet peut être préférable.",
  },
  {
    question: "Comment choisir son prestataire RPO ?",
    answer:
      "Quatre critères clés : l'expertise sectorielle du recruteur, la méthodologie de sourcing, la qualité du reporting KPI, et la flexibilité contractuelle (ajustement mensuel du volume de jours). Demandez toujours un diagnostic gratuit et des références clients vérifiables.",
  },
  {
    question: "Quelles sont les origines du RPO ?",
    answer:
      "Le terme RPO (Recruitment Process Outsourcing) est apparu aux États-Unis dans les années 1970 dans le secteur industriel. Il s'est démocratisé en Europe dans les années 2000, puis en France à partir de 2010, porté par la croissance des startups Tech et le besoin de flexibilité des scale-ups.",
  },
];

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: "RPO",
      alternateName: "Recruitment Process Outsourcing",
      description:
        "Le RPO (Recruitment Process Outsourcing) est l'externalisation du processus de recrutement à un prestataire qui intègre ses recruteurs dans l'entreprise cliente. Modèle alternatif au cabinet de recrutement, plus économique et collaboratif.",
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "Glossaire RPO Rocket4RPO",
        url: "https://rocket4rpo.com/glossaire-rpo",
      },
      url: "https://rocket4rpo.com/qu-est-ce-que-le-rpo",
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Qu'est-ce que le RPO ? Définition, coût et fonctionnement (2026)",
      description:
        "Guide complet sur le RPO (Recruitment Process Outsourcing) : définition, fonctionnement en 4 étapes, coût, comparaison avec les autres modèles et cas d'usage.",
      image: {
        "@type": "ImageObject",
        url: "https://rocket4rpo.com/opengraph-image",
        width: 1200,
        height: 630,
      },
      inLanguage: "fr-FR",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://rocket4rpo.com/qu-est-ce-que-le-rpo",
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
          width: 600,
          height: 60,
        },
      },
      datePublished: "2026-04-14",
      dateModified: "2026-04-14",
      about: {
        "@type": "DefinedTerm",
        name: "RPO",
        alternateName: "Recruitment Process Outsourcing",
      },
    },
    faqSchema(faqs),
    breadcrumbSchema([{ name: "Qu'est-ce que le RPO", url: "/qu-est-ce-que-le-rpo" }]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <QuEstCeQueLeRpoClient faqs={faqs} />
    </>
  );
}
