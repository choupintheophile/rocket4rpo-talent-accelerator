import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/lib/seo";

const MentionsLegales = () => (
  <Layout>
    <SEO title="Mentions légales" description="Mentions légales du site Rocket4RPO." canonical="/mentions-legales" noindex />
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Mentions légales</h1>
        <h2>Éditeur du site</h2>
        <p>Rocket4RPO, filiale de Rocket4Sales, groupe Rocket4GTM.</p>
        <p>Siège social : [Adresse à compléter]</p>
        <p>SIRET : [À compléter]</p>
        <p>Directeur de la publication : Clément Martin</p>
        <h2>Hébergement</h2>
        <p>Ce site est hébergé par [Hébergeur à compléter].</p>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, images, logos) est protégé par le droit d'auteur. Toute reproduction est interdite sans autorisation préalable.</p>
        <h2>Contact</h2>
        <p>Pour toute question, contactez-nous via notre <a href="/contact">page de contact</a>.</p>
      </div>
    </section>
  </Layout>
);

export default MentionsLegales;
