"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { InternalLinks } from "@/components/shared/InternalLinks";
import {
  ArrowRight,
  Rocket,
  FileText,
  Search,
  Users,
  Target,
  Check,
  X,
  Minus,
  Briefcase,
  Calculator,
  TrendingUp,
  Building2,
  Rotate3D,
  Zap,
} from "lucide-react";

const HUBSPOT = "/rdv";

const HOW_IT_WORKS = [
  {
    icon: FileText,
    title: "1. Brief & cadrage",
    desc: "Analyse de vos postes, ICP candidat, scorecard, rituels d'équipe. Démarrage en 1 semaine.",
  },
  {
    icon: Search,
    title: "2. Sourcing multicanal",
    desc: "LinkedIn Recruiter, jobboards, approches directes, cooptation. Première shortlist en 48h.",
  },
  {
    icon: Users,
    title: "3. Qualification",
    desc: "Pré-screening téléphonique, évaluation technique et culturelle, scorecard partagée.",
  },
  {
    icon: Target,
    title: "4. Closing & onboarding",
    desc: "Négociation salariale, suivi de la promesse d'embauche, passage de relais au manager.",
  },
];

interface ComparisonRow {
  criteria: string;
  rpo: { text: string; status: "check" | "x" | "minus" };
  cabinet: { text: string; status: "check" | "x" | "minus" };
  interim: { text: string; status: "check" | "x" | "minus" };
  interne: { text: string; status: "check" | "x" | "minus" };
}

const comparison: ComparisonRow[] = [
  {
    criteria: "Coût pour 10 recrutements",
    rpo: { text: "Sur devis (jusqu'à -75%)", status: "check" },
    cabinet: { text: "120 – 200K €", status: "x" },
    interim: { text: "Coefficient 1,8-2,2", status: "minus" },
    interne: { text: "60 – 90K € / an", status: "minus" },
  },
  {
    criteria: "Délai de démarrage",
    rpo: { text: "1 semaine", status: "check" },
    cabinet: { text: "1-3 semaines", status: "minus" },
    interim: { text: "48-72h", status: "check" },
    interne: { text: "2-3 mois", status: "x" },
  },
  {
    criteria: "Intégration équipe",
    rpo: { text: "Totale", status: "check" },
    cabinet: { text: "Externe ponctuel", status: "x" },
    interim: { text: "Partielle", status: "minus" },
    interne: { text: "Totale", status: "check" },
  },
  {
    criteria: "Flexibilité",
    rpo: { text: "1-5 j/sem ajustables", status: "check" },
    cabinet: { text: "Par mission", status: "minus" },
    interim: { text: "Par semaine", status: "check" },
    interne: { text: "Faible (CDI)", status: "x" },
  },
  {
    criteria: "Engagement minimum",
    rpo: { text: "3 mois", status: "check" },
    cabinet: { text: "Aucun", status: "check" },
    interim: { text: "1 jour", status: "check" },
    interne: { text: "CDI", status: "x" },
  },
];

const USE_CASES = [
  {
    icon: Rocket,
    title: "Startup en forte croissance",
    desc: "5 à 15 recrutements sur 3-6 mois sans le budget d'un cabinet. Le RPO offre un coût prévisible.",
  },
  {
    icon: TrendingUp,
    title: "Scale-up post-levée",
    desc: "Doublement des effectifs annoncé aux investisseurs. Besoin d'un partenaire flexible et rapide.",
  },
  {
    icon: Zap,
    title: "Pic ponctuel de recrutement",
    desc: "Ouverture d'une nouvelle BU ou marché. Renforcer l'équipe TA interne sans embaucher en CDI.",
  },
  {
    icon: Rotate3D,
    title: "Remplacement temporaire",
    desc: "Départ d'un recruteur interne. Le RPO assure la continuité pendant la phase de recrutement.",
  },
  {
    icon: Building2,
    title: "ETI sans équipe TA",
    desc: "PME ou ETI sans recruteur interne qui veut professionnaliser ses recrutements sans créer un poste.",
  },
];

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

interface Props {
  faqs: { question: string; answer: string }[];
}

