import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Rocket4RPO.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Mentions légales</h1>
        <h2>Éditeur du site</h2>
        <p>
          Rocket4RPO est une marque de{" "}
          <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">
            Rocket4Sales SAS
          </a>
          .
        </p>
        <p>Siège social : 22 rue de l&apos;Échiquier, 75010 Paris</p>
        <p>SIRET : SIRET en cours d&apos;immatriculation</p>
        <p>Directeur de la publication : Clément Martin</p>
        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, logos) est protégé par le droit d&apos;auteur. Toute reproduction est interdite sans
          autorisation préalable.
        </p>
        <h2>Contact</h2>
        <p>
          Pour toute question, contactez-nous via notre <Link href="/contact">page de contact</Link>.
        </p>
      </div>
    </section>
  );
}
