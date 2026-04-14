"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Clock,
  Search,
  Heart,
  BarChart3,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Target,
  TrendingUp,
  MessageSquare,
  Award,
  Sparkles,
  ChevronRight,
  Zap,
  AlertTriangle,
  Copy,
  Check,
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
  optionDescriptions: string[];
  optionEmojis: string[];
  recommendation: string;
  actionSpecific: string;
  estimatedImpact: string;
  difficulty: "Rapide à mettre en place" | "Moyen terme" | "Transformation profonde";
  resources: { title: string; url: string; pages: string }[];
}

const questions: Question[] = [
  {
    id: "process",
    icon: ClipboardCheck,
    label: "Processus",
    question: "Comment qualifieriez-vous votre processus de recrutement ?",
    options: ["Inexistant", "Basique", "Structuré", "Optimisé"],
    optionDescriptions: [
      "Pas de processus défini, chaque recrutement est improvisé",
      "Quelques étapes identifiées mais peu formalisées",
      "Étapes claires, responsabilités définies, critères établis",
      "Processus documenté, mesuré et amélioré en continu",
    ],
    optionEmojis: ["\u{1F62C}", "\u{1F914}", "✅", "\u{1F3AF}"],
    recommendation:
      "Mettez en place un processus structuré avec des étapes claires, des responsabilités définies et des critères d'évaluation objectifs.",
    actionSpecific: "Créez un template de processus recrutement en 6 étapes avec des SLA pour chaque phase",
    estimatedImpact: "-30% time-to-hire",
    difficulty: "Rapide à mettre en place",
    resources: [
      { title: "Template processus de recrutement complet", url: "/resources/template-processus-recrutement.pdf", pages: "7 pages" },
      { title: "RPO vs Cabinet — Le comparatif complet", url: "/resources/guide-rpo-vs-cabinet.pdf", pages: "12 pages" },
    ],
  },
  {
    id: "scorecards",
    icon: CheckCircle2,
    label: "Scorecards",
    question: "Avez-vous des scorecards pour évaluer vos candidats ?",
    options: ["Jamais", "Parfois", "Souvent", "Systématiquement"],
    optionDescriptions: [
      "L'évaluation repose uniquement sur le ressenti",
      "Utilisées de manière ponctuelle sur certains postes",
      "La majorité des postes ont une grille d'évaluation",
      "Chaque poste dispose d'une scorecard calibrée et suivie",
    ],
    optionEmojis: ["\u{1F62C}", "\u{1F914}", "✅", "\u{1F3AF}"],
    recommendation:
      "Adoptez des scorecards structurées pour chaque poste afin de réduire les biais et d'améliorer la qualité de vos recrutements.",
    actionSpecific: "Déployez une scorecard standardisée avec 5 critères clés pondérés pour chaque famille de poste",
    estimatedImpact: "+20% qualité candidats",
    difficulty: "Rapide à mettre en place",
    resources: [
      { title: "Scorecard de recrutement — Template", url: "/resources/scorecard-recrutement.pdf", pages: "4 pages" },
      { title: "50 questions d'entretien structuré", url: "/resources/questions-entretien-structure.pdf", pages: "14 pages" },
    ],
  },
  {
    id: "tth",
    icon: Clock,
    label: "Time-to-hire",
    question: "Quel est votre time-to-hire moyen ?",
    options: ["> 60 jours", "45-60 jours", "30-45 jours", "< 30 jours"],
    optionDescriptions: [
      "Les recrutements traînent et les candidats se désengagent",
      "Un délai courant mais perfectible",
      "Un rythme correct, aligné sur le marché",
      "Rapide et efficace, les meilleurs talents sont captés vite",
    ],
    optionEmojis: ["\u{1F422}", "⏳", "⚡", "\u{1F680}"],
    recommendation:
      "Optimisez votre pipeline en identifiant les goulots d'étranglement et en parallélisant les étapes d'entretien.",
    actionSpecific: "Identifiez et éliminez les 2 plus gros goulots de votre pipeline avec des entretiens parallèles",
    estimatedImpact: "-15 jours time-to-hire",
    difficulty: "Moyen terme",
    resources: [
      { title: "Étude : Time-to-hire par secteur en France 2026", url: "/resources/etude-time-to-hire-france-2026.pdf", pages: "12 pages" },
      { title: "Guide complet du sourcing multicanal", url: "/resources/guide-sourcing-multicanal.pdf", pages: "20 pages" },
    ],
  },
  {
    id: "sourcing",
    icon: Search,
    label: "Sourcing",
    question: "Utilisez-vous des outils de sourcing avancés ?",
    options: ["Non", "LinkedIn basique", "LinkedIn Recruiter", "Multi-canal"],
    optionDescriptions: [
      "Uniquement les candidatures entrantes",
      "Recherche manuelle sur LinkedIn gratuit",
      "Utilisation de LinkedIn Recruiter avec filtres avancés",
      "LinkedIn, GitHub, meetups, cooptation, chasse directe",
    ],
    optionEmojis: ["\u{1F636}", "\u{1F440}", "\u{1F50D}", "\u{1F3AF}"],
    recommendation:
      "Diversifiez vos canaux de sourcing (LinkedIn Recruiter, GitHub, meetups, cooptation) pour atteindre les talents passifs.",
    actionSpecific: "Lancez un programme de cooptation avec prime et activez 2 nouveaux canaux de sourcing",
    estimatedImpact: "+40% pipeline candidats",
    difficulty: "Moyen terme",
    resources: [
      { title: "Guide complet du sourcing multicanal", url: "/resources/guide-sourcing-multicanal.pdf", pages: "20 pages" },
      { title: "Guide de l'IA en recrutement", url: "/resources/guide-ia-recrutement.pdf", pages: "11 pages" },
    ],
  },
  {
    id: "retention",
    icon: Heart,
    label: "Rétention",
    question: "Quel est votre taux de rétention à 12 mois ?",
    options: ["< 70 %", "70-80 %", "80-90 %", "> 90 %"],
    optionDescriptions: [
      "Turnover élevé, les recrutements ne tiennent pas",
      "Quelques départs précoces, alignement à revoir",
      "Bonne rétention, les recrutements sont globalement réussis",
      "Excellent, preuve d'un recrutement très qualitatif",
    ],
    optionEmojis: ["\u{1F494}", "\u{1F615}", "\u{1F4AA}", "❤️"],
    recommendation:
      "Améliorez votre onboarding et alignez mieux les attentes candidat/entreprise dès la phase de recrutement.",
    actionSpecific: "Structurez un onboarding de 90 jours avec checkpoints à J+7, J+30 et J+90",
    estimatedImpact: "+15% rétention à 12 mois",
    difficulty: "Transformation profonde",
    resources: [
      { title: "Les 10 étapes d'un onboarding réussi", url: "/resources/checklist-onboarding.pdf", pages: "6 pages" },
      { title: "Guide du plan 30-60-90 jours", url: "/resources/guide-plan-30-60-90.pdf", pages: "10 pages" },
    ],
  },
  {
    id: "kpi",
    icon: BarChart3,
    label: "KPIs",
    question: "Avez-vous un suivi KPI de votre recrutement ?",
    options: ["Aucun", "Basique", "Dashboard", "Temps réel"],
    optionDescriptions: [
      "Aucune donnée n'est collectée ni analysée",
      "Quelques métriques suivies manuellement (tableur)",
      "Un dashboard centralisé avec les KPIs essentiels",
      "Suivi en temps réel avec alertes et optimisation data-driven",
    ],
    optionEmojis: ["\u{1FAE5}", "\u{1F4CB}", "\u{1F4CA}", "\u{1F3AF}"],
    recommendation:
      "Mettez en place un dashboard avec les KPIs essentiels : time-to-hire, taux de conversion, coût par recrutement, qualité du sourcing.",
    actionSpecific: "Créez un dashboard avec 5 KPIs clés : TTH, taux conversion, coût/recrutement, source quality, offer acceptance",
    estimatedImpact: "+25% efficacité recrutement",
    difficulty: "Rapide à mettre en place",
    resources: [
      { title: "KPIs recrutement — Le dashboard essentiel", url: "/resources/guide-kpis-recrutement.pdf", pages: "8 pages" },
      { title: "Template reporting recrutement COMEX", url: "/resources/template-reporting-comex.pdf", pages: "10 pages" },
    ],
  },
  {
    id: "volume",
    icon: Briefcase,
    label: "Volume",
    question: "Combien de postes recrutez-vous par trimestre ?",
    options: ["1-3", "4-10", "11-20", "20+"],
    optionDescriptions: [
      "Volume faible, le recrutement n'est pas la priorité",
      "Volume modéré, nécessitant une approche organisée",
      "Volume important, un processus robuste est indispensable",
      "Volume élevé, nécessitant une équipe TA dédiée",
    ],
    optionEmojis: ["\u{1F331}", "\u{1F4C8}", "\u{1F525}", "\u{1F680}"],
    recommendation:
      "À votre volume, un TA Specialist dédié pourrait considérablement accélérer vos recrutements et réduire vos coûts.",
    actionSpecific: "Évaluez le ROI d'un TA Specialist dédié vs. le coût actuel de vos recrutements externalisés",
    estimatedImpact: "-35% coût par recrutement",
    difficulty: "Transformation profonde",
    resources: [
      { title: "RPO vs Cabinet — Le comparatif complet", url: "/resources/guide-rpo-vs-cabinet.pdf", pages: "12 pages" },
      { title: "Benchmark RPO France 2026", url: "/resources/benchmark-rpo-france-2026.pdf", pages: "14 pages" },
    ],
  },
];

