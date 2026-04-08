import type { Metadata } from "next";
import RPOTempsPleinPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "RPO à temps plein — Recruteur externalisé dédié à 100%",
  description: "Un recruteur RPO dédié à temps plein intégré dans vos équipes. Structuration du recrutement, exécution rapide et pilotage de la performance. Rocket4RPO.",
  alternates: { canonical: "/rpo-temps-plein" },
};

export default function Page() {
  return <RPOTempsPleinPageClient />;
}
