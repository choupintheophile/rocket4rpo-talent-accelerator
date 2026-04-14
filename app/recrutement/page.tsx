import type { Metadata } from "next";
import RecrutementPageClient from "./PageClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Missions RPO Freelance TA — Rejoignez le réseau",
  description:
    "Rejoignez le réseau Rocket4RPO. Missions RPO de 3 à 12 mois, rémunération attractive, remote-friendly. Postulez en 15 minutes.",
  alternates: { canonical: "/recrutement" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rocket4RPO",
    description:
      "Rocket4RPO sélectionne les meilleurs Talent Acquisition et TAM freelance pour des missions RPO chez des entreprises ambitieuses.",
    url: "https://rocket4rpo.com/recrutement",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Missions freelance TA/TAM chez Rocket4RPO",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Talent Acquisition Manager — Mission RPO freelance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Talent Acquisition Specialist — Mission RPO freelance",
          },
        },
      ],
    },
  };

  const breadcrumb = breadcrumbSchema([
    { name: "Accueil", url: "/" },
    { name: "Rejoindre Rocket4RPO", url: "/recrutement" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }}
      />
      <RecrutementPageClient />
    </>
  );
}
