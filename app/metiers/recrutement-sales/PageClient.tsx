"use client";

import Link from "next/link";
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
    question: "Quels profils commerciaux recrutez-vous ?",
    answer:
      "Nous couvrons l'intégralité de la chaîne commerciale : SDR, BDR, Account Executive, Account Manager, Customer Success Manager, Sales Manager, Head of Sales, VP Sales et CRO. Du profil opérationnel junior (30-40K) au profil stratégique C-level (120K+).",
  },
  {
    question: "Comment livrez-vous une shortlist en 48h ?",
    answer:
      "Nos TA Specialists disposent d'un réseau étendu et d'outils de sourcing avancés. Dès le cadrage de votre besoin, nous activons immédiatement les profils correspondants. C'est ce qui nous permet de vous présenter une première shortlist qualifiée en 48h, là où un cabinet classique met 2 à 3 semaines.",
  },
  {
    question: "Travaillez-vous uniquement avec des entreprises Tech ?",
    answer:
      "Notre expertise couvre la Tech, le SaaS, mais aussi tous les secteurs qui recrutent des profils commerciaux B2B avec un cycle de vente complexe : fintech, healthtech, legaltech, proptech, industrie, services, etc.",
  },
  {
    question: "Quelle est la différence avec un cabinet de recrutement classique ?",
    answer:
      "Un cabinet classique facture 15-25% du salaire annuel par poste et part d'une feuille blanche à chaque mission. Rocket4RPO fonctionne en modèle RPO (coût fixe mensuel), s'intègre à votre équipe et s'appuie sur une méthodologie éprouvée. Résultat : shortlist en 48h au lieu de 3 semaines, et un coût total divisé par 2 à 4 sur un plan de recrutement de 10 postes.",
  },
  {
    question: "Comment évaluez-vous les candidats commerciaux ?",
    answer:
      "Nous allons au-delà du CV. Chaque profil est évalué sur sa performance réelle : % d'atteinte de quota, taux de conversion, deal size moyen, maîtrise du cycle de vente, compréhension go-to-market. C'est la différence entre un profil qui a un beau CV et un profil qui délivre.",
  },
  {
    question: "Quel est le coût d'un recrutement Sales avec Rocket4RPO ?",
    answer:
      "En modèle RPO, le coût moyen par recrutement est d'environ 4 400 euros sur un plan de 10 postes. À comparer avec 6 000 à 20 000 euros par poste via un cabinet classique (15-25% du salaire). Le modèle est particulièrement rentable pour les plans de recrutement de 5 postes et plus.",
  },
  {
    question: "Combien de temps prend un recrutement de profil commercial ?",
    answer:
      "Première shortlist en 48h. Premier recrutement signé en 2 à 4 semaines en moyenne. Sur un plan de 10 postes, nos clients constatent un time-to-hire réduit de 40 à 60% par rapport à un process interne ou un cabinet classique.",
  },
  {
    question: "Comment démarrer avec Rocket4RPO pour un recrutement Sales ?",
    answer:
      "Réservez un diagnostic gratuit de 30 minutes. Nous analysons votre besoin, votre contexte go-to-market, votre cycle de vente et vos fourchettes salariales. Vous recevez un plan d'action chiffré sous 48h. Premier échange sans engagement.",
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

const expertisePoints = [
  {
    icon: Database,
    number: "200+",
    title: "Recrutements commerciaux réalisés",
    text: "Nos TA Specialists ont placé des centaines de profils Sales dans des entreprises de toutes tailles et secteurs.",
  },
  {
    icon: Clock,
    number: "7 ans",
    title: "D'expertise en recrutement commercial",
    text: "7 années d'expérience dans le recrutement de profils commerciaux nous donnent une compréhension fine de chaque rôle.",
  },
  {
    icon: BarChart3,
    number: "48h",
    title: "Pour la 1re shortlist",
    text: "Grâce à nos outils de sourcing avancés et notre réseau, nous activons immédiatement les profils correspondants.",
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
      "Réseau étendu de profils",
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
      "Recrutement de profils Sales & Commerciaux — RPO Rocket4RPO",
      "Nos Talent Acquisition Specialists recrutent vos profils commerciaux : SDR, AE, Sales Manager, VP Sales, CRO. Expertise sectorielle et sourcing ciblé.",
      "/metiers/recrutement-sales"
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Métiers", url: "/metiers/recrutement-sales" },
      { name: "Recrutement Sales & Commerciaux", url: "/metiers/recrutement-sales" },
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
          { label: "Recrutement Sales & Commerciaux" },
        ]}
      />

      {/* HERO */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fadeUp}>
              <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
                Métier : Sales & Commerciaux
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Recrutement de profils{" "}
                <span className="text-gradient">
                  Sales & Commerciaux
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Nos Talent Acquisition Specialists recrutent vos profils commerciaux : SDR, AE, Sales Manager, VP Sales, CRO.
                Expertise sectorielle et sourcing ciblé pour vous livrer
                des shortlists qualifiées en 48h, pas en 3 semaines.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://meetings.hubspot.com/theophile-choupin/rpo" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Réserver un diagnostic gratuit{" "}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/cas-clients"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                >
                  Voir nos cas clients
                </Link>
              </div>
              {/* Trust indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span>200+ recrutements réalisés</span>
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
                Rocket4RPO place des Talent Acquisition Specialists experts dans vos équipes pour recruter vos profils commerciaux (SDR, AE, Sales Manager, VP Sales, CRO). Grâce à 7 ans d'expertise en recrutement commercial et une méthodologie éprouvée, les entreprises reçoivent leur première shortlist qualifiée en 48h.
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
              Notre expertise
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              7 ans de recrutement commercial = votre avantage compétitif
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nos TA Specialists sont spécialisés dans le recrutement de profils
              commerciaux. Cette expertise terrain, construite sur des centaines
              de missions, fait toute la différence.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertisePoints.map((point, i) => (
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
              Du SDR au CRO : tous les profils commerciaux
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nous recrutons l'intégralité de la chaîne commerciale, du
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
                mission. Nos TA Specialists s'appuient sur un réseau étendu
                et des profils déjà évalués sur leur performance réelle.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Database,
                  title: "Profils déjà qualifiés",
                  text: "Chaque candidat est évalué sur ses compétences réelles : % d'atteinte de quota, deal size, taux de conversion. Pas uniquement sur son CV.",
                },
                {
                  icon: Brain,
                  title: "Connaissance métier profonde",
                  text: "7 ans de recrutement commercial nous donnent une compréhension fine de chaque rôle, chaque cycle de vente, chaque contexte go-to-market.",
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
                shortlist, nous livrons en 48h grâce à notre réseau et nos outils de sourcing avancés.
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
                  title: "Sourcing & approche directe",
                  text: "Sourcing ciblé via nos outils et notre réseau de profils commerciaux. Identification des candidats correspondant au contexte. Premiers contacts.",
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
              Nos TA Specialists couvrent tous les contextes.
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
                text: "Des commerciaux qui exécutent dans un cadre en construction tout en contribuant à sa structuration. Le sweet spot de notre expertise.",
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
        title="Prêt à recruter vos profils commerciaux plus vite ?"
        subtitle="Réservez un diagnostic gratuit de 30 min. Recevez un plan d'action chiffré sous 48h."
        ctaLabel="Réserver un diagnostic gratuit"
              />
    </>
  );
}
