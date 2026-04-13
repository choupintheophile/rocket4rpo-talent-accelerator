"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { InternalLinks } from "@/components/shared/InternalLinks";
import {
  ArrowRight,
  Check,
  X,
  Minus,
  Rocket,
  Zap,
  Briefcase,
  TrendingUp,
  Clock,
  Users,
  BarChart3,
  Shield,
  Target,
  Search,
} from "lucide-react";

const HUBSPOT = "/rdv";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  cabinet: string;
  rpoIcon: "check" | "x" | "minus";
  cabinetIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Coût pour 10 recrutements",
    rpo: "~30 000 € (TJM 500 €/j)",
    cabinet: "120 000 – 200 000 € (15-25 % du salaire)",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Modèle de facturation",
    rpo: "TJM prévisible, ajustable",
    cabinet: "Success fee au pourcentage",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "Délai première shortlist",
    rpo: "48 h",
    cabinet: "2-3 semaines",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Intégration équipe",
    rpo: "Totale (rituels, outils, Slack)",
    cabinet: "Externe ponctuel",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert tous secteurs + méthodologie éprouvée",
    cabinet: "Généraliste ou niche",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "Flexibilité",
    rpo: "1-4 jours/sem, ajustable chaque mois",
    cabinet: "Par mission, engagement fixe",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "Suivi et reporting",
    rpo: "KPIs hebdomadaires, dashboard partagé",
    cabinet: "Reporting ponctuel",
    rpoIcon: "check",
    cabinetIcon: "minus",
  },
  {
    criteria: "Marque employeur",
    rpo: "Renforcée (approche intégrée)",
    cabinet: "Non maîtrisée par l'entreprise",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Démarrage",
    rpo: "48 h après signature",
    cabinet: "1-3 semaines",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
  {
    criteria: "Transfert de compétences",
    rpo: "Documentation process, formation équipe",
    cabinet: "Aucun transfert",
    rpoIcon: "check",
    cabinetIcon: "x",
  },
];

