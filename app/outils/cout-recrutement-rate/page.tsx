import type { Metadata } from "next";
import CoutRecrutementRateClient from "./CoutRecrutementRateClient";

export const metadata: Metadata = {
  title: "Coût d'un recrutement raté — Simulateur Rocket4RPO",
  description:
    "Estimez ce que coûte vraiment un mauvais recrutement : salaire, formation, perte de productivité, re-recrutement. Calcul sourcé DARES.",
  alternates: { canonical: "/outils/cout-recrutement-rate" },
};

export default function Page() {
  return <CoutRecrutementRateClient />;
}
