import type { Metadata } from "next";
import RecrutementTalentAcquisitionPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement de Talent Acquisition — Recruteur de recruteurs expert",
  description: "Rocket4RPO recrute vos Talent Acquisition Specialists et Managers sur la base de leur performance réelle. Sélection exigeante, expertise métier, shortlist qualifiée en 2 à 3 semaines.",
  alternates: { canonical: "/offre/recrutement-talent-acquisition" },
};

export default function Page() {
  return <RecrutementTalentAcquisitionPageClient />;
}