export default function QuEstCeQueLeRpoClient({ faqs }: Props) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const tableRef = useRef(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-100px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "Qu'est-ce que le RPO" }]} />

      {/* HERO */}
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
          <motion.div
            ref={heroRef}
            initial={{ opacity: 1, y: 0 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium mb-6">
              <Rocket className="w-3.5 h-3.5" /> Guide canonique
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-white">
              Qu{"'"}est-ce que le RPO ?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                Définition, fonctionnement et coût (2026)
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Tout ce qu{"'"}il faut savoir sur le Recruitment Process Outsourcing :
              définition, fonctionnement en 4 étapes, coût, comparaison avec les autres
              modèles de recrutement et cas d{"'"}usage concrets.
            </p>

            {/* En bref */}
            <div className="mt-8 rounded-2xl border border-rocket-teal/30 bg-rocket-teal/5 backdrop-blur p-6 md:p-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-rocket-teal-glow mb-4">
                En bref
              </p>
              <ul className="space-y-2.5 text-white/85 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>
                    Le RPO = externalisation du processus de recrutement avec intégration
                    interne.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>Jusqu{"'"}à 5x moins cher qu{"'"}un cabinet de recrutement classique.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>Durée typique : 3 à 12 mois, facturation forfaitaire prévisible.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>
                    Présent en France depuis 2010, adopté par startups, scale-ups et ETI.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Réserver un diagnostic gratuit <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/calculateur"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Calculer mes économies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DEFINITION */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Définition
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              RPO : Recruitment Process Outsourcing
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Le <strong className="text-foreground">RPO (Recruitment Process Outsourcing)</strong>{" "}
              est un modèle de recrutement dans lequel une entreprise externalise tout ou partie
              de son processus de recrutement à un prestataire spécialisé. Contrairement à un
              cabinet classique, le recruteur RPO s{"'"}intègre directement dans l{"'"}équipe
              cliente et utilise ses outils, rituels et canaux.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Étymologie :</strong> Recruitment Process Outsourcing — littéralement
              &laquo; externalisation du processus de recrutement &raquo;. Terme apparu aux
              États-Unis dans les années 1970, démocratisé en France à partir de 2010.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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
              Fonctionnement
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Comment fonctionne un RPO ? 4 étapes clés
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rocket-teal/10 text-rocket-teal mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
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
              Comparatif
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">RPO vs autres modèles</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comment le RPO se positionne face aux autres formes d{"'"}externalisation du
              recrutement.
            </p>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[22%]">
                    Critère
                  </th>
                  <th className="text-left py-4 px-4 font-bold bg-rocket-teal/10 border-x-2 border-rocket-teal/30 rounded-t-xl w-[22%]">
                    <span className="flex items-center gap-2 text-foreground">
                      <Rocket className="w-4 h-4 text-rocket-teal" /> RPO
                    </span>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[19%]">
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Cabinet
                    </span>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[19%]">
                    Intérim
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground w-[18%]">
                    Recrut. interne
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={tableInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="border-t border-border/60 hover:bg-secondary/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-foreground">{row.criteria}</td>
                    <td className="py-3.5 px-4 bg-rocket-teal/5 border-x-2 border-rocket-teal/30">
                      <span className="flex items-center gap-2">
                        <StatusIcon type={row.rpo.status} />
                        <span className="font-medium">{row.rpo.text}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <StatusIcon type={row.cabinet.status} />
                        {row.cabinet.text}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <StatusIcon type={row.interim.status} />
                        {row.interim.text}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <StatusIcon type={row.interne.status} />
                        {row.interne.text}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* USE CASES */}
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
              Cas d{"'"}usage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Quand choisir un RPO ?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              5 contextes dans lesquels le RPO est le modèle le plus pertinent.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rocket-teal/10 text-rocket-teal mb-4">
                  <useCase.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COST */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Tarification
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Combien coûte un RPO ?</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              La tarification d{"'"}un RPO est{" "}
              <strong className="text-foreground">sur devis</strong>, basée sur le nombre de jours
              par semaine (à partir de 3 jours/semaine) et la durée de la mission. Ce modèle
              forfaitaire est <strong className="text-foreground">jusqu{"'"}à 5x moins cher</strong>{" "}
              qu{"'"}un cabinet classique sur un volume de 10+ recrutements.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Pour un chiffrage précis, utilisez notre calculateur ou réservez un diagnostic
              gratuit.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/calculateur"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
              >
                <Calculator className="w-4 h-4" /> Calculer mon ROI
              </Link>
              <Link
                href="/combien-coute-un-rpo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-xl border border-border hover:bg-secondary/60 transition-all"
              >
                Voir les modèles de facturation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-rocket-navy-soft text-white">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Envie de tester le RPO sur vos recrutements ?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              30 minutes de diagnostic gratuit. Sans engagement. Un expert Rocket4RPO analyse
              votre contexte et vous recommande le modèle le plus adapté.
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

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Questions fréquentes sur le RPO" />

      {/* INTERNAL LINKS */}
      <InternalLinks
        currentPath="/qu-est-ce-que-le-rpo"
        paths={["/offre", "/calculateur", "/rpo-vs-cabinet", "/assessment"]}
        title="Aller plus loin"
      />

      <CTASection />
    </>
  );
}
