import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Award, Network, UserCheck } from "lucide-react";

const faqs = [
  { question: "Rocket4RPO recrute des Talent Acquisition pour d'autres entreprises ?", answer: "Oui. Grâce à notre connaissance profonde du métier de TA, nous identifions et sélectionnons les meilleurs profils Talent Acquisition pour nos clients." },
  { question: "Quels profils TA recrutez-vous ?", answer: "Talent Acquisition Manager, TA Specialist, Head of Talent Acquisition, Recruteur Tech, Sourcer senior. Du junior expérimenté au Head of TA." },
  { question: "Quelle est votre méthodologie de sélection ?", answer: "Approche directe, évaluation technique du métier de TA, assessment des compétences sourcing, entretiens de fit culturel. Nous présentons 3 à 5 candidats qualifiés." },
];

const RecrutementTalentAcquisition = () => (
  <Layout>
    <SEO
      title="Recrutement de Talent Acquisition — trouvez votre TA idéal"
      description="Rocket4RPO recrute des Talent Acquisition Managers et Specialists pour les entreprises Tech. Approche directe, sélection rigoureuse, profils expertisés."
      canonical="/offre/recrutement-talent-acquisition"
      schema={[
        serviceSchema("Recrutement de Talent Acquisition", "Recrutement de TA Managers et Specialists", "/offre/recrutement-talent-acquisition"),
        faqSchema(faqs),
      ]}
    />
    <Breadcrumbs items={[{ label: "Offre", to: "/offre/recrutement-talent-acquisition" }, { label: "Recrutement de Talent Acquisition" }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Recrutement de TA</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Nous recrutons les <span className="text-gradient">meilleurs Talent Acquisition</span> pour vos équipes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Parce que nous exerçons le métier de Talent Acquisition au quotidien, nous savons identifier les profils qui feront la différence dans votre organisation.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Recruter un TA <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-12 text-center">Notre approche</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Search, title: "Approche directe", text: "Identification ciblée des meilleurs TA sur le marché via notre réseau et le sourcing avancé." },
            { icon: Award, title: "Évaluation experte", text: "Assessment des compétences sourcing, process, outils et soft skills spécifiques au métier." },
            { icon: Network, title: "Réseau qualifié", text: "Accès à un vivier de TA Specialists et Managers constitué au fil de 7 ans d'activité." },
            { icon: UserCheck, title: "Matching culturel", text: "Sélection de profils alignés avec votre culture, votre stack et vos ambitions." },
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

export default RecrutementTalentAcquisition;
