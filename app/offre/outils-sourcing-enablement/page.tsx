import type { Metadata } from "next";
import OutilsSourcingEnablementPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Outils de sourcing & enablement — Structurez votre fonction recrutement",
  description: "Rocket4RPO structure votre fonction recrutement : audit, outils de sourcing, formation TA, enablement managers, process recrutement et programmes de cooptation. Accompagnement sur mesure.",
  alternates: { canonical: "/offre/outils-sourcing-enablement" },
};

export default function Page() {
  return <OutilsSourcingEnablementPageClient />;
}
