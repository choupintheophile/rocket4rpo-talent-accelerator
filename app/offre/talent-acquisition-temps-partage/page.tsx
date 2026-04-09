import type { Metadata } from "next";
import TalentAcquisitionTempsPartagePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Talent Acquisition temps partagé — recruteur RPO senior",
  description: "Intégrez un Talent Acquisition Specialist expérimenté quelques jours par semaine. Recrutement plus rapide, shortlists plus justes, expertise senior sans coût fixe à temps plein. RPO flexible par Rocket4RPO.",
  alternates: { canonical: "/offre/talent-acquisition-temps-partage" },
};

export default function Page() {
  return <TalentAcquisitionTempsPartagePageClient />;
}
