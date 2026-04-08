import type { Metadata } from "next";
import RecrutementFinancePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement Finance SaaS — CFO, FP&A, Contrôle de gestion",
  description: "Recrutez vos profils Finance Tech et SaaS avec Rocket4RPO. CFO, FP&A, Contrôleur de gestion, Comptable. Qualification basée sur la rigueur, la fiabilité et la compréhension des enjeux SaaS.",
  alternates: { canonical: "/metiers/recrutement-finance" },
};

export default function Page() {
  return <RecrutementFinancePageClient />;
}