const grades = [
  {
    label: "Débutant",
    min: 0,
    max: 7,
    color: "text-red-500",
    bg: "bg-red-500",
    stroke: "#ef4444",
    fill: "#ef4444",
    badge: "\u{1F949}",
    description:
      "Votre TA manque de structure. Un RPO vous apporterait un cadre immédiat.",
  },
  {
    label: "En progression",
    min: 8,
    max: 13,
    color: "text-amber-500",
    bg: "bg-amber-500",
    stroke: "#f59e0b",
    fill: "#f59e0b",
    badge: "\u{1F948}",
    description:
      "Vous avez les bases, mais des leviers d'optimisation importants existent.",
  },
  {
    label: "Performant",
    min: 14,
    max: 17,
    color: "text-emerald-500",
    bg: "bg-emerald-500",
    stroke: "#10b981",
    fill: "#10b981",
    badge: "\u{1F947}",
    description:
      "Votre TA est bien structurée. Un RPO peut vous aider à scaler.",
  },
  {
    label: "Expert",
    min: 18,
    max: 21,
    color: "text-primary",
    bg: "bg-primary",
    stroke: "hsl(160,84%,39%)",
    fill: "hsl(160,84%,39%)",
    badge: "\u{1F48E}",
    description:
      "Excellent ! Votre maturité TA est au top. Explorez l'innovation.",
  },
] as const;

