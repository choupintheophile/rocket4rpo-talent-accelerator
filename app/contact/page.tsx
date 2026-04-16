import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — échangez avec un expert RPO",
  description:
    "Contactez Rocket4RPO pour discuter de vos besoins en recrutement. Formulaire de contact rapide + diagnostic gratuit de 30 min avec un expert Talent Acquisition.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rocket4RPO",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "22 rue de l'Échiquier",
        postalCode: "75010",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "70 cours Tolstoï",
        postalCode: "69100",
        addressLocality: "Villeurbanne",
        addressCountry: "FR",
      },
    ],
    email: "contact@rocket4rpo.com",
    url: "https://rocket4rpo.com",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <ContactClient />
    </>
  );
}
