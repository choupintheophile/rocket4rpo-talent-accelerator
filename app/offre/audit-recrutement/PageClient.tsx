"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardList,
  Wrench,
  BarChart3,
  UserCheck,
  Users,
  Megaphone,
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const faqs = [
  {
    question: "Combien de temps dure un audit\u00a0?",
    answer:
      "L\u2019audit express dure 1 \u00e0 2 semaines. L\u2019audit complet avec roadmap prend 2 \u00e0 4 semaines. L\u2019accompagnement au d\u00e9ploiement peut s\u2019\u00e9tendre sur 4 \u00e0 12 semaines selon la complexit\u00e9.",
  },
  {
    question: "Quels livrables recevons-nous\u00a0?",
    answer:
      "Selon la formule choisie : un diagnostic structur\u00e9 de votre process recrutement, une liste de quick wins imm\u00e9diatement activables, un plan d\u2019action d\u00e9taill\u00e9 avec priorit\u00e9s, et pour la formule compl\u00e8te, un accompagnement au d\u00e9ploiement incluant formation de vos \u00e9quipes.",
  },
  {
    question: "L\u2019audit est-il adapt\u00e9 \u00e0 notre taille d\u2019entreprise\u00a0?",
    answer:
      "Oui. Notre m\u00e9thodologie s\u2019adapte aussi bien aux startups en structuration qu\u2019aux ETI et grands groupes qui souhaitent optimiser leur organisation recrutement existante.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const auditPoints = [
  { icon: ClipboardList, label: "Process de recrutement (du brief \u00e0 l\u2019onboarding)" },
  { icon: Wrench, label: "Stack d\u2019outils (ATS, sourcing, \u00e9valuation)" },
  { icon: BarChart3, label: "KPIs et reporting" },
  { icon: UserCheck, label: "Exp\u00e9rience candidat" },
  { icon: Users, label: "Collaboration recrutement/managers" },
  { icon: Megaphone, label: "Marque employeur" },
];

const formats = [
  {
    name: "Audit express",
    duree: "1-2 semaines",
    livrables: "Diagnostic + quick wins",
    prix: "\u00c0 partir de 3\u00a0000\u20ac",
  },
  {
    name: "Audit + roadmap",
    duree: "2-4 semaines",
    livrables: "Diagnostic + plan d\u2019action d\u00e9taill\u00e9",
    prix: "\u00c0 partir de 6\u00a0000\u20ac",
    popular: true,
  },
  {
    name: "Accompagnement complet",
    duree: "4-12 semaines",
    livrables: "Diagnostic + d\u00e9ploiement + formation",
    prix: "Sur devis",
  },
];

export default function AuditRecrutementPageClient() {
  const schemas = [
    serviceSchema(
      "Audit & structuration de votre recrutement",
      "Diagnostic complet de votre process recrutement : outils, m\u00e9thode, organisation. Plan d\u2019action concret en 2 semaines.",
      "/offre/audit-recrutement"
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Offre", url: "/offre/audit-recrutement" },
      { name: "Audit & structuration", url: "/offre/audit-recrutement" },
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
          { label: "Offre", href: "/offre/audit-recrutement" },
          { label: "Audit & structuration" },
        ]}
      />

      {/* ── 1. HERO ── */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fadeUp}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Conseil & structuration
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Votre process de recrutement est-il \u00e0 la hauteur{" "}
                <span className="text-gradient">de vos ambitions\u00a0?</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                En 2 semaines, on audite votre organisation recrutement et on vous
                livre un plan d&apos;action concret&nbsp;: process, outils, formation,
                KPIs.
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

      {/* ── 2. CE QU'ON AUDITE ── */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Ce qu&apos;on audite
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Un diagnostic 360\u00b0 de votre organisation recrutement.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {auditPoints.map((a, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 rounded-xl bg-background border border-border"
              >
                <a.icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="font-medium">{a.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FORMATS D'INTERVENTION ── */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              3 formats d&apos;intervention
            </h2>
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
                    Recommand\u00e9
                  </span>
                )}
                <h3 className="text-xl font-bold mb-6">{f.name}</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Dur\u00e9e</dt>
                    <dd className="font-semibold mt-1">{f.duree}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Livrables</dt>
                    <dd className="font-semibold mt-1">{f.livrables}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Prix indicatif</dt>
                    <dd className="font-semibold mt-1">{f.prix}</dd>
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

      {/* ── 4. FAQ ── */}
      <FAQSection faqs={faqs} />

      {/* ── 5. CTA ── */}
      <CTASection
        title="Votre recrutement m\u00e9rite un diagnostic\u00a0?"
        subtitle="En 30 minutes, on identifie les leviers d\u2019optimisation de votre process recrutement."
        ctaLabel="R\u00e9server un diagnostic gratuit"
      />
    </>
  );
}
