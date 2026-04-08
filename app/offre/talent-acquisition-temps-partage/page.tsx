import type { Metadata } from "next";
import TalentAcquisitionTempsPartagePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Talent Acquisition à temps partagé — Recruteur senior externalisé",
  description: "Intégrez un Talent Acquisition Specialist expérimenté quelques jours par semaine. Recrutement plus rapide, shortlists plus justes, expertise senior sans coût fixe à temps plein. RPO flexible par Rocket4RPO.",
  alternates: { canonical: "/offre/talent-acquisition-temps-partage" },
};

export default function Page() {
  return <TalentAcquisitionTempsPartagePageClient />;
}
