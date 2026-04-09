"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Brain,
  Search,
  Settings,
  Users,
  TrendingUp,
  Briefcase,
  Rocket,
  Layers,
  Building2,
  GraduationCap,
  BarChart3,
  Wrench,
  GitBranch,
  MessageSquare,
  UserPlus,
  Lightbulb,
  ShieldCheck,
  Compass,
  Workflow,
} from "lucide-react";

const faqs = [
  {
    question: "Quels outils de sourcing recommandez-vous ?",
    answer: "Nous ne recommandons pas un outil universel. Notre approche consiste à analyser votre contexte — volume de recrutements, types de profils, budget, maturité de l'équipe — pour proposer une stack adaptée. Cela peut inclure LinkedIn Recruiter, des alternatives plus abordables, des outils de sourcing booléen, des extensions Chrome, des CRM candidats ou des solutions d'automatisation.",
  },
  {
    question: "Proposez-vous des formations sur mesure ?",
    answer: "Oui. Toutes nos formations sont conçues sur mesure en fonction de votre contexte. Nous formons vos Talent Acquisition à l'utilisation avancée des outils de sourcing, aux techniques d'approche directe, à la rédaction de messages performants et à la structuration de leur activité. Nous formons également vos managers au process d'entretien et à la collaboration avec les équipes recrutement.",
  },
  {
    question: "Pouvez-vous auditer notre stack recrutement actuelle ?",
    answer: "Absolument. Nous réalisons un audit complet de vos outils, process, KPIs et organisation recrutement. L'objectif est d'identifier les inefficacités, les outils sous-utilisés, les gaps de compétences et de proposer un plan d'action concret pour structurer une fonction recrutement performante.",
  },
  {
    question: "Quelle est la différence avec un consultant RH classique ?",
    answer: "Nous ne sommes pas des consultants RH généralistes. Nous sommes des praticiens du Talent Acquisition. Nos recommandations sont issues de notre expérience opérationnelle quotidienne. Nous savons ce qui fonctionne en sourcing, en qualification, en collaboration managériale et en pilotage de la performance — parce que nous le faisons chaque jour.",
  },
  {
    question: "Combien de temps dure un accompagnement enablement ?",
    answer: "La durée dépend du périmètre. Un audit de stack prend 1 à 2 semaines. Une formation ciblée se déroule sur 1 à 3 jours. Un accompagnement complet de structuration de la fonction recrutement peut s'étendre sur 4 à 12 semaines selon la complexité de votre organisation.",
  },
  {
    question: "Intervenez-vous aussi sur les process d'entretien ?",
    answer: "Oui. La structuration des process d'entretien est un levier majeur de performance. Nous vous aidons à construire des scorecards, des grilles d'évaluation, des guides d'entretien structurés et à former vos managers à l'art de l'entretien de recrutement.",
  },
  {
    question: "Pouvez-vous nous aider à lancer un programme de cooptation ?",
    answer: "Oui. Nous accompagnons la conception et le lancement de programmes de cooptation structurés : définition des règles, communication interne, outils de suivi, incentives et animation du programme dans la durée.",
  },
  {
    question: "Est-ce que vous installez et configurez les outils ?",
    answer: "Oui. Nous ne nous contentons pas de recommander : nous configurons les outils, créons les workflows, paramétrons les ATS, connectons les intégrations et formons vos équipes à leur utilisation quotidienne.",
  },
  {
    question: "Cette offre s'adresse-t-elle aussi aux petites structures ?",
    answer: "Absolument. Les startups et PME ont souvent le plus à gagner d'une structuration précoce de leur fonction recrutement. Nous adaptons notre approche à votre taille, votre budget et votre maturité.",
  },
  {
    question: "Comment démarrer ?",
    answer: "Contactez-nous pour un échange de cadrage gratuit. Nous analysons votre situation actuelle, vos enjeux et vos objectifs pour vous proposer un accompagnement sur mesure. Premier échange sans engagement.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const approachItems = [
  {
    icon: Workflow,
    title: "Structuration des process recrutement",
    text: "Nous concevons des process de recrutement clairs, reproductibles et mesurables : du brief de poste au closing, en passant par le sourcing, la qualification et les entretiens. Chaque étape est formalisée pour garantir la constance d'exécution.",
  },
  {
    icon: Search,
    title: "Stratégie de sourcing",
    text: "Nous définissons une stratégie de sourcing adaptée à vos profils cibles : canaux à activer, techniques d'approche directe, messages personnalisés, séquences multicanales. L'objectif : générer un flux régulier de candidats qualifiés.",
  },
  {
    icon: Wrench,
    title: "Implémentation des outils",
    text: "Nous sélectionnons, configurons et déployons les outils adaptés à votre contexte : ATS, CRM candidats, outils de sourcing, extensions, automatisations. Chaque outil est paramétré pour s'intégrer à vos workflows existants.",
  },
  {
    icon: GraduationCap,
    title: "Formation Talent Acquisition",
    text: "Nous formons vos recruteurs aux techniques avancées de sourcing, de qualification et de pilotage de la performance. Des formations opérationnelles, concrètes, directement applicables au quotidien.",
  },
  {
    icon: MessageSquare,
    title: "Enablement des managers",
    text: "Nous formons vos hiring managers à mener des entretiens structurés, à évaluer les compétences de manière objective et à collaborer efficacement avec les équipes Talent Acquisition.",
  },
  {
    icon: UserPlus,
    title: "Programmes de cooptation",
    text: "Nous concevons et déployons des programmes de cooptation structurés : règles claires, outils de suivi, communication interne, incentives et animation pour transformer vos collaborateurs en ambassadeurs recrutement.",
  },
];

const timelineSteps = [
  {
    period: "Semaine 1",
    title: "Audit & diagnostic",
    text: "Analyse complète de votre organisation recrutement : outils, process, KPIs, compétences de l'équipe, collaboration avec les managers. Identification des axes d'amélioration prioritaires.",
    icon: Compass,
  },
  {
    period: "Semaine 2–3",
    title: "Stratégie & recommandations",
    text: "Définition d'une feuille de route actionnable : process cibles, outils recommandés, plan de formation, KPIs de pilotage. Présentation et validation avec vos équipes.",
    icon: Target,
  },
  {
    period: "Semaine 3–6",
    title: "Implémentation & formation",
    text: "Déploiement des outils, configuration des workflows, formation des équipes TA et des managers. Accompagnement opérationnel pour garantir l'adoption.",
    icon: Settings,
  },
  {
    period: "Semaine 6–12",
    title: "Optimisation continue",
    text: "Suivi des KPIs, ajustements des process, coaching des équipes, itérations sur les outils et les méthodes pour atteindre la performance cible.",
    icon: TrendingUp,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Réduction du time-to-hire",
    text: "Des process structurés et des outils optimisés qui accélèrent chaque étape du recrutement.",
  },
  {
    icon: BarChart3,
    title: "Pilotage par la data",
    text: "Des KPIs clairs et des dashboards actionnables pour prendre les bonnes décisions au bon moment.",
  },
  {
    icon: Users,
    title: "Montée en compétences durable",
    text: "Des équipes formées et autonomes, capables de maintenir un haut niveau de performance dans la durée.",
  },
  {
    icon: Rocket,
    title: "Scalabilité du recrutement",
    text: "Une infrastructure recrutement capable de monter en charge sans perdre en qualité d'exécution.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité des recrutements",
    text: "Des candidats mieux sourcés, mieux qualifiés et mieux évalués, pour des recrutements plus justes et plus durables.",
  },
  {
    icon: Brain,
    title: "Autonomie stratégique",
    text: "Une fonction recrutement structurée qui ne dépend plus des prestataires externes pour opérer efficacement.",
  },
];

const audiences = [
  {
    icon: Rocket,
    title: "Startups & scale-ups",
    text: "Vous recrutez vos premiers profils TA et avez besoin de structurer votre fonction recrutement dès le départ.",
  },
  {
    icon: Building2,
    title: "PME en croissance",
    text: "Votre équipe recrutement existe mais manque d'outils, de process et de formation pour passer à l'échelle.",
  },
  {
    icon: Layers,
    title: "Grands groupes en transformation",
    text: "Vous souhaitez moderniser votre approche recrutement, adopter de nouveaux outils et former vos équipes aux meilleures pratiques.",
  },
  {
    icon: Briefcase,
    title: "Directions RH",
    text: "Vous cherchez un partenaire opérationnel pour structurer, outiller et professionnaliser votre fonction Talent Acquisition.",
  },
];

export default function OutilsSourcingEnablementPageClient() {
  const schemas = [
      serviceSchema("Outils de sourcing & enablement", "Structuration de la fonction recrutement : outils, process, formation et enablement pour une performance durable.", "/offre/outils-sourcing-enablement"),
      faqSchema(faqs),
      breadcrumbSchema([
        { name: "Offres", url: "/offre/outils-sourcing-enablement" },
        { name: "Outils de sourcing & enablement", url: "/offre/outils-sourcing-enablement" },
      ]),
    ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
<Breadcrumbs
      items={[
        { label: "Offres", href: "/offre/outils-sourcing-enablement" },
        { label: "Outils de sourcing & enablement" },
      ]}
    />

    {/* ── 1. HERO ── */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Enablement
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Outils de sourcing & enablement :{" "}
              <span className="text-gradient">structurez une fonction recrutement performante et durable</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Les outils ne créent pas la performance. Ce sont les process structurés et les équipes formées qui font la différence. Rocket4RPO vous accompagne pour bâtir une fonction recrutement capable de délivrer dans la durée.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Structurer mon recrutement <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors"
              >
                Demander un audit
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Social proof ── */}
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-lg italic text-muted-foreground">&ldquo;En phase de scaling, on avait besoin de recruter vite ET bien. Le ROI est évident quand on compare au coût d&apos;un cabinet.&rdquo;</p>
            <p className="mt-2 text-sm font-semibold">&mdash; T.B., CEO, Start-up HealthTech (30 pers.)</p>
          </div>
          <div className="flex gap-6 text-center">
            <div><p className="text-3xl font-bold text-primary">3x</p><p className="text-xs text-muted-foreground">moins cher</p></div>
            <div><p className="text-3xl font-bold text-primary">+40%</p><p className="text-xs text-muted-foreground">taux réponse</p></div>
          </div>
        </div>
      </div>
    </section>

    {/* ── 2. INTRODUCTION ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pourquoi les outils seuls ne suffisent pas
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                De nombreuses entreprises investissent dans des outils de sourcing, des ATS, des licences LinkedIn Recruiter — sans obtenir les résultats espérés. La raison est simple :{" "}
                <strong className="text-foreground">un outil sans process structuré et sans équipe formée reste un outil sous-exploité.</strong>
              </p>
              <p>
                Le sourcing n'est pas qu'une question de technologie. C'est une question de méthode, de stratégie d'approche, de qualité de message et de rigueur d'exécution. Un recruteur qui ne maîtrise pas les fondamentaux du sourcing ne sera pas plus performant avec un outil premium qu'avec un outil gratuit.
              </p>
              <p>
                <strong className="text-foreground">La performance recrutement repose sur trois piliers : des process clairs, des outils adaptés et des équipes compétentes.</strong>{" "}
                Négliger un seul de ces piliers compromet l'ensemble.
              </p>
              <p>
                C'est pourquoi Rocket4RPO ne se contente pas de recommander des outils. Nous structurons votre fonction recrutement de bout en bout : process, outils, formation des Talent Acquisition, enablement des managers et programmes de cooptation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 3. NOTRE VISION ── */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Trop d'entreprises confondent outillage et structuration. Acheter un ATS ne structure pas votre recrutement. Prendre une licence LinkedIn Recruiter ne crée pas une stratégie de sourcing. Former vos équipes une fois ne garantit pas l'excellence opérationnelle.
            </p>
          </motion.div>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-8">
          <motion.div {...fadeUp} className="p-8 rounded-xl bg-destructive/5 border border-destructive/20">
            <h3 className="text-xl font-bold mb-4 text-destructive">Outils ≠ Performance</h3>
            <ul className="space-y-3">
              {[
                "Un ATS non configuré ralentit plus qu'il n'accélère",
                "Un sourcing sans stratégie génère du volume, pas de la qualité",
                "Des managers non formés dégradent l'expérience candidat",
                "Des KPIs absents empêchent tout pilotage",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} className="p-8 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-primary">Système structuré = Performance</h3>
            <ul className="space-y-3">
              {[
                "Des process reproductibles et mesurables",
                "Des outils configurés pour vos workflows",
                "Des équipes formées et autonomes",
                "Un pilotage par la data qui guide les décisions",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── 4. NOTRE APPROCHE ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Notre approche</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Six leviers pour construire une fonction recrutement performante et durable.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approachItems.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 rounded-xl bg-background border border-border hover:shadow-lg transition-shadow"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 5. POURQUOI ÇA FONCTIONNE ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Pourquoi ça fonctionne</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Notre approche est née de la pratique, pas de la théorie.
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: Lightbulb,
              title: "Expertise terrain",
              text: "Nos consultants sont des Talent Acquisition en activité. Chaque recommandation est validée par l'expérience opérationnelle quotidienne.",
            },
            {
              icon: GitBranch,
              title: "Approche systémique",
              text: "Nous traitons le recrutement comme un système : process, outils, compétences et culture sont interconnectés. Optimiser un seul élément ne suffit pas.",
            },
            {
              icon: Settings,
              title: "Sur mesure, pas de template",
              text: "Aucun plan d'action pré-formaté. Chaque accompagnement est conçu pour votre contexte, votre maturité et vos objectifs spécifiques.",
            },
            {
              icon: TrendingUp,
              title: "Focus sur l'autonomie",
              text: "Notre objectif n'est pas de créer une dépendance. C'est de vous rendre autonome avec des process, des outils et des compétences durables.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-6 rounded-xl bg-secondary border border-border"
            >
              <item.icon className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 6. NOTRE DÉMARCHE (Timeline) ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Notre démarche</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Un accompagnement structuré, du diagnostic à l'autonomie.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />
          {timelineSteps.map((step, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative pl-16 md:pl-20 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary mb-1">
                {step.period}
              </span>
              <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 7. CE QUE VOUS GAGNEZ ── */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Ce que vous gagnez</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Les bénéfices concrets d'une fonction recrutement structurée.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 rounded-xl bg-secondary border border-border"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 8. À QUI S'ADRESSE CETTE OFFRE ── */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">À qui s'adresse cette offre</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Cette offre est conçue pour les organisations qui veulent professionnaliser leur fonction recrutement.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4 p-6 rounded-xl bg-background border border-border"
            >
              <item.icon className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── 9. FAQ ── */}
    <FAQSection faqs={faqs} />

    {/* ── 10. CTA ── */}
    <CTASection
      title="Prêt à structurer une fonction recrutement performante ?"
      subtitle="Les outils ne créent pas la performance. Les process structurés et les équipes formées, si."
      ctaLabel="Structurer mon recrutement"
    />
    </>
  );
}
