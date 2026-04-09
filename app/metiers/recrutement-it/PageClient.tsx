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
  Code,
  Database,
  Server,
  Cpu,
  GitBranch,
  Terminal,
  Monitor,
  Workflow,
} from "lucide-react";

const faqs = [
  {
    question: "Quels profils IT et Tech recrutez-vous ?",
    answer: "Nous recrutons l'ensemble des profils techniques : développeurs Backend, Frontend et Full-Stack, DevOps / SRE, Data Engineers, Data Scientists, Product Managers, Engineering Managers, CTO et VP Engineering. Du profil opérationnel au leadership technique.",
  },
  {
    question: "Comment qualifiez-vous les compétences techniques des candidats ?",
    answer: "Nos Talent Acquisition spécialisés IT comprennent les stacks technologiques, les architectures et les enjeux techniques. Ils évaluent la profondeur d'expertise, la capacité à résoudre des problèmes complexes et l'adéquation avec votre environnement technique.",
  },
  {
    question: "Sourcez-vous des profils tech pénuriques ?",
    answer: "Oui. Notre expertise en approche directe et notre connaissance des communautés tech (GitHub, Stack Overflow, meetups, conférences) nous permettent d'identifier des profils que les méthodes classiques ne trouvent pas.",
  },
  {
    question: "Travaillez-vous directement avec les CTO et VP Engineering ?",
    answer: "Absolument. Nous collaborons étroitement avec les équipes techniques pour comprendre les enjeux d'architecture, de culture engineering et de roadmap produit. Cette collaboration garantit un alignement précis entre le profil recruté et les attentes réelles.",
  },
  {
    question: "Intervenez-vous sur des recrutements DevOps et infrastructure ?",
    answer: "Oui. Nous recrutons des profils DevOps, SRE, Cloud Engineers et Platform Engineers. Nos recruteurs comprennent les enjeux CI/CD, infrastructure as code, containerisation et observabilité.",
  },
  {
    question: "Recrutez-vous des profils Data ?",
    answer: "Oui. Data Engineers, Data Scientists, Data Analysts, ML Engineers : nous comprenons les différences entre ces rôles et les stacks associées (Python, SQL, Spark, dbt, Airflow, etc.).",
  },
  {
    question: "Quelle est la différence avec un cabinet de recrutement IT classique ?",
    answer: "Un cabinet classique se limite souvent à une correspondance de mots-clés sur un CV. Nous évaluons la compréhension technique réelle, la capacité à résoudre des problèmes, l'expérience avec des architectures similaires et l'alignement avec votre culture engineering.",
  },
  {
    question: "Combien de temps prend un recrutement IT ?",
    answer: "Vous recevez une shortlist qualifiée sous 2 à 3 semaines. Le process complet se déroule généralement en 3 à 6 semaines selon la séniorité et la rareté du profil recherché.",
  },
  {
    question: "Cette expertise IT est-elle utilisée dans vos missions RPO ?",
    answer: "Oui. Nos Talent Acquisition spécialisés IT sont déployés dans les missions Rocket4RPO. Ils apportent une compréhension technique qui améliore la qualité des recrutements et la collaboration avec les équipes engineering.",
  },
  {
    question: "Comment démarrer un recrutement IT avec Rocket4RPO ?",
    answer: "Contactez-nous pour un échange de cadrage. Nous analysons votre besoin technique, votre stack, votre organisation engineering et vos attentes pour vous proposer les profils les plus adaptés. Premier échange sans engagement.",
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
    icon: Code,
    title: "Développeur Backend",
    description: "Architecture serveur, APIs, microservices. Maîtrise des langages comme Java, Python, Go, Node.js et des bases de données.",
  },
  {
    icon: Monitor,
    title: "Développeur Full-Stack",
    description: "Polyvalence front et back, capacité à livrer des fonctionnalités de bout en bout. React, Vue, Angular côté front, Node.js, Python côté back.",
  },
  {
    icon: Terminal,
    title: "Développeur Frontend",
    description: "Expertise UI/UX, performance web, accessibilité. Maîtrise de React, TypeScript, CSS moderne et des outils de build.",
  },
  {
    icon: Server,
    title: "DevOps / SRE",
    description: "Infrastructure as code, CI/CD, containerisation, monitoring. Garant de la fiabilité et de la scalabilité de vos systèmes.",
  },
  {
    icon: Database,
    title: "Data Engineer / Data Scientist",
    description: "Pipelines de données, modélisation, machine learning. Expertise Python, SQL, Spark, dbt et outils cloud data.",
  },
  {
    icon: Cpu,
    title: "CTO / VP Engineering",
    description: "Leadership technique, vision architecture, management d'équipes engineering. Pilotage de la roadmap et de la dette technique.",
  },
];

