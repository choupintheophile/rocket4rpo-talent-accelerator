import type { Metadata } from "next";
import EquipePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "L'équipe Rocket4RPO — experts Talent Acquisition",
  description: "Découvrez l'équipe Rocket4RPO : des experts du recrutement Tech et du Talent Acquisition avec 7+ ans d'expérience dans l'écosystème SaaS.",
  alternates: { canonical: "/equipe" },
};

export default function Page() {
  return <EquipePageClient />;
}
