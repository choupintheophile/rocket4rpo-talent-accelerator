import type { Metadata } from "next";
import ContactPageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Contact — échangez avec un expert Talent Acquisition",
  description: "Contactez Rocket4RPO pour discuter de vos besoins en Talent Acquisition. Formulaire de contact, demande de rendez-vous ou candidature TA.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPageClient />;
}
