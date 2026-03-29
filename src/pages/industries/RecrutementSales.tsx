import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { SEO, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Brain,
  Users,
  TrendingUp,
  Briefcase,
  Rocket,
  Building2,
  BarChart3,
  Award,
  Handshake,
  Layers,
  Search,
  ShieldCheck,
  Clock,
  UserCheck,
  Settings,
  Globe,
} from "lucide-react";

const faqs = [
  {
    question: "Quels profils commerciaux recrutez-vous ?",
    answer: "Nous recrutons l'ensemble des profils commerciaux Tech et SaaS : SDR, BDR, Account Executive, Account Manager, Customer Success Manager, Sales Manager, Head of Sales, VP Sales et CRO. Du profil opérationnel au profil stratégique, nous couvrons toute la chaîne commerciale.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises Tech ?",
    answer: "Notre expertise historique est dans la Tech et le SaaS, mais notre méthodologie de qualification des profils commerciaux s'adapte à tous les secteurs. Nous intervenons également dans l'industrie, les services et la finance pour des postes commerciaux à forte valeur ajoutée.",
  },
  {
    question: "Comment évaluez-vous les candidats commerciaux ?",
    answer: "Nous allons au-delà du CV. Nous évaluons la performance réelle : génération de pipeline, taux de conversion, gestion du cycle de vente, capacité de closing, compréhension du marché et alignement avec votre contexte. Chaque candidat est qualifié sur sa capacité à délivrer, pas seulement sur son parcours.",
  },
  {
    question: "Intervenez-vous à l'international ?",
    answer: "Oui. Nous identifions des profils commerciaux capables d'opérer sur des marchés internationaux : vente cross-border, expansion européenne, expérience multi-pays. Notre vivier inclut des profils multilingues avec une expérience avérée de la vente internationale en SaaS.",
  },
  {
    question: "Cette expertise est-elle utilisée dans vos missions RPO ?",
    answer: "Absolument. L'expertise de Rocket4Sales est directement intégrée dans les missions Rocket4RPO. Nos Talent Acquisition Specialists bénéficient de cette lecture métier pour mieux cadrer les besoins, qualifier les profils et accompagner les managers dans leurs décisions de recrutement commercial.",
  },
  {
    question: "Quelle est la différence avec un cabinet de recrutement classique ?",
    answer: "Un cabinet classique évalue un commercial sur son CV et ses entreprises précédentes. Nous évaluons sa performance réelle : sa capacité à générer du pipeline, closer des deals, comprendre un cycle de vente SaaS et s'adapter à votre contexte go-to-market. C'est cette différence qui garantit la qualité de nos recrutements.",
  },
  {
    question: "Combien de temps prend un recrutement de profil commercial ?",
    answer: "Vous recevez une shortlist qualifiée sous 2 à 3 semaines. L'ensemble du process, du cadrage au closing, se déroule généralement en 3 à 5 semaines selon la séniorité du profil et la spécificité du contexte.",
  },
  {
    question: "Recrutez-vous pour des startups early stage ?",
    answer: "Oui. Nous adaptons notre approche au stade de maturité : profils builders pour l'early stage, profils structurés pour les scale-ups, profils spécialisés pour les organisations matures. Chaque contexte nécessite un profil différent et nous savons les identifier.",
  },
  {
    question: "Comment démarrer avec Rocket4RPO pour un recrutement commercial ?",
    answer: "Contactez-nous pour un échange de cadrage. Nous analysons votre besoin, votre contexte go-to-market, votre cycle de vente et vos attentes pour vous proposer les profils les plus adaptés. Premier échange sans engagement.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const roles = [
  {
    icon: Zap,
    title: "SDR / BDR",
    description: "Prospection sortante, génération de pipeline, qualification des leads entrants. Premier maillon de la chaîne commerciale.",
  },
  {
    icon: Target,
    title: "Account Executive",
    description: "Pilotage du cycle de vente complet, démo produit, négociation et closing. Le profil clé de votre croissance revenue.",
  },
  {
    icon: Handshake,
    title: "Account Manager",
    description: "Gestion et développement du portefeuille client, upsell, cross-sell et rétention. La clé de votre croissance organique.",
  },
  {
    icon: Users,
    title: "Customer Success Manager",
    description: "Adoption produit, satisfaction client, réduction du churn et expansion commerciale. Le lien entre produit et revenu.",
  },
  {
    icon: Briefcase,
    title: "Sales Manager",
    description: "Management d'équipe commerciale, coaching, pilotage de la performance et structuration des process de vente.",
  },
  {
    icon: Award,
    title: "Head of Sales / VP Sales",
    description: "Définition de la stratégie commerciale, structuration de l'équipe, mise en place des process go-to-market et pilotage global.",
  },
];

const performanceFactors = [
  {
    icon: BarChart3,
    title: "Génération de pipeline",
    text: "Capacité à construire et alimenter un pipeline qualifié de manière constante et prévisible.",
  },
  {
    icon: Layers,
    title: "Gestion du cycle de vente",
    text: "Maîtrise de chaque étape : discovery, démo, proposition, négociation, closing.",
  },
  {
    icon: Search,
    title: "Qualification",
    text: "Rigueur dans l'identification des opportunités réelles et la priorisation des deals.",
  },
  {
    icon: ShieldCheck,
    title: "Closing",
    text: "Capacité à conclure efficacement, gérer les objections et sécuriser les engagements.",
  },
  {
    icon: Globe,
    title: "Compréhension marché",
    text: "Connaissance fine de l'écosystème, des concurrents et des enjeux business du client.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Analyse du parcours réel",
    text: "Au-delà du CV, nous analysons les environnements de vente traversés, les cycles gérés, les quotas atteints et les outils maîtrisés.",
  },
  {
    step: "02",
    title: "Évaluation de la performance",
    text: "Nous mesurons les résultats concrets : taux de conversion, deal size moyen, % d'atteinte de quota, contribution au pipeline.",
  },
  {
    step: "03",
    title: "Compréhension du cycle de vente",
    text: "Nous vérifions la maîtrise du cycle complet : de la prospection au closing, en passant par la négociation et la gestion d'objections.",
  },
  {
    step: "04",
    title: "Alignement avec votre contexte",
    text: "Nous évaluons la compatibilité du profil avec votre stade de maturité, votre marché cible et votre culture commerciale.",
  },
];

const contextCards = [
  {
    icon: Rocket,
    stage: "Early stage",
    profile: "Profils builders",
    text: "Des commerciaux capables de créer le playbook, d'itérer sur le discours et de closer sans process établi.",
  },
  {
    icon: TrendingUp,
    stage: "Scale-up",
    profile: "Profils structurés",
    text: "Des commerciaux qui savent exécuter dans un cadre en construction, tout en contribuant à sa structuration.",
  },
  {
    icon: Building2,
    stage: "Entreprise mature",
    profile: "Profils spécialisés",
    text: "Des commerciaux experts d'un segment, d'un vertical ou d'un type de cycle de vente spécifique.",
  },
];

const gains = [
  { icon: Target, text: "Meilleure précision de recrutement" },
  { icon: CheckCircle, text: "Meilleure qualité de shortlist" },
  { icon: Clock, text: "Gain de temps pour les managers" },
  { icon: ShieldCheck, text: "Réduction des erreurs de casting" },
  { icon: TrendingUp, text: "Amélioration de la performance commerciale" },
  { icon: UserCheck, text: "Profils validés sur la capacité de delivery" },
];

const RecrutementSales = () => (
  <Layout>
    <SEO
      title="Recrutement commercial SaaS — SDR, AE, Sales Manager Tech"
      description="Recrutez vos profils commerciaux Tech et SaaS avec Rocket4RPO. Plus de 7 ans d'expertise Rocket4Sales intégrée : SDR, Account Executive, Sales Manager, VP Sales."
      canonical="/metiers/recrutement-sales"
      schema={[
        serviceSchema(
          "Recrutement de profils commerciaux Tech et SaaS",
          "Recrutez vos profils commerciaux Tech et SaaS avec Rocket4RPO. Plus de 7 ans d'expertise terrain dans le recrutement sales.",
          "/metiers/recrutement-sales"
        ),
        faqSchema(faqs),
        breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Métiers", url: "/metiers/recrutement-sales" },
          { name: "Recrutement Sales", url: "/metiers/recrutement-sales" },
        ]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Métiers", to: "/metiers/recrutement-sales" }, { label: "Recrutement Sales" }]} />

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-6">
              Expertise métier
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement de profils commerciaux dans la Tech et le SaaS{" "}
              <span className="text-gradient">: une expertise construite sur le terrain</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Fort de plus de 7 ans d'expérience dans le recrutement de profils commerciaux Tech et SaaS via{" "}
              <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-current underline underline-offset-2 hover:text-primary transition-colors">
                Rocket4Sales
              </a>
              , Rocket4RPO apporte une lecture métier unique pour identifier les talents commerciaux qui accéléreront réellement votre croissance.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                Confier un recrutement
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* INTRODUCTION */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Le recrutement commercial SaaS ne peut pas être traité comme un recrutement classique
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-current underline underline-offset-2 hover:text-primary transition-colors">
                  Rocket4Sales
                </a>{" "}
                recrute des profils commerciaux dans l'écosystème Tech et SaaS depuis plus de 7 ans. Cette expérience terrain a permis de construire une compréhension fine des métiers commerciaux, des environnements de vente et des facteurs de performance réels.
              </p>
              <p>
                Aujourd'hui, cette expertise est directement intégrée dans les missions Rocket4RPO. Elle permet de mieux cadrer les besoins, d'améliorer la qualité des recrutements commerciaux et d'apporter une lecture métier précieuse aux équipes Talent Acquisition.
              </p>
              <p className="font-semibold text-foreground">
                Recruter un bon commercial ne se résume pas à lire un CV. Il faut comprendre les cycles de vente, les environnements SaaS, les enjeux go-to-market et la performance réelle des profils.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ROLES */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Métiers commerciaux
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Une expertise spécialisée sur les métiers commerciaux
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Du SDR au VP Sales, nous comprenons les spécificités de chaque rôle et adaptons notre approche au stade de maturité de votre organisation.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <role.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* PERFORMANCE */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Comprendre ce qui fait la performance commerciale
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Recruter un profil commercial performant exige de comprendre les leviers réels de la performance en environnement SaaS.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {performanceFactors.map((factor, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card"
            >
              <factor.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">{factor.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{factor.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* METHODOLOGY */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Méthodologie
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Une méthodologie de qualification éprouvée
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Notre process de qualification va au-delà du CV pour évaluer la capacité réelle de delivery des profils commerciaux.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-0">
          {methodology.map((step, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 relative"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                  {step.step}
                </div>
                {i < methodology.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ROCKET4SALES INTEGRATION */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Synergie
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une expertise{" "}
              <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-current underline underline-offset-2 hover:text-primary transition-colors">
                Rocket4Sales
              </a>{" "}
              intégrée dans Rocket4RPO
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                L'expertise de{" "}
                <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="text-current underline underline-offset-2 hover:text-primary transition-colors">
                  Rocket4Sales
                </a>{" "}
                dans le recrutement commercial SaaS est directement transférée aux missions Rocket4RPO. Ce transfert de compétences permet à nos Talent Acquisition Specialists de :
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Settings, text: "Mieux cadrer les besoins commerciaux avec les hiring managers" },
                { icon: CheckCircle, text: "Qualifier les candidats sur leur performance réelle, pas seulement sur leur parcours" },
                { icon: Brain, text: "Apporter une lecture métier lors des debriefs et des prises de décision" },
                { icon: Handshake, text: "Améliorer la collaboration entre recruteurs et managers commerciaux" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-3 p-4 rounded-xl border border-border bg-card"
                >
                  <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* CONTEXT ADAPTATION */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Adapter le recrutement à votre contexte
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Chaque stade de maturité nécessite un profil commercial différent. Nous identifions le bon profil pour le bon contexte.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contextCards.map((card, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card text-center hover:shadow-lg transition-all duration-300"
            >
              <card.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-3">
                {card.stage}
              </span>
              <h3 className="text-lg font-bold mb-2">{card.profile}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* GAINS */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Ce que vous gagnez concrètement
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {gains.map((gain, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card"
            >
              <gain.icon className="w-6 h-6 text-primary shrink-0" />
              <span className="font-medium">{gain.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <FAQSection faqs={faqs} />

    {/* CTA */}
    <CTASection />
  </Layout>
);

export default RecrutementSales;
