import type { Metadata } from "next";
import RecrutementSalesPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement Sales SaaS — Seul RPO en France avec 40 000 profils pré-qualifiés",
  description: "Rocket4RPO : le seul RPO en France spécialisé Sales SaaS avec un vivier de 40 000 profils commerciaux pré-qualifiés (héritage Rocket4Sales). Shortlist en 48h. SDR, AE, Sales Manager, VP Sales, CRO.",
  alternates: { canonical: "/metiers/recrutement-sales" },
};

export default function Page() {
  return <RecrutementSalesPageClient />;
}
