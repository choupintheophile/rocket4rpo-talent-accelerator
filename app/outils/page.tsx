import type { Metadata } from "next";
import OutilsClient from "./OutilsClient";

export const metadata: Metadata = {
  title: "Outils RPO gratuits — comparateur, calculateur, diagnostic, démo",
  description:
    "Utilisez nos outils gratuits pour évaluer vos besoins RPO : comparateur de modèles, calculateur ROI, diagnostic de maturité recrutement, et démo interactive.",
  alternates: { canonical: "/outils" },
};

export default function Page() {
  return <OutilsClient />;
}
