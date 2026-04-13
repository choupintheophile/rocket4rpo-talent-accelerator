"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  Building2,
  Clock,
  Users,
  BarChart3,
  Shield,
  Target,
  TrendingUp,
  Scale,
} from "lucide-react";

const HUBSPOT = "/rdv";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Row {
  criteria: string;
  rpo: string;
  interne: string;
  rpoIcon: "check" | "x" | "minus";
  interneIcon: "check" | "x" | "minus";
}

const rows: Row[] = [
  {
    criteria: "Coût mensuel",
    rpo: "~4 400 €/mois (2j/sem) — ajustable",
    interne: "4 500-6 000 €/mois fixe + charges",
    rpoIcon: "check",
    interneIcon: "minus",
  },
  {
    criteria: "Délai de démarrage",
    rpo: "48 h après signature",
    interne: "3 mois (recrutement du recruteur)",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Flexibilité",
    rpo: "1-4 jours/sem, ajustable chaque mois",
    interne: "CDI temps plein, engagement pérenne",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Expertise sectorielle",
    rpo: "Expert tous secteurs + méthodologie éprouvée",
    interne: "Dépend du profil recruté",
    rpoIcon: "check",
    interneIcon: "minus",
  },
  {
    criteria: "Intégration équipe",
    rpo: "Totale (rituels, outils, Slack)",
    interne: "Totale (collaborateur interne)",
    rpoIcon: "check",
    interneIcon: "check",
  },
  {
    criteria: "Risque employeur",
    rpo: "Aucun — prestation externalisée",
    interne: "CDI — charges sociales, rupture coûteuse",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Montée en charge",
    rpo: "Immédiate, +1 recruteur en 48 h",
    interne: "Lente (nouveau recrutement nécessaire)",
    rpoIcon: "check",
    interneIcon: "x",
  },
  {
    criteria: "Suivi KPIs",
    rpo: "Hebdomadaire, dashboard partagé",
    interne: "Variable selon la culture interne",
    rpoIcon: "check",
    interneIcon: "minus",
  },
  {
    criteria: "Transfert de compétences",
    rpo: "Documentation process, formation",
    interne: "Capitalisation interne progressive",
    rpoIcon: "check",
    interneIcon: "check",
  },
  {
    criteria: "Adaptation au volume",
    rpo: "Scale up/down en quelques jours",
    interne: "Impossible sans nouveau recrutement ou licenciement",
    rpoIcon: "check",
    interneIcon: "x",
  },
];

