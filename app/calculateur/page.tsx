import type { Metadata } from "next";
import ROICalculatorClient from "./ROICalculatorClient";

export const metadata: Metadata = {
  title: "Calculateur ROI RPO — estimez vos économies",
  description:
    "Calculez combien vous pouvez économiser en passant au RPO avec Rocket4RPO. Comparez le coût du recrutement interne, cabinet et RPO.",
  alternates: { canonical: "/calculateur" },
};

export default function Page() {
  const calcSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur ROI RPO — Rocket4RPO",
    description: "Calculez combien vous pouvez économiser avec le RPO",
    url: "https://www.rocket4rpo.com/calculateur",
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <ROICalculatorClient />
    </>
  );
}
