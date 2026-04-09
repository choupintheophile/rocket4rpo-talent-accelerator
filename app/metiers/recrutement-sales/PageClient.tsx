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
  Clock,
  UserCheck,
  Database,
  Timer,
  Euro,
  ShieldCheck,
  Star,
} from "lucide-react";

const faqs = [
  {
    question: "Qu'est-ce que le vivier de 40 000 profils Sales ?",
    answer:
      "Depuis 2017, Rocket4Sales a constitué une base de données propriétaire de plus de 40 000 profils commerciaux pré-qualifiés dans l'écosystème Tech et SaaS en France. Chaque profil a été sourcé, contacté et évalué sur ses compétences réelles. Ce vivier est directement exploité par Rocket4RPO pour accélérer vos recrutements Sales.",
  },
  {
    question: "Quels profils commerciaux recrutez-vous ?",
    answer:
      "Nous couvrons l'intégralité de la chaîne commerciale SaaS : SDR, BDR, Account Executive, Account Manager, Customer Success Manager, Sales Manager, Head of Sales, VP Sales et CRO. Du profil opérationnel junior (30-40K) au profil stratégique C-level (120K+).",
  },
  {
    question: "Comment livrez-vous une shortlist en 48h ?",
    answer:
      "Grâce à notre vivier de 40 000 profils Sales déjà qualifiés, nous n'avons pas besoin de partir de zéro. Dès le cadrage de votre besoin, nous activons immédiatement les profils correspondants dans notre base. C'est ce qui nous permet de vous présenter une première shortlist qualifiée en 48h, là où un cabinet classique met 2 à 3 semaines.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises SaaS ?",
    answer:
      "Notre expertise historique est dans le SaaS et la Tech, mais notre méthodologie et notre vivier s'appliquent à toutes les entreprises qui recrutent des profils commerciaux B2B avec un cycle de vente complexe : fintech, healthtech, legaltech, proptech, etc.",
  },
  {
    question: "Quelle est la différence avec un cabinet de recrutement classique ?",
    answer:
      "Un cabinet classique facture 15-25% du salaire annuel par poste et part d'une feuille blanche à chaque mission. Rocket4RPO fonctionne en modèle RPO (coût fixe mensuel), s'intègre à votre équipe, et s'appuie sur 7 ans de données et 40 000 profils pré-qualifiés. Résultat : shortlist en 48h au lieu de 3 semaines, et un coût total divisé par 2 à 4 sur un plan de recrutement de 10 postes.",
  },
  {
    question: "Comment évaluez-vous les candidats commerciaux ?",
    answer:
      "Nous allons au-delà du CV. Chaque profil de notre base est évalué sur sa performance réelle : % d'atteinte de quota, taux de conversion, deal size moyen, maîtrise du cycle de vente SaaS, compréhension go-to-market. C'est la différence entre un profil qui a un beau CV et un profil qui délivre.",
  },
  {
    question: "Quel est le coût d'un recrutement Sales avec Rocket4RPO ?",
    answer:
      "En modèle RPO, le coût moyen par recrutement est d'environ 4 400 euros sur un plan de 10 postes Sales. À comparer avec 6 000 à 20 000 euros par poste via un cabinet classique (15-25% du salaire). Le modèle est particulièrement rentable pour les plans de recrutement de 5 postes et plus.",
  },
  {
    question: "Combien de temps prend un recrutement de profil commercial ?",
    answer:
      "Première shortlist en 48h. Premier recrutement signé en 2 à 4 semaines en moyenne. Sur un plan de 10 postes, nos clients constatent un time-to-hire réduit de 40 à 60% par rapport à un process interne ou un cabinet classique.",
  },
  {
    question: "Comment démarrer avec Rocket4RPO pour un recrutement Sales ?",
    answer:
      "Réservez un diagnostic Sales gratuit de 30 minutes. Nous analysons votre besoin, votre contexte go-to-market, votre cycle de vente et vos fourchettes salariales. Vous recevez un plan d'action chiffré sous 48h. Premier échange sans engagement.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const salesRoles = [
  {
    icon: Zap,
    title: "SDR / BDR",
    description:
      "Prospection sortante, génération de pipeline, qualification des leads entrants. Premier maillon de la chaîne commerciale SaaS.",
    salary: "32K - 45K (fixe + variable)",
  },
  {
    icon: Target,
    title: "Account Executive",
    description:
      "Pilotage du cycle de vente complet, démo produit, négociation et closing. Le profil clé de votre croissance revenue.",
    salary: "45K - 75K (fixe + variable)",
  },
  {
    icon: Handshake,
    title: "Account Manager",
    description:
      "Gestion et développement du portefeuille client, upsell, cross-sell et rétention. La clé de votre croissance organique.",
    salary: "42K - 65K (fixe + variable)",
  },
  {
    icon: Users,
    title: "Customer Success Manager",
    description:
      "Adoption produit, satisfaction client, réduction du churn et expansion commerciale. Le lien entre produit et revenu.",
    salary: "38K - 60K (fixe + variable)",
  },
  {
    icon: Briefcase,
    title: "Sales Manager",
    description:
      "Management d'équipe commerciale, coaching, pilotage de la performance et structuration des process de vente.",
    salary: "55K - 80K (fixe + variable)",
  },
  {
    icon: Award,
    title: "Head of Sales / VP Sales",
    description:
      "Définition de la stratégie commerciale, structuration de l'équipe, process go-to-market et pilotage global du revenue.",
    salary: "70K - 120K+ (package)",
  },
  {
    icon: TrendingUp,
    title: "CRO",
    description:
      "Alignement Sales, Marketing et Customer Success. Pilotage de l'ensemble de la machine revenue de l'entreprise.",
    salary: "100K - 150K+ (package)",
  },
];

const synergyPoints = [
  {
    icon: Database,
    number: "40 000",
    title: "Profils Sales pré-qualifiés",
    text: "Chaque profil a été sourcé, contacté et évalué sur ses compétences réelles par l'équipe Rocket4Sales depuis 2017.",
  },
  {
    icon: Clock,
    number: "7 ans",
    title: "D'expertise Sales SaaS",
    text: "7 années de recrutement exclusivement Sales dans l'écosystème Tech et SaaS en France. Pas de généralisme.",
  },
  {
    icon: BarChart3,
    number: "48h",
    title: "Pour la 1re shortlist",
    text: "Grâce au vivier existant, nous activons immédiatement les profils correspondants. Pas besoin de partir de zéro.",
  },
  {
    icon: Star,
    number: "92%",
    title: "Rétention à 12 mois",
    text: "La pré-qualification terrain réduit drastiquement les erreurs de casting. Nos placements durent.",
  },
];

const costComparison = [
  {
    method: "RPO Rocket4RPO",
    cost: "~44 000 \u20ac",
    detail: "Pour 10 recrutements Sales",
    perHire: "~4 400 \u20ac / poste",
    pros: [
      "Vivier de 40K profils",
      "Shortlist en 48h",
      "Intégration à votre équipe",
      "KPIs hebdomadaires",
    ],
    highlight: true,
  },
  {
    method: "Cabinet classique",
    cost: "60 000 - 200 000 \u20ac",
    detail: "Pour 10 recrutements Sales",
    perHire: "6 000 - 20 000 \u20ac / poste",
    pros: [
      "Expertise sectorielle variable",
      "Délai 3-6 semaines / poste",
      "Pas de vivier propriétaire",
      "15-25% du salaire annuel",
    ],
    highlight: false,
  },
  {
    method: "Recrutement interne",
    cost: "40 000 - 55 000 \u20ac/an",
    detail: "CDI + charges + outils",
    perHire: "Variable (si 10 postes/an)",
    pros: [
      "Connaissance interne",
      "Coût fixe annuel",
      "Montée en charge lente",
      "1 seule personne = risque",
    ],
    highlight: false,
  },
];

export default function RecrutementSalesPageClient() {
  const schemas = [
    serviceSchema(
      "Recrutement Sales SaaS - RPO spécialisé avec 40 000 profils pré-qualifiés",
      "Le seul RPO en France spécialisé Sales SaaS avec un vivier de 40 000 profils commerciaux pré-qualifiés. Shortlist en 48h. Héritage Rocket4Sales.",
      "/metiers/recrutement-sales"
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Métiers", url: "/metiers/recrutement-sales" },
      { name: "Recrutement Sales SaaS", url: "/metiers/recrutement-sales" },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Breadcrumbs
        items={[
          { label: "Métiers", href: "/metiers/recrutement-sales" },
          { label: "Recrutement Sales SaaS" },
        ]}
      />

      {/* HERO */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fadeUp}>
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
                Notre spécialité #1
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Recrutement Sales SaaS : le seul RPO en France avec un vivier de{" "}
                <span className="text-gradient">
                  40 000 profils pré-qualifiés
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Depuis 2017,{" "}
                <a
                  href="https://www.rocket4sales.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-current underline underline-offset-2 hover:text-primary transition-colors font-medium"
                >
                  Rocket4Sales
                </a>{" "}
                a recruté des centaines de profils commerciaux dans la Tech et le
                SaaS. Aujourd'hui, ce vivier de 40 000 profils et 7 ans
                d'expertise terrain sont directement intégrés dans Rocket4RPO
                pour vous offrir un avantage compétitif unique : des shortlists
                qualifiées en 48h, pas en 3 semaines.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Réserver un diagnostic Sales gratuit{" "}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://meetings.hubspot.com/theophile-choupin/rpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                >
                  Voir nos cas clients Sales
                </a>
              </div>
              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span>40 000 profils Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  <span>Shortlist en 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>92% rétention à 12 mois</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Citation capsule — AI search optimization */}
      <section className="py-4">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm font-semibold text-primary mb-2">En bref</p>
              <p className="text-foreground font-medium">
                Rocket4RPO est le seul cabinet RPO en France spécialisé dans le recrutement de profils Sales SaaS (SDR, AE, Sales Manager, VP Sales). Grâce à un vivier de 40 000 profils commerciaux pré-qualifiés hérité de 7 ans d'expertise Rocket4Sales, les entreprises Tech reçoivent leur première shortlist qualifiée en 48h.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SYNERGIE ROCKET4SALES */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <motion.div
            {...fadeUp}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              La synergie Rocket4Sales
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              7 ans de recrutement Sales = votre avantage compétitif
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Aucun autre RPO en France ne dispose d'un vivier propriétaire de
              profils commerciaux SaaS. C'est l'héritage direct de{" "}
              <a
                href="https://www.rocket4sales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-current underline underline-offset-2 hover:text-primary transition-colors"
              >
                Rocket4Sales
              </a>
              , et c'est ce qui change tout.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {synergyPoints.map((point, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card text-center hover:shadow-lg transition-all duration-300"
              >
                <point.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {point.number}
                </div>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFILS QUE NOUS RECRUTONS */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            {...fadeUp}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Profils recrutés
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Du SDR au CRO : tous les profils Sales SaaS
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nous recrutons l'intégralité de la chaîne commerciale SaaS, du
              profil opérationnel au profil stratégique C-level.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesRoles.map((role, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <role.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                  {role.description}
                </p>
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/5 text-primary/80 border border-primary/10">
                  {role.salary}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOS CANDIDATS SONT MEILLEURS */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Qualité des profils
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi nos candidats Sales sont meilleurs
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Un cabinet classique part d'une feuille blanche à chaque
                mission. Nous, nous partons de 40 000 profils déjà sourcés,
                contactés et évalués sur leur performance réelle.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Database,
                  title: "Profils déjà qualifiés",
                  text: "Chaque profil de notre vivier a été évalué sur ses compétences réelles : % d'atteinte de quota, deal size, taux de conversion. Pas uniquement sur son CV.",
                },
                {
                  icon: Brain,
                  title: "Connaissance métier profonde",
                  text: "7 ans de recrutement Sales SaaS nous donnent une compréhension fine de chaque rôle, chaque cycle de vente, chaque contexte go-to-market.",
                },
                {
                  icon: UserCheck,
                  title: "Matching contexte + profil",
                  text: "Un bon AE en early stage n'est pas un bon AE en scale-up. Nous matchons le profil au stade de maturité, au cycle de vente et à la culture de votre équipe.",
                },
                {
                  icon: ShieldCheck,
                  title: "Track record vérifié",
                  text: "Nous vérifions les résultats concrets des candidats : quotas atteints, pipeline généré, deals closés. La performance réelle, pas le storytelling.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-border bg-card"
                >
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 48H SHORTLIST */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Rapidité
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                48h : de la demande à la première shortlist
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Là où un cabinet classique met 2 à 3 semaines pour produire une
                shortlist, nous livrons en 48h grâce à notre vivier pré-qualifié.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto space-y-0">
              {[
                {
                  step: "J0",
                  title: "Cadrage du besoin",
                  text: "Call de 30 min pour comprendre le poste, le contexte go-to-market, le cycle de vente, la culture d'équipe et la fourchette salariale.",
                },
                {
                  step: "J1",
                  title: "Activation du vivier",
                  text: "Recherche ciblée dans notre base de 40 000 profils Sales. Identification des candidats correspondant au contexte. Premiers contacts.",
                },
                {
                  step: "J2",
                  title: "Shortlist livrée",
                  text: "Vous recevez 3 à 5 profils qualifiés avec fiche détaillée : parcours, performance, motivation, prétentions salariales et disponibilité.",
                },
                {
                  step: "S2-S4",
                  title: "Premiers recrutements signés",
                  text: "Entretiens coordonnés, accompagnement à la décision, négociation et closing. Premier recrutement signé en 2 à 4 semaines en moyenne.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0">
                      {step.step}
                    </div>
                    {i < 3 && <div className="w-px flex-1 bg-border my-2" />}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COUT COMPARE */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <motion.div
            {...fadeUp}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Comparatif
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Coût comparé : RPO vs cabinet vs interne
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Sur un plan de recrutement de 10 postes Sales, le modèle RPO est
              2 à 4 fois moins cher qu'un cabinet classique.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {costComparison.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border-2 ${
                  item.highlight
                    ? "border-primary bg-card shadow-lg relative"
                    : "border-border bg-card"
                }`}
              >
                {item.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-primary text-primary-foreground">
                    Recommandé
                  </span>
                )}
                <h3 className="text-lg font-bold mb-1">{item.method}</h3>
                <div className="text-3xl font-bold text-primary mb-1">
                  {item.cost}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {item.detail}
                </p>
                <p className="text-sm font-semibold mb-4">{item.perHire}</p>
                <ul className="space-y-2">
                  {item.pros.map((pro, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          item.highlight ? "text-primary" : "text-muted-foreground/50"
                        }`}
                      />
                      {pro}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADAPTATION PAR MATURITÉ */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            {...fadeUp}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Adapter le recrutement Sales à votre stade
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Chaque stade de maturité nécessite un profil commercial différent.
              Notre vivier couvre tous les contextes.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Rocket,
                stage: "Early stage",
                profile: "Profils builders",
                text: "Des commerciaux capables de créer le playbook, itérer le discours et closer sans process établi. Profils rares que nous identifions grâce à notre connaissance terrain.",
              },
              {
                icon: TrendingUp,
                stage: "Scale-up",
                profile: "Profils structurés",
                text: "Des commerciaux qui exécutent dans un cadre en construction tout en contribuant à sa structuration. Le sweet spot de notre vivier.",
              },
              {
                icon: Building2,
                stage: "Entreprise mature",
                profile: "Profils spécialisés",
                text: "Des commerciaux experts d'un segment, d'un vertical ou d'un type de cycle de vente. Spécialistes grands comptes, enterprise, mid-market.",
              },
            ].map((card, i) => (
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <CTASection
        title="Prêt à recruter vos profils Sales plus vite ?"
        subtitle="Réservez un diagnostic Sales gratuit de 30 min. Recevez un plan d'action chiffré sous 48h."
        ctaLabel="Réserver un diagnostic Sales gratuit"
              />
    </>
  );
}
