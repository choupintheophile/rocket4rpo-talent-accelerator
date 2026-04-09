import type { Metadata } from "next";
import RecrutementFinancePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement Finance & Tech — CFO, FP&A, Contrôle de gestion",
  description: "Recrutez vos profils Finance Tech avec Rocket4RPO. CFO, FP&A, Contrôleur de gestion, Comptable. Qualification basée sur la rigueur, la fiabilité et la compréhension des enjeux Tech.",
  alternates: { canonical: "/metiers/recrutement-finance" },
};

export default function Page() {
  return <RecrutementFinancePageClient />;
}
