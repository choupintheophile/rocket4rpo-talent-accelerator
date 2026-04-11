"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Target,
  TrendingUp,
  FileText,
  Search,
  BarChart3,
  Zap,
  Star,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Timer,
  Radar,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const mockCandidates = [
  { name: "A. Martin", role: "AE SaaS", company: "Scale-up Fintech", experience: "4 ans", score: 94 },
  { name: "S. Dubois", role: "Senior AE", company: "Éditeur SaaS", experience: "6 ans", score: 91 },
  { name: "M. Laurent", role: "AE Mid-Market", company: "Start-up B2B", experience: "3 ans", score: 88 },
  { name: "T. Bernard", role: "AE Enterprise", company: "Licorne Tech", experience: "5 ans", score: 85 },
  { name: "L. Petit", role: "AE SaaS", company: "Scale-up RH Tech", experience: "4 ans", score: 82 },
];

const steps = [
  { label: "Brief & Scorecard", icon: FileText },
  { label: "Sourcing", icon: Search },
  { label: "Shortlist", icon: Users },
  { label: "Résultats", icon: BarChart3 },
];

const HUBSPOT_LINK = "https://meetings.hubspot.com/theophile-choupin/rpo";

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  suffix = "",
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Fast counter (sourcing profiles scanned)                           */
/* ------------------------------------------------------------------ */

