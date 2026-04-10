import type { Metadata } from "next";
import AuditRecrutementPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Audit & structuration de votre recrutement",
  description:
    "Diagnostic complet de votre process recrutement : outils, m\u00e9thode, organisation. Plan d\u2019action concret en 2 semaines.",
  alternates: { canonical: "/offre/audit-recrutement" },
};

export default function Page() {
  return <AuditRecrutementPageClient />;
}
