"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import {
  ArrowRight,
  Check,
  X,
  Minus,
  Rocket,
  Zap,
  Target,
  Users,
  TrendingUp,
  Shield,
  Clock,
  BarChart3,
  Building2,
  Briefcase,
} from "lucide-react";

const HUBSPOT = "/rdv";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  cabinet: string;
  interne: string;
  rpoIcon: "check" | "x" | "minus";
  cabinetIcon: "check" | "x" | "minus";
  interneIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Coût pour 10 recrutements",
    rpo: "~30 000 €",
    cabinet: "120 000 – 200 000 €",
    interne: "40-55 K€/an + charges",
    rpoIcon: "check",
    cabinetIcon: "x",
    interneIcon: "minus",
  },
  {
    criteria: "Modèle de facturation",
    rpo: "TJM prévisible (500 €/j)",
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
    rpo: "Expert tous secteurs + méthodologie éprouvée",
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
    rpo: "Hebdomadaire, dashboard partagé",
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
  {
    criteria: "Risque employeur",
    rpo: "Aucun — prestation externalisée",
    cabinet: "Aucun — prestation ponctuelle",
    interne: "CDI — charges, rupture coûteuse",
    rpoIcon: "check",
    cabinetIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Transfert de compétences",
    rpo: "Documentation process, formation",
    cabinet: "Aucun",
    interne: "Capitalisation interne",
    rpoIcon: "check",
    cabinetIcon: "x",
    interneIcon: "check",
  },
  {
    criteria: "Marque employeur",
    rpo: "Renforcée (approche intégrée)",
    cabinet: "Non maîtrisée",
    interne: "Maîtrisée en interne",
    rpoIcon: "check",
    cabinetIcon: "x",
    interneIcon: "check",
  },
];

const costBars = [
  { label: "RPO Rocket4RPO", amount: 30000, color: "bg-rocket-teal", displayAmount: "~30 000 €" },
  { label: "Cabinet classique", amount: 160000, color: "bg-amber-500", displayAmount: "120-200K €" },
  { label: "Recruteur interne", amount: 70000, color: "bg-slate-400", displayAmount: "60-75K €/an" },
];

interface ChoiceCard {
  title: string;
  icon: React.ReactNode;
  accent: string;
  bgClass: string;
  items: string[];
}

const choiceCards: ChoiceCard[] = [
  {
    title: "Choisissez le RPO si...",
    icon: <Rocket className="w-5 h-5" />,
    accent: "border-rocket-teal text-rocket-teal",
    bgClass: "bg-rocket-teal/5 border-rocket-teal/40",
    items: [
      "Vous avez 5 à 15+ recrutements à réaliser sur 3-6 mois",
      "Vous recherchez une expertise sectorielle ciblée",
      "Votre budget ne permet pas un recruteur interne à temps plein",
      "Vous avez besoin d'un démarrage rapide (48 h)",
      "Vous souhaitez un suivi KPI hebdomadaire transparent",
      "Vous voulez renforcer votre marque employeur",
    ],
  },
  {
    title: "Choisissez un cabinet si...",
    icon: <Briefcase className="w-5 h-5" />,
    accent: "border-amber-500/40 text-amber-600",
    bgClass: "bg-background border-border/60",
    items: [
      "Vous avez 1 à 2 recrutements ponctuels uniquement",
      "Vous recherchez des profils très rares ou C-level",
      "Le budget success-fee (15-25 %) n'est pas un frein",
      "Vous n'avez pas besoin d'intégration aux outils internes",
    ],
  },
  {
    title: "Choisissez un recruteur interne si...",
    icon: <Building2 className="w-5 h-5" />,
    accent: "border-slate-400/40 text-slate-500",
    bgClass: "bg-background border-border/60",
    items: [
      "Votre flux de recrutement est constant (10+ postes/mois)",
      "Vous disposez d'un budget RH structuré et pérenne",
      "Vous visez le long terme avec une culture recrutement forte",
      "Vous pouvez attendre 3 mois le temps de recruter ce profil",
    ],
  },
];

