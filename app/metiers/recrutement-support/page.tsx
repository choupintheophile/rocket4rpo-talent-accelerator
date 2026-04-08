import type { Metadata } from "next";
import RecrutementSupportPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutement fonctions support — RH, Office Manager, Legal, Operations",
  description: "Rocket4RPO recrute vos profils fonctions support : Office Manager, RH, Legal, Operations. Des Talent Acquisition spécialisés pour structurer votre organisation.",
  alternates: { canonical: "/metiers/recrutement-support" },
};

export default function Page() {
  return <RecrutementSupportPageClient />;
}
