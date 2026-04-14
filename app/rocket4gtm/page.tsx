import type { Metadata } from "next";
import Rocket4GTMPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Rocket4GTM — Groupe Rocket4RPO & Sales",
  description: "Rocket4GTM : groupe d'experts go-to-market pour accélérer la croissance Tech. Recrutement, Talent Acquisition et consulting GTM.",
  alternates: { canonical: "/rocket4gtm" },
};

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rocket4GTM",
    description:
      "Rocket4GTM est un groupe d'experts go-to-market qui aide les entreprises Tech à accélérer leur croissance via le recrutement, le Talent Acquisition et le consulting GTM.",
    url: "https://rocket4rpo.com/rocket4gtm",
    parentOrganization: {
      "@type": "Organization",
      name: "Rocket4Sales",
      url: "https://www.rocket4sales.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Rocket4GTMPageClient />
    </>
  );
}
