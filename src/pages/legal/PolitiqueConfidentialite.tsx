import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/lib/seo";

const PolitiqueConfidentialite = () => (
  <Layout>
    <SEO title="Politique de confidentialité" description="Politique de confidentialité et protection des données personnelles de Rocket4RPO." canonical="/politique-confidentialite" noindex />
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Politique de confidentialité</h1>
        <h2>Données collectées</h2>
        <p>Nous collectons les données personnelles que vous nous transmettez via notre formulaire de contact : nom, prénom, adresse email, entreprise, message.</p>
        <h2>Finalité</h2>
        <p>Ces données sont utilisées uniquement pour répondre à vos demandes et vous proposer nos services de Talent Acquisition.</p>
        <h2>Durée de conservation</h2>
        <p>Vos données sont conservées pendant 3 ans à compter de votre dernier contact avec nous.</p>
        <h2>Vos droits</h2>
        <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Contactez-nous via notre <a href="/contact">page de contact</a>.</p>
      </div>
    </section>
  </Layout>
);

export default PolitiqueConfidentialite;