const faqs = [
  {
    question: "RPO, cabinet, recruteur interne : lequel est le moins cher ?",
    answer:
      "Pour 10 recrutements, le RPO coûte environ 30 000 € (TJM 500 €/j), contre 120 000 à 200 000 € pour un cabinet (15-25 % du salaire annuel) et 60-75 K€/an charges incluses pour un recruteur interne en CDI. Le RPO offre le meilleur rapport coût/flexibilité pour des volumes de 5 à 15+ recrutements.",
  },
  {
    question: "Peut-on combiner RPO et cabinet de recrutement ?",
    answer:
      "Absolument. Beaucoup d'entreprises utilisent un RPO pour le flux récurrent (commerciaux, développeurs) et un cabinet pour des profils rares ou C-level. Les deux approches sont complémentaires.",
  },
  {
    question: "Quel est le délai de démarrage d'un RPO vs un recruteur interne ?",
    answer:
      "Le RPO démarre en 48 h après signature. Recruter un recruteur interne prend en moyenne 2 à 3 mois (publication, entretiens, préavis). C'est la différence clé quand le besoin est urgent.",
  },
  {
    question: "Le RPO a-t-il accès à mes outils internes ?",
    answer:
      "Oui, c'est l'un des principes fondamentaux du RPO. Le recruteur RPO utilise vos outils (ATS, Slack, outils de sourcing) et participe à vos rituels d'équipe comme un collaborateur interne.",
  },
  {
    question: "Comment fonctionne la facturation du RPO ?",
    answer:
      "Le RPO est facturé au TJM (Taux Journalier Moyen), soit 500 €/jour chez Rocket4RPO. Facturation mensuelle, prévisible, sans frais cachés ni surprise liée au salaire du candidat recruté.",
  },
  {
    question: "Le RPO peut-il remplacer un recruteur interne ?",
    answer:
      "Oui, un RPO assure exactement les mêmes missions qu'un recruteur interne (sourcing, qualification, entretiens, négociation) tout en apportant une expertise sectorielle et une flexibilité totale. Idéal quand le besoin ne justifie pas un CDI permanent.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function StatusIcon({ type }: { type: "check" | "x" | "minus" }) {
  if (type === "check")
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15">
        <Check className="w-3 h-3 text-emerald-500" />
      </span>
    );
  if (type === "x")
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/15">
        <X className="w-3 h-3 text-red-500" />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15">
      <Minus className="w-3 h-3 text-amber-500" />
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ComparateurClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });
  const barsRef = useRef(null);
  const barsInView = useInView(barsRef, { once: true, margin: "-60px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "Comparateur RPO" }]} />

      {/* ══ HERO (dark gradient) ══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[150px]" />
          <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative container-wide py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 25 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:w-[55%]"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium mb-6">
                <BarChart3 className="w-3.5 h-3.5" /> Comparateur objectif
              </span>

              <h1 className="text-3xl md:text-4xl font-bold leading-[1.08] text-white">
                RPO vs Cabinet vs Interne :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  le comparatif qui change tout
                </span>
              </h1>

              <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
                Trois modèles, trois logiques. Le RPO intègre un expert à votre
                équipe. Le cabinet intervient mission par mission. Le recruteur
                interne pilote en CDI. Voici les chiffres pour trancher.
              </p>

              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Réserver un diagnostic gratuit <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/calculateur"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all"
                >
                  Calculer mon ROI
                </a>
              </div>
            </motion.div>
            <div className="hidden lg:block lg:w-[45%]">
              <Image src="/photos/presenting-coworkers.webp" alt="Presentation en equipe" width={600} height={400} className="rounded-2xl shadow-2xl border border-white/10 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ Citation capsule — AI search optimization ══ */}
      <section className="py-4 bg-[hsl(var(--rocket-cream))]">
        <div className="container-tight">
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">En bref</p>
            <p className="text-foreground font-medium">
              Le RPO (Recruitment Process Outsourcing) coûte en moyenne 30 000 € pour 10 recrutements chez Rocket4RPO, contre 120 000 à 200 000 € avec un cabinet de recrutement traditionnel (15-25 % du salaire annuel). Le RPO offre une intégration dans l{"'"}équipe, un suivi KPI hebdomadaire, et une première shortlist en 48 h.
            </p>
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE COMPARISON TABLE ══ */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]" ref={tableRef}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Comparatif détaillé
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              12 critères pour faire le bon choix
            </h2>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[780px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[22%]">
                    Critère
                  </th>
                  <th className="text-left py-4 px-5 font-bold w-[26%] bg-rocket-teal/10 border-x-2 border-rocket-teal/30 rounded-t-xl">
                    <span className="flex items-center gap-2 text-foreground">
                      <Rocket className="w-4 h-4 text-rocket-teal" />
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
                  <motion.tr
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate={tableInView ? "visible" : "hidden"}
                    variants={fadeUp}
                    className="border-t border-border/60 hover:bg-secondary/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-foreground">
                      {row.criteria}
                    </td>
                    <td className="py-3.5 px-5 bg-rocket-teal/10 border-x-2 border-rocket-teal/30">
                      <span className="flex items-center gap-2.5">
                        <StatusIcon type={row.rpoIcon} />
                        <span className="font-medium">{row.rpo}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2.5">
                        <StatusIcon type={row.cabinetIcon} />
                        {row.cabinet}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2.5">
                        <StatusIcon type={row.interneIcon} />
                        {row.interne}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ ANIMATED COST COMPARISON BARS ══ */}
      <section className="section-padding" ref={barsRef}>
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Simulation de coût
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Coût comparé pour 10 recrutements
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Estimation sur la base de 10 recrutements de profils Sales/Tech
              avec un salaire moyen de 45-55 K€.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-8">
            {costBars.map((bar, i) => {
              const maxAmount = 200000;
              const widthPct = Math.round((bar.amount / maxAmount) * 100);
              return (
                <motion.div
                  key={bar.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={barsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{bar.label}</span>
                    <span className="font-bold text-lg">{bar.displayAmount}</span>
                  </div>
                  <div className="w-full h-8 rounded-lg bg-secondary/60 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-lg ${bar.color}`}
                      initial={{ width: 0 }}
                      animate={barsInView ? { width: `${widthPct}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            * Le RPO est jusqu{"'"}à 4,5x moins cher qu{"'"}un cabinet pour un volume de 10 recrutements.
          </motion.p>
        </div>
      </section>

      {/* ══ DECISION CARDS ══ */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Guide de décision
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Dans quel cas choisir chaque modèle ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {choiceCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`rounded-2xl border-2 p-6 ${card.bgClass} ${i === 0 ? "ring-2 ring-rocket-teal/20 shadow-lg shadow-rocket-teal/5" : ""}`}
              >
                <div className={`flex items-center gap-3 mb-5 ${card.accent}`}>
                  {card.icon}
                  <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                </div>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${i === 0 ? "text-rocket-teal" : "text-muted-foreground"}`}
                      />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
                {i === 0 && (
                  <div className="mt-6 pt-4 border-t border-rocket-teal/20">
                    <a
                      href={HUBSPOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-rocket-teal hover:text-rocket-teal-glow transition-colors"
                    >
                      Réserver un diagnostic gratuit <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section-padding bg-rocket-navy-soft text-white">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Pas sûr du bon modèle ?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Réservez un diagnostic gratuit de 30 min avec un expert
              Rocket4RPO. On analyse votre contexte et on vous recommande la
              solution la plus adaptée.
            </p>
            <a
              href={HUBSPOT}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Réserver mon diagnostic gratuit <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FAQSection faqs={faqs} title="Questions fréquentes" />

      {/* ══ FINAL CTA ══ */}
      <CTASection />
    </>
  );
}