const faqs = [
  {
    question: "Le RPO peut-il remplacer un recruteur interne ?",
    answer:
      "Oui, un RPO peut assurer exactement les mêmes missions qu'un recruteur interne (sourcing, pré-qualification, coordination des entretiens, négociation) tout en apportant une expertise sectorielle et un vivier de candidats immédiatement mobilisable.",
  },
  {
    question: "Combien coûte un RPO par rapport à un recruteur en CDI ?",
    answer:
      "Un RPO à 2 jours/semaine coûte environ 4 400 €/mois (TJM 500 €). Un recruteur en CDI coûte 60-75 K€/an charges comprises, soit 5 000-6 250 €/mois. Le RPO est plus économique si votre flux de recrutement ne justifie pas un temps plein permanent.",
  },
  {
    question: "En combien de temps un RPO peut-il démarrer ?",
    answer:
      "Chez Rocket4RPO, le démarrage se fait en 48 h après signature. Recruter un recruteur interne prend en moyenne 2 à 3 mois (publication de l'offre, entretiens, préavis).",
  },
  {
    question: "Que se passe-t-il si mon besoin de recrutement diminue ?",
    answer:
      "Avec un RPO, vous ajustez le nombre de jours par semaine ou mettez la mission en pause. Avec un CDI, vous continuez à payer le salaire même sans besoin de recrutement, ou vous engagez une rupture coûteuse.",
  },
  {
    question: "Le RPO est-il adapté pour une startup qui recrute ses premiers commerciaux ?",
    answer:
      "C'est même le cas d'usage idéal. La startup bénéficie immédiatement d'un expert recrutement sans prendre le risque d'un CDI recruteur, avec une flexibilité totale pour adapter la mission à sa croissance.",
  },
  {
    question: "Le RPO peut-il travailler à temps plein comme un recruteur interne ?",
    answer:
      "Oui. Le RPO peut intervenir de 1 à 5 jours par semaine selon vos besoins. À 5 jours/semaine, il fonctionne exactement comme un recruteur interne, avec l'avantage de pouvoir réduire ou arrêter sans les contraintes d'un CDI.",
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

export default function RpoVsRecrutementInternePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });
  const costRef = useRef(null);
  const costInView = useInView(costRef, { once: true, margin: "-60px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "RPO vs Recrutement interne" }]} />

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

        <div className="relative container-wide py-8 md:py-12 lg:py-14">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 25 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                <Rocket className="w-3.5 h-3.5" /> RPO
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-sm text-blue-300 font-medium">
                <Building2 className="w-3.5 h-3.5" /> Recruteur interne
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-[1.08] text-white">
              RPO vs Recruteur interne :{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                flexibilité vs stabilité
              </span>
            </h1>

            <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Recruter un recruteur en CDI ou faire appel à un RPO externalisé ?
              Délai de démarrage (48 h vs 3 mois), flexibilité, coût fixe vs
              variable : voici un comparatif objectif pour vous aider à trancher.
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
              Ce qui distingue le RPO du recrutement interne
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Clock className="w-5 h-5" />, title: "Démarrage", rpo: "48 h après signature", interne: "3 mois (recrutement)" },
              { icon: <Scale className="w-5 h-5" />, title: "Flexibilité", rpo: "1-5j/sem, ajustable chaque mois", interne: "CDI temps plein rigide" },
              { icon: <TrendingUp className="w-5 h-5" />, title: "Coût", rpo: "~4 400 €/mois ajustable", interne: "5 000-6 250 €/mois fixe" },
              { icon: <Shield className="w-5 h-5" />, title: "Risque", rpo: "Zéro risque employeur", interne: "CDI + charges + rupture" },
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
                    <span><span className="font-medium text-muted-foreground">Interne :</span> {item.interne}</span>
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
              RPO vs Recruteur interne : 10 critères clés
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
                    Recruteur interne (CDI)
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
              Simulation de coût
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Comparatif coûts : RPO vs Recruteur interne
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
              <p className="text-4xl font-bold text-rocket-teal">~4 400 €/mois</p>
              <p className="text-sm text-muted-foreground mt-1">À 2 jours/semaine (TJM 500 €)</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Démarrage en 48 h
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Zéro charge sociale ou patronale
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Ajustable ou arrêtable chaque mois
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="check" /> Scale de 1 à 5 jours/semaine
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </span>
                <h3 className="font-bold text-lg">Recruteur interne (CDI)</h3>
              </div>
              <p className="text-4xl font-bold">5 000-6 250 €/mois</p>
              <p className="text-sm text-muted-foreground mt-1">Salaire 40-55 K€ + charges = 60-75 K€/an</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> 3 mois avant le démarrage effectif
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Engagement CDI permanent
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="minus" /> Rupture coûteuse si le besoin diminue
                </li>
                <li className="flex items-center gap-2.5">
                  <StatusIcon type="x" /> Charges patronales significatives
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
                  "Votre besoin de recrutement est temporaire ou fluctuant (3-12 mois)",
                  "Vous ne pouvez pas attendre 3 mois pour recruter un recruteur",
                  "Vous avez besoin d'une expertise recrutement immédiate",
                  "Votre budget ne justifie pas un CDI à temps plein",
                  "Vous voulez pouvoir scaler ou réduire rapidement",
                  "Vous souhaitez zéro risque employeur",
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </span>
                <h3 className="text-xl font-bold">Quand choisir un recruteur interne</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Votre flux de recrutement est constant (10+ postes/mois)",
                  "Vous disposez d'un budget RH structuré et pérenne",
                  "Vous visez le long terme avec une culture recrutement forte",
                  "Vous pouvez attendre 3 mois le temps de recruter ce profil",
                  "Vous souhaitez capitaliser sur la connaissance interne",
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
              recommande la solution la plus adaptée entre RPO et recruteur interne.
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
      <FAQSection faqs={faqs} title="Questions fréquentes : RPO vs Recrutement interne" />

      {/* ══ LIENS INTERNES ══ */}
      <InternalLinks currentPath="/rpo-vs-recrutement-interne" paths={["/calculateur", "/assessment", "/rpo-vs-cabinet", "/rpo-vs-interim"]} title="Aller plus loin" />

      {/* ══ FINAL CTA ══ */}
      <CTASection />
    </>
  );
}
