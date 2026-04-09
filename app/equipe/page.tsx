import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import { getTeamMembers } from "@/lib/db";
import EquipePageClient from "./PageClient";

export const metadata: Metadata = {
  title: "L'équipe Rocket4RPO — experts Talent Acquisition",
  description: "Découvrez l'équipe Rocket4RPO : des experts du recrutement Tech et du Talent Acquisition avec 7+ ans d'expérience dans l'écosystème Tech.",
  alternates: { canonical: "/equipe" },
};

export default async function Page() {
  const members = await getTeamMembers();
  return <EquipePageClient members={members} />;
}
