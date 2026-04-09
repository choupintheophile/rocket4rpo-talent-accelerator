import type { Metadata } from "next";
import RecrutementSalesPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement de profils Sales & Commerciaux — RPO Rocket4RPO",
  description: "Nos Talent Acquisition Specialists recrutent vos profils commerciaux : SDR, AE, Sales Manager, VP Sales, CRO. Expertise sectorielle, sourcing ciblé et shortlist en 48h.",
  alternates: { canonical: "/metiers/recrutement-sales" },
};

export default function Page() {
  return <RecrutementSalesPageClient />;
}
