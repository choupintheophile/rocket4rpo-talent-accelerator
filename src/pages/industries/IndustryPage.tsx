import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IndustryPageProps {
  slug: string;
  title: string;
  h1: string;
  h1Accent: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  roles: string[];
  faqs: { question: string; answer: string }[];
}

const IndustryPage = ({ slug, title, h1, h1Accent, description, metaTitle, metaDescription, roles, faqs }: IndustryPageProps) => (
  <Layout>
    <SEO
      title={metaTitle}
      description={metaDescription}
      canonical={`/metiers/${slug}`}
      schema={[
        serviceSchema(title, metaDescription, `/metiers/${slug}`),
        faqSchema(faqs),
      ]}
    />
    <Breadcrumbs items={[{ label: "Métiers", to: `/metiers/${slug}` }, { label: title }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {h1} <span className="text-gradient">{h1Accent}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{description}</p>
            <div className="mt-8">
              <a href="https://bit.ly/4bJGsuZ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-8 text-center">Postes que nous recrutons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {roles.map((role, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl bg-background border border-border text-center font-medium">
              {role}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <FAQSection faqs={faqs} />
    <CTASection />
  </Layout>
);

export default IndustryPage;

// Industry page configs
export const salesConfig: IndustryPageProps = {
  slug: "recrutement-sales",
  title: "Recrutement Sales",
  h1: "Recrutement de profils",
  h1Accent: "Sales & Business Development",
  description: "Nos TA Specialists sont experts du marché des profils commerciaux Tech : SDR, BDR, Account Executive, Sales Manager, VP Sales. Nous identifions les talents qui accéléreront votre croissance commerciale.",
  metaTitle: "Recrutement Sales — SDR, AE, Sales Manager Tech",
  metaDescription: "Recrutez vos profils Sales Tech avec Rocket4RPO : SDR, Account Executive, Sales Manager, VP Sales. Approche directe et expertise marché SaaS.",
  roles: ["SDR / BDR", "Account Executive", "Sales Manager", "Key Account Manager", "VP Sales / CRO", "Sales Operations", "Customer Success Manager", "Head of Sales"],
  faqs: [
    { question: "Quels profils Sales recrutez-vous ?", answer: "Du SDR au VP Sales, en passant par les Account Executives, Sales Managers, KAM et CSM. Nous couvrons l'ensemble de la chaîne commerciale." },
    { question: "Connaissez-vous le marché Sales Tech ?", answer: "Absolument. C'est l'ADN de Rocket4Sales depuis 7 ans. Nous avons une connaissance fine des rémunérations, attentes et parcours des profils Sales Tech." },
  ],
};

export const itConfig: IndustryPageProps = {
  slug: "recrutement-it",
  title: "Recrutement IT / Tech",
  h1: "Recrutement de profils",
  h1Accent: "IT, Engineering & Tech",
  description: "Développeurs, DevOps, Data Engineers, Product Managers : nous sourceons et qualifions les profils tech les plus recherchés du marché grâce à notre expertise de l'écosystème Tech.",
  metaTitle: "Recrutement IT & Tech — Développeurs, DevOps, Product",
  metaDescription: "Recrutez vos profils Tech avec Rocket4RPO : développeurs, DevOps, Data, Product. Sourcing avancé et expertise du marché tech français.",
  roles: ["Développeur Backend", "Développeur Full-Stack", "Développeur Frontend", "DevOps / SRE", "Data Engineer", "Data Scientist", "Product Manager", "CTO / VP Engineering"],
  faqs: [
    { question: "Sourcez-vous des profils tech pénuriques ?", answer: "Oui. Notre expertise en approche directe et notre connaissance des communautés tech nous permettent d'identifier des profils que les méthodes classiques ne trouvent pas." },
    { question: "Travaillez-vous avec les CTO directement ?", answer: "Oui. Nous collaborons étroitement avec les CTO et VP Engineering pour comprendre les enjeux techniques et culturels de chaque poste." },
  ],
};

export const financeConfig: IndustryPageProps = {
  slug: "recrutement-finance",
  title: "Recrutement Finance",
  h1: "Recrutement de profils",
  h1Accent: "Finance & Operations",
  description: "DAF, contrôleurs de gestion, comptables, FP&A : nous recrutons les profils Finance qui structurent la croissance de votre entreprise Tech.",
  metaTitle: "Recrutement Finance — DAF, Contrôle de gestion, FP&A",
  metaDescription: "Recrutez vos profils Finance avec Rocket4RPO : DAF, contrôleurs de gestion, FP&A, comptables. Expertise recrutement dans l'écosystème Tech.",
  roles: ["DAF / CFO", "Contrôleur de gestion", "FP&A Analyst", "Comptable", "Trésorier", "Head of Finance", "Office Manager Finance"],
  faqs: [
    { question: "Recrutez-vous des profils Finance pour des startups ?", answer: "Oui. Nous comprenons les enjeux spécifiques des startups et scale-ups en matière de structuration financière." },
  ],
};

export const marketingConfig: IndustryPageProps = {
  slug: "recrutement-marketing",
  title: "Recrutement Marketing",
  h1: "Recrutement de profils",
  h1Accent: "Marketing & Growth",
  description: "Head of Marketing, Growth Manager, Content Manager, Brand Manager : nous identifions les talents marketing qui construiront votre visibilité et votre acquisition.",
  metaTitle: "Recrutement Marketing — Growth, Content, Brand Manager",
  metaDescription: "Recrutez vos profils Marketing avec Rocket4RPO : Growth, Content, Brand Manager. Approche directe et expertise du marché tech français.",
  roles: ["Head of Marketing / CMO", "Growth Manager", "Content Manager", "Brand Manager", "Product Marketing Manager", "SEO Manager", "Demand Generation Manager", "Marketing Operations"],
  faqs: [
    { question: "Recrutez-vous des profils Growth ?", answer: "Oui, c'est l'un de nos points forts. Nous comprenons les enjeux d'acquisition et de rétention propres aux entreprises Tech." },
  ],
};

export const supportConfig: IndustryPageProps = {
  slug: "recrutement-support",
  title: "Recrutement Support",
  h1: "Recrutement de",
  h1Accent: "fonctions support & transverses",
  description: "Office Manager, People / RH, Legal, Customer Support : nous recrutons les profils support qui structurent votre organisation et soutiennent votre croissance.",
  metaTitle: "Recrutement fonctions support — RH, Legal, Office Manager",
  metaDescription: "Recrutez vos fonctions support avec Rocket4RPO : RH, Legal, Office Manager, Customer Support. Expertise recrutement écosystème Tech.",
  roles: ["Office Manager", "People / RH Manager", "Legal / Juriste", "Customer Support Manager", "Executive Assistant", "Head of People", "Workplace Manager"],
  faqs: [
    { question: "Recrutez-vous des profils RH pour des entreprises Tech ?", answer: "Oui. Nous recrutons des profils People, RH, Office Manager et fonctions support adaptés aux cultures et rythmes des entreprises tech." },
  ],
};
