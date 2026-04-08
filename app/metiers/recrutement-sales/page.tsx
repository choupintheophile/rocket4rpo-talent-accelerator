import type { Metadata } from "next";
import RecrutementSalesPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement commercial SaaS — SDR, AE, Sales Manager Tech",
  description: "Recrutez vos profils commerciaux Tech et SaaS avec Rocket4RPO. Plus de 7 ans d'expertise Rocket4Sales intégrée : SDR, Account Executive, Sales Manager, VP Sales.",
  alternates: { canonical: "/metiers/recrutement-sales" },
};

export default function Page() {
  return <RecrutementSalesPageClient />;
}
