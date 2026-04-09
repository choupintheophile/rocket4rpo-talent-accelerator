import type { Metadata } from "next";
import TalentAcquisitionTempsPleinPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Talent Acquisition temps plein — RPO dédié",
  description: "Un Talent Acquisition Specialist expérimenté dédié à 100 % à vos recrutements. Structuration, sourcing senior, exécution rapide et collaboration managériale. RPO haute performance par Rocket4RPO.",
  alternates: { canonical: "/offre/talent-acquisition-temps-plein" },
};

export default function Page() {
  return <TalentAcquisitionTempsPleinPageClient />;
}
