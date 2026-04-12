"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  TrendingDown,
  Clock,
  Euro,
  Users,
  Zap,
  CheckCircle2,
  BarChart3,
  Calendar,
  Shield,
  Target,
  Award,
  Send,
  MessageCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";

/* ── helpers ────────────────────────────────────────────── */

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value);
}

/* ── animated counter ───────────────────────────────────── */

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={className}
    >
      {prefix}
      {formatNumber(Math.abs(value))}
      {suffix}
    </motion.span>
  );
}

/* ── donut / circular chart ─────────────────────────────── */

function DonutChart({
  percentage,
  size = 160,
  strokeWidth = 14,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPct = Math.max(0, Math.min(100, percentage));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-white/10"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#donutGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              circumference - (clampedPct / 100) * circumference,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--rocket-teal))" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter
          value={clampedPct}
          suffix="%"
          className="text-3xl font-bold text-white"
        />
        <span className="text-xs text-white/60 mt-0.5">d'économie</span>
      </div>
    </div>
  );
}

/* ── parameter card ─────────────────────────────────────── */

function ParameterCard({
  icon: Icon,
  label,
  value,
  displayValue,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  suffix,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  displayValue?: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2.5 text-sm font-medium text-foreground">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shrink-0">
            <Icon className="w-4.5 h-4.5 text-primary" />
          </span>
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) =>
              onChange(
                Math.min(max, Math.max(min, Number(e.target.value) || min))
              )
            }
            className="w-24 h-11 text-center text-base font-bold border-2 border-border/80 focus:border-primary rounded-xl"
          />
          {suffix && (
            <span className="text-sm font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </div>

      {displayValue && (
        <div className="text-center">
          <span className="text-2xl font-bold text-primary">
            {displayValue}
          </span>
        </div>
      )}

      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
      />
      <div className="flex justify-between text-xs text-muted-foreground font-medium">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/* ── stagger & animation variants ──────────────────────── */

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 24 },
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

/* ── constants ──────────────────────────────────────────── */

const HUBSPOT = "/rdv";

const SOCIAL_PROOF = [
  { value: "200+", label: "recrutements réalisés" },
  { value: "2-3 sem.", label: "time-to-hire moyen" },
  { value: "1 sem.", label: "pour démarrer" },
];

const COMPARISON_ROWS: {
  critere: string;
  rpo: string;
  cabinet: string;
  interne: string;
}[] = [
  {
    critere: "Coût moyen par recrutement",
    rpo: "2 200 € (forfait)",
    cabinet: "15-25% du salaire",
    interne: "8 000 - 12 000 €",
  },
  {
    critere: "Délai moyen",
    rpo: "2-3 semaines",
    cabinet: "45-90 jours",
    interne: "60-120 jours",
  },
  {
    critere: "Flexibilité (montée/descente en charge)",
    rpo: "Totale",
    cabinet: "Limitée",
    interne: "Très limitée",
  },
  {
    critere: "Intégration dans vos outils",
    rpo: "Oui (ATS, Slack, CRM)",
    cabinet: "Non",
    interne: "Variable",
  },
  {
    critere: "Engagement contractuel",
    rpo: "Sans engagement",
    cabinet: "Par mission",
    interne: "CDI / CDD",
  },
  {
    critere: "Transparence sur le process",
    rpo: "Reporting temps réel",
    cabinet: "Rapport en fin de mission",
    interne: "Variable",
  },
  {
    critere: "Scalabilité",
    rpo: "1 à 50+ postes",
    cabinet: "1 à 5 postes",
    interne: "Limité par l'équipe",
  },
  {
    critere: "Garantie de remplacement",
    rpo: "Incluse",
    cabinet: "3-6 mois selon contrat",
    interne: "Aucune",
  },
];

/* ── main component ─────────────────────────────────────── */

interface FAQ {
  question: string;
  answer: string;
}

export default function ROICalculatorClient({ faqs }: { faqs: FAQ[] }) {
  /* ── state ── */
  const [postes, setPostes] = useState(5);
  const [salaire, setSalaire] = useState(55000);
  const [coutPct, setCoutPct] = useState(18);
  const [delai, setDelai] = useState(45);
  const [postesAnnuels, setPostesAnnuels] = useState(15);

  /* ── constants ── */
  const RPO_TJM = 550;
  const RPO_JOURS_PAR_RECRUTEMENT = 4;
  const RPO_DELAI = 35;

  /* ── calculations ── */
  const calc = useMemo(() => {
    const coutCabinet = postes * salaire * (coutPct / 100);
    const coutInterne = postes * (8500 + 2500);
    const coutRPO = postes * RPO_TJM * RPO_JOURS_PAR_RECRUTEMENT;
    const economie = coutCabinet - coutRPO;
    const gainJours = Math.max(0, (delai - RPO_DELAI) * postes);
    const savingsPct =
      coutCabinet > 0 ? Math.round((economie / coutCabinet) * 100) : 0;
    const barMax = Math.max(coutCabinet, coutInterne, coutRPO, 1);

    // Annual projection
    const coutCabinetAnnuel = postesAnnuels * salaire * (coutPct / 100);
    const coutRPOAnnuel = postesAnnuels * RPO_TJM * RPO_JOURS_PAR_RECRUTEMENT;
    const economieAnnuelle = coutCabinetAnnuel - coutRPOAnnuel;
    const economie3ans = economieAnnuelle * 3;
    const gainJoursAnnuel = Math.max(0, (delai - RPO_DELAI) * postesAnnuels);

    return {
      coutCabinet,
      coutInterne,
      coutRPO,
      economie,
      gainJours,
      savingsPct,
      barMax,
      economieAnnuelle,
      economie3ans,
      gainJoursAnnuel,
      coutParRecrutement: RPO_TJM * RPO_JOURS_PAR_RECRUTEMENT,
    };
  }, [postes, salaire, coutPct, delai, postesAnnuels]);

  const bars = [
    {
      label: "Cabinet de recrutement",
      value: calc.coutCabinet,
      gradient: "from-red-400 to-red-600",
      textColor: "text-red-400",
      bgLight: "bg-red-50",
      tag: `${coutPct}% du salaire`,
    },
    {
      label: "Recrutement interne",
      value: calc.coutInterne,
      gradient: "from-amber-400 to-amber-600",
      textColor: "text-amber-400",
      bgLight: "bg-amber-50",
      tag: "~11 000 € / poste",
    },
    {
      label: "RPO Rocket4RPO",
      value: calc.coutRPO,
      gradient: "from-[hsl(var(--rocket-teal))] to-emerald-400",
      textColor: "text-rocket-teal-glow",
      bgLight: "bg-emerald-50",
      tag: `${formatCurrency(calc.coutParRecrutement)} / poste`,
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Calculateur ROI" }]} />

      {/* ════════════════════════════════════════════════════════
          1. DARK HERO
         ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[8%] w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[150px]" />
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

        <div className="relative container-wide py-20 md:py-28 lg:py-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger.container}
            className="max-w-4xl mx-auto text-center"
          >
            {/* badge */}
            <motion.div variants={stagger.item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                <Zap className="w-3.5 h-3.5" /> Calculateur gratuit
              </span>
            </motion.div>

            {/* title */}
            <motion.h1
              variants={stagger.item}
              className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white"
            >
              Combien pourriez-vous{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                économiser
              </span>{" "}
              avec le RPO ?
            </motion.h1>

            {/* subtitle */}
            <motion.p
              variants={stagger.item}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Comparez le coût de votre recrutement actuel avec une solution RPO
              externalisée. Ajustez les curseurs et visualisez instantanément
              votre retour sur investissement.
            </motion.p>

            {/* hero savings counter */}
            <motion.div
              variants={stagger.item}
              className="mt-10 flex flex-col items-center"
            >
              <span className="text-sm font-medium text-white/50 uppercase tracking-widest mb-2">
                Économie estimée
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={calc.economie}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold ${
                    calc.economie > 0 ? "text-rocket-teal-glow" : "text-white/40"
                  }`}
                >
                  {calc.economie > 0 ? "+" : ""}
                  {formatCurrency(calc.economie)}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* social proof */}
            <motion.div
              variants={stagger.item}
              className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12"
            >
              {SOCIAL_PROOF.map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {item.value}
                  </p>
                  <p className="text-sm text-white/50 mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. CALCULATOR SECTION — 2 columns
         ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* ── LEFT: Inputs ────────────────────────────── */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger.container}
              className="lg:col-span-5 space-y-8"
            >
              <motion.div variants={stagger.item}>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Vos paramètres
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Ajustez les valeurs pour refléter votre situation.
                </p>
              </motion.div>

              {/* slider card */}
              <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 space-y-10 shadow-sm">
                <motion.div variants={stagger.item}>
                  <ParameterCard
                    icon={Users}
                    label="Postes à pourvoir"
                    value={postes}
                    min={1}
                    max={50}
                    step={1}
                    minLabel="1"
                    maxLabel="50"
                    onChange={setPostes}
                  />
                </motion.div>

                <motion.div variants={stagger.item}>
                  <ParameterCard
                    icon={Euro}
                    label="Salaire brut annuel moyen"
                    value={salaire}
                    min={30000}
                    max={150000}
                    step={1000}
                    minLabel="30 000 €"
                    maxLabel="150 000 €"
                    suffix="€"
                    onChange={setSalaire}
                  />
                </motion.div>

                <motion.div variants={stagger.item}>
                  <ParameterCard
                    icon={TrendingDown}
                    label="Coût actuel (% du salaire)"
                    value={coutPct}
                    min={10}
                    max={30}
                    step={1}
                    minLabel="10%"
                    maxLabel="30%"
                    suffix="%"
                    onChange={setCoutPct}
                  />
                </motion.div>

                <motion.div variants={stagger.item}>
                  <ParameterCard
                    icon={Clock}
                    label="Délai moyen actuel"
                    value={delai}
                    min={20}
                    max={120}
                    step={1}
                    minLabel="20 jours"
                    maxLabel="120 jours"
                    suffix="jours"
                    onChange={setDelai}
                  />
                </motion.div>

                <motion.div variants={stagger.item}>
                  <ParameterCard
                    icon={Calendar}
                    label="Nombre de postes par an"
                    value={postesAnnuels}
                    min={1}
                    max={200}
                    step={1}
                    minLabel="1"
                    maxLabel="200"
                    onChange={setPostesAnnuels}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT: Results ───────────────────────────── */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
              >
                <h2 className="text-2xl md:text-3xl font-bold">
                  Résultats estimés
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Comparaison en temps réel de 3 modèles de recrutement.
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${postes}-${salaire}-${coutPct}-${delai}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="space-y-8"
                >
                  {/* ── Giant economy number ──────────────── */}
                  <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 text-center shadow-sm">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      Vous économisez
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={calc.economie}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 22,
                        }}
                        className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${
                          calc.economie > 0
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {calc.economie > 0 ? "+" : ""}
                        {formatCurrency(calc.economie)}
                      </motion.p>
                    </AnimatePresence>
                    <p className="mt-2 text-sm text-muted-foreground">
                      vs. cabinet de recrutement sur{" "}
                      <span className="font-semibold text-foreground">
                        {postes} recrutement{postes > 1 ? "s" : ""}
                      </span>
                    </p>
                  </div>

                  {/* ── Horizontal bar comparison ─────────── */}
                  <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Comparaison des coûts
                      </h3>
                    </div>

                    {bars.map((bar, i) => {
                      const widthPct = Math.max(
                        4,
                        (bar.value / calc.barMax) * 100
                      );
                      const isRPO = i === 2;

                      return (
                        <div key={bar.label} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span
                              className={`font-medium flex items-center gap-2 ${
                                isRPO ? "text-primary" : ""
                              }`}
                            >
                              {bar.label}
                              {isRPO && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary font-semibold">
                                  <CheckCircle2 className="w-3 h-3" />{" "}
                                  Recommandé
                                </span>
                              )}
                            </span>
                            <span
                              className={`font-bold tabular-nums ${bar.textColor}`}
                            >
                              {formatCurrency(bar.value)}
                            </span>
                          </div>
                          <div className="h-10 w-full rounded-lg bg-secondary/60 overflow-hidden relative">
                            <motion.div
                              className={`h-full rounded-lg bg-gradient-to-r ${bar.gradient} ${
                                isRPO ? "shadow-lg shadow-primary/20" : ""
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${widthPct}%` }}
                              transition={{
                                duration: 0.7,
                                ease: [0.25, 0.46, 0.45, 0.94],
                                delay: i * 0.12,
                              }}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                              {bar.tag}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Donut + KPI cards ─────────────────── */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Donut savings card — spans 2 cols */}
                    <div className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
                      <DonutChart
                        percentage={calc.savingsPct > 0 ? calc.savingsPct : 0}
                      />
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-white/50 uppercase tracking-wider font-medium">
                          Économie totale
                        </p>
                        <p className="mt-1 text-3xl md:text-4xl font-bold text-white">
                          {calc.economie > 0 ? "+" : ""}
                          {formatCurrency(calc.economie)}
                        </p>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm">
                          En passant au RPO, vous économisez{" "}
                          <span className="text-rocket-teal-glow font-semibold">
                            {formatCurrency(Math.abs(calc.economie))}
                          </span>{" "}
                          et gagnez{" "}
                          <span className="text-rocket-teal-glow font-semibold">
                            {calc.gainJours} jours
                          </span>{" "}
                          sur{" "}
                          <span className="text-rocket-teal-glow font-semibold">
                            {postes} recrutement{postes > 1 ? "s" : ""}
                          </span>
                          .
                        </p>
                      </div>
                    </div>

                    {/* KPI: Économie totale */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                        <Euro className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Économie totale
                      </p>
                      <p
                        className={`text-2xl md:text-3xl font-bold ${
                          calc.economie > 0
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatCurrency(Math.abs(calc.economie))}
                      </p>
                    </div>

                    {/* KPI: Gain de temps */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-500/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Gain de temps
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-emerald-600">
                        {calc.gainJours} jours
                      </p>
                    </div>

                    {/* KPI: Réduction coût */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-blue-500/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Réduction du coût
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-blue-600">
                        {calc.savingsPct > 0 ? `-${calc.savingsPct}%` : "0%"}
                      </p>
                    </div>

                    {/* KPI: Délai RPO */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-amber-500/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-amber-600" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Délai moyen RPO
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-amber-600">
                        2-3 semaines
                      </p>
                    </div>
                  </div>

                  {/* ── Summary sentence ──────────────────── */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">En résumé</h3>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                          En passant au RPO, vous économisez{" "}
                          <span className="font-bold text-primary">
                            {formatCurrency(Math.abs(calc.economie))}
                          </span>{" "}
                          et gagnez{" "}
                          <span className="font-bold text-primary">
                            {calc.gainJours} jours
                          </span>{" "}
                          sur{" "}
                          <span className="font-semibold text-foreground">
                            {postes} recrutement{postes > 1 ? "s" : ""}
                          </span>
                          . Soit un coût par recrutement de seulement{" "}
                          <span className="font-semibold text-foreground">
                            {formatCurrency(calc.coutParRecrutement)}
                          </span>{" "}
                          au lieu de{" "}
                          <span className="font-semibold text-foreground">
                            {formatCurrency(
                              Math.round(salaire * (coutPct / 100))
                            )}
                          </span>{" "}
                          avec un cabinet.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── Disclaimer ────────────────────────── */}
                  <p className="text-xs text-muted-foreground italic">
                    * Estimations basées sur nos données internes (TJM 550 €, 4
                    jours/recrutement, délai moyen 2-3 semaines). Chaque situation
                    est unique.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. COMPARISON TABLE
         ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger.container}
          >
            <motion.div variants={stagger.item} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
                <Shield className="w-3.5 h-3.5" /> Comparaison détaillée
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                RPO vs Cabinet vs Interne
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Une vue complète pour choisir le modèle de recrutement adapté à
                vos enjeux.
              </p>
            </motion.div>

            <motion.div
              variants={stagger.item}
              className="overflow-x-auto rounded-2xl border border-border/60 shadow-sm"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left p-4 md:p-5 font-semibold text-muted-foreground w-[28%]">
                      Critère
                    </th>
                    <th className="p-4 md:p-5 font-bold text-primary bg-primary/5 border-x border-primary/10 w-[24%]">
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-4 h-4" />
                        RPO Rocket4RPO
                      </div>
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-muted-foreground w-[24%]">
                      Cabinet
                    </th>
                    <th className="p-4 md:p-5 font-semibold text-muted-foreground w-[24%]">
                      Interne
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.critere}
                      className={`border-b border-border/40 ${
                        i % 2 === 0 ? "bg-muted/20" : "bg-background"
                      }`}
                    >
                      <td className="p-4 md:p-5 font-medium text-foreground">
                        {row.critere}
                      </td>
                      <td className="p-4 md:p-5 text-center font-semibold text-primary bg-primary/5 border-x border-primary/10">
                        {row.rpo}
                      </td>
                      <td className="p-4 md:p-5 text-center text-muted-foreground">
                        {row.cabinet}
                      </td>
                      <td className="p-4 md:p-5 text-center text-muted-foreground">
                        {row.interne}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. ANNUAL PROJECTION
         ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger.container}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={stagger.item} className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
                <Target className="w-3.5 h-3.5" /> Projection annuelle
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Votre économie sur le long terme
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Basé sur{" "}
                <span className="font-semibold text-foreground">
                  {postesAnnuels} recrutement{postesAnnuels > 1 ? "s" : ""} par
                  an
                </span>{" "}
                (ajustable dans les paramètres ci-dessus).
              </p>
            </motion.div>

            <motion.div
              variants={stagger.item}
              className="grid sm:grid-cols-3 gap-6"
            >
              {/* Year 1 */}
              <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Sur 1 an
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={calc.economieAnnuelle}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-primary"
                  >
                    {formatCurrency(calc.economieAnnuelle)}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-muted-foreground">
                  d'économie vs. cabinet
                </p>
                <p className="mt-1 text-sm text-emerald-600 font-medium">
                  {calc.gainJoursAnnuel} jours gagnés
                </p>
              </div>

              {/* Year 2 */}
              <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Sur 2 ans
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={calc.economieAnnuelle * 2}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-primary"
                  >
                    {formatCurrency(calc.economieAnnuelle * 2)}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-muted-foreground">
                  d'économie cumulée
                </p>
                <p className="mt-1 text-sm text-emerald-600 font-medium">
                  {calc.gainJoursAnnuel * 2} jours gagnés
                </p>
              </div>

              {/* Year 3 — highlighted */}
              <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-background p-6 md:p-8 text-center shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                  Recommandé
                </div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Sur 3 ans
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={calc.economie3ans}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-primary"
                  >
                    {formatCurrency(calc.economie3ans)}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-2 text-sm text-muted-foreground">
                  d'économie cumulée
                </p>
                <p className="mt-1 text-sm text-emerald-600 font-medium">
                  {calc.gainJoursAnnuel * 3} jours gagnés
                </p>
              </div>
            </motion.div>

            <motion.p
              variants={stagger.item}
              className="mt-6 text-center text-sm text-muted-foreground italic"
            >
              Sur 3 ans, vous économiseriez{" "}
              <span className="font-bold text-primary not-italic">
                {formatCurrency(calc.economie3ans)}
              </span>{" "}
              en passant au RPO.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. SOCIAL PROOF BAND
         ════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-gradient-to-r from-rocket-dark via-rocket-navy-soft to-rocket-dark">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger.container}
            className="flex flex-wrap justify-center gap-10 md:gap-16"
          >
            {SOCIAL_PROOF.map((item) => (
              <motion.div
                key={item.label}
                variants={stagger.item}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {item.value}
                </p>
                <p className="text-sm text-white/60 mt-1">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. DUAL CTA
         ════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container-wide">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger.container}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={stagger.item}
              className="text-3xl md:text-4xl font-bold"
            >
              Prêt à réduire vos coûts de recrutement ?
            </motion.h2>
            <motion.p
              variants={stagger.item}
              className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Recevez une analyse personnalisée ou échangez directement avec un
              expert RPO.
            </motion.p>

            <motion.div
              variants={stagger.item}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
                Recevoir cette analyse par email
              </a>
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                Parler à un expert
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. FAQ + CTA
         ════════════════════════════════════════════════════════ */}
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
