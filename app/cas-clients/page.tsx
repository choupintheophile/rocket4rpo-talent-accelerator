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
  return <CasClientsPageClient studies={serialized} />;
}
