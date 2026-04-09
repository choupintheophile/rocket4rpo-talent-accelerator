import type { Metadata } from "next";
import ComparateurClient from "./ComparateurClient";

export const metadata: Metadata = {
  title: "RPO vs Cabinet vs Recrutement interne — comparatif complet",
  description:
    "Comparez le coût, la flexibilité et l'efficacité du RPO Rocket4RPO face aux cabinets de recrutement et au recrutement interne. Chiffres concrets.",
  alternates: { canonical: "/comparateur" },
};

export default function ComparateurPage() {
  return <ComparateurClient />;
}
