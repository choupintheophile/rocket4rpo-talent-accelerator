import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — \u00e9changez avec un expert RPO Sales",
  description:
    "Contactez Rocket4RPO pour discuter de vos besoins en recrutement Sales SaaS. Formulaire de contact, diagnostic gratuit de 30 min.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactClient />;
}
