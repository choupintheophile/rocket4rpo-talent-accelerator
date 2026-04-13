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
  Users,
  Clock,
  BarChart3,
  Shield,
  Target,
  TrendingUp,
  UserCheck,
  Repeat,
} from "lucide-react";

const HUBSPOT = "/rdv";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  interim: string;
  rpoIcon: "check" | "x" | "minus";
  interimIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Intégration équipe",
    rpo: "Totale — rituels, outils, Slack",
    interim: "Externe temporaire, peu intégré",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Autonomie sur le process",
    rpo: "Pilotage de A à Z en autonomie",
    interim: "Exécution des tâches assignées",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert tous secteurs + méthodologie éprouvée",
    interim: "Généraliste multi-secteurs",
    rpoIcon: "check",
    interimIcon: "minus",
  },
  {
    criteria: "Modèle de coût",
    rpo: "TJM 500 €/j, prévisible et transparent",
    interim: "TJM × coefficient 1.8 à 2.2 (marge opaque)",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Marque employeur",
    rpo: "Renforcée (le RPO représente votre marque)",
    interim: "Non maîtrisée par l'entreprise",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Durée de mission",
    rpo: "3-12 mois, renouvelable",
    interim: "Court terme (1-6 mois typique)",
    rpoIcon: "check",
    interimIcon: "minus",
  },
  {
    criteria: "Suivi KPIs",
    rpo: "Hebdomadaire, dashboard partagé",
    interim: "Reporting minimal",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Transfert de compétences",
    rpo: "Documentation process, formation équipe",
    interim: "Peu ou pas de transfert",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Vivier de candidats",
    rpo: "Méthodologie de sourcing + 200+ recrutements d'expérience",
    interim: "Pas de vivier propre",
    rpoIcon: "check",
    interimIcon: "x",
  },
  {
    criteria: "Démarrage",
    rpo: "48 h après signature",
    interim: "1-2 semaines",
    rpoIcon: "check",
    interimIcon: "minus",
  },
];

