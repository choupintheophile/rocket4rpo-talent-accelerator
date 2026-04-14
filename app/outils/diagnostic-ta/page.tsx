import type { Metadata } from "next";
import DiagnosticTaClient from "./DiagnosticTaClient";

export const metadata: Metadata = {
  title: "Diagnostic Talent Acquisition — Quel est votre score ?",
  description:
    "10 questions pour évaluer la maturité de votre process de recrutement. Score sur 100, plan d'action personnalisé, ressources adaptées.",
  alternates: { canonical: "/outils/diagnostic-ta" },
};

export default function Page() {
  return <DiagnosticTaClient />;
}
