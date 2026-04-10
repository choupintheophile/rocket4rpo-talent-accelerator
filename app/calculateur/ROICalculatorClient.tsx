"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";

/* ── helpers ────────────────────────────────────────────── */

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
        {/* background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-white/10"
          strokeWidth={strokeWidth}
        />
        {/* animated fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#donutGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              circumference - (clampedPct / 100) * circumference,
          }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--rocket-teal))" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      {/* center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter
          value={clampedPct}
          suffix="%"
          className="text-3xl font-bold text-white"
        />
        <span className="text-xs text-white/60 mt-0.5">
          d&apos;economie
        </span>
      </div>
    </div>
  );
}

/* ── stagger variants ───────────────────────────────────── */

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
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

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const SOCIAL_PROOF = [
  { value: "200+", label: "recrutements realises" },
  { value: "92%", label: "de retention" },
  { value: "48h", label: "pour demarrer" },
];

/* ── main component ─────────────────────────────────────── */

interface FAQ {
  question: string;
  answer: string;
}

export default function ROICalculatorClient({ faqs }: { faqs: FAQ[] }) {
  const [postes, setPostes] = useState(5);
  const [salaire, setSalaire] = useState(55000);
  const [coutPct, setCoutPct] = useState(18);
  const [delai, setDelai] = useState(45);

  // ── constants
  const RPO_TJM = 550;
  const RPO_JOURS_PAR_RECRUTEMENT = 4;
  const RPO_DELAI = 35;

  // ── calculations
  const coutActuel = postes * salaire * (coutPct / 100);
  const coutRPO = postes * RPO_TJM * RPO_JOURS_PAR_RECRUTEMENT;
  const economie = coutActuel - coutRPO;
  const gainJours = Math.max(0, (delai - RPO_DELAI) * postes);

  // ── bar chart data (3 models)
  const coutCabinet = postes * salaire * 0.2; // cabinet ~20%
  const coutInterne = postes * (8500 + 2500); // internal recruiter cost estimate
  const barMax = Math.max(coutCabinet, coutInterne, coutRPO, 1);
  const savingsPct =
    coutActuel > 0 ? Math.round((economie / coutActuel) * 100) : 0;

  const bars = [
    {
      label: "Cabinet de recrutement",
      value: coutCabinet,
      gradient: "from-red-400 to-red-600",
      textColor: "text-red-400",
    },
    {
      label: "Recrutement interne",
      value: coutInterne,
      gradient: "from-amber-400 to-amber-600",
      textColor: "text-amber-400",
    },
    {
      label: "Solution RPO",
      value: coutRPO,
      gradient: "from-[hsl(var(--rocket-teal))] to-emerald-400",
      textColor: "text-rocket-teal-glow",
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Calculateur ROI" }]} />

      {/* ── DARK HERO ─────────────────────────────────────── */}
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
                <Zap className="w-3.5 h-3.5" /> Calculateur ROI
              </span>
            </motion.div>

            {/* title */}
            <motion.h1
              variants={stagger.item}
              className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white"
            >
              Calculez vos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                economies
              </span>{" "}
              avec le RPO
            </motion.h1>

            {/* subtitle */}
            <motion.p
              variants={stagger.item}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Comparez le cout de votre recrutement actuel avec une solution RPO.
              Ajustez les curseurs et visualisez instantanement le retour sur
              investissement.
            </motion.p>

            {/* hero savings counter */}
            <motion.div
              variants={stagger.item}
              className="mt-10 flex flex-col items-center"
            >
              <span className="text-sm font-medium text-white/50 uppercase tracking-widest mb-2">
                Economie estimee
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={economie}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold ${
                    economie > 0 ? "text-rocket-teal-glow" : "text-white/40"
                  }`}
                >
                  {economie > 0 ? "+" : ""}
                  {formatCurrency(economie)}
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

      {/* ── CALCULATOR SECTION ────────────────────────────── */}
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
                  Vos parametres
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Ajustez les valeurs pour refleter votre situation.
                </p>
              </motion.div>

              {/* slider card wrapper */}
              <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 space-y-8 shadow-sm">
                {/* Postes */}
                <motion.div variants={stagger.item} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Postes a pourvoir
                    </label>
                    <Input
                      type="number"
                      min={1}
                      max={50}
                      value={postes}
                      onChange={(e) =>
                        setPostes(
                          Math.min(
                            50,
                            Math.max(1, Number(e.target.value) || 1)
                          )
                        )
                      }
                      className="w-20 text-center text-sm font-semibold"
                    />
                  </div>
                  <Slider
                    value={[postes]}
                    onValueChange={([v]) => setPostes(v)}
                    min={1}
                    max={50}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </motion.div>

                {/* Salaire */}
                <motion.div variants={stagger.item} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Euro className="w-4 h-4 text-primary" />
                      Salaire brut annuel moyen
                    </label>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        min={30000}
                        max={150000}
                        step={1000}
                        value={salaire}
                        onChange={(e) =>
                          setSalaire(
                            Math.min(
                              150000,
                              Math.max(30000, Number(e.target.value) || 30000)
                            )
                          )
                        }
                        className="w-28 text-center text-sm font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">EUR</span>
                    </div>
                  </div>
                  <Slider
                    value={[salaire]}
                    onValueChange={([v]) => setSalaire(v)}
                    min={30000}
                    max={150000}
                    step={1000}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>30 000 EUR</span>
                    <span>150 000 EUR</span>
                  </div>
                </motion.div>

                {/* Cout % */}
                <motion.div variants={stagger.item} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-primary" />
                      Cout actuel (% du salaire)
                    </label>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        min={10}
                        max={30}
                        value={coutPct}
                        onChange={(e) =>
                          setCoutPct(
                            Math.min(
                              30,
                              Math.max(10, Number(e.target.value) || 10)
                            )
                          )
                        }
                        className="w-20 text-center text-sm font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[coutPct]}
                    onValueChange={([v]) => setCoutPct(v)}
                    min={10}
                    max={30}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 %</span>
                    <span>30 %</span>
                  </div>
                </motion.div>

                {/* Delai */}
                <motion.div variants={stagger.item} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Delai moyen actuel
                    </label>
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        min={20}
                        max={120}
                        value={delai}
                        onChange={(e) =>
                          setDelai(
                            Math.min(
                              120,
                              Math.max(20, Number(e.target.value) || 20)
                            )
                          )
                        }
                        className="w-20 text-center text-sm font-semibold"
                      />
                      <span className="text-sm text-muted-foreground">
                        jours
                      </span>
                    </div>
                  </div>
                  <Slider
                    value={[delai]}
                    onValueChange={([v]) => setDelai(v)}
                    min={20}
                    max={120}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>20 jours</span>
                    <span>120 jours</span>
                  </div>
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
                  Resultats estimes
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Comparaison en temps reel de 3 modeles de recrutement.
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
                  {/* ── Horizontal bar comparison ─────────── */}
                  <div className="rounded-2xl border border-border/60 bg-background p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Comparaison des couts
                      </h3>
                    </div>

                    {bars.map((bar, i) => {
                      const widthPct = Math.max(
                        4,
                        (bar.value / barMax) * 100
                      );
                      const isRPO = i === 2;

                      return (
                        <div key={bar.label} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span
                              className={`font-medium ${
                                isRPO ? "text-primary" : ""
                              }`}
                            >
                              {bar.label}
                              {isRPO && (
                                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-xs text-primary font-semibold">
                                  <CheckCircle2 className="w-3 h-3" /> Recommande
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
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── KPI cards + Donut ─────────────────── */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Donut savings card */}
                    <div className="sm:col-span-2 rounded-2xl bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
                      <DonutChart percentage={savingsPct > 0 ? savingsPct : 0} />
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-white/50 uppercase tracking-wider font-medium">
                          Economie totale
                        </p>
                        <p className="mt-1 text-3xl md:text-4xl font-bold text-white">
                          {economie > 0 ? "+" : ""}
                          {formatCurrency(economie)}
                        </p>
                        <p className="mt-2 text-sm text-white/60 leading-relaxed max-w-sm">
                          Avec le RPO, vous economisez{" "}
                          <span className="text-rocket-teal-glow font-semibold">
                            {formatCurrency(Math.abs(economie))}
                          </span>{" "}
                          et gagnez{" "}
                          <span className="text-rocket-teal-glow font-semibold">
                            {gainJours} jours
                          </span>{" "}
                          sur vos recrutements.
                        </p>
                      </div>
                    </div>

                    {/* KPI: Economie */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                        <Euro className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Economie par recrutement
                      </p>
                      <p
                        className={`text-2xl md:text-3xl font-bold ${
                          economie > 0
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {postes > 0
                          ? formatCurrency(Math.round(economie / postes))
                          : formatCurrency(0)}
                      </p>
                    </div>

                    {/* KPI: Gain temps */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-500/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Gain de temps total
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-emerald-600">
                        {gainJours} jours
                      </p>
                    </div>

                    {/* KPI: Reduction % */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-blue-500/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Reduction du cout
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-blue-600">
                        {coutActuel > 0
                          ? `-${Math.round((economie / coutActuel) * 100)} %`
                          : "0 %"}
                      </p>
                    </div>

                    {/* KPI: Delai RPO */}
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-amber-500/5 to-background p-6 text-center space-y-2 shadow-sm">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-amber-600" />
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        Delai moyen RPO
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-amber-600">
                        35 jours
                      </p>
                    </div>
                  </div>

                  {/* ── Summary highlight ─────────────────── */}
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
                        <h3 className="font-bold text-lg">
                          En resume
                        </h3>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                          Pour{" "}
                          <span className="font-semibold text-foreground">
                            {postes} poste{postes > 1 ? "s" : ""}
                          </span>{" "}
                          avec un salaire moyen de{" "}
                          <span className="font-semibold text-foreground">
                            {formatCurrency(salaire)}
                          </span>
                          , le RPO vous permet d&apos;economiser{" "}
                          <span className="font-bold text-primary">
                            {formatCurrency(Math.abs(economie))}
                          </span>{" "}
                          par rapport a votre methode actuelle et de gagner{" "}
                          <span className="font-bold text-primary">
                            {gainJours} jours
                          </span>{" "}
                          au total. Soit un cout par recrutement de seulement{" "}
                          <span className="font-semibold text-foreground">
                            {formatCurrency(RPO_TJM * RPO_JOURS_PAR_RECRUTEMENT)}
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── CTAs ──────────────────────────────── */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href={HUBSPOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20"
                    >
                      Recevoir une analyse detaillee
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={HUBSPOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-primary text-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    >
                      Parler a un expert
                    </a>
                  </div>

                  {/* ── Disclaimer ────────────────────────── */}
                  <p className="text-xs text-muted-foreground italic">
                    * Estimations basees sur nos donnees internes (TJM 550 EUR, 4
                    jours/recrutement). Chaque situation est unique.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