const faqs = [
  {
    question: "Quelle est la principale différence entre un RPO et un cabinet de recrutement ?",
    answer:
      "Le RPO s'intègre directement dans votre équipe et travaille en continu sur vos recrutements, comme un recruteur interne externalisé. Le cabinet intervient ponctuellement, mission par mission, sans intégration à vos process internes.",
  },
  {
    question: "Le RPO est-il moins cher qu'un cabinet de recrutement ?",
    answer:
      "Oui, en général. Pour 10 recrutements, un RPO coûte environ 30 000 € (TJM 500 €/j) contre 120 000 à 200 000 € pour un cabinet facturant 15-25 % du salaire annuel brut. Plus le volume est élevé, plus l'écart se creuse en faveur du RPO.",
  },
  {
    question: "Peut-on combiner RPO et cabinet de recrutement ?",
    answer:
      "Absolument. Beaucoup d'entreprises utilisent un RPO pour le flux récurrent (commerciaux, développeurs) et un cabinet pour des profils rares ou C-level. Les deux approches sont complémentaires.",
  },
  {
    question: "Quelle est la durée minimum d'un engagement RPO ?",
    answer:
      "Chez Rocket4RPO, nous recommandons un minimum de 3 mois pour avoir un impact mesurable. Le cabinet, lui, fonctionne mission par mission sans durée minimum fixe.",
  },
  {
    question: "Le RPO a-t-il accès à mes outils internes (ATS, Slack, etc.) ?",
    answer:
      "Oui, c'est même l'un des principes fondamentaux du RPO. Le recruteur RPO utilise vos outils (ATS, Slack, outils de sourcing) et participe à vos rituels d'équipe comme un collaborateur interne.",
  },
  {
    question: "Le RPO peut-il recruter des profils C-level ?",
    answer:
      "Oui. Bien que le cabinet excelle sur les profils très rares ou C-level, un RPO expérimenté est tout à fait capable de piloter ces recrutements stratégiques, avec l'avantage d'une immersion totale dans votre culture d'entreprise.",
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RpoVsCabinetPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });
  const costRef = useRef(null);
  const costInView = useInView(costRef, { once: true, margin: "-60px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "RPO vs Cabinet" }]} />

      {/* ══ HERO (dark gradient) ══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[150px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
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
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                  <Rocket className="w-3.5 h-3.5" /> RPO
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/20 text-sm text-amber-300 font-medium">
                  <Briefcase className="w-3.5 h-3.5" /> Cabinet
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-[1.08] text-white">
                RPO vs Cabinet de recrutement :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  le guide décisif
                </span>
              </h1>

              <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
                Vous hésitez entre externaliser vos recrutements via un RPO ou
                mandater un cabinet ? Coûts, délais, intégration, flexibilité :
                ce comparatif factuel vous aide à choisir le modèle le plus
                adapté à votre contexte.
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
              </div>
            </motion.div>
            <div className="hidden lg:block lg:w-[45%]">
              <Image src="/photos/team-leader.webp" alt="Expert guidant un professionnel" width={600} height={400} className="rounded-2xl shadow-2xl border border-white/10 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPARISON TABLE ══ */}
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
              RPO vs Cabinet : 10 critères clés
            </h2>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[28%]">
                    Critère
                  </th>
                  <th className="text-left py-4 px-5 font-bold w-[36%] bg-rocket-teal/10 border-x-2 border-rocket-teal/30 rounded-t-xl">
                    <span className="flex items-center gap-2 text-foreground">
                      <Rocket className="w-4 h-4 text-rocket-teal" />
                      RPO Rocket4RPO
                    </span>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[36%]">
                    Cabinet classique
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
                    <td className="py-3.5 px-4 font-medium text-foreground">{row.criteria}</td>
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ COST SIMULATION ══ */}
      <section className="section-padding" ref={costRef}>
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
              Pour 10 recrutements : RPO vs Cabinet
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={costInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border-2 border-rocket-teal/40 bg-rocket-teal/5 p-8 ring-2 ring-rocket-teal/10 shadow-lg shadow-rocket-teal/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rocket-teal/15">
                  <Rocket className="w-5 h-5 text-rocket-teal" />
                </span>
                <h3 className="font-bold text-lg">RPO Rocket4RPO</h3>
              </div>
              <p className="text-4xl font-bold text-rocket-teal">~30 000 €</p>
              <p className="text-sm text-muted-foreground mt-1">Pour 10 recrutements (TJM 500 €/j)</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Coût prévisible et fixe
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Pas de surprise sur la facture
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Plus le volume augmente, plus le coût unitaire baisse
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Facturation mensuelle transparente
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={costInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border/60 bg-background p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10">
                  <Briefcase className="w-5 h-5 text-amber-600" />
                </span>
                <h3 className="font-bold text-lg">Cabinet classique</h3>
              </div>
              <p className="text-4xl font-bold">120 – 200K €</p>
              <p className="text-sm text-muted-foreground mt-1">Pour 10 recrutements (15-25 % du salaire)</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="minus" /> Coût variable selon le salaire du candidat
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Facture potentiellement très élevée sur profils seniors
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="minus" /> Pas d{"'"}économie d{"'"}échelle
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Fee perdu si le candidat ne reste pas
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHEN TO CHOOSE ══ */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Quand choisir l{"'"}un ou l{"'"}autre ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border-2 border-rocket-teal/40 p-8 bg-rocket-teal/5 ring-1 ring-rocket-teal/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rocket-teal/15">
                  <Rocket className="w-5 h-5 text-rocket-teal" />
                </span>
                <h3 className="text-xl font-bold">Quand choisir le RPO</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Vous avez 5 à 15+ recrutements à réaliser sur 3-6 mois",
                  "Vous recherchez une expertise sectorielle ciblée",
                  "Vous souhaitez un démarrage rapide (48 h) sans processus d'achat long",
                  "Vous voulez un suivi KPI hebdomadaire et une transparence totale",
                  "Votre budget ne permet pas un success fee de 15-25 % par poste",
                  "Vous souhaitez renforcer votre marque employeur",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-rocket-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border/60 p-8 bg-background"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10">
                  <Briefcase className="w-5 h-5 text-amber-600" />
                </span>
                <h3 className="text-xl font-bold">Quand choisir un cabinet</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Vous avez 1 à 2 recrutements ponctuels uniquement",
                  "Vous recherchez des profils très rares ou C-level",
                  "Le budget success-fee (15-25 %) n'est pas un frein",
                  "Vous n'avez pas besoin d'intégration aux outils internes",
                  "Vous préférez déléguer entièrement sans pilotage quotidien",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
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
              Pas sûr ? Réservez un diagnostic gratuit
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              En 30 minutes, un expert Rocket4RPO analyse votre contexte de
              recrutement et vous recommande le modèle le plus adapté.
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
      <FAQSection faqs={faqs} title="Questions fréquentes : RPO vs Cabinet" />

      {/* ══ LIENS INTERNES ══ */}
      <InternalLinks currentPath="/rpo-vs-cabinet" paths={["/calculateur", "/assessment", "/rpo-vs-interim", "/rpo-vs-recrutement-interne"]} title="Aller plus loin" />

      {/* ══ FINAL CTA ══ */}
      <CTASection />
    </>
  );
}
