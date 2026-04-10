"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ClipboardCheck,
  Users,
  Clock,
  Search,
  Heart,
  BarChart3,
  Briefcase,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Question {
  id: string;
  icon: React.ElementType;
  label: string;
  question: string;
  options: string[];
  recommendation: string;
}

const questions: Question[] = [
  {
    id: "process",
    icon: ClipboardCheck,
    label: "Processus",
    question: "Comment qualifieriez-vous votre processus de recrutement ?",
    options: ["Inexistant", "Basique", "Structuré", "Optimisé"],
    recommendation:
      "Mettez en place un processus structuré avec des étapes claires, des responsabilités définies et des critères d\’évaluation objectifs.",
  },
  {
    id: "scorecards",
    icon: CheckCircle2,
    label: "Scorecards",
    question: "Avez-vous des scorecards pour évaluer vos candidats ?",
    options: ["Jamais", "Parfois", "Souvent", "Systématiquement"],
    recommendation:
      "Adoptez des scorecards structurées pour chaque poste afin de réduire les biais et d\’améliorer la qualité de vos recrutements.",
  },
  {
    id: "tth",
    icon: Clock,
    label: "Time-to-hire",
    question: "Quel est votre time-to-hire moyen ?",
    options: ["> 60 jours", "45-60 jours", "30-45 jours", "< 30 jours"],
    recommendation:
      "Optimisez votre pipeline en identifiant les goulots d\’étranglement et en parallélisant les étapes d\’entretien.",
  },
  {
    id: "sourcing",
    icon: Search,
    label: "Sourcing",
    question: "Utilisez-vous des outils de sourcing avancés ?",
    options: ["Non", "LinkedIn basique", "LinkedIn Recruiter", "Multi-canal"],
    recommendation:
      "Diversifiez vos canaux de sourcing (LinkedIn Recruiter, GitHub, meetups, cooptation) pour atteindre les talents passifs.",
  },
  {
    id: "retention",
    icon: Heart,
    label: "Rétention",
    question: "Quel est votre taux de rétention à 12 mois ?",
    options: ["< 70 %", "70-80 %", "80-90 %", "> 90 %"],
    recommendation:
      "Améliorez votre onboarding et alignez mieux les attentes candidat/entreprise dès la phase de recrutement.",
  },
  {
    id: "kpi",
    icon: BarChart3,
    label: "KPIs",
    question: "Avez-vous un suivi KPI de votre recrutement ?",
    options: ["Aucun", "Basique", "Dashboard", "Temps réel"],
    recommendation:
      "Mettez en place un dashboard avec les KPIs essentiels : time-to-hire, taux de conversion, coût par recrutement, qualité du sourcing.",
  },
  {
    id: "volume",
    icon: Briefcase,
    label: "Volume",
    question: "Combien de postes recrutez-vous par trimestre ?",
    options: ["1-3", "4-10", "11-20", "20+"],
    recommendation:
      "À votre volume, un TA Specialist dédié pourrait considérablement accélérer vos recrutements et réduire vos coûts.",
  },
];

const grades = [
  { label: "Débutant", min: 0, max: 7, color: "text-red-500", bg: "bg-red-500", stroke: "#ef4444", fill: "#ef4444" },
  { label: "En progression", min: 8, max: 13, color: "text-amber-500", bg: "bg-amber-500", stroke: "#f59e0b", fill: "#f59e0b" },
  { label: "Performant", min: 14, max: 17, color: "text-emerald-500", bg: "bg-emerald-500", stroke: "#10b981", fill: "#10b981" },
  { label: "Expert", min: 18, max: 21, color: "text-primary", bg: "bg-primary", stroke: "hsl(160,84%,32%)", fill: "hsl(160,84%,32%)" },
] as const;

