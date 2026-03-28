import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, UserCheck, Shield, Zap, Target } from "lucide-react";

const faqs = [
  { question: "Comment fonctionne le TA à temps plein ?", answer: "Un Talent Acquisition Specialist dédié s'intègre à 100% dans vos équipes. Il travaille exclusivement pour vous, utilise vos outils et participe à vos rituels d'équipe." },
  { question: "Quelle est la différence avec un recruteur en CDI ?", answer: "Vous bénéficiez d'une expertise immédiate, sans les délais et coûts de recrutement. Le TA Specialist est opérationnel dès le premier jour et apporte les méthodes éprouvées de Rocket4RPO." },
  { question: "Peut-on convertir la mission en CDI ?", answer: "Oui, si le TA Specialist et vous souhaitez pérenniser la collaboration, nous pouvons organiser une transition vers un CDI." },
];

const TalentAcquisitionTempsPlein = () => (
  <Layout>
    <SEO
      title="Talent Acquisition à temps plein — RPO dédié"
      description="Un Talent Acquisition Specialist dédié à 100% à vos recrutements. Immersion totale, expertise Tech, résultats mesurables."
      canonical="/offre/talent-acquisition-temps-plein"
      schema={[
        serviceSchema("Talent Acquisition à temps plein", "Un TA Specialist dédié à 100%", "/offre/talent-acquisition-temps-plein"),
        faqSchema(faqs),
        breadcrumbSchema([{ name: "Offre", url: "/offre" }, { name: "TA temps plein", url: "/offre/talent-acquisition-temps-plein" }]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Offre", to: "/offre/talent-acquisition-temps-plein" }, { label: "Talent Acquisition à temps plein" }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Temps plein</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Un Talent Acquisition Specialist <span className="text-gradient">dédié à 100%</span> à vos recrutements
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Pour les entreprises en forte croissance qui ont besoin d'un expert recrutement totalement intégré. Immersion complète dans votre culture, vos outils et vos processus.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-12 text-center">Pourquoi choisir un TA à temps plein ?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: UserCheck, title: "Dédié à 100%", text: "Focus total sur vos recrutements, sans dispersion." },
            { icon: Shield, title: "Immersion complète", text: "Connaissance fine de votre culture, stack et exigences." },
            { icon: Zap, title: "Rapidité", text: "Opérationnel immédiatement grâce à notre onboarding structuré." },
            { icon: Target, title: "Résultats", text: "KPIs clairs, reporting régulier, optimisation continue." },
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

export default TalentAcquisitionTempsPlein;
