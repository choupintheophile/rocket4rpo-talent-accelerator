import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, TrendingUp, CheckCircle } from "lucide-react";

const faqs = [
  { question: "Qu'est-ce que le Talent Acquisition à temps partagé ?", answer: "C'est un modèle où un Talent Acquisition Specialist expérimenté travaille pour votre entreprise quelques jours par semaine. Vous bénéficiez d'une expertise senior sans le coût d'un recruteur à temps plein." },
  { question: "Combien de jours par semaine un TA à temps partagé est-il disponible ?", answer: "Le format est flexible : de 1 à 4 jours par semaine selon vos besoins. Nous ajustons le rythme en fonction de votre volume de recrutement." },
  { question: "Quels types de postes un TA à temps partagé peut-il recruter ?", answer: "Nos TA Specialists couvrent les fonctions Sales, IT, Finance, Marketing et Support. Ils sont particulièrement experts du marché Tech et SaaS." },
  { question: "Quelle est la durée minimale d'engagement ?", answer: "Nous recommandons un engagement de 3 mois minimum pour permettre au TA Specialist de s'immerger dans votre culture et vos processus." },
];

const TalentAcquisitionTempsPartage = () => (
  <Layout>
    <SEO
      title="Talent Acquisition à temps partagé — RPO flexible"
      description="Intégrez un Talent Acquisition Specialist expérimenté quelques jours par semaine. Expertise immédiate, flexibilité maximale pour vos recrutements Tech."
      canonical="/offre/talent-acquisition-temps-partage"
      schema={[
        serviceSchema("Talent Acquisition à temps partagé", "Un TA Specialist intégré à vos équipes quelques jours par semaine", "/offre/talent-acquisition-temps-partage"),
        faqSchema(faqs),
        breadcrumbSchema([{ name: "Offre", url: "/offre" }, { name: "TA temps partagé", url: "/offre/talent-acquisition-temps-partage" }]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Offre", to: "/offre/talent-acquisition-temps-partage" }, { label: "Talent Acquisition à temps partagé" }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Temps partagé</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Un expert Talent Acquisition intégré à vos équipes, <span className="text-gradient">à votre rythme</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Vous avez des recrutements à mener mais pas besoin d'un recruteur à temps plein ? Notre modèle de Talent Acquisition à temps partagé vous donne accès à une expertise senior, quelques jours par semaine, avec une immersion totale dans votre culture.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
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
        <h2 className="text-3xl font-bold mb-12 text-center">Les avantages du temps partagé</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Clock, title: "Flexibilité", text: "1 à 4 jours par semaine, ajustables selon vos besoins de recrutement." },
            { icon: Users, title: "Expertise senior", text: "Des TA Specialists avec 3+ ans d'expérience en recrutement Tech." },
            { icon: TrendingUp, title: "Coût optimisé", text: "L'expertise d'un TA senior sans le coût d'un CDI à temps plein." },
            { icon: CheckCircle, title: "Intégration rapide", text: "Opérationnel en quelques jours grâce à notre process d'onboarding structuré." },
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

export default TalentAcquisitionTempsPartage;
