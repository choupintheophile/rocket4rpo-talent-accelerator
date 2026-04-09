import type { Metadata } from "next";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {
  title: "Diagnostic recrutement gratuit — evaluez votre maturite TA",
  description:
    "Evaluez votre processus de recrutement en 2 minutes. 7 questions pour identifier vos forces, vos axes d'amelioration, et obtenir des recommandations personnalisees.",
  alternates: { canonical: "/assessment" },
};

export default function Page() {
  return <AssessmentClient />;
}
