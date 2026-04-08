import type { Metadata } from "next";
import ROICalculatorClient from "./ROICalculatorClient";

export const metadata: Metadata = {
  title: "Calculateur ROI RPO — estimez vos économies",
  description:
    "Calculez combien vous pouvez économiser en passant au RPO avec Rocket4RPO. Comparez le coût du recrutement interne, cabinet et RPO.",
  alternates: { canonical: "/calculateur" },
};

export default function Page() {
  return <ROICalculatorClient />;
}
