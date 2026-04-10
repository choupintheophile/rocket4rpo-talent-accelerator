"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { motion } from "framer-motion";
import { Check, X, Minus, ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  cabinet: string;
  interne: string;
  /** Visual icon for each column: "check" | "x" | "minus" */
  rpoIcon?: "check" | "x" | "minus";
  cabinetIcon?: "check" | "x" | "minus";
  interneIcon?: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Coût pour 10 recrutements",
    rpo: "~44 000 €",
    cabinet: "120 000 – 200 000 €",
    interne: "40-55 K€/an + charges",
    rpoIcon: "check",
    cabinetIcon: "x",
    interneIcon: "minus",
  },
  {
    criteria: "Modèle de facturation",
    rpo: "TJM prévisible (550 €/j)",
    cabinet: "15-25 % du salaire annuel",
    interne: "Salaire fixe CDI",
    rpoIcon: "check",
    cabinetIcon: "minus",
    interneIcon: "minus",
  },
  {
    criteria: "Délai première shortlist",
    rpo: "48 h",
    cabinet: "2-3 semaines",
    interne: "Variable (si dispo)",
    rpoIcon: "check",
    cabinetIcon: "x",
    interneIcon: "minus",
  },
  {
    criteria: "Intégration équipe",
    rpo: "Totale (rituels, outils, Slack)",
    cabinet: "Externe ponctuel",
    interne: "Totale",
    rpoIcon: "check",
    cabinetIcon: "x",
    interneIcon: "check",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert recrutement tous secteurs + méthodologie éprouvée",
    cabinet: "Généraliste",
    interne: "Dépend du profil",
    rpoIcon: "check",
    cabinetIcon: "minus",
    interneIcon: "minus",
  },
  {
    criteria: "Flexibilité",
    rpo: "1-4 jours/sem, ajustable",
    cabinet: "Par mission",
    interne: "CDI rigide",
    rpoIcon: "check",
    cabinetIcon: "minus",
    interneIcon: "x",
  },
  {
    criteria: "Engagement minimum",
    rpo: "3 mois recommandé",
    cabinet: "Par recrutement",
    interne: "CDI",
    rpoIcon: "check",
    cabinetIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Suivi KPIs",
    rpo: "Hebdomadaire",
    cabinet: "Ponctuel",
    interne: "Variable",
    rpoIcon: "check",
    cabinetIcon: "minus",
    interneIcon: "minus",
  },
  {
    criteria: "Démarrage",
    rpo: "48 h",
    cabinet: "1-3 semaines",
    interne: "3 mois (recrutement)",
    rpoIcon: "check",
    cabinetIcon: "minus",
    interneIcon: "x",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Icon({ type }: { type?: "check" | "x" | "minus" }) {
  if (type === "check")
    return <Check className="w-4 h-4 text-green-500 shrink-0" />;
  if (type === "x") return <X className="w-4 h-4 text-red-500 shrink-0" />;
  if (type === "minus")
    return <Minus className="w-4 h-4 text-amber-500 shrink-0" />;
  return null;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/* ------------------------------------------------------------------ */
/*  Cards for "Dans quel cas choisir..."                               */
/* ------------------------------------------------------------------ */

interface ChoiceCard {
  title: string;
  accent: string; // tailwind border color
  items: string[];
}

const choiceCards: ChoiceCard[] = [
  {
    title: "Choisissez le RPO si...",
    accent: "border-primary",
    items: [
      "Vous avez 5 à 10 recrutements à réaliser sur 3-6 mois",
      "Vous recherchez une expertise sectorielle ciblée",
      "Votre budget ne permet pas un recruteur interne à temps plein",
      "Vous avez besoin d'un démarrage rapide (48 h)",
      "Vous souhaitez un suivi KPI hebdomadaire transparent",
    ],
  },
  {
    title: "Choisissez un cabinet si...",
    accent: "border-muted-foreground/30",
    items: [
      "Vous avez 1 à 2 recrutements ponctuels uniquement",
      "Vous recherchez des profils très rares ou C-level",
      "Le budget success-fee (15-25 %) n'est pas un frein",
      "Vous n'avez pas besoin d'intégration aux outils internes",
    ],
  },
  {
    title: "Choisissez un recruteur interne si...",
    accent: "border-muted-foreground/30",
    items: [
      "Votre flux de recrutement est constant (10+ postes/mois)",
      "Vous disposez d'un budget RH structuré et pérenne",
      "Vous visez le long terme avec une culture recrutement forte",
      "Vous pouvez attendre 3 mois le temps de recruter ce profil",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ComparateurClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Comparateur RPO" }]} />

      {/* Hero */}
      <section className="section-padding pt-8 bg-[hsl(var(--rocket-cream))]">
        <div className="container-tight">
          <motion.div {...fadeUp}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              RPO vs Cabinet de recrutement vs Recruteur interne : le comparatif
              complet
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
              Trois modèles, trois logiques. Le RPO (Recruitment Process
              Outsourcing) externalise tout ou partie de votre recrutement avec
              un expert intégré à votre équipe. Le cabinet intervient
              ponctuellement sur des missions ciblées. Le recruteur interne
              pilote le recrutement en CDI depuis vos bureaux. Voici un
              comparatif factuel pour vous aider à choisir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Citation capsule — AI search optimization */}
      <section className="py-4 bg-[hsl(var(--rocket-cream))]">
        <div className="container-tight">
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">En bref</p>
            <p className="text-foreground font-medium">
              Le RPO (Recruitment Process Outsourcing) coûte en moyenne 44 000€ pour 10 recrutements chez Rocket4RPO, contre 120 000 à 200 000€ avec un cabinet de recrutement traditionnel (15-25% du salaire annuel). Le RPO offre une intégration dans l'équipe, un suivi KPI hebdomadaire, et une première shortlist en 48h.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding pt-0 bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-x-auto -mx-4 px-4"
          >
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[22%]">
                    Critère
                  </th>
                  <th className="text-left py-4 px-4 font-bold w-[26%] border-x-2 border-primary bg-primary/5 rounded-t-lg">
                    <span className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" />
                      RPO Rocket4RPO
                    </span>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[26%]">
                    Cabinet classique
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[26%]">
                    Recruteur interne
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium">{row.criteria}</td>
                    <td className="py-3.5 px-4 border-x-2 border-primary bg-primary/5">
                      <span className="flex items-center gap-2">
                        <Icon type={row.rpoIcon} />
                        {row.rpo}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Icon type={row.cabinetIcon} />
                        {row.cabinet}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Icon type={row.interneIcon} />
                        {row.interne}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Decision cards */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-bold text-center mb-10"
          >
            Dans quel cas choisir chaque modèle ?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {choiceCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`rounded-xl border-2 ${card.accent} p-6 ${i === 0 ? "bg-primary/5" : "bg-background"}`}
              >
                <h3 className="text-lg font-bold mb-4">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${i === 0 ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-tight text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold">
              Pas sûr du bon modèle ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Réservez un diagnostic gratuit de 30 min avec un expert
              Rocket4RPO. On analyse votre contexte et on vous recommande la
              solution la plus adaptée.
            </p>
            <a
              href="https://meetings.hubspot.com/theophile-choupin/rpo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Réserver mon diagnostic gratuit
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
