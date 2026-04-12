import type { Metadata } from "next";
import RdvClient from "./RdvClient";

export const metadata: Metadata = {
  title: "Trouvez votre TA idéal — Diagnostic gratuit",
  description:
    "Décrivez votre besoin en 3 questions et trouvez le Talent Acquisition Specialist parfait pour votre équipe. Diagnostic gratuit.",
  alternates: { canonical: "/rdv" },
};

export default function Page() {
  return <RdvClient />;
}
