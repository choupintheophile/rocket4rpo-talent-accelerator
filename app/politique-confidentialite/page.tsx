import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de Rocket4RPO.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Politique de confidentialité</h1>
        <p>
          Dernière mise à jour : 9 avril 2026
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles collectées sur le site rocket4rpo.com est :
        </p>
        <p>
          <strong>Rocket4Sales SAS</strong><br />
          22 rue de l&apos;Échiquier, 75010 Paris<br />
          Contact DPO : <a href="mailto:contact@rocket4rpo.com">contact@rocket4rpo.com</a>
        </p>

        <h2>2. Données collectées</h2>
        <p>
          Nous collectons les données personnelles que vous nous transmettez volontairement via notre formulaire de contact :
        </p>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse email professionnelle</li>
          <li>Nom de l&apos;entreprise</li>
          <li>Taille de l&apos;équipe</li>
          <li>Message</li>
        </ul>

        <h2>3. Bases légales et finalités</h2>
        <p>Vos données sont traitées sur les bases légales suivantes :</p>
        <ul>
          <li>
            <strong>Consentement</strong> (article 6.1.a du RGPD) : lorsque vous remplissez notre formulaire de contact, vous consentez au traitement de vos données pour répondre à votre demande et vous proposer nos services de Talent Acquisition.
          </li>
          <li>
            <strong>Intérêt légitime</strong> (article 6.1.f du RGPD) : pour la mesure d&apos;audience et l&apos;amélioration de notre site via des outils d&apos;analytics.
          </li>
        </ul>

        <h2>4. Destinataires des données</h2>
        <p>
          Vos données personnelles sont destinées exclusivement à l&apos;équipe Rocket4RPO. Elles ne sont en aucun cas transmises ou vendues à des tiers.
        </p>

        <h2>5. Sous-traitants</h2>
        <p>Nous faisons appel aux sous-traitants suivants dans le cadre du fonctionnement du site :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> (États-Unis) — hébergement du site web
          </li>
          <li>
            <strong>Google Analytics via Google Tag Manager</strong> (États-Unis) — mesure d&apos;audience et analytics
          </li>
        </ul>

        <h2>6. Transferts de données hors Union européenne</h2>
        <p>
          Les données hébergées par Vercel (États-Unis) font l&apos;objet de transferts hors de l&apos;Union européenne encadrés par des clauses contractuelles types conformément à l&apos;article 46.2.c du RGPD.
        </p>

        <h2>7. Durée de conservation</h2>
        <p>
          Vos données personnelles sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact avec nous, conformément aux recommandations de la CNIL.
        </p>

        <h2>8. Cookies</h2>
        <p>
          Le site utilise Google Tag Manager (identifiant : GTM-P6DMKRLC) à des fins de mesure d&apos;audience (analytics). Ces cookies permettent d&apos;analyser la fréquentation et l&apos;utilisation du site afin d&apos;en améliorer le contenu et l&apos;expérience utilisateur.
        </p>

        <h2>9. Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
        </p>
        <ul>
          <li><strong>Droit d&apos;accès</strong> : obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
          <li><strong>Droit de rectification</strong> : demander la correction de données inexactes ou incomplètes</li>
          <li><strong>Droit de suppression</strong> : demander l&apos;effacement de vos données personnelles</li>
          <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données pour des motifs légitimes</li>
          <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et couramment utilisé</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à l&apos;adresse : <a href="mailto:contact@rocket4rpo.com">contact@rocket4rpo.com</a>
        </p>
        <p>
          En cas de litige, vous pouvez introduire une réclamation auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
        </p>

        <h2>10. Modification de la politique</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications prennent effet dès leur publication sur cette page.
        </p>

        <p className="mt-8">
          Pour toute question, contactez-nous via notre <Link href="/contact">page de contact</Link> ou par email à{" "}
          <a href="mailto:contact@rocket4rpo.com">contact@rocket4rpo.com</a>.
        </p>
      </div>
    </section>
  );
}
