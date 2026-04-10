import type { Metadata } from "next";
import RPOPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "RPO — Recruteur externalis\u00e9 int\u00e9gr\u00e9 \u00e0 votre \u00e9quipe",
  description:
    "Int\u00e9grez un Talent Acquisition senior dans vos \u00e9quipes de 1 \u00e0 5 jours par semaine. Premi\u00e8re shortlist en 48h, engagement flexible, TJM \u00e0 partir de 550\u20ac/jour.",
  alternates: { canonical: "/offre/rpo" },
};

export default function Page() {
  return <RPOPageClient />;
}
