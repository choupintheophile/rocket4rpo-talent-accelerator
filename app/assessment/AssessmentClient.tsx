"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Users,
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
  Trophy,
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
  difficulty: "Rapide \u00e0 mettre en place" | "Moyen terme" | "Transformation profonde";
}

const questions: Question[] = [
  {
    id: "process",
    icon: ClipboardCheck,
    label: "Processus",
    question: "Comment qualifieriez-vous votre processus de recrutement ?",
    options: ["Inexistant", "Basique", "Structur\u00e9", "Optimis\u00e9"],
    optionDescriptions: [
      "Pas de processus d\u00e9fini, chaque recrutement est improvis\u00e9",
      "Quelques \u00e9tapes identifi\u00e9es mais peu formalis\u00e9es",
      "\u00c9tapes claires, responsabilit\u00e9s d\u00e9finies, crit\u00e8res \u00e9tablis",
      "Processus document\u00e9, mesur\u00e9 et am\u00e9lior\u00e9 en continu",
    ],
    optionEmojis: ["\u{1F62C}", "\u{1F914}", "\u2705", "\u{1F3AF}"],
    recommendation:
      "Mettez en place un processus structuré avec des étapes claires, des responsabilités définies et des critères d'évaluation objectifs.",
    actionSpecific: "Créez un template de processus recrutement en 6 étapes avec des SLA pour chaque phase",
    estimatedImpact: "-30% time-to-hire",
    difficulty: "Rapide à mettre en place",
  },
  {
    id: "scorecards",
    icon: CheckCircle2,
    label: "Scorecards",
    question: "Avez-vous des scorecards pour évaluer vos candidats ?",
    options: ["Jamais", "Parfois", "Souvent", "Systématiquement"],
    optionDescriptions: [
      "L'evaluation repose uniquement sur le ressenti",
      "Utilisées de manière ponctuelle sur certains postes",
      "La majorité des postes ont une grille d'evaluation",
      "Chaque poste dispose d'une scorecard calibrée et suivie",
    ],
    optionEmojis: ["\u{1F62C}", "\u{1F914}", "\u2705", "\u{1F3AF}"],
    recommendation:
      "Adoptez des scorecards structurées pour chaque poste afin de réduire les biais et d'améliorer la qualité de vos recrutements.",
    actionSpecific: "Déployez une scorecard standardisée avec 5 critères clés pondérés pour chaque famille de poste",
    estimatedImpact: "+20% qualité candidats",
    difficulty: "Rapide à mettre en place",
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
    optionEmojis: ["\u{1F422}", "\u23F3", "\u26A1", "\u{1F680}"],
    recommendation:
      "Optimisez votre pipeline en identifiant les goulots d'étranglement et en parallélisant les étapes d'entretien.",
    actionSpecific: "Identifiez et éliminez les 2 plus gros goulots de votre pipeline avec des entretiens parallèles",
    estimatedImpact: "-15 jours time-to-hire",
    difficulty: "Moyen terme",
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
    optionEmojis: ["\u{1F494}", "\u{1F615}", "\u{1F4AA}", "\u2764\uFE0F"],
    recommendation:
      "Améliorez votre onboarding et alignez mieux les attentes candidat/entreprise dès la phase de recrutement.",
    actionSpecific: "Structurez un onboarding de 90 jours avec checkpoints à J+7, J+30 et J+90",
    estimatedImpact: "+15% rétention à 12 mois",
    difficulty: "Transformation profonde",
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
      "A votre volume, un TA Specialist dédié pourrait considérablement accélérer vos recrutements et réduire vos coûts.",
    actionSpecific: "Évaluez le ROI d'un TA Specialist dédié vs. le coût actuel de vos recrutements externalisés",
    estimatedImpact: "-35% coût par recrutement",
    difficulty: "Transformation profonde",
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
      "Votre TA est bien structurée. Un RPO peut vous aider a scaler.",
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
  enter: (dir: number) => ({ y: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir < 0 ? 40 : -40, opacity: 0 }),
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
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
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

function Confetti() {
  const [particles] = useState(() => {
    const colors = [
      "#10b981",
      "#34d399",
      "#6ee7b7",
      "#f59e0b",
      "#fbbf24",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#14b8a6",
    ];
    return Array.from({ length: 25 }, (_, i) => ({
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
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
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
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
        />

        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx + needleLen * Math.cos(Math.PI)}
          y2={cy - needleLen * Math.sin(Math.PI)}
          animate={{ x2: needleTipX, y2: needleTipY }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
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
/*  Radar / Spider Chart (pure SVG)                                    */
/* ------------------------------------------------------------------ */

function RadarChart({ answers }: { answers: number[] }) {
  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const levels = 3;
  const n = questions.length;

  function polarToXY(angle: number, radius: number) {
    const a = angle - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(a),
      y: cy + radius * Math.sin(a),
    };
  }

  const angleStep = (2 * Math.PI) / n;

  // Max polygon (outline)
  const maxPoints = Array.from({ length: n }, (_, i) => {
    const p = polarToXY(i * angleStep, maxR);
    return `${p.x},${p.y}`;
  }).join(" ");

  // User polygon
  const userPoints = answers.map((score, i) => {
    const r = (score / 3) * maxR;
    const p = polarToXY(i * angleStep, Math.max(r, 8));
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg viewBox="0 0 300 300" className="w-full">
        <defs>
          <linearGradient id="radar-fill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Grid levels */}
        {Array.from({ length: levels }, (_, lvl) => {
          const r = ((lvl + 1) / levels) * maxR;
          const pts = Array.from({ length: n }, (__, i) => {
            const p = polarToXY(i * angleStep, r);
            return `${p.x},${p.y}`;
          }).join(" ");
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {Array.from({ length: n }, (_, i) => {
          const p = polarToXY(i * angleStep, maxR);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Max outline */}
        <polygon
          points={maxPoints}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* User polygon */}
        <motion.polygon
          points={Array.from({ length: n }, () => `${cx},${cy}`).join(" ")}
          animate={{ points: userPoints }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          fill="url(#radar-fill-grad)"
          stroke="#14b8a6"
          strokeWidth="2"
        />

        {/* Data points */}
        {answers.map((score, i) => {
          const r = (score / 3) * maxR;
          const p = polarToXY(i * angleStep, Math.max(r, 8));
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill="#14b8a6"
              stroke="white"
              strokeWidth="1.5"
              animate={{ cx: p.x, cy: p.y }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + i * 0.05 }}
            />
          );
        })}

        {/* Labels */}
        {questions.map((q, i) => {
          const labelR = maxR + 22;
          const p = polarToXY(i * angleStep, labelR);
          return (
            <text
              key={q.id}
              x={p.x}
              y={p.y}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
              fontWeight="500"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {q.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Benchmark Bars                                                     */
/* ------------------------------------------------------------------ */

function BenchmarkBars({ percentage }: { percentage: number }) {
  const benchmarks = [
    { label: "Votre score", value: percentage, color: "from-primary to-emerald-500" },
    { label: "Moyenne marché", value: 55, color: "from-amber-500 to-amber-400" },
    { label: "Top performers", value: 85, color: "from-violet-500 to-violet-400" },
  ];

  return (
    <div className="space-y-4">
      {benchmarks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 + i * 0.15 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-white/50">{b.label}</span>
            <span className="text-xs font-bold text-white/70">{b.value}%</span>
          </div>
          <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${b.value}%` }}
              transition={{ duration: 1, delay: 1.8 + i * 0.15, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated preview gauge (blurred placeholder for intro)             */
/* ------------------------------------------------------------------ */

function GaugePreview() {
  return (
    <motion.div
      className="relative w-48 h-28 mx-auto opacity-40 blur-[2px]"
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
      ? { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400", icon: "\u26A1" }
      : level === "Moyen terme"
        ? { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400", icon: "\u23F3" }
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

  const handleStart = useCallback(() => {
    setAnswers([]);
    setCurrent(0);
    setDirection(1);
    setSelectedOption(null);
    setShowConfetti(false);
    setFlashScore(null);
    setPhase("quiz");
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(optionIndex);

      // Trigger color flash
      setFlashScore(optionIndex);
      setTimeout(() => setFlashScore(null), 700);

      setTimeout(() => {
        const next = [...answers, optionIndex];
        setAnswers(next);
        setDirection(1);
        setSelectedOption(null);
        if (current < questions.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          const finalScore = next.reduce((sum, a) => sum + a, 0);
          if (finalScore >= 14) {
            setShowConfetti(true);
          }
          setPhase("results");
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
  }, []);

  const handleShare = useCallback(async () => {
    const totalScore = answers.reduce((sum, a) => sum + a, 0);
    const grade = getGrade(totalScore);
    const percentage = Math.round((totalScore / 21) * 100);

    const lines = [
      `Diagnostic Maturité Recrutement - Rocket4RPO`,
      ``,
      `Score : ${totalScore}/21 (${percentage}%)`,
      `Niveau : ${grade.label}`,
      ``,
      `Détail par critère :`,
      ...questions.map(
        (q, i) => `  ${q.label} : ${answers[i] ?? 0}/3`,
      ),
      ``,
      `Faites le test : ${typeof window !== "undefined" ? window.location.href : ""}`,
    ];

    const text = lines.join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("Résultats copiés !");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
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

  // Profile summary
  const strongest = answers
    .map((score, i) => ({ score, index: i }))
    .sort((a, b) => b.score - a.score);
  const strongestLabel = strongest.length > 0 ? questions[strongest[0].index].label : "";
  const weakestLabel = weakest.length > 0 ? questions[weakest[0].index].label : "";

  return (
    <main className="min-h-screen bg-background">
      {showConfetti && <Confetti />}
      <Toast message={toastMessage} visible={toastVisible} />
      <ColorFlash score={flashScore} />

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

              <div className="relative container-wide py-8 md:py-12 lg:py-16">
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
                    className="mt-8 text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white"
                  >
                    Votre recrutement est-il{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rocket-teal-glow to-emerald-400">
                      à la hauteur
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
                    Évaluez la maturité de votre Talent Acquisition sur 7 dimensions
                    clés et découvrez vos axes d&apos;amélioration prioritaires avec
                    des recommandations personnalisées.
                  </motion.p>

                  {/* Animated gauge preview */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-10"
                  >
                    <GaugePreview />
                  </motion.div>

                  {/* Trust indicators */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/35"
                  >
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                      200+ entreprises diagnostiquées
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/15" />
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-primary/60" />
                      Méthodologie validée par 50+ DRH
                    </span>
                  </motion.div>

                  {/* 3 Mini-stats cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                  >
                    {[
                      { icon: ClipboardCheck, value: "7", label: "dimensions", sub: "évaluées" },
                      { icon: Clock, value: "1", label: "minute", sub: "chrono" },
                      { icon: Zap, value: "", label: "Résultat", sub: "immédiat" },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-bold text-white">
                            {stat.value && (
                              <span className="text-lg mr-0.5">{stat.value}</span>
                            )}
                            {stat.label}
                          </div>
                          <div className="text-xs text-white/40">{stat.sub}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA with bounce animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="mt-14"
                  >
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
                        className="gap-3 text-base px-14 py-8 text-lg font-bold rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl shadow-primary/30 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-400"
                      >
                        <Sparkles className="w-5 h-5" />
                        Commencer le diagnostic
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="mt-5 text-sm text-white/30">
                      Gratuit, sans inscription, résultat en 1 minute
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
            className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20 relative"
          >
            {/* Background particles */}
            <FloatingParticles />

            <div className="container-wide max-w-3xl mx-auto px-4 pt-24 pb-16 flex-1 flex flex-col relative z-10">
              {/* Countdown timer bar */}
              <CountdownBar questionIndex={current} />

              {/* Progress section */}
              <div className="mb-10">
                {/* Step indicator dots with connecting lines */}
                <div className="flex items-center justify-center gap-1.5 mb-8">
                  {questions.map((_, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <motion.div
                        className={`relative flex items-center justify-center transition-all duration-300 ${
                          i < current
                            ? "w-7 h-7"
                            : i === current
                              ? "w-8 h-8"
                              : "w-7 h-7"
                        }`}
                      >
                        {i < current && (
                          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
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
                              <span className="text-xs font-bold text-primary-foreground">
                                {i + 1}
                              </span>
                            </div>
                          </>
                        )}
                        {i > current && (
                          <div className="w-full h-full rounded-full bg-secondary border border-border/50 flex items-center justify-center">
                            <span className="text-[10px] font-medium text-muted-foreground">
                              {i + 1}
                            </span>
                          </div>
                        )}
                      </motion.div>
                      {i < questions.length - 1 && (
                        <div
                          className={`w-4 md:w-8 h-0.5 rounded-full transition-colors duration-500 ${
                            i < current ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Category badge + progress bar */}
                <div className="flex items-center justify-between mb-3">
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
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
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
                <div className="w-full max-w-2xl">
                  {/* Question header */}
                  <div className="text-center mb-10">
                    {(() => {
                      const Icon = questions[current].icon;
                      return (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6 shadow-lg shadow-primary/5"
                        >
                          <Icon className="w-8 h-8 text-primary" />
                        </motion.div>
                      );
                    })()}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug"
                    >
                      {questions[current].question}
                    </motion.h2>
                  </div>

                  {/* Options as interactive cards */}
                  <div className="grid gap-3">
                    {questions[current].options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      return (
                        <motion.button
                          key={opt}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{
                            opacity: 1,
                            y: 0,
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

                          <div className="flex items-start gap-4 px-5 py-4 md:px-6 md:py-5">
                            <span className="flex-shrink-0 text-xl md:text-2xl mt-0.5 select-none">
                              {questions[current].optionEmojis[i]}
                            </span>

                            <span
                              className={`
                                flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-250
                                ${
                                  isSelected
                                    ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-primary/20"
                                    : "bg-secondary text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary"
                                }
                              `}
                            >
                              {letterBadges[i]}
                            </span>

                            <div className="flex-1 min-w-0 pt-0.5">
                              <span className="font-semibold text-sm md:text-base block">
                                {opt}
                              </span>
                              <span
                                className={`text-xs md:text-sm mt-1 block transition-colors duration-200 ${
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
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
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
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* ---- Results Hero ---- */}
            <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark pt-24 pb-16 md:pt-28 md:pb-20">
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
                      <Award className="w-3.5 h-3.5 text-primary" /> Votre
                      resultat
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
                    <SemiCircularGauge score={totalScore} />

                    {/* Grade badge with gamification badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="mt-8"
                    >
                      <div
                        className={`
                          relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-lg
                          ${grade.color} bg-white/5 border border-white/10
                        `}
                      >
                        <div
                          className="absolute inset-0 rounded-full blur-xl opacity-30"
                          style={{ backgroundColor: grade.fill }}
                        />
                        <span className="relative flex items-center gap-2.5">
                          <span className="text-2xl">{grade.badge}</span>
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: grade.fill,
                              boxShadow: `0 0 12px ${grade.fill}`,
                            }}
                          />
                          {grade.label}
                        </span>
                      </div>

                      {/* Grade description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="mt-5 text-sm text-white/45 max-w-lg mx-auto leading-relaxed"
                      >
                        {grade.description}
                      </motion.p>
                      <p className="mt-2 text-xs text-white/25">
                        {percentage}% de maturité recrutement
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Profil TA summary */}
                  {answers.length === questions.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2 }}
                      className="mt-8 max-w-lg mx-auto"
                    >
                      <div className="px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                        <p className="text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                          Votre profil TA
                        </p>
                        <p className="text-sm text-white/60 leading-relaxed">
                          Votre point fort est <strong className="text-white/80">{strongestLabel}</strong>, tandis que{" "}
                          <strong className="text-white/80">{weakestLabel}</strong> représente votre principal axe de progression.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Radar Chart */}
                  {answers.length === questions.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="mt-10"
                    >
                      <RadarChart answers={answers} />
                    </motion.div>
                  )}

                  {/* Benchmark Bars: Comparez-vous */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="mt-10 max-w-sm mx-auto"
                  >
                    <h4 className="text-sm font-semibold text-white/50 mb-4 uppercase tracking-wider">
                      Comparez-vous
                    </h4>
                    <BenchmarkBars percentage={percentage} />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ---- Results details ---- */}
            <section className="section-padding bg-gradient-to-b from-background to-muted/30">
              <div className="container-wide max-w-4xl mx-auto px-4">
                {/* Per-criteria breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-16"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      Détail par critère
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Score individuel sur chacun des 7 axes évalués
                    </p>
                  </div>

                  <div className="bg-background rounded-2xl p-6 md:p-8 border border-border/60 shadow-sm">
                    <div className="space-y-5">
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
                          <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.08 }}
                            className="group"
                          >
                            <div className="flex items-center gap-3 md:gap-4">
                              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                                <Icon className="w-4.5 h-4.5 text-primary" />
                              </div>
                              <span className="text-xs md:text-sm font-medium text-muted-foreground w-24 md:w-32 shrink-0 truncate">
                                {q.label}
                              </span>
                              <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${barColor}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.max(pct, 4)}%` }}
                                  transition={{
                                    duration: 0.8,
                                    delay: 0.6 + i * 0.08,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                              <span
                                className={`text-sm font-bold w-12 text-right ${textColor}`}
                              >
                                {score}/3
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Summary row */}
                    <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Score global
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="h-2.5 w-24 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${percentage}%`,
                            }}
                            transition={{ duration: 1, delay: 1.2 }}
                          />
                        </div>
                        <span className={`text-lg font-bold ${grade.color}`}>
                          {totalScore}/21
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Top 3 Recommendations (actionable) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-16"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <h3 className="text-xl md:text-2xl font-bold">
                        Vos 3 axes d&apos;amélioration prioritaires
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Recommandations personnalisées basées sur vos réponses
                    </p>
                  </div>

                  <div className="grid gap-4">
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
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + rank * 0.15 }}
                          className={`
                            relative flex gap-4 md:gap-5 p-5 md:p-7 rounded-2xl border border-border/60 bg-background
                            border-l-4 ${priorityBorderColors[rank]} shadow-sm hover:shadow-md transition-shadow
                          `}
                        >
                          {/* Priority number badge */}
                          <div
                            className={`absolute -top-3 -left-3 w-7 h-7 rounded-full ${priorityBgColors[rank]} text-white text-xs font-bold flex items-center justify-center shadow-md`}
                          >
                            {rank + 1}
                          </div>

                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <span
                                  className={`text-xs font-semibold uppercase tracking-wide ${priorityTextColors[rank]}`}
                                >
                                  {q.label}
                                </span>
                                <p className="font-semibold text-sm md:text-base mt-0.5">
                                  {q.question}
                                </p>
                              </div>
                              <span
                                className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg ${scoreColor}`}
                              >
                                {score}/3
                              </span>
                            </div>

                            {/* Actionable recommendation */}
                            <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                              <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                                  {q.actionSpecific}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {q.recommendation}
                                </p>
                              </div>
                            </div>

                            {/* Impact + Difficulty badges */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold border bg-primary/10 border-primary/20 text-primary">
                                <TrendingUp className="w-3 h-3" />
                                {q.estimatedImpact}
                              </span>
                              <DifficultyBadge level={q.difficulty} />
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
                  className="mb-16"
                >
                  <div className="bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark rounded-2xl p-8 md:p-10 border border-white/5">
                    <div className="max-w-md mx-auto text-center">
                      {/* Score display */}
                      <div className="mb-6">
                        <div className="text-6xl font-bold text-white tracking-tight">
                          {totalScore}
                          <span className="text-2xl text-white/30 ml-1">/21</span>
                        </div>
                        <div
                          className={`text-lg font-bold mt-2 ${grade.color}`}
                        >
                          {grade.badge} {grade.label}
                        </div>
                        <p className="text-white/40 text-sm mt-1">
                          {percentage}% de maturité recrutement
                        </p>
                      </div>

                      {/* Visual score bars */}
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2 mb-8">
                        {questions.map((q, i) => {
                          const s = answers[i] ?? 0;
                          const barColor =
                            s === 0
                              ? "bg-red-500"
                              : s === 1
                                ? "bg-amber-500"
                                : s === 2
                                  ? "bg-emerald-500"
                                  : "bg-primary";
                          return (
                            <div key={q.id} className="flex flex-col items-center gap-2">
                              <div className="w-full h-16 bg-white/[0.04] rounded-lg flex flex-col-reverse overflow-hidden">
                                <motion.div
                                  className={`w-full rounded-lg ${barColor}`}
                                  initial={{ height: 0 }}
                                  animate={{
                                    height: `${(s / 3) * 100}%`,
                                  }}
                                  transition={{
                                    duration: 0.6,
                                    delay: 0.8 + i * 0.05,
                                  }}
                                />
                              </div>
                              <span className="text-[10px] text-white/30 font-medium truncate w-full text-center">
                                {q.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Share button */}
                      <div className="pt-5 border-t border-white/[0.06]">
                        <p className="text-xs text-white/20 mb-3">
                          Diagnostic Rocket4RPO
                        </p>
                        <button
                          onClick={handleShare}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/[0.12] text-sm text-white/60 hover:text-white hover:bg-white/[0.12] transition-all cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          Partager mes résultats
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Defi section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 }}
                  className="mb-12"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/[0.06] via-transparent to-primary/[0.06] p-8 md:p-10 text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
                    <div className="relative">
                      <Trophy className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        Le défi
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                        Refaites ce diagnostic dans 3 mois après avoir appliqué nos recommandations.
                        Mesurez votre progression et visez le niveau supérieur !
                      </p>
                      <Button
                        onClick={handleRestart}
                        variant="outline"
                        className="gap-2 px-8 py-5 rounded-xl border-primary/30 text-primary hover:bg-primary/10 font-semibold"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Relever le défi
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-center mb-12"
                >
                  <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-muted/50 border border-border/40">
                    <div className="flex -space-x-1.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                        >
                          <Users className="w-3 h-3 text-primary" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">200+ entreprises</strong>{" "}
                      ont optimisé leur recrutement
                    </span>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Button
                    asChild
                    size="lg"
                    className="gap-2 px-10 py-7 text-base font-semibold rounded-2xl shadow-xl shadow-primary/20 w-full sm:w-auto bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-400"
                  >
                    <a href="/rdv">
                      Recevoir votre rapport détaillé
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-2 px-10 py-6 text-base rounded-2xl w-full sm:w-auto"
                  >
                    <a href="/rdv">
                      <MessageSquare className="w-4 h-4" />
                      Parler à un expert
                    </a>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRestart}
                    className="gap-2 mt-2 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="w-4 h-4" /> Relever le défi
                    <ArrowRight className="w-3 h-3" />
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
