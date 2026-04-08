import type { Metadata } from "next";
import RecrutementPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Rejoignez Rocket4RPO — postes Talent Acquisition",
  description: "Rocket4RPO recrute des Talent Acquisition Managers et Specialists. Rejoignez un réseau d'experts, des missions variées et des entreprises ambitieuses.",
  alternates: { canonical: "/recrutement" },
};

export default function Page() {
  return <RecrutementPageClient />;
}
