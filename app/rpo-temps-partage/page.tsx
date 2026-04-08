import type { Metadata } from "next";
import RPOTempsPartagePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "RPO à temps partagé — Recrutement externalisé flexible",
  description: "Externalisez vos recrutements avec un RPO à temps partagé. Un recruteur expert intégré quelques jours par semaine pour recruter mieux, plus vite, à moindre coût.",
  alternates: { canonical: "/rpo-temps-partage" },
};

export default function Page() {
  return <RPOTempsPartagePageClient />;
}
