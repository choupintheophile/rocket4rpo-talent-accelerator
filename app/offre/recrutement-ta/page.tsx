import type { Metadata } from "next";
import RecrutementTAPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Recrutez votre futur Talent Acquisition",
  description:
    "Vous voulez internaliser votre recrutement ? On vous trouve LE bon profil TA en CDI. Shortlist en 2-3 semaines, suivi d\u2019int\u00e9gration inclus.",
  alternates: { canonical: "/offre/recrutement-ta" },
};

export default function Page() {
  return <RecrutementTAPageClient />;
}