function getGrade(score: number) {
  return grades.find((g) => score >= g.min && score <= g.max) ?? grades[0];
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
};

const letterBadges = ["A", "B", "C", "D"];

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  duration = 1.5,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useState(() => {
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
/*  Typewriter text                                                    */
/* ------------------------------------------------------------------ */

function TypewriterText({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Calculating dots animation                                         */
/* ------------------------------------------------------------------ */

function CalculatingDots({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center gap-1.5 py-4"
    >
      <span className="text-sm text-white/60 font-medium">Calcul en cours</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Countdown Timer Bar                                                */
/* ------------------------------------------------------------------ */

function CountdownBar({ questionIndex }: { questionIndex: number }) {
  const [progress, setProgress] = useState(100);
  const animRef = useRef<number | null>(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
    setProgress(100);

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const remaining = Math.max(0, 100 - (elapsed / 15000) * 100);
      setProgress(remaining);
      if (remaining > 0) {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    animRef.current = requestAnimationFrame(tick);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [questionIndex]);

  const barColor =
    progress > 50
      ? "bg-primary"
      : progress > 25
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden mb-2">
      <div
        className={`h-full ${barColor} rounded-full transition-colors duration-500`}
        style={{
          width: `${progress}%`,
          transition: "width 100ms linear",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Particles (quiz background)                               */
/* ------------------------------------------------------------------ */

function FloatingParticles() {
  const particles = [
    { x: "10%", y: "20%", size: 4, dur: 12, delay: 0 },
    { x: "85%", y: "15%", size: 3, dur: 15, delay: 2 },
    { x: "70%", y: "75%", size: 5, dur: 10, delay: 1 },
    { x: "20%", y: "80%", size: 3, dur: 14, delay: 3 },
    { x: "50%", y: "40%", size: 4, dur: 11, delay: 0.5 },
    { x: "90%", y: "55%", size: 3, dur: 13, delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.15, 0.4, 0.2, 0.35, 0.15],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS Confetti component (no npm dependency)                         */
/* ------------------------------------------------------------------ */

function Confetti({ count = 40 }: { count?: number }) {
  const [particles] = useState(() => {
    const colors = [
      "#14b8a6",
      "#10b981",
      "#34d399",
      "#6ee7b7",
      "#f59e0b",
      "#fbbf24",
      "#06b6d4",
      "#0d9488",
      "#059669",
      "#eab308",
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
      swayAmount: -50 + Math.random() * 100,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) translateX(0px) rotate(0deg);
            opacity: 1;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--sway)) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-10px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.size > 9 ? "2px" : "50%",
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            ["--sway" as string]: `${p.swayAmount}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color flash feedback                                               */
/* ------------------------------------------------------------------ */

function ColorFlash({ score }: { score: number | null }) {
  if (score === null) return null;
  const color =
    score === 3
      ? "bg-emerald-500/15"
      : score === 2
        ? "bg-amber-500/10"
        : "bg-transparent";

  if (score <= 1) return null;

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none z-40 ${color}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.6 }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Streak Badge                                                       */
/* ------------------------------------------------------------------ */

function StreakBadge({ streak }: { streak: number }) {
  if (streak < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-xl shadow-amber-500/30"
    >
      <span className="text-lg">&#x1F525;</span>
      Streak x{streak} !
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card Glow Pulse (on answer selection)                              */
/* ------------------------------------------------------------------ */

function CardGlowPulse({ score }: { score: number | null }) {
  if (score === null) return null;
  const glowColor =
    score === 3
      ? "0 0 30px rgba(16,185,129,0.4), 0 0 60px rgba(16,185,129,0.15)"
      : score === 2
        ? "0 0 30px rgba(245,158,11,0.35), 0 0 60px rgba(245,158,11,0.1)"
        : "none";

  if (score <= 1) return null;

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: glowColor }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Clipboard toast                                                    */
/* ------------------------------------------------------------------ */

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-sm font-medium shadow-xl shadow-emerald-600/30"
        >
          <Check className="w-4 h-4" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Semi-circular gauge SVG                                            */
/* ------------------------------------------------------------------ */

function SemiCircularGauge({ score, max = 21 }: { score: number; max?: number }) {
  const cx = 100;
  const cy = 100;
  const r = 80;
  const strokeW = 14;
  const arcLength = Math.PI * r;
  const ratio = score / max;

  const needleAngle = Math.PI - ratio * Math.PI;
  const needleLen = 60;
  const needleTipX = cx + needleLen * Math.cos(needleAngle);
  const needleTipY = cy - needleLen * Math.sin(needleAngle);

  const grade = getGrade(score);

  return (
    <div className="relative w-72 h-40 md:w-[340px] md:h-48">
      <svg viewBox="0 0 200 115" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="65%" stopColor="#10b981" />
            <stop offset="100%" stopColor="hsl(160,84%,39%)" />
          </linearGradient>
          <filter id="gauge-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="needle-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
          <filter id="score-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          fill="none"
        />

        {/* Filled arc with gradient */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="url(#gauge-gradient)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          fill="none"
          filter="url(#gauge-glow)"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: arcLength - ratio * arcLength }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.9 }}
        />

        {/* Tick marks */}
        {[
          { val: 0, label: "0" },
          { val: 5, label: "5" },
          { val: 10, label: "10" },
          { val: 15, label: "15" },
          { val: 21, label: "21" },
        ].map(({ val, label }) => {
          const angle = Math.PI - (val / max) * Math.PI;
          const innerR = r - strokeW / 2 - 4;
          const outerR = r - strokeW / 2 - 1;
          const labelR = r + strokeW / 2 + 8;
          return (
            <g key={val}>
              <line
                x1={cx + innerR * Math.cos(angle)}
                y1={cy - innerR * Math.sin(angle)}
                x2={cx + outerR * Math.cos(angle)}
                y2={cy - outerR * Math.sin(angle)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              <text
                x={cx + labelR * Math.cos(angle)}
                y={cy - labelR * Math.sin(angle)}
                fill="rgba(255,255,255,0.3)"
                fontSize="6"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Glow dot at needle tip */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="6"
          fill={grade.fill}
          opacity="0.4"
          filter="url(#score-glow)"
          initial={{ cx: cx + needleLen * Math.cos(Math.PI), cy: cy - needleLen * Math.sin(Math.PI) }}
          animate={{ cx: needleTipX, cy: needleTipY }}
          transition={{ duration: 1.4, type: "spring", stiffness: 80, damping: 12, delay: 0.9 }}
        />

        {/* Needle — dramatic spring entrance: starts at 0, pauses, then sweeps */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx + needleLen * Math.cos(Math.PI)}
          y2={cy - needleLen * Math.sin(Math.PI)}
          animate={{ x2: needleTipX, y2: needleTipY }}
          transition={{ duration: 1.4, type: "spring", stiffness: 80, damping: 12, delay: 0.9 }}
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#needle-shadow)"
        />
        <circle cx={cx} cy={cy} r="5" fill="white" />
        <circle cx={cx} cy={cy} r="2.5" fill="rgba(255,255,255,0.3)" />
      </svg>

      {/* Central score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            <AnimatedCounter target={score} duration={1.8} />
            <span className="text-2xl md:text-3xl text-white/40 font-medium ml-1">
              / {max}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated preview gauge (blurred placeholder for intro)             */
/* ------------------------------------------------------------------ */

function GaugePreview() {
  return (
    <motion.div
      className="relative w-32 h-20 mx-auto opacity-40 blur-[2px]"
      animate={{ rotate: [0, 2, -2, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 115" className="w-full h-full" fill="none">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="url(#preview-grad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={Math.PI * 80}
          animate={{
            strokeDashoffset: [Math.PI * 80, Math.PI * 80 * 0.3, Math.PI * 80 * 0.5, Math.PI * 80 * 0.25],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="preview-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-1">
        <motion.span
          className="text-2xl font-bold text-white/50"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ?/21
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Difficulty Badge                                                   */
/* ------------------------------------------------------------------ */

function DifficultyBadge({ level }: { level: string }) {
  const config =
    level === "Rapide à mettre en place"
      ? { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400", icon: "⚡" }
      : level === "Moyen terme"
        ? { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400", icon: "⏳" }
        : { bg: "bg-violet-500/10 border-violet-500/20", text: "text-violet-400", icon: "\u{1F680}" };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${config.bg} ${config.text}`}>
      <span>{config.icon}</span>
      {level}
    </span>
  );
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [flashScore, setFlashScore] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [gradeRevealed, setGradeRevealed] = useState(false);
  const [showCalculating, setShowCalculating] = useState(true);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Track card glow pulse per question
  const [cardGlow, setCardGlow] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    setAnswers([]);
    setCurrent(0);
    setDirection(1);
    setSelectedOption(null);
    setShowConfetti(false);
    setFlashScore(null);
    setStreak(0);
    setShowStreak(false);
    setGradeRevealed(false);
    setShowCalculating(true);
    setCardGlow(null);
    setPhase("quiz");
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(optionIndex);

      // Trigger color flash
      setFlashScore(optionIndex);
      setTimeout(() => setFlashScore(null), 700);

      // Trigger card glow pulse
      setCardGlow(optionIndex);
      setTimeout(() => setCardGlow(null), 600);

      // Track streak (score 3 = max)
      if (optionIndex === 3) {
        setStreak((prev) => prev + 1);
        setShowStreak(true);
        setTimeout(() => setShowStreak(false), 1500);
      } else {
        setStreak(0);
      }

      setTimeout(() => {
        const next = [...answers, optionIndex];
        setAnswers(next);
        setDirection(1);
        setSelectedOption(null);
        if (current < questions.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          setShowCalculating(true);
          setPhase("results");
          // Confetti triggered after gauge reveal
          const finalScore = next.reduce((sum, a) => sum + a, 0);
          setTimeout(() => {
            if (finalScore >= 14) {
              setShowConfetti(true);
            }
          }, 2500);
        }
      }, 500);
    },
    [answers, current, selectedOption],
  );

  const handleBack = useCallback(() => {
    if (current === 0) return;
    setDirection(-1);
    setSelectedOption(null);
    setAnswers((prev) => prev.slice(0, -1));
    setCurrent((c) => c - 1);
  }, [current]);

  const handleRestart = useCallback(() => {
    setPhase("intro");
    setAnswers([]);
    setCurrent(0);
    setSelectedOption(null);
    setShowConfetti(false);
    setFlashScore(null);
    setStreak(0);
    setShowStreak(false);
    setGradeRevealed(false);
    setShowCalculating(true);
    setCardGlow(null);
  }, []);

  const handleShare = useCallback(async () => {
    const totalScore = answers.reduce((sum, a) => sum + a, 0);
    const grade = getGrade(totalScore);
    const percentage = Math.round((totalScore / 21) * 100);

    const text = `\u{1F3AF} Mon diagnostic recrutement Rocket4RPO: ${totalScore}/21 (${percentage}%) — Grade: ${grade.label}. Faites le vôtre sur rocket4rpo.com/assessment`;

    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("✅ Résultats copiés !");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    } catch {
      setToastMessage("Impossible de copier");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    }
  }, [answers]);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const grade = getGrade(totalScore);
  const percentage = Math.round((totalScore / 21) * 100);

  // Top 3 weakest areas
  const weakest = answers
    .map((score, i) => ({ score, index: i }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* SEO H1 — toujours rendu en SSR, invisible visuellement. Le H1 visible */}
      {/* ci-dessous passe en H2 pour éviter le double-H1 sur la page. */}
      <h1 className="sr-only">
        Diagnostic recrutement — Évaluez la maturité de votre Talent Acquisition en 2 minutes
      </h1>
      {showConfetti && <Confetti count={40} />}
      <Toast message={toastMessage} visible={toastVisible} />
      <ColorFlash score={flashScore} />

      <AnimatePresence>
        {showStreak && streak >= 2 && <StreakBadge streak={streak} />}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={direction}>
        {/* ================================================================ */}
        {/*  INTRO PHASE                                                     */}
        {/* ================================================================ */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark flex items-center">
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

              {/* Floating decorative particles */}
              {[
                { top: "20%", right: "20%", size: "w-2 h-2", color: "bg-primary/40", dur: 3, delay: 0 },
                { top: "40%", left: "8%", size: "w-1.5 h-1.5", color: "bg-rocket-teal-glow/50", dur: 4, delay: 1 },
                { bottom: "30%", right: "30%", size: "w-1 h-1", color: "bg-emerald-400/40", dur: 5, delay: 2 },
                { top: "15%", left: "40%", size: "w-1 h-1", color: "bg-primary/30", dur: 6, delay: 0.5 },
                { bottom: "20%", left: "20%", size: "w-1.5 h-1.5", color: "bg-emerald-400/30", dur: 4.5, delay: 1.5 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${p.size} rounded-full ${p.color}`}
                  style={{ top: p.top, right: p.right, left: p.left, bottom: p.bottom }}
                  animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }}
                />
              ))}

              <div className="relative container-wide py-4 md:py-5 lg:py-6">
                <div className="max-w-3xl mx-auto text-center">
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/20 text-xs text-primary font-medium">
                    <Target className="w-3 h-3" /> Diagnostic gratuit
                  </span>

                  {/* Visible title — downgraded to H2 to avoid duplicate H1 */}
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-[1.12] text-white">
                    Votre recrutement est-il{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rocket-teal-glow to-emerald-400">
                      à la hauteur
                    </span>{" "}
                    ?
                  </h2>

                  {/* Subtitle */}
                  <p className="mt-2 text-sm text-white/70 leading-relaxed max-w-xl mx-auto">
                    Évaluez la maturité de votre Talent Acquisition sur 7 dimensions
                    clés. Résultat immédiat avec recommandations personnalisées.
                  </p>

                  {/* Trust + stats inline */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <ClipboardCheck className="w-3 h-3 text-primary/60" />
                      7 dimensions · 1 minute
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/15" />
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-primary/60" />
                      200+ entreprises diagnostiquées
                    </span>
                  </div>

                  {/* CTA — visible immediately */}
                  <div className="mt-5">
                    <style>{`
                      @keyframes subtle-bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-6px); }
                      }
                    `}</style>
                    <div style={{ animation: "subtle-bounce 2.5s ease-in-out infinite" }}>
                      <Button
                        size="lg"
                        onClick={handleStart}
                        className="gap-2.5 text-base px-10 py-5 font-bold rounded-xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl shadow-primary/30 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-400"
                      >
                        <Sparkles className="w-5 h-5" />
                        Commencer le diagnostic
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="mt-3 text-sm text-white/30">
                      Gratuit, sans inscription, résultat en 1 minute
                    </p>
                  </div>
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
            className="min-h-0 flex flex-col bg-gradient-to-b from-background via-background to-muted/20 relative"
          >
            {/* Background particles */}
            <FloatingParticles />

            <div className="container-wide max-w-3xl mx-auto px-4 pt-2 pb-2 md:pt-3 md:pb-3 flex-1 flex flex-col relative z-10">
              {/* Countdown timer bar */}
              <CountdownBar questionIndex={current} />

              {/* Progress section */}
              <div className="mb-3">
                {/* Step indicator dots with connecting lines */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  {questions.map((_, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <motion.div
                        className={`relative flex items-center justify-center transition-all duration-300 ${
                          i < current
                            ? "w-5 h-5"
                            : i === current
                              ? "w-6 h-6"
                              : "w-5 h-5"
                        }`}
                      >
                        {i < current && (
                          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                        {i === current && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-full bg-primary/20"
                              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="w-full h-full rounded-full bg-primary border-2 border-primary shadow-lg shadow-primary/30 flex items-center justify-center">
                              <span className="text-[9px] font-bold text-primary-foreground">
                                {i + 1}
                              </span>
                            </div>
                          </>
                        )}
                        {i > current && (
                          <div className="w-full h-full rounded-full bg-secondary border border-border/50 flex items-center justify-center">
                            <span className="text-[8px] font-medium text-muted-foreground">
                              {i + 1}
                            </span>
                          </div>
                        )}
                      </motion.div>
                      {i < questions.length - 1 && (
                        <div
                          className={`w-3 md:w-5 h-0.5 rounded-full transition-colors duration-500 ${
                            i < current ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Category badge + progress bar */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary/10 border border-primary/15 text-xs font-semibold text-primary">
                      {(() => {
                        const Icon = questions[current].icon;
                        return <Icon className="w-3 h-3" />;
                      })()}
                      {questions[current].label}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">
                      Question {current + 1}/{questions.length}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                    {Math.round(((current + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-rocket-teal-glow"
                    initial={{ width: `${(current / questions.length) * 100}%` }}
                    animate={{
                      width: `${((current + 1) / questions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question area */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl relative">
                  {/* Card glow pulse overlay */}
                  <CardGlowPulse score={cardGlow} />

                  {/* Question header */}
                  <div className="text-center mb-4">
                    {(() => {
                      const Icon = questions[current].icon;
                      return (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 mb-2 shadow-lg shadow-primary/5"
                        >
                          <Icon className="w-4 h-4 text-primary" />
                        </motion.div>
                      );
                    })()}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg md:text-xl font-bold leading-snug"
                    >
                      {questions[current].question}
                    </motion.h2>
                  </div>

                  {/* Options as interactive cards */}
                  <div className="grid gap-2">
                    {questions[current].options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      return (
                        <motion.button
                          key={opt}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            scale: isSelected ? [1, 1.05, 1] : 1,
                          }}
                          transition={
                            isSelected
                              ? { scale: { duration: 0.35, times: [0, 0.5, 1] } }
                              : { delay: 0.15 + i * 0.07 }
                          }
                          whileHover={
                            selectedOption === null
                              ? { scale: 1.015, y: -3, transition: { duration: 0.2 } }
                              : {}
                          }
                          whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                          onClick={() => handleAnswer(i)}
                          disabled={selectedOption !== null}
                          className={`
                            group relative w-full text-left rounded-2xl border-2 transition-all duration-250 overflow-hidden
                            ${
                              isSelected
                                ? "border-transparent shadow-xl shadow-primary/15 ring-2 ring-primary/20"
                                : selectedOption !== null
                                  ? "border-border/40 bg-muted/30 opacity-50"
                                  : "border-border/60 bg-background hover:border-primary/50 hover:bg-primary/[0.03] hover:shadow-lg"
                            }
                          `}
                          style={
                            isSelected
                              ? {
                                  background: "linear-gradient(135deg, rgba(20,184,166,0.08), rgba(16,185,129,0.05))",
                                  borderImage: "linear-gradient(135deg, #14b8a6, #10b981, #06b6d4) 1",
                                  borderImageSlice: 1,
                                }
                              : undefined
                          }
                        >
                          {/* Gradient border overlay for selected */}
                          {isSelected && (
                            <div
                              className="absolute inset-0 rounded-2xl pointer-events-none"
                              style={{
                                padding: "2px",
                                background: "linear-gradient(135deg, #14b8a6, #10b981, #06b6d4)",
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                              }}
                            />
                          )}

                          <div className="flex items-start gap-3 px-4 py-2.5 md:px-5 md:py-3">
                            <span className="flex-shrink-0 text-base md:text-lg mt-0.5 select-none">
                              {questions[current].optionEmojis[i]}
                            </span>

                            <span
                              className={`
                                flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-all duration-250
                                ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/20"
                                    : "bg-secondary text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary"
                                }
                              `}
                            >
                              {letterBadges[i]}
                            </span>

                            <div className="flex-1 min-w-0">
                              <span className="font-semibold text-xs md:text-sm block">
                                {opt}
                              </span>
                              <span
                                className={`text-[11px] md:text-xs mt-0.5 block transition-colors duration-200 ${
                                  isSelected
                                    ? "text-primary/70"
                                    : "text-muted-foreground/70 group-hover:text-muted-foreground"
                                }`}
                              >
                                {questions[current].optionDescriptions[i]}
                              </span>
                            </div>

                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15,
                                }}
                                className="flex-shrink-0 mt-0.5"
                              >
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
                                </div>
                              </motion.div>
                            )}

                            {!isSelected && selectedOption === null && (
                              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary/50 transition-colors flex-shrink-0 mt-2" />
                            )}
                          </div>

                          {isSelected && (
                            <motion.div
                              className="absolute inset-0 bg-primary/5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 0.3, 0] }}
                              transition={{ duration: 0.4 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Back button */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 flex justify-start"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      disabled={current === 0}
                      className="gap-2 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Précédent
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/*  RESULTS PHASE                                                   */}
        {/* ================================================================ */}
        {phase === "results" && (
          <div key="results">
            {/* ---- Results Hero (compact: gauge + badge + description) ---- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark pt-4 pb-4">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] rounded-full bg-primary/6 blur-[120px]" />
                <div className="absolute bottom-0 right-[15%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
              </div>

              <div className="relative container-wide max-w-4xl mx-auto px-4">
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-white/70 font-medium">
                    <Award className="w-3.5 h-3.5 text-primary" /> Votre
                    résultat
                  </span>

                  <h2 className="mt-4 text-xl md:text-2xl font-bold text-white">
                    Diagnostic de maturité recrutement
                  </h2>

                  {/* Calculating dots -- then gauge */}
                  <AnimatePresence mode="wait">
                    {showCalculating ? (
                      <CalculatingDots
                        key="calc"
                        onComplete={() => setShowCalculating(false)}
                      />
                    ) : (
                      <motion.div
                        key="gauge-reveal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                      >
                        {/* Semi-circular gauge */}
                        <div className="mt-6 flex flex-col items-center">
                          <SemiCircularGauge score={totalScore} />

                          {/* Grade badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              delay: 2.2,
                              type: "spring",
                              stiffness: 200,
                              damping: 12,
                            }}
                            className="mt-4"
                            onAnimationComplete={() => setGradeRevealed(true)}
                          >
                            <div
                              className={`
                                relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-lg
                                ${grade.color} bg-white/5 border border-white/10
                              `}
                            >
                              <div
                                className="absolute inset-0 rounded-full blur-xl opacity-30"
                                style={{ backgroundColor: grade.fill }}
                              />
                              <span className="relative flex items-center gap-2.5">
                                <motion.span
                                  className="text-2xl"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: [0, 1.3, 1] }}
                                  transition={{
                                    delay: 2.4,
                                    duration: 0.5,
                                    times: [0, 0.6, 1],
                                    ease: "easeOut",
                                  }}
                                >
                                  {grade.badge}
                                </motion.span>
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: grade.fill,
                                    boxShadow: `0 0 12px ${grade.fill}`,
                                  }}
                                />
                                <TypewriterText
                                  text={grade.label}
                                  delay={2500}
                                  speed={50}
                                />
                              </span>
                            </div>

                            {/* Grade description */}
                            <p className="mt-3 text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
                              {grade.description}
                            </p>
                            <p className="mt-1 text-xs text-white/25">
                              {percentage}% de maturité recrutement
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* ---- Results details ---- */}
            <section className="py-6 md:py-8 bg-gradient-to-b from-background to-muted/30">
              <div className="container-wide max-w-4xl mx-auto px-4">
                {/* Per-criteria breakdown */}
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-1">
                      Détail par critère
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Score individuel sur chacun des 7 axes évalués
                    </p>
                  </div>

                  <div className="bg-background rounded-2xl p-4 md:p-6 border border-border/60 shadow-sm">
                    <div className="space-y-3">
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
                        const textColor =
                          score === 0
                            ? "text-red-500"
                            : score === 1
                              ? "text-amber-500"
                              : score === 2
                                ? "text-emerald-500"
                                : "text-primary";
                        return (
                          <div key={q.id}>
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-xs md:text-sm font-medium text-muted-foreground w-24 md:w-32 shrink-0 truncate">
                                {q.label}
                              </span>
                              <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${barColor}`}
                                  style={{ width: `${Math.max(pct, 4)}%` }}
                                />
                              </div>
                              <span
                                className={`text-sm font-bold w-12 text-right ${textColor}`}
                              >
                                {score}/3
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary row */}
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Score global
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-2.5 w-24 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className={`text-lg font-bold ${grade.color}`}>
                          {totalScore}/21
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top 3 Recommendations */}
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <h3 className="text-lg md:text-xl font-bold">
                        Vos 3 axes d&apos;amélioration prioritaires
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Recommandations personnalisées basées sur vos réponses
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {weakest.map(({ index, score }, rank) => {
                      const q = questions[index];
                      const Icon = q.icon;
                      const priorityBorderColors = [
                        "border-l-red-500",
                        "border-l-amber-500",
                        "border-l-yellow-500",
                      ];
                      const priorityBgColors = [
                        "bg-red-500",
                        "bg-amber-500",
                        "bg-yellow-500",
                      ];
                      const priorityTextColors = [
                        "text-red-500",
                        "text-amber-500",
                        "text-yellow-500",
                      ];
                      const scoreColor =
                        score === 0
                          ? "text-red-500 bg-red-500/10"
                          : score === 1
                            ? "text-amber-500 bg-amber-500/10"
                            : score === 2
                              ? "text-emerald-500 bg-emerald-500/10"
                              : "text-primary bg-primary/10";
                      return (
                        <div
                          key={q.id}
                          className={`
                            relative flex gap-3 md:gap-4 p-4 md:p-5 rounded-xl border border-border/60 bg-background
                            border-l-4 ${priorityBorderColors[rank]} shadow-sm
                          `}
                        >
                          {/* Priority number badge */}
                          <div
                            className={`absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full ${priorityBgColors[rank]} text-white text-xs font-bold flex items-center justify-center shadow-md`}
                          >
                            {rank + 1}
                          </div>

                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div>
                                <span
                                  className={`text-xs font-semibold uppercase tracking-wide ${priorityTextColors[rank]}`}
                                >
                                  {q.label}
                                </span>
                                <p className="font-semibold text-sm mt-0.5">
                                  {q.question}
                                </p>
                              </div>
                              <span
                                className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-lg ${scoreColor}`}
                              >
                                {score}/3
                              </span>
                            </div>

                            {/* Actionable recommendation */}
                            <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-muted/50 border border-border/40">
                              <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                                  {q.actionSpecific}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {q.recommendation}
                                </p>
                              </div>
                            </div>

                            {/* Impact + Difficulty badges */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border bg-primary/10 border-primary/20 text-primary">
                                <TrendingUp className="w-3 h-3" />
                                {q.estimatedImpact}
                              </span>
                              <DifficultyBadge level={q.difficulty} />
                            </div>

                            {/* Ressources recommandées */}
                            {q.resources && q.resources.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {q.resources.map((r) => (
                                  <a
                                    key={r.url}
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/15 hover:bg-primary/10 hover:border-primary/30 transition-all text-xs group"
                                  >
                                    <span className="text-primary text-sm">📄</span>
                                    <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors">{r.title}</span>
                                    <span className="text-muted-foreground text-[10px]">{r.pages}</span>
                                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">↓</span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Compact CTA row: Partager + Recommencer + Discuter */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Partager
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestart}
                    className="gap-2 rounded-xl"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Recommencer
                  </Button>
                  <Button
                    asChild
                    size="default"
                    className="gap-2 px-6 py-5 font-semibold rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-400"
                  >
                    <a href="/rdv">
                      <MessageSquare className="w-4 h-4" />
                      Discuter avec un expert
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