const techExpertise = [
  {
    icon: Layers,
    title: "Langages & frameworks",
    text: "Java, Python, Go, TypeScript, React, Node.js, Vue.js, Angular, Ruby on Rails — nous comprenons les écosystèmes et leurs différences.",
  },
  {
    icon: Server,
    title: "Infrastructure & Cloud",
    text: "AWS, GCP, Azure, Kubernetes, Docker, Terraform — nous évaluons la maîtrise des environnements cloud et des pratiques DevOps.",
  },
  {
    icon: Database,
    title: "Data & IA",
    text: "PostgreSQL, MongoDB, Spark, Airflow, dbt, TensorFlow, PyTorch — nous distinguons les profils Data Engineering des profils Data Science.",
  },
  {
    icon: GitBranch,
    title: "Pratiques engineering",
    text: "CI/CD, code review, testing, architecture distribuée, observabilité — nous évaluons la maturité des pratiques, pas seulement les outils.",
  },
];

const sourcingMethods = [
  {
    step: "01",
    title: "Sourcing dans les communautés tech",
    text: "GitHub, Stack Overflow, meetups, conférences tech, blogs techniques : nous identifions les profils actifs dans l'écosystème, pas seulement ceux en recherche active.",
  },
  {
    step: "02",
    title: "Approche directe personnalisée",
    text: "Chaque message d'approche est personnalisé en fonction du profil technique, du projet et de la stack. Pas de messages génériques.",
  },
  {
    step: "03",
    title: "Qualification technique approfondie",
    text: "Évaluation de la compréhension architecturale, de l'expérience avec des systèmes similaires et de la capacité à résoudre des problèmes complexes.",
  },
  {
    step: "04",
    title: "Alignement culture engineering",
    text: "Au-delà des compétences techniques, nous vérifions l'alignement avec votre culture : méthodes de travail, autonomie, collaboration, vision produit.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Analyse du contexte technique",
    text: "Compréhension de votre stack, de votre architecture, de vos enjeux techniques et de votre roadmap produit.",
  },
  {
    step: "02",
    title: "Évaluation des compétences réelles",
    text: "Au-delà des mots-clés du CV, nous évaluons la profondeur d'expertise, les projets significatifs et la capacité de résolution de problèmes.",
  },
  {
    step: "03",
    title: "Vérification de l'expérience terrain",
    text: "Nous analysons les environnements traversés : taille d'équipe, volume de trafic, complexité des systèmes, niveau d'autonomie.",
  },
  {
    step: "04",
    title: "Alignement avec votre organisation",
    text: "Nous vérifions la compatibilité avec votre stade de maturité, votre culture engineering et vos méthodes de travail.",
  },
];

const gains = [
  { icon: Target, text: "Recrutements plus précis et pertinents" },
  { icon: CheckCircle, text: "Shortlists de meilleure qualité" },
  { icon: Clock, text: "Gain de temps pour vos équipes techniques" },
  { icon: ShieldCheck, text: "Réduction des erreurs de casting" },
  { icon: TrendingUp, text: "Meilleure rétention des profils recrutés" },
  { icon: UserCheck, text: "Profils validés sur leurs compétences réelles" },
];

