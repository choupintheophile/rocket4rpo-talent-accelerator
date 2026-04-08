import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/db";
import CasClientsPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Cas clients — résultats concrets de nos missions RPO",
  description: "Découvrez comment Rocket4RPO a accompagné des entreprises Tech dans leurs recrutements Sales, IT, Finance et Marketing avec des résultats mesurables.",
  alternates: { canonical: "/cas-clients" },
};

export default async function Page() {
  const studies = await getCaseStudies();
  const serialized = studies.map((s) => ({
    ...s,
    metrics: s.metrics as { value: string; label: string }[],
    createdAt: s.createdAt.toISOString(),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cas clients Rocket4RPO",
    description: "Études de cas de missions RPO réussies",
    itemListElement: serialized.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.company,
      description: s.challenge,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CasClientsPageClient studies={serialized} />
    </>
  );
}
