import type { Metadata } from "next";
import TjmFreelanceClient from "./TjmFreelanceClient";

export const metadata: Metadata = {
  title: "Calculateur TJM Freelance — Quel tarif journalier viser ?",
  description:
    "Calculez votre TJM minimum en fonction de votre revenu net souhaité, vos charges et votre taux d'occupation. Outil gratuit Rocket4RPO pour TA freelance.",
  alternates: { canonical: "/outils/tjm-freelance" },
};

export default function Page() {
  return <TjmFreelanceClient />;
}
