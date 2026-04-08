import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "CGU du site Rocket4RPO.",
  alternates: { canonical: "/cgu" },
  robots: { index: false },
};

export default function CGUPage() {
  return (
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Conditions Générales d&apos;Utilisation</h1>
        <h2>Objet</h2>
        <p>
          Les présentes CGU régissent l&apos;utilisation du site rocket4rpo.com. En naviguant sur ce site, vous acceptez sans réserve les présentes
          conditions.
        </p>
        <h2>Accès au site</h2>
        <p>Le site est accessible gratuitement. Rocket4RPO se réserve le droit de modifier ou interrompre l&apos;accès au site à tout moment.</p>
        <h2>Responsabilité</h2>
        <p>
          Rocket4RPO s&apos;efforce de fournir des informations exactes mais ne saurait être tenu responsable d&apos;éventuelles erreurs ou omissions.
        </p>
        <h2>Droit applicable</h2>
        <p>Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents.</p>
      </div>
    </section>
  );
}
