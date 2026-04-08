import type { Metadata } from "next";
import RecrutementMarketingPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement Marketing SaaS — Growth, PMM, Performance",
  description: "Recrutez vos profils marketing Tech et SaaS avec Rocket4RPO. Growth Manager, Product Marketing, Performance Marketing, Content. Qualification basée sur l'impact business réel.",
  alternates: { canonical: "/metiers/recrutement-marketing" },
};

export default function Page() {
  return <RecrutementMarketingPageClient />;
}
