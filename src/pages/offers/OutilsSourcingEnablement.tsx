import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, GraduationCap, BarChart3, Settings } from "lucide-react";

const faqs = [
  { question: "Quels outils de sourcing recommandez-vous ?", answer: "Nous travaillons avec une sélection d'outils comme LinkedIn Recruiter, des solutions de sourcing alternatives plus abordables, des ATS modernes et des outils d'automatisation. Notre recommandation dépend de votre contexte et de votre budget." },
  { question: "Proposez-vous des formations ?", answer: "Oui. Nous formons vos équipes à l'utilisation des outils de sourcing, aux techniques d'approche directe, à la rédaction d'InMails efficaces et à l'optimisation de leur process de recrutement." },
  { question: "Pouvez-vous auditer notre stack recrutement actuelle ?", answer: "Absolument. Nous réalisons un audit complet de vos outils, process et KPIs pour identifier les axes d'amélioration et proposer une stack optimisée." },
];

const OutilsSourcingEnablement = () => (
  <Layout>
    <SEO
      title="Outils de sourcing et enablement recrutement"
      description="Sélection d'outils de sourcing abordables, formation de vos équipes et optimisation de votre stack recrutement. Audit, conseil et accompagnement."
      canonical="/offre/outils-sourcing-enablement"
      schema={[
        serviceSchema("Outils de sourcing & enablement", "Sélection d'outils et formation sourcing", "/offre/outils-sourcing-enablement"),
        faqSchema(faqs),
      ]}
    />
    <Breadcrumbs items={[{ label: "Offre", to: "/offre/outils-sourcing-enablement" }, { label: "Outils de sourcing & enablement" }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Enablement</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Optimisez votre stack sourcing et <span className="text-gradient">montez en compétences</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Nous vous aidons à sélectionner les bons outils de sourcing, à former vos équipes et à structurer vos processus de recrutement pour des résultats durables.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Demander un audit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-12 text-center">Nos services enablement</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Settings, title: "Audit de stack", text: "Analyse de vos outils actuels, identification des gaps et recommandations concrètes." },
            { icon: Wrench, title: "Sélection d'outils", text: "Recommandation d'outils de sourcing abordables et performants adaptés à votre contexte." },
            { icon: GraduationCap, title: "Formation", text: "Formation de vos équipes aux techniques de sourcing avancé et d'approche directe." },
            { icon: BarChart3, title: "Optimisation", text: "Mise en place de KPIs, dashboards et processus d'amélioration continue." },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl bg-background border border-border">
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <FAQSection faqs={faqs} />
    <CTASection />
  </Layout>
);

export default OutilsSourcingEnablement;
