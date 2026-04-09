import type { Metadata } from "next";
import RessourcesClient from "./RessourcesClient";

export const metadata: Metadata = {
  title: "Ressources gratuites — guides, templates, études recrutement",
  description:
    "Téléchargez nos guides gratuits sur le RPO, le recrutement Sales SaaS, les scorecards, et les KPIs recrutement. Conçus par des experts avec 7+ ans d'expérience.",
  alternates: { canonical: "/ressources" },
};

export default function Page() {
  return <RessourcesClient />;
}