function FastCounter({ target, duration = 3000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <span>{count.toLocaleString("fr-FR")}</span>;
}

/* ------------------------------------------------------------------ */
/*  Score badge                                                        */
/* ------------------------------------------------------------------ */

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
      : score >= 85
        ? "text-amber-400 bg-amber-400/10 border-amber-400/30"
        : "text-orange-400 bg-orange-400/10 border-orange-400/30";

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${color}`}>
      {score}%
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Radar pulse animation (sourcing step)                              */
/* ------------------------------------------------------------------ */

function RadarPulse() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 0.3, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <Radar className="w-6 h-6 text-primary" />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step timeline navigation                                           */
/* ------------------------------------------------------------------ */

function StepTimeline({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (i: number) => void;
}) {
  return (
    <div className="relative flex items-center justify-between max-w-2xl mx-auto mb-12 px-4">
      {/* Connecting line behind steps */}
      <div className="absolute top-6 left-[10%] right-[10%] h-0.5 bg-border/30 z-0" />
      <motion.div
        className="absolute top-6 left-[10%] h-0.5 bg-primary z-0"
        initial={{ width: "0%" }}
        animate={{
          width: `${currentStep === 0 ? 0 : (currentStep / (steps.length - 1)) * 80}%`,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isClickable = i <= currentStep;

        return (
          <button
            key={i}
            onClick={() => isClickable && onStepClick(i)}
            className={`relative z-10 flex flex-col items-center gap-2 group ${
              isClickable ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isCompleted
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                  : isCurrent
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-background border-border/50 text-muted-foreground"
              }`}
              whileHover={isClickable ? { scale: 1.1 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </motion.div>
            <span
              className={`text-[11px] font-semibold hidden sm:block transition-colors ${
                isCurrent
                  ? "text-primary"
                  : isCompleted
                    ? "text-emerald-400"
                    : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Brief & Scorecard                                         */
/* ------------------------------------------------------------------ */

function StepBrief({ onNext }: { onNext: () => void }) {
  const [jobTitle, setJobTitle] = useState("Account Executive SaaS");
  const [criteria, setCriteria] = useState({
    saas: true,
    fullCycle: true,
    midMarket: false,
    hunter: true,
  });

  const criteriaLabels: Record<string, string> = {
    saas: "Expérience SaaS",
    fullCycle: "Full-cycle",
    midMarket: "Mid-Market",
    hunter: "Profil hunter",
  };

  const criteriaIcons: Record<string, typeof Zap> = {
    saas: Sparkles,
    fullCycle: Target,
    midMarket: BarChart3,
    hunter: Search,
  };

  const activeCriteria = Object.entries(criteria).filter(([, v]) => v);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Brief form */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-xl shadow-black/5">
        <div className="px-6 py-5 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Brief du poste</h3>
              <p className="text-xs text-muted-foreground">
                Définissez le profil idéal en quelques clics
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Job title input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Intitulé du poste
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-rocket-dark/30 px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all placeholder:text-muted-foreground"
              placeholder="Ex: Account Executive SaaS"
            />
          </div>

          {/* Criteria chips */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Target className="w-3.5 h-3.5 text-primary" />
              Critères clés
            </label>
            <div className="flex flex-wrap gap-2.5">
              {Object.entries(criteriaLabels).map(([key, label]) => {
                const active = criteria[key as keyof typeof criteria];
                const Icon = criteriaIcons[key];
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() =>
                      setCriteria((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof prev],
                      }))
                    }
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      active
                        ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_16px_rgba(99,102,241,0.15)]"
                        : "bg-rocket-dark/20 border-border/40 text-muted-foreground hover:border-border/70 hover:text-foreground"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </motion.span>
                    ) : (
                      <Icon className="w-3.5 h-3.5 opacity-50" />
                    )}
                    {label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scorecard preview */}
      <AnimatePresence>
        {activeCriteria.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-emerald-500/20 overflow-hidden shadow-xl shadow-emerald-500/5">
              <div className="px-6 py-4 bg-gradient-to-r from-emerald-500/8 to-transparent border-b border-emerald-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      Aperçu Scorecard
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20"
                      >
                        LIVE
                      </motion.span>
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Votre grille d&apos;évaluation se construit automatiquement
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <AnimatePresence>
                  {activeCriteria.map(([key], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-rocket-dark/20 border border-border/30"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium flex-1">
                        {criteriaLabels[key]}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <motion.div
                            key={n}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.08 + n * 0.05 }}
                            className={`w-2 h-2 rounded-full ${
                              n <= 4 ? "bg-primary/50" : "bg-muted/30"
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.3)" }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all shadow-lg shadow-primary/20"
      >
        Lancer le sourcing
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — Sourcing                                                  */
/* ------------------------------------------------------------------ */

function StepSourcing({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1.5;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Staggered candidate appearance
  useEffect(() => {
    if (visibleCount < mockCandidates.length) {
      const timeout = setTimeout(() => setVisibleCount((c) => c + 1), 800);
      return () => clearTimeout(timeout);
    } else if (visibleCount === mockCandidates.length && !allLoaded) {
      const timeout = setTimeout(() => setAllLoaded(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, allLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Scanning panel */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-xl shadow-black/5">
        <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <RadarPulse />
          <div className="flex-1 text-center sm:text-left w-full">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-sm font-bold">Sourcing en cours...</span>
            </div>

            <p className="text-3xl font-bold text-primary tabular-nums mb-1">
              <FastCounter target={2847} duration={4000} />
              <span className="text-sm font-normal text-muted-foreground ml-2">
                profils analysés
              </span>
            </p>

            <p className="text-xs text-muted-foreground mb-3">
              LinkedIn, bases internes, réseau de référencement
            </p>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analyse multi-sources</span>
                <span className="font-mono font-semibold text-foreground">
                  {Math.min(Math.round(progress), 100)}%
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-primary/70 relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {mockCandidates.slice(0, visibleCount).map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-lg shadow-black/5 hover:border-border/80 transition-colors"
            >
              <div className="p-4 sm:p-5 flex items-center gap-4">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    c.score >= 90
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : c.score >= 85
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                  }`}
                >
                  {c.name.charAt(0)}
                </motion.div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {c.role} &middot; {c.company}
                  </p>
                  <p className="text-[11px] text-muted-foreground/70">{c.experience}</p>
                </div>

                {/* Score */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <ScoreBadge score={c.score} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA appears after all loaded */}
      <AnimatePresence>
        {allLoaded && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all shadow-lg shadow-primary/20"
          >
            Voir la shortlist
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Shortlist                                                 */
/* ------------------------------------------------------------------ */

function StepShortlist({ onNext }: { onNext: () => void }) {
  const shortlisted = mockCandidates.slice(0, 3);
  const notes = [
    "Excellent track record — +140% quota atteint 2 ans de suite",
    "Forte expertise SaaS Mid-Market, référencé par son VP Sales",
    "Profil hunter, expérience prospection outbound B2B",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* 48h badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-background/80 backdrop-blur-xl border border-primary/20 p-5 shadow-xl shadow-black/5"
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(99,102,241, 0.3)",
                "0 0 24px 6px rgba(99,102,241, 0.12)",
                "0 0 0 0 rgba(99,102,241, 0.3)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0"
          >
            <Clock className="w-7 h-7 text-primary" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-lg font-bold text-primary">48h écoulées</span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30"
              >
                LIVRÉE
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre shortlist qualifiée de 3 candidats est prête.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Shortlisted candidates */}
      <div className="space-y-4">
        {shortlisted.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-lg shadow-black/5"
          >
            <div className="p-5 sm:p-6 space-y-4">
              {/* Header row */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate">{c.name}</p>
                    {i === 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/30 flex items-center gap-1 flex-shrink-0">
                        <Star className="w-2.5 h-2.5" />
                        TOP
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {c.role} &middot; {c.company} &middot; {c.experience}
                  </p>
                </div>
                <ScoreBadge score={c.score} />
              </div>

              {/* TA note */}
              <div className="rounded-xl bg-rocket-dark/20 border border-border/30 p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Note du Talent Acquisition
                  </span>
                </div>
                <p className="text-xs leading-relaxed italic text-foreground/80">
                  &ldquo;{notes[i]}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.3)" }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all shadow-lg shadow-primary/20"
      >
        Voir les résultats
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Results                                                   */
/* ------------------------------------------------------------------ */

function StepResults() {
  const kpis = [
    {
      label: "Time-to-hire",
      value: 28,
      suffix: " jours",
      icon: Clock,
      desc: "Du brief au contrat signé",
    },
    {
      label: "Candidats présentés",
      value: 12,
      suffix: "",
      icon: Users,
      desc: "Profils qualifiés envoyés",
    },
    {
      label: "Entretiens finaux",
      value: 4,
      suffix: "",
      icon: Target,
      desc: "Candidats shortlistés",
    },
    {
      label: "Offre acceptée",
      value: 1,
      suffix: "",
      icon: TrendingUp,
      desc: "Recrutement confirmé",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* KPI grid 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
            className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-5 md:p-6 text-center space-y-3 shadow-lg shadow-black/5"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <kpi.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
              <AnimatedCounter target={kpi.value} suffix={kpi.suffix} duration={1500} />
            </p>
            <div>
              <p className="text-sm font-semibold">{kpi.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison: Vous vs Marché */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-6 shadow-xl shadow-black/5"
      >
        <h4 className="text-sm font-bold mb-5 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Vous vs Marché
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-5 text-center relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative">
              <p className="text-4xl font-bold text-primary tabular-nums">
                <AnimatedCounter target={28} duration={1200} />
                <span className="text-lg">j</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">Avec Rocket4Sales</p>
              <div className="mt-3 flex justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30"
                >
                  -46%
                </motion.span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-muted/10 border border-border/30 p-5 text-center">
            <p className="text-4xl font-bold text-muted-foreground tabular-nums">
              <AnimatedCounter target={52} duration={1200} />
              <span className="text-lg">j</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">Moyenne du marché</p>
            <div className="mt-3 flex justify-center">
              <span className="px-3 py-1 rounded-full bg-muted/20 text-muted-foreground text-xs font-bold border border-border/30">
                Standard
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-2xl bg-gradient-to-br from-rocket-dark via-rocket-dark/95 to-rocket-dark border border-primary/20 p-8 md:p-10 text-center space-y-5 shadow-2xl shadow-primary/10 relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h3 className="text-2xl font-bold mb-3">
            Prêt à vivre ça pour de vrai ?
          </h3>

          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
            Nos clients recrutent leur premier Sales en 35 jours en moyenne.
            Réservez un appel de 15 min pour voir comment on peut faire pareil
            pour vous.
          </p>

          <a
            href={HUBSPOT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
          >
            Parler à un expert
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="text-[11px] text-muted-foreground mt-4">
            Appel gratuit &middot; 15 min &middot; Sans engagement
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DemoClient() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, 3));

  return (
    <main className="min-h-screen">
      {/* Dark hero header */}
      <div className="relative bg-gradient-to-b from-rocket-dark via-rocket-navy-soft to-background pt-28 pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-8 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3" />
              Démo interactive
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
              Vivez le process RPO
              <br />
              <span className="text-gradient">comme si vous y étiez</span>
            </h1>

            <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Découvrez comment nous trouvons vos meilleurs candidats en 48h,
              du brief initial à la shortlist qualifiée.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 pb-20">
        {/* Step timeline navigation */}
        <StepTimeline currentStep={currentStep} onStepClick={setCurrentStep} />

        {/* Step content */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && <StepBrief key="brief" onNext={next} />}
          {currentStep === 1 && <StepSourcing key="sourcing" onNext={next} />}
          {currentStep === 2 && <StepShortlist key="shortlist" onNext={next} />}
          {currentStep === 3 && <StepResults key="results" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
