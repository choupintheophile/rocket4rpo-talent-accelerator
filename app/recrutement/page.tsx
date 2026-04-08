import type { Metadata } from "next";
import RecrutementPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Rejoignez Rocket4RPO — postes Talent Acquisition",
  description: "Rocket4RPO recrute des Talent Acquisition Managers et Specialists. Rejoignez un réseau d'experts, des missions variées et des entreprises ambitieuses.",
  alternates: { canonical: "/recrutement" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rocket4RPO",
    description:
      "Rocket4RPO recrute des Talent Acquisition Managers et Specialists pour accompagner les entreprises Tech dans leurs recrutements.",
    url: "https://www.rocket4rpo.com/recrutement",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Postes ouverts chez Rocket4RPO",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Talent Acquisition Manager",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Talent Acquisition Specialist",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RecrutementPageClient />
    </>
  );
}