function getGrade(score: number) {
  return grades.find((g) => score >= g.min && score <= g.max) ?? grades[0];
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

const letterBadges = ["A", "B", "C", "D"];

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useState(() => {
    let start = 0;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  return <>{count}</>;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Phase = "intro" | "quiz" | "results";

export default function AssessmentClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    setAnswers([]);
    setCurrent(0);
    setDirection(1);
    setSelectedOption(null);
    setPhase("quiz");
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      setSelectedOption(optionIndex);
      // Small delay to show selection state
      setTimeout(() => {
        const next = [...answers, optionIndex];
        setAnswers(next);
        setDirection(1);
        setSelectedOption(null);
        if (current < questions.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          setPhase("results");
        }
      }, 350);
    },
    [answers, current],
  );

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setAnswers([]);
    setCurrent(0);
    setSelectedOption(null);
  }, []);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const grade = getGrade(totalScore);
  const percentage = Math.round((totalScore / 21) * 100);

  // Get top 3 weakest areas for recommendations
  const weakest = answers
    .map((score, i) => ({ score, index: i }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait" custom={direction}>
        {/* ================================================================ */}
        {/*  INTRO PHASE                                                     */}
        {/* ================================================================ */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Dark hero section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark min-h-[90vh] flex items-center">
              {/* Animated background orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px]"
                  animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-rocket-teal-glow/6 blur-[120px]"
                  animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]"
                  animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              />

              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-[20%] right-[20%] w-2 h-2 rounded-full bg-primary/40"
                animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-[40%] left-[8%] w-1.5 h-1.5 rounded-full bg-rocket-teal-glow/50"
                animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute bottom-[30%] right-[30%] w-1 h-1 rounded-full bg-emerald-400/40"
                animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              />

              <div className="relative container-wide py-20 md:py-28 lg:py-32">
                <div className="max-w-3xl mx-auto text-center">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/20 text-sm text-primary font-medium">
                      <Target className="w-3.5 h-3.5" /> Diagnostic gratuit
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white"
                  >
                    Votre recrutement est-il{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rocket-teal-glow to-emerald-400">
                      vraiment performant
                    </span>{" "}
                    ?
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto"
                  >
                    {"É"}valuez votre maturité Talent Acquisition et recevez des
                    recommandations personnalisées pour améliorer vos recrutements.
                  </motion.p>

                  {/* 3 Mini-stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
                  >
                    {[
                      { icon: ClipboardCheck, value: "7 questions", sub: "ciblées" },
                      { icon: Clock, value: "2 minutes", sub: "chrono" },
                      { icon: BarChart3, value: "Résultat immédiat", sub: "avec plan d\’action" },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-white">{stat.value}</div>
                          <div className="text-xs text-white/40">{stat.sub}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12"
                  >
                    <Button
                      size="lg"
                      onClick={handleStart}
                      className="gap-2 text-base px-10 py-7 text-lg font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
                    >
                      Lancer le diagnostic <ArrowRight className="w-5 h-5" />
                    </Button>
                    <p className="mt-4 text-xs text-white/30">
                      Gratuit, sans inscription, résultat en 2 minutes
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/*  QUIZ PHASE                                                      */}
        {/* ================================================================ */}
        {phase === "quiz" && (
          <motion.div
            key={`q-${current}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="min-h-screen flex flex-col pt-24 pb-16"
          >
            <div className="container-wide max-w-3xl mx-auto px-4 flex-1 flex flex-col">
              {/* Progress section */}
              <div className="mb-12">
                {/* Step indicator dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {questions.map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <motion.div
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i < current
                            ? "bg-primary"
                            : i === current
                              ? "bg-primary ring-4 ring-primary/20"
                              : "bg-secondary"
                        }`}
                        animate={i === current ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5 }}
                      />
                      {i < questions.length - 1 && (
                        <div
                          className={`w-6 md:w-10 h-0.5 rounded-full transition-colors duration-300 ${
                            i < current ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span className="font-medium">
                    Question {current + 1} sur {questions.length}
                  </span>
                  <span className="text-xs font-mono">
                    {Math.round(((current + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-rocket-teal-glow"
                    initial={{ width: `${(current / questions.length) * 100}%` }}
                    animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question card */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl">
                  {/* Question header */}
                  <div className="text-center mb-10">
                    {(() => {
                      const Icon = questions[current].icon;
                      return (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6"
                        >
                          <Icon className="w-8 h-8 text-primary" />
                        </motion.div>
                      );
                    })()}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
                      {questions[current].question}
                    </h2>
                  </div>

                  {/* Options as interactive cards */}
                  <div className="grid gap-3">
                    {questions[current].options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      return (
                        <motion.button
                          key={opt}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ scale: 1.015, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(i)}
                          disabled={selectedOption !== null}
                          className={`
                            relative w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-200
                            ${
                              isSelected
                                ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                                : "border-border/60 bg-background hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                            }
                          `}
                        >
                          <div className="flex items-center gap-4">
                            {/* Letter badge */}
                            <span
                              className={`
                                flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold transition-colors duration-200
                                ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-muted-foreground"
                                }
                              `}
                            >
                              {letterBadges[i]}
                            </span>

                            {/* Option text */}
                            <span className="font-medium text-sm md:text-base flex-1">{opt}</span>

                            {/* Checkmark when selected */}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              >
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/*  RESULTS PHASE                                                   */}
        {/* ================================================================ */}
        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Results hero: dark background header */}
            <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark pt-24 pb-16 md:pt-28 md:pb-20">
              {/* Background orbs */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
                <div className="absolute bottom-0 right-[15%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
              </div>

              <div className="relative container-wide max-w-4xl mx-auto px-4">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/70 font-medium">
                      <Target className="w-3.5 h-3.5 text-primary" /> Votre résultat
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-2xl md:text-4xl font-bold text-white"
                  >
                    Diagnostic de maturité recrutement
                  </motion.h2>

                  {/* Semi-circular gauge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-10 flex flex-col items-center"
                  >
                    <div className="relative w-64 h-36 md:w-80 md:h-44">
                      <svg
                        viewBox="0 0 200 110"
                        className="w-full h-full"
                        fill="none"
                      >
                        {/* Background arc */}
                        <path
                          d="M 20 100 A 80 80 0 0 1 180 100"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="12"
                          strokeLinecap="round"
                          fill="none"
                        />
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="40%" stopColor="#f59e0b" />
                            <stop offset="70%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="hsl(160,84%,50%)" />
                          </linearGradient>
                        </defs>
                        {/* Filled arc */}
                        <motion.path
                          d="M 20 100 A 80 80 0 0 1 180 100"
                          stroke="url(#gauge-grad)"
                          strokeWidth="12"
                          strokeLinecap="round"
                          fill="none"
                          strokeDasharray={Math.PI * 80}
                          initial={{ strokeDashoffset: Math.PI * 80 }}
                          animate={{
                            strokeDashoffset: Math.PI * 80 - (totalScore / 21) * Math.PI * 80,
                          }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        />
                        {/* Tick marks */}
                        {[0, 7, 13, 17, 21].map((tick) => {
                          const angle = Math.PI - (tick / 21) * Math.PI;
                          const innerR = 68;
                          const outerR = 73;
                          const cx = 100;
                          const cy = 100;
                          return (
                            <line
                              key={tick}
                              x1={cx + innerR * Math.cos(angle)}
                              y1={cy - innerR * Math.sin(angle)}
                              x2={cx + outerR * Math.cos(angle)}
                              y2={cy - outerR * Math.sin(angle)}
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth="1.5"
                            />
                          );
                        })}
                      </svg>
                      {/* Score number in center */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                          className="text-center"
                        >
                          <div className="text-5xl md:text-6xl font-bold text-white">
                            <AnimatedCounter target={totalScore} duration={1.5} />
                          </div>
                          <div className="text-sm text-white/40 font-medium">/ 21 points</div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Grade badge with glow */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="mt-6"
                    >
                      <div
                        className={`
                          relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-lg
                          ${grade.color} bg-white/5 border border-white/10
                        `}
                      >
                        {/* Glow effect behind the badge */}
                        <div
                          className="absolute inset-0 rounded-full blur-xl opacity-30"
                          style={{ backgroundColor: grade.fill }}
                        />
                        <span className="relative flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: grade.fill, boxShadow: `0 0 12px ${grade.fill}` }}
                          />
                          {grade.label}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-white/40">
                        {percentage}% de maturité recrutement
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Results details: light background */}
            <section className="section-padding bg-gradient-to-b from-background to-muted/30">
              <div className="container-wide max-w-4xl mx-auto px-4">
                {/* Per-criteria breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-14"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">
                    Détail par critère
                  </h3>
                  <p className="text-muted-foreground text-center text-sm mb-8">
                    Score individuel sur chacun des 7 axes évalués
                  </p>

                  <div className="bg-background rounded-2xl p-6 md:p-8 border border-border/60 shadow-sm">
                    <div className="space-y-4">
                      {questions.map((q, i) => {
                        const score = answers[i] ?? 0;
                        const pct = Math.round((score / 3) * 100);
                        const Icon = q.icon;
                        const barColor =
                          score === 0
                            ? "bg-red-500"
                            : score === 1
                              ? "bg-amber-500"
                              : score === 2
                                ? "bg-emerald-500"
                                : "bg-primary";
                        return (
                          <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                            className="flex items-center gap-3 md:gap-4"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs md:text-sm text-muted-foreground w-24 md:w-32 shrink-0 truncate">
                              {q.label}
                            </span>
                            <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${barColor}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold w-10 text-right">
                              {score}/3
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Summary row */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Score global</span>
                      <span className={`text-lg font-bold ${grade.color}`}>
                        {totalScore} / 21
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-14"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">
                    Vos 3 axes d&apos;amélioration prioritaires
                  </h3>
                  <p className="text-muted-foreground text-center text-sm mb-8">
                    Recommandations personnalisées basées sur vos réponses
                  </p>

                  <div className="grid gap-4">
                    {weakest.map(({ index, score }, rank) => {
                      const q = questions[index];
                      const Icon = q.icon;
                      const priorityColors = [
                        "border-l-red-500",
                        "border-l-amber-500",
                        "border-l-yellow-500",
                      ];
                      return (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + rank * 0.15 }}
                          className={`
                            relative flex gap-4 p-5 md:p-6 rounded-2xl border border-border/60 bg-background
                            border-l-4 ${priorityColors[rank]} shadow-sm hover:shadow-md transition-shadow
                          `}
                        >
                          {/* Priority number */}
                          <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                            {rank + 1}
                          </div>
                          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm">{q.question}</p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {q.recommendation}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Votre score :</span>
                              <span className="text-xs font-bold">{score}/3</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Visual summary card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-14"
                >
                  <div className="bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark rounded-2xl p-8 md:p-10 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="text-5xl font-bold text-white mb-2">
                        {totalScore}/21
                      </div>
                      <div className={`text-lg font-semibold mb-4 ${grade.color}`}>
                        {grade.label}
                      </div>
                      <p className="text-white/50 text-sm mb-6">
                        Votre niveau de maturité recrutement : {percentage}%
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {questions.map((q, i) => {
                          const s = answers[i] ?? 0;
                          const dotColor =
                            s === 0
                              ? "bg-red-500"
                              : s === 1
                                ? "bg-amber-500"
                                : s === 2
                                  ? "bg-emerald-500"
                                  : "bg-primary";
                          return (
                            <div key={q.id} className="flex flex-col items-center gap-1">
                              <div className={`w-3 h-3 rounded-full ${dotColor}`} />
                              <span className="text-[10px] text-white/30">{q.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-white/25">
                        Diagnostic Rocket4RPO &mdash; recrutement optimisé
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-center mb-10"
                >
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-muted/50 border border-border/40">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Rejoignez les{" "}
                      <strong className="text-foreground">200+ entreprises</strong> qui ont
                      optimisé leur recrutement
                    </span>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button asChild size="lg" className="gap-2 px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-primary/20">
                    <a
                      href="https://meetings.hubspot.com/theophile-choupin/rpo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Recevoir votre rapport détaillé{" "}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-2 px-8 py-6 text-base rounded-xl"
                  >
                    <a
                      href="https://meetings.hubspot.com/theophile-choupin/rpo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Parler à un expert
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRestart}
                    className="gap-2 mt-2 sm:mt-0"
                  >
                    <RotateCcw className="w-4 h-4" /> Recommencer
                  </Button>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
