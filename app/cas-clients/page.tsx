import type { Metadata } from "next";
import CasClientsPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Cas clients — résultats concrets de nos missions RPO",
  description: "Découvrez comment Rocket4RPO a accompagné des entreprises Tech dans leurs recrutements Sales, IT, Finance et Marketing avec des résultats mesurables.",
  alternates: { canonical: "/cas-clients" },
};

export default function Page() {
  return <CasClientsPageClient />;
}
