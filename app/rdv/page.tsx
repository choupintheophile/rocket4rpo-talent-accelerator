import type { Metadata } from "next";
import RdvClient from "./RdvClient";

export const metadata: Metadata = {
  title: "Prendre rendez-vous — Diagnostic gratuit",
  description:
    "Réservez un créneau de 30 minutes avec un expert RPO. Diagnostic gratuit, sans engagement. Réponse sous 24h.",
  alternates: { canonical: "/rdv" },
};

export default function Page() {
  return <RdvClient />;
}
