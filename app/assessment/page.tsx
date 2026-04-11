import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {
  title: "Diagnostic recrutement gratuit — 2 min",
  description:
    "Évaluez votre processus de recrutement en 2 minutes. 7 questions pour identifier vos forces, axes d'amélioration et recommandations personnalisées.",
  alternates: { canonical: "/assessment" },
};

export default function Page() {
  return <AssessmentClient />;
}
