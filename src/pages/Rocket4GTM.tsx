import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Rocket4GTM = () => (
  <Layout>
    <SEO
      title="Rocket4GTM — le groupe derrière Rocket4RPO et Rocket4Sales"
      description="Rocket4GTM est un groupe d'experts go-to-market qui aide les entreprises Tech à accélérer leur croissance via le recrutement, le Talent Acquisition et le consulting GTM."
      canonical="/rocket4gtm"
    />
    <Breadcrumbs items={[{ label: "Rocket4GTM" }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Le groupe</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Rocket4GTM — votre partenaire <span className="text-gradient">go-to-market</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Rocket4GTM est un groupe d'experts qui accompagne les entreprises Tech dans leur performance go-to-market : recrutement commercial, Talent Acquisition, stratégie de croissance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-12 text-center">L'écosystème Rocket4GTM</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-background border border-border">
            <h3 className="text-xl font-bold mb-3"><a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">Rocket4Sales</a></h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Cabinet de recrutement spécialisé dans les profils commerciaux Tech & SaaS. 7+ ans d'expertise, 200+ recrutements réalisés.</p>
            <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Découvrir <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="p-8 rounded-2xl bg-background border border-primary/30">
            <h3 className="text-xl font-bold mb-3">Rocket4RPO</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Talent Acquisition as a Service : experts TA intégrés à vos équipes, recrutement de profils TA, sourcing enablement.</p>
            <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Vous êtes ici <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-tight text-center">
        <h2 className="text-3xl font-bold mb-4">Une approche intégrée du go-to-market</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          En combinant l'expertise commerciale de <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">Rocket4Sales</a> et l'expertise Talent Acquisition de Rocket4RPO, le groupe Rocket4GTM offre une réponse complète aux enjeux de croissance des entreprises Tech.
        </p>
        <a href="https://bit.ly/4bJGsuZ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          Échanger avec le groupe <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  </Layout>
);

export default Rocket4GTM;
