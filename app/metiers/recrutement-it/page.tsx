import type { Metadata } from "next";
import RecrutementITPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement IT & Tech — Développeurs, DevOps, Data, CTO",
  description: "Recrutez vos profils IT et Tech avec Rocket4RPO. Talent Acquisition spécialisés IT : développeurs, DevOps, Data Engineers, CTO. Sourcing avancé et qualification technique approfondie.",
  alternates: { canonical: "/metiers/recrutement-it" },
};

export default function Page() {
  return <RecrutementITPageClient />;
}
