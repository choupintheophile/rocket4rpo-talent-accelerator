import type { Metadata } from "next";
import { faqSchema, breadcrumbSchema, organizationSchema } from "@/lib/seo";
import AProposClient from "./AProposClient";

export const metadata: Metadata = {
  title: "À propos — Cabinet RPO France (2026)",
  description:
    "Rocket4RPO : cabinet spécialisé en Recruitment Process Outsourcing. Fondé en 2020, 200+ recrutements, 50+ clients. Notre équipe et méthodologie.",
  alternates: { canonical: "/a-propos" },
};

const faqs = [
  {
    question: "Quand a été fondée Rocket4RPO ?",
    answer:
      "Rocket4RPO a été fondée en 2020 par Clément Martin, au sein du groupe Rocket4GTM qui regroupe également Rocket4Sales (cabinet de recrutement commercial). L'équipe est basée à Paris et Villeurbanne.",
  },
  {
    question: "Combien de clients Rocket4RPO a-t-il accompagnés ?",
    answer:
      "Depuis 2020, Rocket4RPO a accompagné plus de 50 entreprises et réalisé plus de 200 recrutements. Nos clients vont de la startup post-levée aux ETI Tech françaises.",
  },
  {
    question: "Quel est le différenciant de Rocket4RPO ?",
    answer:
      "Rocket4RPO intègre des Talent Acquisition Specialists du top 1% directement dans vos équipes, avec un démarrage en 1 semaine et une première shortlist en 48h. Notre modèle forfaitaire prévisible est jusqu'à 5x moins cher qu'un cabinet classique.",
  },
  {
    question: "Comment travailler avec Rocket4RPO ?",
    answer:
      "Premier contact : réservez un diagnostic gratuit de 30 minutes. Nous analysons votre contexte, vos postes et vos objectifs. Si le RPO est adapté, nous proposons un TA senior qui rejoint vos équipes sous 1 semaine avec un engagement minimum de 3 mois.",
  },
  {
    question: "Où se trouvent les bureaux de Rocket4RPO ?",
    answer:
      "Rocket4RPO a deux bureaux en France : 22 rue de l'Échiquier à Paris 10ème, et 70 cours Tolstoï à Villeurbanne (Lyon). Nos TA interviennent sur toute la France en remote ou hybride.",
  },
];

const STATS = [
  { label: "Fondation", value: "2020" },
  { label: "Recrutements réalisés", value: "200+" },
  { label: "Clients accompagnés", value: "50+" },
  { label: "Années d'expertise cumulées", value: "7+" },
];

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "À propos de Rocket4RPO",
      url: "https://rocket4rpo.com/a-propos",
      description:
        "Rocket4RPO est un cabinet spécialisé en Recruitment Process Outsourcing, fondé en 2020 à Paris. 200+ recrutements, 50+ clients.",
      image: {
        "@type": "ImageObject",
        url: "https://rocket4rpo.com/opengraph-image",
        width: 1200,
        height: 630,
      },
      inLanguage: "fr-FR",
      mainEntity: organizationSchema,
    },
    {
      ...organizationSchema,
      foundingDate: "2020",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 5,
        maxValue: 20,
      },
      founder: {
        "@type": "Person",
        name: "Clément Martin",
        jobTitle: "CEO",
        sameAs: "https://www.linkedin.com/in/clementmartinr4s/",
      },
    },
    faqSchema(faqs),
    breadcrumbSchema([{ name: "À propos", url: "/a-propos" }]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <AProposClient faqs={faqs} stats={STATS} />
    </>
  );
}
