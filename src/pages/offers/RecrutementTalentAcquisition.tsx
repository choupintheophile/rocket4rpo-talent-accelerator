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
  Timer,
  Zap,
  Brain,
  Search,
  FileCheck,
  ShieldCheck,
  Users,
  TrendingUp,
  Briefcase,
  Rocket,
  Layers,
  Building2,
  Eye,
  Crosshair,
  Globe,
  Database,
  UserCheck,
  BarChart3,
  Clock,
  Award,
  Settings,
  Handshake,
} from "lucide-react";

const faqs = [
  {
    question: "Pourquoi passer par Rocket4RPO pour recruter un Talent Acquisition ?",
    answer: "Parce que nous exerçons le métier de Talent Acquisition au quotidien. Nous ne nous contentons pas de lire des CV : nous évaluons la capacité réelle d'exécution des candidats — leur sourcing, leur qualification, leur rigueur opérationnelle et leur aptitude à collaborer efficacement avec les managers. Cette lecture métier fait toute la différence dans la qualité des profils que nous présentons.",
  },
  {
    question: "Quelle différence avec un cabinet de recrutement classique ?",
    answer: "Un cabinet classique évalue un recruteur comme n'importe quel autre profil : parcours, entreprises précédentes, années d'expérience. Rocket4RPO va plus loin en évaluant la capacité de delivery réelle : comment le candidat source, qualifie, gère un pipeline, interagit avec les managers et pilote la performance. C'est cette différence qui vous garantit des profils capables de délivrer dès leur prise de poste.",
  },
  {
    question: "Quels profils de Talent Acquisition recrutez-vous ?",
    answer: "Nous recrutons l'ensemble du spectre Talent Acquisition : TA Specialist, TA Manager, Head of Talent Acquisition, Sourcer senior, Recruteur Tech, TA Lead, TA Ops. Du profil opérationnel expert au profil stratégique capable de structurer une fonction recrutement complète.",
  },
  {
    question: "Combien de temps prend le recrutement d'un Talent Acquisition ?",
    answer: "Notre process est conçu pour être rapide et rigoureux. Vous recevez une shortlist qualifiée sous 2 à 3 semaines. L'ensemble du process, du cadrage au closing, se déroule généralement en 3 à 5 semaines selon la séniorité du profil et la complexité du contexte.",
  },
  {
    question: "Comment évaluez-vous les candidats Talent Acquisition ?",
    answer: "Nous utilisons une méthodologie propriétaire qui évalue quatre dimensions clés : la capacité de sourcing (stratégie, outils, conversion), la qualité de qualification (rigueur, pertinence, profondeur), la maturité opérationnelle (process, KPIs, autonomie) et la capacité de collaboration managériale (communication, influence, structuration). Chaque candidat est évalué sur sa performance réelle, pas uniquement sur son parcours.",
  },
  {
    question: "Intervenez-vous à l'international ?",
    answer: "Oui. Nous identifions des profils Talent Acquisition capables d'opérer dans des contextes internationaux : recrutement multi-pays, sourcing cross-border, expérience de marchés européens ou globaux. Notre vivier inclut des profils multilingues avec une expérience avérée du recrutement international.",
  },
  {
    question: "Pouvez-vous aussi structurer notre fonction recrutement ?",
    answer: "Absolument. Au-delà du recrutement de profils TA, nous proposons des offres complémentaires : Talent Acquisition à temps partagé, à temps plein, et Sourcing & Enablement. Nous pouvons vous accompagner dans la structuration complète de votre fonction recrutement.",
  },
  {
    question: "Travaillez-vous uniquement avec la Tech ?",
    answer: "Non. Nos Talent Acquisition Specialists interviennent dans tous les secteurs : Tech, SaaS, Industrie, Services, Finance, Santé, Retail. Notre méthodologie s'adapte à chaque marché et à ses spécificités.",
  },
  {
    question: "Proposez-vous aussi du RPO ?",
    answer: "Oui. Notre offre de Talent Acquisition à temps plein ou à temps partagé fonctionne sur un modèle RPO : un expert intégré à vos équipes, dédié à vos recrutements, avec une méthodologie structurée et un pilotage de la performance continu.",
  },
  {
    question: "Comment démarrer ?",
    answer: "Contactez-nous pour un échange de cadrage. Nous analysons votre besoin, votre contexte et vos attentes pour vous proposer les profils les plus adaptés. Premier échange sans engagement.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const timelineSteps = [
  {
    period: "Jour 1–3",
    title: "Cadrage du besoin",
    text: "Analyse approfondie du contexte, de la culture, des enjeux business et des compétences clés attendues. Définition d'une scorecard précise pour cibler les bons profils.",
    icon: Target,
  },
  {
    period: "Jour 4–10",
    title: "Sourcing et mapping",
    text: "Activation de notre vivier, sourcing ciblé et approche directe des meilleurs profils Talent Acquisition du marché. Cartographie des candidats potentiels.",
    icon: Search,
  },
  {
    period: "Semaine 2–3",
    title: "Shortlist qualifiée",
    text: "Évaluation approfondie des candidats sur leurs capacités réelles de delivery : sourcing, qualification, maturité opérationnelle. Présentation de 3 à 5 profils validés.",
    icon: FileCheck,
  },
  {
    period: "Semaine 3–5",
    title: "Process & closing",
    text: "Coordination du process d'entretiens, accompagnement des candidats et des managers, négociation et sécurisation du closing.",
    icon: Handshake,
  },
  {
    period: "Post-recrutement",
    title: "Suivi et onboarding",
    text: "Suivi d'intégration structuré pour garantir une prise de poste réussie et une montée en puissance rapide du profil recruté.",
    icon: ShieldCheck,
  },
];

const profileTypes = [
  {
    icon: Award,
    title: "Profils issus des leaders du marché",
    text: "TA Specialists et Managers ayant opéré dans des environnements exigeants : scale-ups, SaaS leaders, entreprises à forte croissance.",
  },
  {
    icon: TrendingUp,
    title: "Profils à forte intensité de recrutement",
    text: "Experts habitués à gérer 10 à 20+ recrutements simultanés avec méthode, priorisation et constance d'exécution.",
  },
  {
    icon: Globe,
    title: "Profils internationaux",
    text: "Talent Acquisition multilingues, expérimentés en recrutement cross-border et multi-pays, capables d'opérer sur des marchés européens et globaux.",
  },
  {
    icon: Database,
    title: "Profils tech & data-driven",
    text: "TA Specialists maîtrisant les outils modernes de sourcing, ATS, recrutement et capables de piloter leur performance par la data.",
  },
  {
    icon: Crosshair,
    title: "Experts en sourcing et chasse",
    text: "Sourcers seniors et chasseurs de têtes spécialisés dans l'identification et l'approche directe de profils pénuriques et passifs.",
  },
  {
    icon: Eye,
    title: "Experts en qualification",
    text: "Profils reconnus pour la rigueur de leur qualification : entretiens structurés, évaluation des compétences, assessment culturel approfondi.",
  },
];

const RecrutementTalentAcquisition = () => (
  <Layout>
    <SEO
      title="Recrutement de Talent Acquisition — Recruteur de recruteurs expert"
      description="Rocket4RPO recrute vos Talent Acquisition Specialists et Managers sur la base de leur performance réelle. Sélection exigeante, expertise métier, shortlist qualifiée en 2 à 3 semaines."
      canonical="/offre/recrutement-talent-acquisition"
      schema={[
        serviceSchema(
          "Recrutement de Talent Acquisition",
          "Recrutement de Talent Acquisition Specialists et Managers basé sur la performance réelle. Sélection exigeante, expertise métier, vivier qualifié.",
          "/offre/recrutement-talent-acquisition"
        ),
        faqSchema(faqs),
        breadcrumbSchema([
          { name: "Offres", url: "/offre/recrutement-talent-acquisition" },
          { name: "Recrutement de Talent Acquisition", url: "/offre/recrutement-talent-acquisition" },
        ]),
      ]}
    />
    <Breadcrumbs
      items={[
        { label: "Offres", to: "/offre/recrutement-talent-acquisition" },
        { label: "Recrutement de Talent Acquisition" },
      ]}
    />

    {/* ── 1. HERO ── */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Recruteur de recruteurs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement de Talent Acquisition :{" "}
              <span className="text-gradient">identifiez les recruteurs capables de délivrer réellement</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO en plus du placement en RPO, notre société recrute pour vous des Talent Acquisition Specialists et Managers capables de structurer, piloter et accélérer vos recrutements. Notre approche repose sur une compréhension fine du métier et une sélection exigeante basée sur la performance réelle des profils.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Confier un recrutement <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors"
              >
                Échanger avec un expert
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 2. INTRODUCTION ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Recruter un Talent Acquisition : un enjeu stratégique souvent sous-estimé
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Recruter un Talent Acquisition en CDI est une décision structurante pour votre organisation. Pourtant, ce recrutement est encore trop souvent abordé comme celui de n'importe quel autre profil : analyse du CV, entreprises précédentes, nombre d'années d'expérience. Cette approche est insuffisante.
              </p>
              <p>
                <strong className="text-foreground">Un CV bien construit ne permet pas d'évaluer la capacité réelle d'un recruteur à délivrer dans votre contexte.</strong> Il ne reflète ni la précision de son sourcing, ni la rigueur de sa qualification, ni sa capacité à collaborer efficacement avec vos managers, ni son aptitude à maintenir un haut niveau d'exécution dans la durée.
              </p>
              <p>
                Les conséquences d'un mauvais recrutement sont immédiates :{" "}
                <strong className="text-foreground">
                  pipelines candidats peu qualifiés, shortlists décalées, mobilisation excessive des équipes opérationnelles, ralentissement des processus et difficulté à atteindre vos objectifs de recrutement.
                </strong>
              </p>
              <p>
                Chez Rocket4RPO, nous abordons le recrutement de Talent Acquisition comme un métier à part entière. Grâce à un screening continu de profils et à une méthodologie propriétaire, nous sommes en mesure d'identifier des recruteurs capables de performer réellement dans votre environnement et de s'inscrire durablement dans votre organisation.
              </p>
              <p>
                Nous recrutons pour vous des Talent Acquisition Specialists et Managers destinés à être intégrés en CDI, sélectionnés non pas sur leur parcours uniquement, mais sur leur{" "}
                <strong className="text-foreground">
                  capacité concrète à structurer, exécuter et faire progresser votre fonction recrutement.
                </strong>
              </p>
              <p>
                <strong className="text-foreground">Notre approche est simple : recruter des recruteurs capables de délivrer, pas seulement de présenter.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 3. NOTRE VISION ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Notre vision
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Tous les recruteurs ne se valent pas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Recruter un recruteur, c'est recruter une capacité de performance. Pas un CV.
          </p>
        </motion.div>

        <div className="grid gap-12 md:gap-16">
          {/* Sub-section 1 */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Le piège du recrutement classique
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Les méthodes classiques d'évaluation échouent systématiquement sur les profils Talent Acquisition. Elles se concentrent sur des critères périphériques — parcours, entreprises connues, diplômes — qui ne prédisent en rien la performance réelle d'un recruteur.
                </p>
                <p>
                  Un recruteur issu d'une grande entreprise Tech n'est pas automatiquement un bon recruteur. Un profil avec 10 ans d'expérience n'est pas nécessairement plus performant qu'un profil avec 5 ans d'expertise ciblée.
                </p>
                <p>
                  <strong className="text-foreground">Ce qui compte, c'est la capacité d'exécution.</strong> Et cette capacité ne se lit pas sur un CV.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-secondary border border-border">
              <h4 className="font-bold text-lg mb-4 text-foreground">Les erreurs classiques d'évaluation</h4>
              <ul className="space-y-3">
                {[
                  "Se baser sur les entreprises précédentes plutôt que sur les résultats",
                  "Confondre expérience et performance",
                  "Ne pas évaluer les compétences de sourcing réelles",
                  "Ignorer la qualité de qualification des candidats",
                  "Ne pas tester la capacité de collaboration managériale",
                  "Négliger la maturité opérationnelle et méthodologique",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1 w-2 h-2 rounded-full bg-destructive shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sub-section 2 */}
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Recruter un recruteur = recruter une capacité de performance
              </h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Un bon Talent Acquisition ne se reconnaît pas à son parcours, mais à sa capacité à produire des résultats concrets : des shortlists pertinentes, des process fluides, des recrutements qui aboutissent rapidement et des managers satisfaits.
                </p>
                <p>
                  Chez Rocket4RPO, nous évaluons chaque candidat sur ce qui compte réellement :{" "}
                  <strong className="text-foreground">la delivery.</strong> Comment source-t-il ? Comment qualifie-t-il ? Comment interagit-il avec les opérationnels ? Comment gère-t-il son pipeline ?
                </p>
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 md:order-1">
              <h4 className="font-bold text-lg mb-4 text-foreground">Ce que nous évaluons réellement</h4>
              <ul className="space-y-3">
                {[
                  "Capacité de sourcing : stratégie, outils, taux de conversion",
                  "Qualité de qualification : rigueur, pertinence, profondeur",
                  "Interaction managériale : communication, influence, structuration",
                  "Gestion de pipeline : priorisation, cadence, suivi",
                  "Maturité opérationnelle : process, KPIs, autonomie",
                  "Adaptabilité au contexte : startup, scale-up, organisation structurée",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="mt-0.5 w-4 h-4 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sub-section 3 */}
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Une lecture métier indispensable
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Évaluer un recruteur exige de comprendre profondément le métier du recrutement. Seul un acteur qui pratique le Talent Acquisition au quotidien peut distinguer un profil solide d'un profil qui "parle bien" mais ne délivre pas. C'est notre avantage structurel : nous ne recrutons pas des recruteurs par analogie. Nous les évaluons en praticiens.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 4. AVANTAGE STRUCTUREL ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Avantage structurel
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Un avantage structurel unique
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Rocket4RPO échange quotidiennement avec des professionnels du Talent Acquisition. Nos équipes opèrent elles-mêmes comme TA Specialists chez nos clients. Cette double position — praticien et recruteur de praticiens — nous donne un accès unique au marché.
              </p>
              <p>
                Nous connaissons les profils en activité, leurs forces, leurs zones de progression, leur contexte actuel et leurs aspirations. Nous ne découvrons pas le marché au moment de votre brief : nous le vivons au quotidien.
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="space-y-4">
              {[
                {
                  icon: Eye,
                  title: "Connaissance marché en temps réel",
                  desc: "Nous savons qui sont les meilleurs TA en poste, quels profils sont ouverts à de nouvelles opportunités et quelles sont les tendances du marché.",
                },
                {
                  icon: UserCheck,
                  title: "Identification des top performers",
                  desc: "Notre vivier est constitué de profils que nous avons vus opérer, évalués et suivis dans la durée. Pas de surprise, pas de pari.",
                },
                {
                  icon: Brain,
                  title: "Compréhension des pratiques en évolution",
                  desc: "Sourcing avancé, outillage, pilotage data, approche candidate-centric : nous savons ce qui fonctionne réellement aujourd'hui.",
                },
                {
                  icon: Zap,
                  title: "Accès rapide aux profils pertinents",
                  desc: "Notre réseau actif et notre vivier qualifié nous permettent de présenter des candidats pertinents en quelques jours.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                  <item.icon className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">{item.title}</span>
                    <span className="text-muted-foreground"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 5. MÉTHODOLOGIE PROPRIÉTAIRE ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Méthodologie
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Une méthodologie propriétaire
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Rocket4RPO sélectionne des performers, pas des candidats.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Layers,
              step: "01",
              title: "Adapter le profil à la phase de l'entreprise",
              text: "Startup en early stage, scale-up en hypercroissance, organisation structurée : chaque contexte exige un profil de TA différent. Nous identifions le bon niveau de séniorité, d'autonomie et de compétences pour votre réalité terrain.",
            },
            {
              icon: BarChart3,
              step: "02",
              title: "Évaluer la capacité de delivery",
              text: "Nous mesurons ce qui compte : qualité du sourcing, gestion de pipeline, rapidité d'exécution, taux de conversion des shortlists. Chaque candidat est évalué sur sa performance réelle, pas sur ses déclarations.",
            },
            {
              icon: Settings,
              step: "03",
              title: "Évaluer la maturité opérationnelle",
              text: "Process de recrutement structurés, pilotage par les KPIs, capacité à travailler en autonomie, aptitude à faire monter en compétence une équipe. Nous recrutons des profils capables de créer de la valeur durable.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-2xl bg-background border border-border group hover:border-primary/30 transition-colors"
            >
              <span className="absolute top-6 right-6 text-5xl font-bold text-muted/30 select-none">
                {item.step}
              </span>
              <item.icon className="w-7 h-7 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-3 pr-12">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 6. LES PROFILS QUE NOUS IDENTIFIONS ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            A chaque besoin son Recruteur 
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un vivier diversifié et constamment enrichi de Talent Acquisition de haut niveau.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileTypes.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 7. PROCESS STRUCTURÉ ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Un process structuré et performant
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            De la compréhension de votre besoin au suivi post-recrutement, chaque étape est conçue pour la performance.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 md:gap-8"
              >
                <div className="relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 border border-primary/20 shrink-0">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="pt-2 pb-4">
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold tracking-wider uppercase rounded bg-primary/10 text-primary mb-2">
                    {step.period}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── 8. CE QUE VOUS GAGNEZ ── */}
    <section className="section-padding bg-foreground text-background">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Ce que vous gagnez
          </h2>
          <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">
            Des résultats concrets, mesurables et immédiats sur vos recrutements de TA.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "Des profils réellement adaptés à votre contexte et votre stade de développement",
            "Une shortlist plus précise, validée sur des critères de performance réelle",
            "Un gain de temps considérable pour les managers et les RH",
            "Une meilleure lecture du marché Talent Acquisition",
            "Un recrutement plus rapide grâce à notre vivier actif",
            "Une réduction significative du risque de mismatch",
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 p-5 rounded-xl bg-background/5 border border-background/10"
            >
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <span className="text-background/90 font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 9. AVANTAGES DE NOTRE APPROCHE ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Les avantages de notre approche
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Sélection exigeante",
              text: "Chaque candidat est évalué sur sa capacité réelle de delivery, pas uniquement sur son parcours. Nous ne présentons que des profils que nous recommandons.",
            },
            {
              icon: Brain,
              title: "Expertise métier",
              text: "Nous exerçons le métier de Talent Acquisition au quotidien. Cette expertise nous donne une lecture unique du marché et des profils.",
            },
            {
              icon: Users,
              title: "Accès à un vivier qualifié",
              text: "Notre réseau actif de Talent Acquisition est constamment enrichi. Nous connaissons les profils, leurs forces et leur contexte actuel.",
            },
            {
              icon: Timer,
              title: "Rapidité d'exécution",
              text: "Shortlist qualifiée sous 2 à 3 semaines. Notre vivier et notre méthodologie nous permettent d'aller vite sans sacrifier la qualité.",
            },
            {
              icon: Briefcase,
              title: "Adaptation au contexte",
              text: "Startup, scale-up, organisation structurée : nous adaptons le profil et les critères d'évaluation à votre stade de développement et vos enjeux.",
            },
            {
              icon: Clock,
              title: "Accompagnement complet",
              text: "Du cadrage du besoin au suivi post-recrutement, nous vous accompagnons à chaque étape pour garantir la réussite de l'intégration.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 10. À QUI S'ADRESSE ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Pour qui ?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              À qui s'adresse cette offre ?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Notre service de recrutement de Talent Acquisition s'adresse à toute entreprise qui veut investir dans sa capacité de recrutement avec le bon niveau d'exigence.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="space-y-4">
              {[
                {
                  icon: Rocket,
                  label: "Startups en croissance",
                  desc: "qui recrutent leur premier TA et ne peuvent pas se permettre une erreur de casting sur ce poste stratégique.",
                },
                {
                  icon: TrendingUp,
                  label: "Scale-ups",
                  desc: "qui renforcent leur équipe Talent Acquisition pour accompagner leur montée en charge et structurer leurs process.",
                },
                {
                  icon: Building2,
                  label: "Entreprises structurant leur recrutement",
                  desc: "qui veulent professionnaliser leur fonction TA avec des profils capables de poser les fondations d'une équipe performante.",
                },
                {
                  icon: Layers,
                  label: "Équipes RH en construction",
                  desc: "qui ont besoin de profils TA opérationnels et autonomes pour compléter leur organisation People.",
                },
                {
                  icon: Zap,
                  label: "Besoin urgent de TA senior",
                  desc: "pour les entreprises qui doivent recruter rapidement un Talent Acquisition capable de délivrer dès sa prise de poste.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                  <item.icon className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-foreground">{item.label}</span>
                    <span className="text-muted-foreground"> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Internal links */}
        <motion.div {...fadeUp} className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-muted-foreground mb-6">
            Découvrez également nos autres expertises
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Talent Acquisition à temps plein", to: "/offre/talent-acquisition-temps-plein" },
              { label: "Talent Acquisition à temps partagé", to: "/offre/talent-acquisition-temps-partage" },
              { label: "Sourcing & Enablement", to: "/offre/outils-sourcing-enablement" },
              { label: "Cas clients", to: "/cas-clients" },
              { label: "Nous contacter", to: "/contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background text-foreground hover:border-primary/30 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── 11. FAQ ── */}
    <FAQSection faqs={faqs} />

    {/* ── 12. CTA FINAL ── */}
    <CTASection
      title="Besoin de recruter un Talent Acquisition capable de délivrer rapidement ?"
      subtitle="Échangeons sur votre besoin. Nous vous présenterons une shortlist de profils évalués sur leur performance réelle."
      ctaLabel="Confier mon recrutement"
    />
  </Layout>
);

export default RecrutementTalentAcquisition;