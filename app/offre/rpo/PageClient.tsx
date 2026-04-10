"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Search,
  FileCheck,
  MessageSquare,
  Megaphone,
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const faqs = [
  {
    question: "Quelle est la diff\u00e9rence entre RPO et cabinet\u00a0?",
    answer:
      "Un cabinet de recrutement travaille au succ\u00e8s sur des missions ponctuelles. Le RPO int\u00e8gre un recruteur directement dans vos \u00e9quipes, vos outils et vos rituels. Il recrute comme un membre de votre entreprise, avec une vision long terme et un suivi continu des KPIs.",
  },
  {
    question: "Combien de temps pour \u00eatre op\u00e9rationnel\u00a0?",
    answer:
      "48 heures. Notre process d\u2019onboarding est structur\u00e9 : immersion dans votre organisation, prise en main de vos outils (ATS, Slack, Teams), rencontre avec les hiring managers. Le TA est pleinement op\u00e9rationnel en deux jours.",
  },
  {
    question: "Que se passe-t-il si le TA ne convient pas\u00a0?",
    answer:
      "Nous rempla\u00e7ons le TA sans frais suppl\u00e9mentaires. Notre objectif est de trouver le bon matching entre le profil du TA et votre culture d\u2019entreprise. Si le fit n\u2019est pas l\u00e0, on ajuste imm\u00e9diatement.",
  },
  {
    question: "Quels types de postes pouvez-vous recruter\u00a0?",
    answer:
      "Nos TA Specialists couvrent l\u2019ensemble des fonctions cl\u00e9s : Tech, Sales, Finance, Marketing, Support, Product. Leur exp\u00e9rience multi-sectorielle leur permet de s\u2019adapter rapidement \u00e0 vos enjeux m\u00e9tier.",
  },
  {
    question: "Comment se passe la facturation\u00a0?",
    answer:
      "Facturation mensuelle au TJM, sans frais de succ\u00e8s. Le montant est pr\u00e9visible et transparent. Pas de co\u00fbts cach\u00e9s, pas de commission sur les embauches r\u00e9alis\u00e9es.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const formats = [
  {
    name: "Temps partag\u00e9",
    rythme: "1 \u00e0 3 jours/semaine",
    ideal: "3-8 recrutements/trimestre",
    tjm: "\u00c0 partir de 550\u20ac/jour",
    engagement: "3 mois minimum recommand\u00e9",
    popular: false,
  },
  {
    name: "Temps plein",
    rythme: "4 \u00e0 5 jours/semaine",
    ideal: "10+ recrutements/trimestre",
    tjm: "Nous consulter",
    engagement: "3 mois minimum",
    popular: true,
  },
  {
    name: "Sur-mesure",
    rythme: "Selon vos besoins",
    ideal: "Pic d\u2019activit\u00e9, projet sp\u00e9cifique",
    tjm: "Nous consulter",
    engagement: "Flexible",
    popular: false,
  },
];

const deliverables = [
  { icon: Clock, label: "Shortlists qualifi\u00e9es sous 48h" },
  { icon: BarChart3, label: "Reporting hebdomadaire des KPIs" },
  { icon: Search, label: "Sourcing multi-canal (LinkedIn, approche directe, r\u00e9seau)" },
  { icon: FileCheck, label: "Scorecards structur\u00e9es pour chaque poste" },
  { icon: MessageSquare, label: "Coordination avec vos hiring managers" },
  { icon: Megaphone, label: "Marque employeur\u00a0: le TA repr\u00e9sente VOTRE entreprise, pas Rocket4RPO" },
];

export default function RPOPageClient() {
  const schemas = [
    serviceSchema(
      "RPO \u2014 Recruteur externalis\u00e9 int\u00e9gr\u00e9 \u00e0 votre \u00e9quipe",
      "Int\u00e9grez un Talent Acquisition senior dans vos \u00e9quipes de 1 \u00e0 5 jours par semaine. Premi\u00e8re shortlist en 48h, engagement flexible.",
      "/offre/rpo"
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Offre", url: "/offre/rpo" },
      { name: "RPO \u2014 Recruteur int\u00e9gr\u00e9", url: "/offre/rpo" },
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
          { label: "Offre", href: "/offre/rpo" },
          { label: "RPO \u2014 Recruteur int\u00e9gr\u00e9" },
        ]}
      />

      {/* ── 1. HERO ── */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fadeUp}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Notre offre principale
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Un recruteur senior int\u00e9gr\u00e9{" "}
                <span className="text-gradient">\u00e0 votre \u00e9quipe</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Rocket4RPO int\u00e8gre un Talent Acquisition Specialist directement dans
                vos outils, vos rituels et votre culture. Il recrute comme un membre
                de votre \u00e9quipe&nbsp;&mdash;&nbsp;mais sans CDI.
              </p>
              <div className="mt-8">
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  R\u00e9server un diagnostic gratuit
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. COMMENT \u00c7A MARCHE ── */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Comment \u00e7a marche
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              4 \u00e9tapes simples pour un recrutement op\u00e9rationnel en 48h.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Brief & scorecard",
                text: "On analyse vos besoins et construit une scorecard avec vos managers.",
              },
              {
                step: "02",
                title: "Matching",
                text: "On s\u00e9lectionne le TA id\u00e9al selon votre secteur et votre culture.",
              },
              {
                step: "03",
                title: "Int\u00e9gration",
                text: "Le TA rejoint vos outils (ATS, Slack, Teams) et vos rituels. Op\u00e9rationnel en 48h.",
              },
              {
                step: "04",
                title: "R\u00e9sultats",
                text: "Sourcing cibl\u00e9, shortlists qualifi\u00e9es, KPIs suivis chaque semaine.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-background border border-border"
              >
                <span className="absolute top-6 right-6 text-5xl font-bold text-muted/30 select-none">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold mb-3 pr-12">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CHOISISSEZ VOTRE FORMAT ── */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Choisissez votre format
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Temps partag\u00e9, temps plein ou sur-mesure : adaptez le RPO \u00e0 votre
              rythme de croissance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {formats.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-2xl border ${
                  f.popular
                    ? "border-primary/30 bg-primary/5 shadow-sm"
                    : "border-border bg-background"
                }`}
              >
                {f.popular && (
                  <span className="absolute -top-3 right-6 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    Le plus populaire
                  </span>
                )}
                <h3 className="text-xl font-bold mb-6">{f.name}</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Rythme</dt>
                    <dd className="font-semibold mt-1">{f.rythme}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Id\u00e9al pour</dt>
                    <dd className="font-semibold mt-1">{f.ideal}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">TJM indicatif</dt>
                    <dd className="font-semibold mt-1">{f.tjm}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Engagement</dt>
                    <dd className="font-semibold mt-1">{f.engagement}</dd>
                  </div>
                </dl>
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold rounded-lg transition-colors ${
                    f.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  Choisir ce format <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CE QUE VOUS OBTENEZ ── */}
      <section className="section-padding bg-[hsl(var(--rocket-navy-soft))] text-background">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ce que vous obtenez concr\u00e8tement
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 rounded-xl bg-background/5 border border-background/10"
              >
                <d.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-background/90 font-medium">{d.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. T\u00c9MOIGNAGE ── */}
      <section className="py-16 bg-[hsl(var(--rocket-cream))] border-y border-primary/10">
        <div className="container-wide">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xl md:text-2xl italic text-muted-foreground leading-relaxed">
              &ldquo;En 4 mois, 8 postes pourvus. Le TA s&apos;est int\u00e9gr\u00e9 comme
              un membre de l&apos;\u00e9quipe.&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold">
              &mdash; S.D., VP People
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <FAQSection faqs={faqs} className="bg-[hsl(var(--rocket-cream))]" />

      {/* ── 7. CTA ── */}
      <CTASection
        title="Pr\u00eat \u00e0 int\u00e9grer un recruteur dans votre \u00e9quipe\u00a0?"
        subtitle="30 minutes de diagnostic gratuit. Sans engagement. Premi\u00e8re shortlist en 48h."
        ctaLabel="R\u00e9server un diagnostic gratuit"
      />
    </>
  );
}
