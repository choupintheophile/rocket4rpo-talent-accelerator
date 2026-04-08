import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de Rocket4RPO.",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Politique de confidentialité</h1>
        <h2>Données collectées</h2>
        <p>
          Nous collectons les données personnelles que vous nous transmettez via notre formulaire de contact : nom, prénom, adresse email, entreprise,
          message.
        </p>
        <h2>Finalité</h2>
        <p>Ces données sont utilisées uniquement pour répondre à vos demandes et vous proposer nos services de Talent Acquisition.</p>
        <h2>Durée de conservation</h2>
        <p>Vos données sont conservées pendant 3 ans à compter de votre dernier contact avec nous.</p>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous via
          notre <Link href="/contact">page de contact</Link>.
        </p>
      </div>
    </section>
  );
}