export default function RecrutementITPageClient() {
  const schemas = [
      serviceSchema("Recrutement de profils IT et Tech", "Recrutez vos profils IT et Tech avec Rocket4RPO. Talent Acquisition spécialisés IT pour des recrutements précis et performants.", "/metiers/recrutement-it"),
      faqSchema(faqs),
      breadcrumbSchema([
        { name: "Accueil", url: "/" },
        { name: "Métiers", url: "/metiers/recrutement-it" },
        { name: "Recrutement IT & Tech", url: "/metiers/recrutement-it" },
      ]),
    ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
<Breadcrumbs items={[{ label: "Métiers", href: "/metiers/recrutement-it" }, { label: "Recrutement IT & Tech" }]} />

    {/* CONTEXTUALIZATION */}
    <section className="py-4">
      <div className="container-wide">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Parce qu&apos;une scale-up SaaS ne recrute pas que des commerciaux. Nos Talent Acquisition Specialists couvrent l&apos;ensemble de vos besoins IT &amp; Tech pour accompagner votre croissance.
          </p>
        </div>
      </div>
    </section>

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-6">
              Expertise métier
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement de profils IT et Tech{" "}
              <span className="text-gradient">: une expertise portée par des Talent Acquisition spécialisés</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO s'appuie sur un pool de Talent Acquisition spécialisés dans le recrutement IT. Ils comprennent les métiers techniques, maîtrisent les stacks et savent qualifier des profils que les recruteurs généralistes ne peuvent pas évaluer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                Confier un recrutement
              </a>
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
              Le recrutement IT ne peut pas être traité par des recruteurs généralistes
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Recruter un développeur, un DevOps ou un Data Engineer ne se résume pas à vérifier une liste de mots-clés sur un CV. Il faut comprendre les architectures, les environnements de travail, les stacks technologiques et la profondeur réelle de l'expertise d'un candidat.
              </p>
              <p>
                Un recruteur généraliste ne peut pas évaluer la différence entre un développeur qui a travaillé sur un monolithe et un développeur qui a conçu une architecture microservices à fort trafic. Cette nuance fait toute la différence dans la qualité du recrutement.
              </p>
              <p className="font-semibold text-foreground">
                C'est pourquoi Rocket4RPO déploie des Talent Acquisition spécialisés IT, capables de comprendre, qualifier et convaincre les meilleurs profils techniques du marché.
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
            Métiers IT
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Une expertise spécialisée sur les métiers IT
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Du développeur au CTO, nous comprenons les spécificités de chaque rôle technique et adaptons notre approche à votre contexte engineering.
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

    {/* Grille de rémunération IT 2026 */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-8 text-center">Grille de rémunération IT & Tech 2026</h2>
        <p className="text-center text-muted-foreground mb-8">Fourchettes observées en Île-de-France pour des profils Tech en startup/scale-up SaaS.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b border-border">
              <th className="text-left p-3 font-semibold">Poste</th>
              <th className="text-center p-3 font-semibold">Junior (0-3 ans)</th>
              <th className="text-center p-3 font-semibold">Confirmé (3-6 ans)</th>
              <th className="text-center p-3 font-semibold">Senior (6+ ans)</th>
            </tr></thead>
            <tbody>
              {[
                ["Développeur Backend", "38-48K€", "48-62K€", "62-80K€"],
                ["Développeur Full-Stack", "40-50K€", "50-65K€", "65-85K€"],
                ["DevOps / SRE", "42-52K€", "52-68K€", "68-90K€"],
                ["Data Engineer", "40-52K€", "52-70K€", "70-90K€"],
                ["Data Scientist", "42-55K€", "55-72K€", "72-95K€"],
                ["Product Manager", "40-50K€", "50-65K€", "65-85K€"],
                ["Engineering Manager", "—", "60-75K€", "75-100K€"],
                ["CTO / VP Engineering", "—", "—", "80-130K€"],
              ].map(([role, junior, mid, senior], i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="p-3 font-medium">{role}</td>
                  <td className="p-3 text-center text-muted-foreground">{junior}</td>
                  <td className="p-3 text-center">{mid}</td>
                  <td className="p-3 text-center font-semibold text-primary">{senior}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">* Salaires bruts annuels fixes, hors variable. Source : données Rocket4RPO, avril 2026.</p>

        {/* Mini case study */}
        <div className="my-12 p-8 rounded-2xl bg-primary/5 border border-primary/20">
          <p className="text-sm font-semibold text-primary mb-2">Cas client — Fintech (60 pers.)</p>
          <p className="text-lg font-bold mb-2">5 développeurs recrutés en 6 mois</p>
          <p className="text-muted-foreground">Mission TA à temps partagé (3j/semaine). Création de la marque employeur technique, sourcing ciblé sur GitHub et communautés tech.</p>
          <div className="flex gap-6 mt-4">
            <div><span className="text-2xl font-bold text-primary">120j</span><br/><span className="text-xs text-muted-foreground">time-to-hire moyen</span></div>
            <div><span className="text-2xl font-bold text-primary">100%</span><br/><span className="text-xs text-muted-foreground">rétention à 6 mois</span></div>
          </div>
          <a href="/cas-clients/fintech-engineering" className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline">
            Voir le cas complet →
          </a>
        </div>
      </div>
    </section>

    {/* TECH UNDERSTANDING */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Compréhension des stacks techniques
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Nos recruteurs IT ne se contentent pas de lire des mots-clés. Ils comprennent les écosystèmes techniques et évaluent la profondeur d'expertise réelle.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {techExpertise.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-xl border border-border bg-card"
            >
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

    {/* SOURCING */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Sourcing IT
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Sourcing et chasse de profils IT
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Les meilleurs profils tech ne sont pas en recherche active. Il faut aller les chercher là où ils sont, avec une approche qui fait la différence.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-0">
          {sourcingMethods.map((step, i) => (
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
                {i < sourcingMethods.length - 1 && (
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

    {/* METHODOLOGY */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
            Méthodologie
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Méthodologie de qualification technique
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Notre process de qualification va au-delà des compétences déclarées pour évaluer la capacité réelle des profils techniques.
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

    {/* COLLABORATION WITH TECH TEAMS */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Collaboration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Collaboration avec vos équipes techniques
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Le recrutement IT réussit quand le recruteur parle le même langage que l'équipe technique. Nos Talent Acquisition spécialisés IT collaborent directement avec vos CTO, VP Engineering et Tech Leads pour :
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Settings, text: "Comprendre les enjeux d'architecture et de roadmap technique" },
                { icon: CheckCircle, text: "Qualifier les candidats sur leur expertise réelle, pas sur des mots-clés" },
                { icon: Brain, text: "Apporter une lecture technique lors des debriefs de recrutement" },
                { icon: Handshake, text: "Améliorer la collaboration entre recruteurs et équipes engineering" },
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

    {/* RPO INTEGRATION */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Expertise intégrée
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une expertise IT intégrée dans Rocket4RPO
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                L'expertise IT de nos Talent Acquisition est directement intégrée dans les missions Rocket4RPO. En mission RPO, nos recruteurs spécialisés IT ne se contentent pas de sourcer : ils comprennent les enjeux techniques de chaque poste et apportent une valeur métier unique.
              </p>
              <p>
                Cette spécialisation permet de réduire significativement les délais de recrutement, d'améliorer la qualité des shortlists et de renforcer la crédibilité du recrutement auprès des équipes techniques.
              </p>
              <p className="font-semibold text-foreground">
                Résultat : des recrutements IT plus rapides, plus précis et mieux acceptés par les équipes engineering.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* GAINS */}
    <section className="section-padding">
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
    <CTASection
      title="Besoin de recruter des profils IT capables de délivrer rapidement ?"
      subtitle="Nos Talent Acquisition spécialisés IT sont prêts à s'intégrer à vos équipes."
      ctaLabel="Confier mon recrutement IT"
    />
    </>
  );
}