const faqs = [
  {
    question: "Quelle est la différence entre un RPO et un intérimaire en recrutement ?",
    answer:
      "Le RPO est un expert Talent Acquisition intégré à votre équipe qui pilote le process de recrutement de A à Z (stratégie, sourcing, entretiens, négociation). L'intérimaire exécute des tâches assignées sans autonomie sur le process global.",
  },
  {
    question: "Le RPO coûte-t-il plus cher que l'intérim ?",
    answer:
      "Pas forcément. Le TJM d'un RPO (500 €/j) est transparent et sans marge cachée. L'intérim applique un coefficient de 1.8 à 2.2 (soit 80 à 120 % de marge), ce qui peut revenir plus cher pour un niveau d'expertise équivalent.",
  },
  {
    question: "Peut-on utiliser un RPO pour un besoin court terme ?",
    answer:
      "Oui. Chez Rocket4RPO, l'engagement minimum recommandé est de 3 mois, mais le RPO peut être utilisé sur des périodes courtes (3-6 mois) contrairement à un recruteur en CDI.",
  },
  {
    question: "Le RPO apporte-t-il un vivier de candidats ?",
    answer:
      "Oui. Rocket4RPO s'appuie sur une méthodologie de sourcing éprouvée, avec une équipe cumulant 200+ recrutements tous secteurs. L'intérimaire ne dispose généralement pas de cette expertise.",
  },
  {
    question: "L'intérim est-il adapté pour recruter des profils spécialisés ?",
    answer:
      "L'intérim est peu adapté au recrutement de profils spécialisés. Ces profils demandent une connaissance approfondie du marché, des compétences de sourcing avancées et un réseau sectoriel que seul un RPO expérimenté peut offrir.",
  },
  {
    question: "Qui pilote le process de recrutement avec un RPO vs un intérimaire ?",
    answer:
      "Le RPO pilote le process en autonomie : il définit la stratégie de sourcing, qualifie les candidats, coordonne les entretiens et négocie les offres. L'intérimaire attend les instructions et exécute les tâches qu'on lui confie.",
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

export default function RpoVsInterimPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });
  const costRef = useRef(null);
  const costInView = useInView(costRef, { once: true, margin: "-60px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "RPO vs Intérim" }]} />

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
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/20 text-sm text-purple-300 font-medium">
                  <Repeat className="w-3.5 h-3.5" /> Intérim
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-[1.08] text-white">
                RPO vs Intérim :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  quelle solution pour vos besoins ?
                </span>
              </h1>

              <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
                RPO intégré ou intérimaire détaché ? Les deux externalisent le
                recrutement, mais les approches sont radicalement différentes.
                Intégration, autonomie, marque employeur, coût : ce comparatif
                vous aide à choisir en connaissance de cause.
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
              <Image src="/photos/bureau-smile.jpg" alt="Personne souriante au bureau" width={600} height={400} className="rounded-2xl shadow-2xl border border-white/10 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ KEY DIFFERENCES HIGHLIGHTS ══ */}
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
              Différences clés
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ce qui distingue vraiment le RPO de l{"'"}intérim
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-5 h-5" />, title: "Intégration", rpo: "Membre de votre équipe", interim: "Externe temporaire" },
              { icon: <Target className="w-5 h-5" />, title: "Autonomie", rpo: "Pilotage stratégique de A à Z", interim: "Exécution de tâches assignées" },
              { icon: <Shield className="w-5 h-5" />, title: "Marque employeur", rpo: "Représente votre marque", interim: "Non maîtrisée" },
              { icon: <TrendingUp className="w-5 h-5" />, title: "Coût", rpo: "500 €/j transparent", interim: "Coeff. 1.8-2.2x opaque" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border/60 bg-background p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rocket-teal/10 text-rocket-teal mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-base mb-3">{item.title}</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <StatusIcon type="check" />
                    <span><span className="font-medium text-rocket-teal">RPO :</span> {item.rpo}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <StatusIcon type="x" />
                    <span><span className="font-medium text-muted-foreground">Intérim :</span> {item.interim}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPARISON TABLE ══ */}
      <section className="section-padding" ref={tableRef}>
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
              RPO vs Intérim : 10 critères clés
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
                    Intérim / Staffing
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
                        <StatusIcon type={row.interimIcon} />
                        {row.interim}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ COST COMPARISON ══ */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]" ref={costRef}>
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Transparence tarifaire
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Comparatif coûts : RPO vs Intérim
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
              <p className="text-4xl font-bold text-rocket-teal">500 €/jour</p>
              <p className="text-sm text-muted-foreground mt-1">TJM transparent, sans marge cachée</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Expert sénior dédié
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Pilotage autonome du process
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Équipe cumulant 200+ recrutements d{"'"}expérience
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Facturation claire et prévisible
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10">
                  <Repeat className="w-5 h-5 text-purple-600" />
                </span>
                <h3 className="font-bold text-lg">Intérim / Staffing</h3>
              </div>
              <p className="text-4xl font-bold">TJM × coeff. 1.8-2.2</p>
              <p className="text-sm text-muted-foreground mt-1">Coût réel souvent opaque</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Marge agence significative (80-120 %)
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="minus" /> Profil généraliste, exécutant
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Pas de vivier propre
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Pas de transfert de compétences
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WHEN TO CHOOSE ══ */}
      <section className="section-padding">
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
                <h3 className="text-xl font-bold">Quand choisir un RPO</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Vous avez besoin d'un expert qui pilote le process de recrutement",
                  "L'intégration à votre équipe et vos outils est essentielle",
                  "Vous recrutez des profils spécialisés (Tech, Sales, Finance, Marketing)",
                  "Vous voulez un suivi KPI structuré et un transfert de compétences",
                  "Vous recherchez un partenaire stratégique, pas un exécutant",
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10">
                  <Repeat className="w-5 h-5 text-purple-600" />
                </span>
                <h3 className="text-xl font-bold">Quand choisir l{"'"}intérim</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Vous avez besoin de renfort opérationnel ponctuel",
                  "Les postes à pourvoir sont généralistes et peu spécialisés",
                  "Votre process de recrutement est déjà structuré en interne",
                  "Vous avez simplement besoin de bras supplémentaires temporaires",
                  "Le budget intérim est déjà prévu et validé",
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
              En 30 minutes, un expert Rocket4RPO analyse votre contexte et vous
              recommande la solution la plus adaptée.
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
      <FAQSection faqs={faqs} title="Questions fréquentes : RPO vs Intérim" />

      {/* ══ LIENS INTERNES ══ */}
      <InternalLinks currentPath="/rpo-vs-interim" paths={["/calculateur", "/assessment", "/rpo-vs-cabinet", "/rpo-vs-recrutement-interne"]} title="Aller plus loin" />

      {/* ══ FINAL CTA ══ */}
      <CTASection />
    </>
  );
}
