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
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Clock,
  UserCheck,
  Settings,
  Briefcase,
  LineChart,
  Gauge,
  Calculator,
  FileText,
  PieChart,
  Landmark,
  Scale,
  Handshake,
  Search,
} from "lucide-react";

const faqs = [
  { question: "Quels profils Finance recrutez-vous ?", answer: "Nous recrutons l'ensemble des profils Finance Tech et SaaS : CFO / DAF, VP Finance, Head of Finance, FP&A Analyst / Manager, Contrôleur de gestion, Comptable, Trésorier, Revenue Operations Finance et Office Manager Finance." },
  { question: "Recrutez-vous des profils Finance pour des startups ?", answer: "Oui. Nous comprenons les enjeux spécifiques des startups et scale-ups en matière de structuration financière : levées de fonds, modélisation SaaS, mise en place des process financiers et pilotage de la trésorerie." },
  { question: "Comment évaluez-vous un profil Finance ?", answer: "Nous évaluons la rigueur, la fiabilité, la compréhension des modèles SaaS (ARR, MRR, churn, LTV/CAC) et la capacité à structurer la fonction Finance dans un environnement en croissance." },
  { question: "Comprenez-vous les spécificités financières du SaaS ?", answer: "Absolument. Nos recruteurs spécialisés comprennent les métriques SaaS, les modèles de revenue récurrent, les enjeux de cash burn, de runway et de reporting investisseurs." },
  { question: "Travaillez-vous avec les CFO directement ?", answer: "Oui. Nous collaborons étroitement avec les CFO, DAF et VP Finance pour comprendre les enjeux de structuration, de reporting et de pilotage financier propres à chaque organisation." },
  { question: "Recrutez-vous des profils FP&A ?", answer: "Oui. Le FP&A est un rôle clé en scale-up. Nous évaluons la capacité à construire des modèles financiers, piloter le budget, produire des analyses décisionnelles et collaborer avec les équipes opérationnelles." },
  { question: "Quelle est la différence avec un cabinet de recrutement Finance classique ?", answer: "Un cabinet classique évalue un profil Finance sur son parcours et ses certifications. Nous évaluons sa capacité à structurer, piloter et contribuer à la croissance dans un environnement Tech à forte vélocité." },
  { question: "Combien de temps prend un recrutement Finance ?", answer: "Vous recevez une shortlist qualifiée sous 2 à 3 semaines. Le process complet se déroule en 3 à 5 semaines selon la séniorité et la spécificité du poste." },
  { question: "Cette expertise Finance est-elle utilisée dans vos missions RPO ?", answer: "Oui. Nos Talent Acquisition spécialisés Finance sont déployés dans les missions Rocket4RPO. Ils apportent une compréhension des enjeux financiers qui améliore la qualité des recrutements et la collaboration avec les équipes Finance." },
  { question: "Comment démarrer un recrutement Finance avec Rocket4RPO ?", answer: "Contactez-nous pour un échange de cadrage. Nous analysons votre besoin, votre stade de maturité financière, vos outils et vos attentes pour vous proposer les profils les plus adaptés. Premier échange sans engagement." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const roles = [
  { icon: Landmark, title: "CFO / DAF", description: "Vision stratégique financière, pilotage de la trésorerie, relations investisseurs, structuration de la fonction Finance et gouvernance." },
  { icon: LineChart, title: "FP&A Analyst / Manager", description: "Modélisation financière, budget, forecast, analyses décisionnelles et reporting de performance pour piloter la croissance." },
  { icon: Calculator, title: "Contrôleur de gestion", description: "Suivi des marges, analyse des coûts, construction des reportings opérationnels et pilotage budgétaire." },
  { icon: FileText, title: "Comptable / Responsable comptable", description: "Tenue comptable, clôtures, fiscalité, audit et conformité réglementaire dans un environnement en évolution rapide." },
  { icon: Briefcase, title: "Head of Finance / VP Finance", description: "Structuration de l'équipe Finance, mise en place des process, pilotage des KPIs financiers et accompagnement de la direction." },
  { icon: PieChart, title: "Revenue Operations Finance", description: "Alignement entre Finance, Sales et Operations. Pilotage du revenue, analyse de la performance commerciale et optimisation des process." },
];

const financialChallenges = [
  { icon: BarChart3, title: "Pilotage de la croissance", text: "Construire des modèles financiers qui accompagnent la croissance tout en maintenant la visibilité sur le cash et la rentabilité." },
  { icon: Gauge, title: "Métriques SaaS", text: "Maîtrise des KPIs spécifiques : ARR, MRR, Net Revenue Retention, LTV/CAC, Rule of 40, cash burn rate." },
  { icon: Scale, title: "Structuration financière", text: "Mise en place des process, outils et reportings adaptés au stade de maturité de l'entreprise." },
  { icon: Target, title: "Reporting investisseurs", text: "Capacité à produire des reportings clairs, fiables et adaptés aux attentes des investisseurs et du board." },
  { icon: ShieldCheck, title: "Conformité & audit", text: "Rigueur dans la gestion comptable, fiscale et réglementaire, même dans un environnement à forte vélocité." },
  { icon: Search, title: "Analyse décisionnelle", text: "Transformer la data financière en insights actionnables pour éclairer les décisions stratégiques." },
];

const rigorAspects = [
  { step: "01", title: "Fiabilité des données", text: "Un profil Finance doit garantir l'exactitude et la fiabilité des données financières. Nous évaluons cette rigueur à travers des cas concrets." },
  { step: "02", title: "Respect des process", text: "La capacité à mettre en place et respecter des process financiers structurés, même dans un environnement startup en mouvement permanent." },
  { step: "03", title: "Anticipation des risques", text: "Un bon profil Finance anticipe les risques de trésorerie, de conformité et de pilotage. Nous vérifions cette capacité d'anticipation." },
  { step: "04", title: "Communication financière", text: "Savoir traduire des données complexes en analyses claires pour les équipes opérationnelles, la direction et les investisseurs." },
];

const methodology = [
  { step: "01", title: "Analyse du contexte financier", text: "Compréhension de votre stade de maturité, de vos outils, de vos enjeux de structuration et de vos attentes en termes de reporting." },
  { step: "02", title: "Évaluation de la rigueur", text: "Au-delà des compétences techniques, nous évaluons la fiabilité, la précision et la capacité à structurer des process financiers robustes." },
  { step: "03", title: "Vérification de l'expertise SaaS", text: "Nous vérifions la compréhension des métriques SaaS, des modèles de revenue récurrent et des enjeux spécifiques aux entreprises Tech." },
  { step: "04", title: "Alignement avec votre organisation", text: "Nous vérifions la compatibilité avec votre culture, votre stade de croissance et les attentes de votre direction et de vos investisseurs." },
];

const gains = [
  { icon: Target, text: "Recrutements Finance plus précis" },
  { icon: CheckCircle, text: "Shortlists de meilleure qualité" },
  { icon: Clock, text: "Gain de temps pour vos équipes" },
  { icon: ShieldCheck, text: "Réduction des erreurs de casting" },
  { icon: TrendingUp, text: "Profils capables de structurer la croissance" },
  { icon: UserCheck, text: "Candidats validés sur la rigueur et la fiabilité" },
];

const RecrutementFinance = () => (
  <Layout>
    <SEO
      title="Recrutement Finance SaaS — CFO, FP&A, Contrôle de gestion"
      description="Recrutez vos profils Finance Tech et SaaS avec Rocket4RPO. CFO, FP&A, Contrôleur de gestion, Comptable. Qualification basée sur la rigueur, la fiabilité et la compréhension des enjeux SaaS."
      canonical="/metiers/recrutement-finance"
      schema={[
        serviceSchema("Recrutement de profils Finance Tech et SaaS", "Recrutez vos profils Finance avec Rocket4RPO. Talent Acquisition spécialisés pour identifier des profils financiers performants dans l'écosystème Tech.", "/metiers/recrutement-finance"),
        faqSchema(faqs),
        breadcrumbSchema([{ name: "Accueil", url: "/" }, { name: "Métiers", url: "/metiers/recrutement-finance" }, { name: "Recrutement Finance", url: "/metiers/recrutement-finance" }]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Métiers", to: "/metiers/recrutement-finance" }, { label: "Recrutement Finance" }]} />

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-6">Expertise métier</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement de profils Finance dans la Tech et le SaaS{" "}
              <span className="text-gradient">: rigueur, fiabilité et vision croissance</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO s'appuie sur des Talent Acquisition spécialisés en Finance pour identifier les profils capables de structurer, piloter et sécuriser la croissance financière de votre entreprise.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background hover:bg-accent transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le recrutement Finance en Tech exige bien plus qu'un bon CV</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>La fonction Finance dans une entreprise Tech n'a rien à voir avec la Finance traditionnelle. Elle doit accompagner une croissance rapide, piloter des métriques spécifiques (ARR, burn rate, runway), structurer des process dans un environnement en mouvement permanent et dialoguer avec des investisseurs exigeants.</p>
              <p>Un recruteur généraliste ne peut pas évaluer la capacité d'un profil Finance à opérer dans cet environnement. Il faut comprendre les enjeux business, la structuration financière et les spécificités du modèle SaaS.</p>
              <p className="font-semibold text-foreground">C'est pourquoi Rocket4RPO déploie des Talent Acquisition spécialisés Finance, capables d'évaluer la rigueur, la fiabilité et la vision croissance des profils financiers.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ROLES */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Métiers Finance</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Une expertise spécialisée sur les métiers Finance</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Du Comptable au CFO, nous comprenons les spécificités de chaque rôle financier et évaluons les candidats sur leur capacité à structurer et piloter la performance.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
              <role.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{role.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FINANCIAL CHALLENGES */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Compréhension des enjeux financiers</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Nos recruteurs comprennent les défis financiers spécifiques aux entreprises Tech et SaaS.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {financialChallenges.map((item, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
              <item.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* RIGOR */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Rigueur & fiabilité</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Évaluer la rigueur et la fiabilité</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">En Finance, la rigueur n'est pas une option. Nous évaluons chaque candidat sur sa capacité à garantir la fiabilité des données et des process.</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-0">
          {rigorAspects.map((step, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex gap-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{step.step}</div>
                {i < rigorAspects.length - 1 && <div className="w-px flex-1 bg-border my-2" />}
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

    {/* METHODOLOGY */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Méthodologie</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Méthodologie de qualification Finance</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Notre process évalue la capacité réelle des profils Finance à structurer et piloter la performance.</p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-0">
          {methodology.map((step, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex gap-6 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">{step.step}</div>
                {i < methodology.length - 1 && <div className="w-px flex-1 bg-border my-2" />}
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

    {/* SAAS SPECIFICITY */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Spécificité SaaS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">La Finance SaaS : un métier à part</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>La Finance dans une entreprise SaaS obéit à des règles spécifiques. Le modèle de revenue récurrent, les métriques de rétention, le pilotage du cash burn et la relation avec les investisseurs exigent des compétences que la Finance traditionnelle ne couvre pas.</p>
              <p>Nos recruteurs comprennent ces spécificités et évaluent chaque candidat sur sa maîtrise des métriques SaaS : ARR, MRR, Net Revenue Retention, LTV/CAC, Rule of 40, runway et unit economics.</p>
              <p className="font-semibold text-foreground">Résultat : des profils Finance qui comprennent votre modèle et sont capables de piloter votre croissance dès le premier jour.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* RPO INTEGRATION */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Expertise intégrée</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Une expertise Finance intégrée dans Rocket4RPO</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nos Talent Acquisition spécialisés Finance sont directement intégrés dans les missions Rocket4RPO. Ils apportent une compréhension fine des enjeux financiers qui améliore significativement la qualité des recrutements.</p>
              <p>Cette spécialisation permet de dialoguer efficacement avec les CFO et VP Finance, de challenger les briefs de recrutement et de qualifier les candidats sur leur capacité à structurer et piloter la performance financière.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Settings, text: "Cadrage précis des besoins financiers avec les hiring managers" },
                { icon: CheckCircle, text: "Qualification des candidats sur la rigueur et la fiabilité" },
                { icon: Brain, text: "Lecture métier lors des debriefs et prises de décision" },
                { icon: Handshake, text: "Collaboration renforcée entre recruteurs et équipes Finance" },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
                  <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* GAINS */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Ce que vous gagnez concrètement</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {gains.map((gain, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card">
              <gain.icon className="w-6 h-6 text-primary shrink-0" />
              <span className="font-medium">{gain.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <FAQSection faqs={faqs} />

    <CTASection
      title="Besoin de recruter un profil Finance capable de structurer votre croissance ?"
      subtitle="Nos Talent Acquisition spécialisés Finance sont prêts à identifier les profils qui piloteront votre performance financière."
      ctaLabel="Confier mon recrutement Finance"
    />
  </Layout>
);

export default RecrutementFinance;
