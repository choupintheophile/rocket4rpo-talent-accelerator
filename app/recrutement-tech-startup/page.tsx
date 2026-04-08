import type { Metadata } from "next";
import RecrutementTechStartupPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement Tech Startup — RPO spécialisé startups & scale-ups",
  description: "Recrutez les meilleurs talents tech pour votre startup ou scale-up. RPO spécialisé dans le recrutement de développeurs, product managers et profils techniques.",
  alternates: { canonical: "/recrutement-tech-startup" },
};

export default function Page() {
  return <RecrutementTechStartupPageClient />;
}
