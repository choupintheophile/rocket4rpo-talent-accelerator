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
  TrendingUp,
  BarChart3,
  Search,
  ShieldCheck,
  Clock,
  UserCheck,
  Settings,
  Megaphone,
  PenTool,
  LineChart,
  Gauge,
  Lightbulb,
  MousePointerClick,
  Handshake,
  Rocket,
} from "lucide-react";

const faqs = [
  { question: "Quels profils marketing recrutez-vous ?", answer: "Nous recrutons l'ensemble des profils marketing Tech et SaaS : Head of Marketing, CMO, Growth Manager, Performance Marketing Manager, Product Marketing Manager, Content Manager, Brand Manager, SEO Manager, Demand Generation Manager et Marketing Operations." },
  { question: "Comment évaluez-vous un profil marketing ?", answer: "Nous allons au-delà du CV. Nous évaluons l'impact business réel : croissance générée, CAC optimisé, pipelines marketing construits, campagnes pilotées, outils maîtrisés et capacité à mesurer et itérer sur la performance." },
  { question: "Recrutez-vous des profils Growth ?", answer: "Oui, c'est l'un de nos points forts. Nous comprenons les enjeux d'acquisition, de rétention et de monétisation propres aux entreprises Tech. Nous évaluons les profils Growth sur leur capacité à expérimenter, mesurer et scaler." },
  { question: "Travaillez-vous uniquement avec des entreprises Tech ?", answer: "Notre expertise principale est dans la Tech et le SaaS, mais notre méthodologie de qualification des profils marketing s'adapte à tous les secteurs à forte composante digitale." },
  { question: "Recrutez-vous des profils Product Marketing ?", answer: "Oui. Le Product Marketing est un rôle clé dans les organisations SaaS. Nous évaluons la capacité à comprendre le marché, positionner le produit, créer du messaging et collaborer avec les équipes Sales et Product." },
  { question: "Comment évaluez-vous la maîtrise des outils marketing ?", answer: "Nous vérifions la maîtrise réelle des outils en contexte : HubSpot, Salesforce Marketing Cloud, Google Ads, Meta Ads, SEMrush, Mixpanel, Amplitude, etc. Pas une liste de logos sur un CV, mais une utilisation concrète et mesurable." },
  { question: "Quelle est la différence avec un cabinet de recrutement classique ?", answer: "Un cabinet classique évalue un marketeur sur ses entreprises précédentes et ses titres. Nous évaluons sa performance réelle : métriques d'impact, leviers maîtrisés, capacité d'exécution et alignement avec votre stade de maturité." },
  { question: "Combien de temps prend un recrutement marketing ?", answer: "Vous recevez une shortlist qualifiée sous 2 à 3 semaines. Le process complet se déroule en 3 à 5 semaines selon la séniorité du profil et la spécificité du contexte." },
  { question: "Recrutez-vous des profils marketing pour des startups early stage ?", answer: "Oui. En early stage, le marketing requiert des profils polyvalents capables de tout faire : acquisition, contenu, branding, ops. Nous identifions ces profils builders qui savent créer à partir de zéro." },
  { question: "Comment démarrer avec Rocket4RPO pour un recrutement marketing ?", answer: "Contactez-nous pour un échange de cadrage. Nous analysons votre besoin, vos enjeux d'acquisition, votre stack marketing et vos attentes pour vous proposer les profils les plus adaptés. Premier échange sans engagement." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const roles = [
  { icon: Megaphone, title: "Head of Marketing / CMO", description: "Vision stratégique, pilotage des équipes marketing, alignement avec les objectifs business et définition de la roadmap acquisition." },
  { icon: TrendingUp, title: "Growth Manager", description: "Expérimentation, acquisition, activation, rétention. Pilotage de la croissance par la data et l'itération rapide." },
  { icon: MousePointerClick, title: "Performance Marketing Manager", description: "Gestion des campagnes paid (Google Ads, Meta, LinkedIn Ads), optimisation du CAC et scaling des canaux d'acquisition payants." },
  { icon: Lightbulb, title: "Product Marketing Manager", description: "Positionnement produit, messaging, go-to-market, analyse concurrentielle et enablement des équipes Sales." },
  { icon: PenTool, title: "Content Manager / Brand Manager", description: "Stratégie de contenu, brand building, SEO éditorial, thought leadership et création d'une identité de marque forte." },
  { icon: LineChart, title: "Demand Generation / Marketing Ops", description: "Orchestration des campagnes, scoring, nurturing, automatisation marketing et optimisation du funnel." },
];

const performanceLevers = [
  { icon: Target, title: "Acquisition & CAC", text: "Capacité à structurer et optimiser les canaux d'acquisition tout en maîtrisant le coût d'acquisition client." },
  { icon: BarChart3, title: "Pipeline marketing", text: "Construction d'un pipeline prévisible de MQL et SQL à travers des stratégies inbound et outbound coordonnées." },
  { icon: Gauge, title: "Conversion & activation", text: "Optimisation des taux de conversion à chaque étape du funnel, du premier contact à la conversion client." },
  { icon: LineChart, title: "Rétention & expansion", text: "Stratégies de rétention, réduction du churn et développement de la valeur client dans le temps." },
  { icon: Search, title: "SEO & contenu", text: "Construction d'une stratégie de contenu organique durable, SEO technique et éditorial." },
  { icon: Zap, title: "Expérimentation", text: "Culture du test, A/B testing, itération rapide et prise de décision basée sur la data." },
];

const tools = [
  { category: "Automation & CRM", items: "HubSpot, Salesforce, Marketo, Pardot, ActiveCampaign, Customer.io" },
  { category: "Paid Acquisition", items: "Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, Programmatic" },
  { category: "Analytics & Data", items: "Google Analytics 4, Mixpanel, Amplitude, Segment, Looker, Tableau" },
  { category: "SEO & Contenu", items: "SEMrush, Ahrefs, Surfer SEO, Clearscope, WordPress, Webflow" },
];

const methodology = [
  { step: "01", title: "Analyse de l'impact business", text: "Au-delà des campagnes gérées, nous évaluons l'impact réel : croissance générée, pipeline construit, métriques d'acquisition et de rétention améliorées." },
  { step: "02", title: "Évaluation des leviers maîtrisés", text: "Nous vérifions quels canaux et leviers le candidat maîtrise réellement : paid, organique, contenu, product marketing, ops. Pas de déclaratif, des preuves." },
  { step: "03", title: "Vérification de la culture data", text: "Un bon marketeur mesure tout. Nous évaluons la capacité à définir des KPIs, analyser la performance et prendre des décisions data-driven." },
  { step: "04", title: "Alignement avec votre contexte", text: "Nous vérifions la compatibilité avec votre stade de maturité, votre stack, votre marché et vos enjeux business spécifiques." },
];

const hybridProfiles = [
  { icon: Zap, type: "Growth x Product", text: "Des profils qui combinent acquisition et compréhension produit pour piloter la croissance de l'intérieur." },
  { icon: BarChart3, type: "Performance x Brand", text: "Des marketeurs capables de construire une marque tout en pilotant des campagnes d'acquisition performantes." },
  { icon: Brain, type: "Marketing x Revenue", text: "Des profils alignés sur le revenu, capables de collaborer étroitement avec les équipes Sales et de mesurer leur contribution au pipeline." },
];

const gains = [
  { icon: Target, text: "Recrutements marketing plus précis" },
  { icon: CheckCircle, text: "Shortlists de meilleure qualité" },
  { icon: Clock, text: "Gain de temps pour vos équipes" },
  { icon: ShieldCheck, text: "Réduction des erreurs de casting" },
  { icon: TrendingUp, text: "Profils orientés impact business" },
  { icon: UserCheck, text: "Candidats validés sur la performance réelle" },
];

export default function RecrutementMarketingPageClient() {
  const schemas = [
      serviceSchema("Recrutement de profils marketing Tech", "Recrutez vos profils marketing avec Rocket4RPO. Talent Acquisition spécialisés pour identifier des marketeurs performants dans l'écosystème Tech.", "/metiers/recrutement-marketing"),
      faqSchema(faqs),
      breadcrumbSchema([{ name: "Accueil", url: "/" }, { name: "Métiers", url: "/metiers/recrutement-marketing" }, { name: "Recrutement Marketing", url: "/metiers/recrutement-marketing" }]),
    ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
<Breadcrumbs items={[{ label: "Métiers", href: "/metiers/recrutement-marketing" }, { label: "Recrutement Marketing" }]} />

    {/* CONTEXTUALIZATION */}
    <section className="py-4">
      <div className="container-wide">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5">
          <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dans l&apos;écosystème Tech, le marketing est un moteur de croissance au même titre que les Sales. Nos TA Specialists recrutent les profils marketing qui parlent le langage Tech : CAC, LTV, pipeline, product-led growth.
          </p>
        </div>
      </div>
    </section>

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-6">Expertise métier</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement de profils marketing Tech{" "}
              <span className="text-gradient">: au-delà du CV, l'impact business</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO s'appuie sur des Talent Acquisition spécialisés en marketing pour identifier les profils qui génèrent de la croissance réelle, pas seulement ceux qui présentent bien sur un CV.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Parler à un expert <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background hover:bg-accent transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le marketing moderne exige des recrutements de précision</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Le marketing a profondément changé. Il ne s'agit plus de communication institutionnelle, mais de growth engineering, de performance mesurable et d'impact direct sur le revenu. Les profils marketing d'aujourd'hui doivent maîtriser des outils complexes, piloter des budgets, expérimenter en continu et démontrer un ROI clair.</p>
              <p>Recruter ces profils avec une approche généraliste — en se basant sur le titre du poste et les entreprises précédentes — conduit inévitablement à des erreurs de casting coûteuses.</p>
              <p className="font-semibold text-foreground">C'est pourquoi Rocket4RPO déploie des Talent Acquisition qui comprennent les leviers marketing, les KPIs de performance et les enjeux business derrière chaque recrutement.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ROLES */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Métiers marketing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Une expertise spécialisée sur les métiers marketing</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Du Growth Manager au CMO, nous comprenons les spécificités de chaque rôle marketing et évaluons les candidats sur leur capacité d'impact réel.</p>
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

    {/* Grille de rémunération Marketing 2026 */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <h2 className="text-3xl font-bold mb-8 text-center">Grille de rémunération Marketing 2026</h2>
        <p className="text-center text-muted-foreground mb-8">Fourchettes observées en Île-de-France pour des profils Marketing en environnement Tech / SaaS.</p>
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
                ["CMO / Head of Marketing", "—", "—", "75-120K€"],
                ["Growth Manager", "38-48K€", "48-65K€", "65-85K€"],
                ["Performance Marketing", "35-45K€", "45-60K€", "60-80K€"],
                ["Product Marketing Manager", "40-50K€", "50-65K€", "65-85K€"],
                ["Content Manager", "32-40K€", "40-52K€", "52-68K€"],
                ["Demand Gen Manager", "38-48K€", "48-62K€", "62-80K€"],
                ["Brand Manager", "35-45K€", "45-58K€", "58-75K€"],
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
      </div>
    </section>

    {/* HYBRID SaaS MARKETING PROFILE */}
    <section className="section-padding">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Profil hybride</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le profil hybride Marketing Tech</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Le marketing Tech exige une combinaison rare : la rigueur analytique de la data et la créativité de la marque. Les meilleurs profils marketing Tech ne sont pas des spécialistes purs — ce sont des hybrides capables de passer du dashboard analytics à la création de contenu en une même journée.</p>
              <p>Cette dualité est ce qui rend ces profils difficiles à recruter avec une approche généraliste. Il ne suffit pas de vérifier la maîtrise d&apos;un outil ou d&apos;un canal : il faut évaluer la capacité à combiner plusieurs expertises pour générer un impact business mesurable.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                { combo: "Growth + Product", desc: "Acquisition pilotée par la compréhension produit et les boucles de rétention." },
                { combo: "Performance + Brand", desc: "Campagnes paid scalables soutenues par une marque forte et différenciante." },
                { combo: "Content + SEO", desc: "Contenu éditorial expert optimisé pour le référencement organique durable." },
              ].map((item, i) => (
                <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-5 rounded-xl border border-primary/20 bg-primary/5 text-center">
                  <p className="text-sm font-bold text-primary mb-2">{item.combo}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* TOOLS STACK GRID */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Stack outils</span>
          <h2 className="text-3xl md:text-4xl font-bold">Stack tools que nos candidats maîtrisent</h2>
          <p className="mt-4 text-lg text-muted-foreground">Les outils que nous vérifions en profondeur lors de la qualification des profils marketing.</p>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {[
            "HubSpot", "Salesforce", "Google Ads", "Meta Ads", "SEMrush", "Mixpanel",
            "Amplitude", "Notion", "Figma", "Webflow", "Intercom", "Segment",
          ].map((tool, i) => (
            <motion.div
              key={tool}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center justify-center p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <span className="text-sm font-semibold text-center">{tool}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* PERFORMANCE LEVERS */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Compréhension des leviers de performance marketing</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Nos recruteurs évaluent les candidats marketing sur leur maîtrise réelle des leviers qui génèrent de la croissance.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {performanceLevers.map((lever, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
              <lever.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">{lever.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lever.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* TOOLS */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Stack marketing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Maîtrise des outils marketing modernes</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Nous vérifions la maîtrise réelle des outils, pas une liste de logos sur un CV. Chaque outil est évalué en contexte d'utilisation.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold text-lg mb-2">{tool.category}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.items}</p>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Méthodologie de qualification marketing</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Notre process évalue l'impact business réel, pas les déclarations de compétences.</p>
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

    {/* HYBRID PROFILES */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Profils hybrides</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Identifier les profils marketing hybrides</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">Les meilleurs marketeurs d'aujourd'hui combinent plusieurs expertises. Nous savons les identifier et les évaluer.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {hybridProfiles.map((profile, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-2xl border border-border bg-card text-center hover:shadow-lg transition-all duration-300">
              <profile.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-3">{profile.type}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{profile.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* RPO INTEGRATION */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">Expertise intégrée</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Une expertise marketing intégrée dans Rocket4RPO</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nos Talent Acquisition spécialisés marketing sont directement intégrés dans les missions Rocket4RPO. Ils apportent une compréhension fine des enjeux marketing qui améliore significativement la qualité des recrutements.</p>
              <p>Cette spécialisation permet de dialoguer efficacement avec les CMO et Heads of Marketing, de challenger les briefs de recrutement et de qualifier les candidats sur leur capacité d'impact réel.</p>
            </div>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {[
                { icon: Settings, text: "Cadrage précis des besoins marketing avec les hiring managers" },
                { icon: CheckCircle, text: "Qualification des candidats sur leur impact business, pas sur leur CV" },
                { icon: Brain, text: "Lecture métier lors des debriefs et prises de décision" },
                { icon: Handshake, text: "Collaboration renforcée entre recruteurs et équipes marketing" },
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
      title="Besoin de recruter un profil marketing capable de générer de l'impact ?"
      subtitle="Nos Talent Acquisition spécialisés marketing sont prêts à identifier les profils qui accéléreront votre croissance."
      ctaLabel="Confier mon recrutement marketing"
    />
    </>
  );
}
