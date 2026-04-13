"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  Timer,
  Radar,
  RotateCcw,
  Shield,
  Award,
  DollarSign,
  ThumbsUp,
  Play,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Candidate {
  name: string;
  role: string;
  company: string;
  experience: string;
  score: number;
  spécialité: string;
  radarScores: [number, number, number, number]; // Sourcing, Qualification, Autonomie, Closing
}

/* ------------------------------------------------------------------ */
/*  Name pools & candidate generation                                  */
/* ------------------------------------------------------------------ */

const FIRST_NAMES = [
  "Alexandre", "Sophie", "Mathieu", "Camille", "Thomas", "Julie",
  "Lucas", "Emma", "Antoine", "Lea", "Nicolas", "Marion",
  "Pierre", "Clara", "Romain", "Pauline", "Hugo", "Margaux",
  "Julien", "Elise", "Maxime", "Charlotte", "Adrien", "Sarah",
];

const LAST_NAMES = [
  "Martin", "Dubois", "Laurent", "Bernard", "Petit", "Moreau",
  "Lefevre", "Garcia", "Roux", "Fournier", "Girard", "Andre",
  "Leroy", "Mercier", "Dupont", "Lambert", "Bonnet", "Francois",
  "Martinez", "Legrand", "Simon", "Blanc", "Chevalier", "Robin",
];

const COMPANIES = [
  "Scale-up Fintech", "Editeur SaaS", "Start-up B2B", "Licorne Tech",
  "Scale-up RH Tech", "Start-up IA", "Editeur Cloud", "Fintech Paris",
  "Start-up Cyber", "Scale-up Data", "SaaS EdTech", "Licorne HealthTech",
  "Scale-up MarTech", "Start-up PropTech", "Editeur ERP",
];

const EXPERIENCE_RANGE = ["2 ans", "3 ans", "4 ans", "5 ans", "6 ans", "7 ans", "8 ans"];

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
}

function generateSpecialites(jobTitle: string): string[] {
  const lower = jobTitle.toLowerCase();
  const base: string[] = [];

  if (lower.includes("sdr") || lower.includes("bdr")) {
    base.push("Prospection outbound", "Cold calling", "Lead generation", "Social selling", "Pipeline building", "Account mapping", "Qualification BANT");
  } else if (lower.includes("account executive") || lower.includes("ae")) {
    base.push("Full-cycle SaaS", "Closing Mid-Market", "Demo & POC", "Négociation enterprise", "Upsell & cross-sell", "Gestion pipe complexe", "Vente consultative");
  } else if (lower.includes("csm") || lower.includes("customer success")) {
    base.push("Onboarding client", "Retention & churn", "Upsell account", "QBR management", "Health scoring", "Adoption produit", "Renouvellement contrat");
  } else if (lower.includes("sales manager") || lower.includes("head of sales") || lower.includes("vp sales")) {
    base.push("Management équipe", "Forecasting", "Coaching sales", "Strategy Go-to-Market", "Recrutement équipe", "KPI & reporting", "Sales enablement");
  } else if (lower.includes("marketing") || lower.includes("growth")) {
    base.push("Growth hacking", "Acquisition paid", "Content strategy", "Marketing automation", "Lead nurturing", "SEO/SEA", "Analytics & attribution");
  } else if (lower.includes("developpeur") || lower.includes("dev") || lower.includes("engineer")) {
    base.push("Architecture logicielle", "CI/CD pipelines", "Code review", "Performance & scalabilité", "API design", "Testing avancé", "DevOps culture");
  } else if (lower.includes("product") || lower.includes("pm")) {
    base.push("Product discovery", "Roadmap strategy", "User research", "A/B testing", "Priorisation impact", "Stakeholder management", "Data-driven decisions");
  } else {
    base.push("Expertise métier", "Leadership", "Gestion de projet", "Communication", "Analyse stratégique", "Collaboration transverse", "Résolution problèmes");
  }

  return base;
}

function generateCandidates(jobTitle: string): Candidate[] {
  const rng = seededRandom(jobTitle.trim().toLowerCase());
  const count = 5 + Math.floor(rng() * 3); // 5-7 candidates
  const spécialités = generateSpecialites(jobTitle);
  const usedNames = new Set<string>();
  const candidates: Candidate[] = [];

  for (let i = 0; i < count; i++) {
    let name: string;
    do {
      const fi = Math.floor(rng() * FIRST_NAMES.length);
      const li = Math.floor(rng() * LAST_NAMES.length);
      name = `${FIRST_NAMES[fi].charAt(0)}. ${LAST_NAMES[li]}`;
    } while (usedNames.has(name));
    usedNames.add(name);

    const score = 96 - Math.floor(rng() * 18); // 78-96
    const ci = Math.floor(rng() * COMPANIES.length);
    const ei = Math.floor(rng() * EXPERIENCE_RANGE.length);
    const si = Math.floor(rng() * spécialités.length);

    candidates.push({
      name,
      role: jobTitle.length > 25 ? jobTitle.slice(0, 22) + "..." : jobTitle,
      company: COMPANIES[ci],
      experience: EXPERIENCE_RANGE[ei],
      score,
      spécialité: spécialités[si],
      radarScores: [
        60 + Math.floor(rng() * 40),
        60 + Math.floor(rng() * 40),
        60 + Math.floor(rng() * 40),
        60 + Math.floor(rng() * 40),
      ],
    });
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);
  return candidates;
}

/* ------------------------------------------------------------------ */
/*  Steps definition                                                   */
/* ------------------------------------------------------------------ */

const steps = [
  { label: "Brief & Scorecard", icon: FileText },
  { label: "Sourcing", icon: Search },
  { label: "Shortlist", icon: Users },
  { label: "Résultats", icon: BarChart3 },
];

const HUBSPOT_LINK = "/rdv";

/* ------------------------------------------------------------------ */
/*  Confetti CSS animation component (40 particles)                    */
/* ------------------------------------------------------------------ */

function Confetti() {
  const colors = [
    "#6366f1", "#818cf8", "#a5b4fc", "#10b981", "#34d399",
    "#f59e0b", "#fbbf24", "#ef4444", "#f87171", "#8b5cf6",
    "#c084fc", "#ec4899", "#f472b6", "#06b6d4", "#22d3ee",
  ];

  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <>
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 20px)) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-piece {
          position: fixed;
          top: -20px;
          z-index: 50;
          pointer-events: none;
          animation: confetti-fall var(--duration) ease-in var(--delay) forwards;
        }
      `}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            "--delay": `${p.delay}s`,
            "--duration": `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle burst (small dots expanding outward around an avatar)     */
/* ------------------------------------------------------------------ */

function ParticleBurst() {
  const particles = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * Math.PI * 2;
    return {
      id: i,
      x: Math.cos(angle) * 28,
      y: Math.sin(angle) * 28,
    };
  });

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{ top: "50%", left: "50%", marginTop: -4, marginLeft: -4 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step transition shimmer overlay                                    */
/* ------------------------------------------------------------------ */

function StepShimmer() {
  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </motion.div>
  );
}

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
/*  Large savings counter (counts up with locale formatting)           */
/* ------------------------------------------------------------------ */

function SavingsCounter({
  target,
  duration = 2000,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return { count, done };
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
/*  Mini SVG Radar Chart (4 axes) — with draw animation                */
/* ------------------------------------------------------------------ */

function MiniRadarChart({ scores, size = 100, animate: shouldAnimate = false }: { scores: [number, number, number, number]; size?: number; animate?: boolean }) {
  const labels = ["Sourcing", "Qualif.", "Autonomie", "Closing"];
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 14;

  // 4 axes at 0, 90, 180, 270 degrees (top, right, bottom, left)
  const angles = [-90, 0, 90, 180].map((d) => (d * Math.PI) / 180);

  const getPoint = (angle: number, value: number) => {
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  // Grid rings
  const rings = [25, 50, 75, 100];

  // Data polygon points
  const dataPoints = scores.map((s, i) => getPoint(angles[i], s));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Calculate approximate path length for draw animation
  let pathLen = 0;
  for (let i = 0; i < dataPoints.length; i++) {
    const next = dataPoints[(i + 1) % dataPoints.length];
    const dx = next.x - dataPoints[i].x;
    const dy = next.y - dataPoints[i].y;
    pathLen += Math.sqrt(dx * dx + dy * dy);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      {/* Grid rings */}
      {rings.map((r) => (
        <polygon
          key={r}
          points={angles
            .map((a) => {
              const p = getPoint(a, r);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-border/30"
        />
      ))}

      {/* Axes */}
      {angles.map((a, i) => {
        const end = getPoint(a, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border/30"
          />
        );
      })}

      {/* Data polygon with draw animation */}
      <motion.path
        d={dataPath}
        fill="rgba(99, 102, 241, 0.15)"
        stroke="rgba(99, 102, 241, 0.7)"
        strokeWidth="1.5"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { opacity: 0, scale: 0.3 }}
        animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={shouldAnimate ? { duration: 0.8, ease: "easeOut" } : { duration: 0.6, ease: "easeOut" }}
        style={shouldAnimate ? { pathLength: 0 } : { transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#6366f1"
          stroke="#fff"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: shouldAnimate ? 0.6 + i * 0.1 : 0.3 + i * 0.1 }}
        />
      ))}

      {/* Labels */}
      {angles.map((a, i) => {
        const labelR = maxR + 12;
        const lp = getPoint(a, (labelR / maxR) * 100);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="currentColor"
            className="text-muted-foreground"
            fontSize="7"
            fontWeight="600"
          >
            {labels[i]}
          </text>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Typing animation for TA notes                                      */
/* ------------------------------------------------------------------ */

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-3 bg-primary ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline comparison bar (with bounce animation)                    */
/* ------------------------------------------------------------------ */

function TimelineBar({
  label,
  days,
  maxDays,
  color,
  delay = 0,
  sourceNote,
}: {
  label: string;
  days: number;
  maxDays: number;
  color: string;
  delay?: number;
  sourceNote?: string;
}) {
  const pct = (days / maxDays) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="font-semibold">
          {label}
          {sourceNote && (
            <span className="text-[9px] text-muted-foreground/60 ml-1.5 font-normal">
              {sourceNote}
            </span>
          )}
        </span>
        <span className="font-bold tabular-nums">{days} jours</span>
      </div>
      <div className="h-3 rounded-full bg-muted/20 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.34, 1.56, 0.64, 1], // slight bounce at end
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tooltip component for footnotes                                    */
/* ------------------------------------------------------------------ */

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-rocket-dark border border-border/50 text-[10px] text-muted-foreground whitespace-nowrap z-50 shadow-xl pointer-events-none"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Step timeline navigation — vertical on mobile, horizontal desktop  */
/* ------------------------------------------------------------------ */

function StepTimeline({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (i: number) => void;
}) {
  return (
    <>
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative mb-12 px-4">
        {/* Step progress indicator */}
        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            Étape {currentStep + 1}/{steps.length}
          </span>
        </div>

        <div className="relative flex items-center justify-between max-w-2xl mx-auto">
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
                  className={`text-[11px] font-semibold transition-colors ${
                    isCurrent
                      ? "text-primary"
                      : isCompleted
                        ? "text-emerald-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
                {isCompleted && (
                  <span className="text-[9px] text-emerald-400/70 font-medium -mt-1">
                    Revoir
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden mb-10 px-4">
        {/* Step progress indicator mobile */}
        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            Étape {currentStep + 1}/{steps.length}
          </span>
        </div>

        <div className="relative flex flex-col gap-1 max-w-xs mx-auto">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;
            const isClickable = i <= currentStep;

            return (
              <div key={i} className="relative">
                <button
                  onClick={() => isClickable && onStepClick(i)}
                  className={`relative z-10 flex items-center gap-3 w-full py-2 group ${
                    isClickable ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                        : isCurrent
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "bg-background border-border/50 text-muted-foreground"
                    }`}
                    whileTap={isClickable ? { scale: 0.95 } : {}}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </motion.div>
                  <div className="flex items-center gap-2 flex-1">
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isCurrent
                          ? "text-primary"
                          : isCompleted
                            ? "text-emerald-400"
                            : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isCompleted && (
                      <span className="text-[9px] text-emerald-400/60 font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Revoir
                      </span>
                    )}
                    {isCurrent && (
                      <motion.span
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </div>
                </button>
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div
                    className={`absolute left-5 top-12 w-0.5 h-3 -translate-x-1/2 transition-colors duration-300 ${
                      isCompleted ? "bg-emerald-500" : "bg-border/30"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Brief & Scorecard                                         */
/* ------------------------------------------------------------------ */

function StepBrief({
  onNext,
  jobTitle,
  setJobTitle,
  criteria,
  setCriteria,
}: {
  onNext: () => void;
  jobTitle: string;
  setJobTitle: (v: string) => void;
  criteria: Record<string, boolean>;
  setCriteria: (v: Record<string, boolean>) => void;
}) {
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
              placeholder="Ex: Account Executive SaaS, SDR, CSM, Dev Full-Stack..."
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
                      setCriteria({
                        ...criteria,
                        [key]: !criteria[key as keyof typeof criteria],
                      })
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
/*  Step 2 — Sourcing (animated channels + filtrage IA)                */
/* ------------------------------------------------------------------ */

const CHANNELS = [
  { name: "LinkedIn", icon: "in" },
  { name: "GitHub", icon: "gh" },
  { name: "Vivier R4RPO", icon: "r4" },
  { name: "Cooptation", icon: "co" },
  { name: "JobBoards", icon: "jb" },
];

const FILTRAGE_STEPS = [
  { count: "3 247", label: "profils identifiés" },
  { count: "847", label: "filtre 15 critères" },
  { count: "127", label: "scoring IA" },
  { count: "12", label: "profils qualifiés" },
];

function StepSourcing({ onNext, candidates }: { onNext: () => void; candidates: Candidate[] }) {
  const [progress, setProgress] = useState(0);
  const [visibleChannels, setVisibleChannels] = useState(0);
  const [showFiltrage, setShowFiltrage] = useState(false);
  const [filtrageStep, setFiltrageStep] = useState(0);
  const [showCandidates, setShowCandidates] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

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

  // Flash effect when progress hits 100%
  useEffect(() => {
    if (Math.round(progress) >= 100 && !showFlash) {
      setShowFlash(true);
    }
  }, [progress, showFlash]);

  // Channel scanning — one by one with 600ms delay
  useEffect(() => {
    if (visibleChannels < CHANNELS.length) {
      const t = setTimeout(() => setVisibleChannels((c) => c + 1), 600);
      return () => clearTimeout(t);
    } else if (!showFiltrage) {
      const t = setTimeout(() => setShowFiltrage(true), 500);
      return () => clearTimeout(t);
    }
  }, [visibleChannels, showFiltrage]);

  // Filtrage IA steps
  useEffect(() => {
    if (!showFiltrage) return;
    if (filtrageStep < FILTRAGE_STEPS.length) {
      const t = setTimeout(() => setFiltrageStep((s) => s + 1), 700);
      return () => clearTimeout(t);
    } else if (!showCandidates) {
      const t = setTimeout(() => setShowCandidates(true), 500);
      return () => clearTimeout(t);
    }
  }, [showFiltrage, filtrageStep, showCandidates]);

  // Staggered candidate appearance
  useEffect(() => {
    if (!showCandidates) return;
    if (visibleCount < Math.min(candidates.length, 5)) {
      const timeout = setTimeout(() => setVisibleCount((c) => c + 1), 500);
      return () => clearTimeout(timeout);
    } else if (!allLoaded) {
      const timeout = setTimeout(() => setAllLoaded(true), 400);
      return () => clearTimeout(timeout);
    }
  }, [showCandidates, visibleCount, allLoaded, candidates.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Scanning panel */}
      <div className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-xl shadow-black/5 relative">
        {/* Flash effect overlay */}
        <AnimatePresence>
          {showFlash && (
            <motion.div
              className="absolute inset-0 bg-white/30 z-30 pointer-events-none rounded-2xl"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => setShowFlash(false)}
            />
          )}
        </AnimatePresence>

        <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <RadarPulse />
          <div className="flex-1 text-center sm:text-left w-full">
            {/* Live pulsing indicator */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <motion.div
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50"
              />
              <span className="text-sm font-bold">Sourcing en cours...</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[9px] font-bold border border-red-500/30"
              >
                LIVE
              </motion.span>
            </div>

            <p className="text-3xl font-bold text-primary tabular-nums mb-1">
              <FastCounter target={3247} duration={4000} />
              <span className="text-sm font-normal text-muted-foreground ml-2">
                profils analysés
              </span>
            </p>

            {/* Progress bar */}
            <div className="space-y-1.5 mt-3">
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

        {/* Channel scanning */}
        <div className="px-6 pb-5 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Sources scannées
          </p>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.slice(0, visibleChannels).map((ch, i) => (
              <motion.div
                key={ch.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400"
              >
                <CheckCircle2 className="w-3 h-3" />
                {ch.name}
              </motion.div>
            ))}
            {visibleChannels < CHANNELS.length && (
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-semibold text-primary"
              >
                <Search className="w-3 h-3" />
                Scan...
              </motion.div>
            )}
          </div>
        </div>

        {/* Filtrage IA */}
        <AnimatePresence>
          {showFiltrage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="px-6 pb-5"
            >
              <div className="rounded-xl bg-rocket-dark/30 border border-primary/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Filtrage IA
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {FILTRAGE_STEPS.slice(0, filtrageStep).map((fs, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5"
                    >
                      {i > 0 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-muted-foreground text-xs"
                        >
                          &rarr;
                        </motion.span>
                      )}
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          i === filtrageStep - 1
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-muted/10 text-muted-foreground border border-border/20"
                        }`}
                      >
                        {fs.count}
                      </span>
                    </motion.div>
                  ))}
                  {filtrageStep >= FILTRAGE_STEPS.length && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="ml-1 text-emerald-400"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Candidate cards — dramatic entrance from right with scale */}
      {showCandidates && (
        <div className="space-y-3">
          <AnimatePresence>
            {candidates.slice(0, visibleCount).map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: 120, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                }}
                whileHover={{ scale: 1.015, borderColor: "rgba(99,102,241,0.3)" }}
                className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-lg shadow-black/5 transition-all cursor-default"
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
                      {c.spécialité} &middot; {c.company}
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
      )}

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
/*  Step 3 — Shortlist (interactive selection + radar charts)           */
/* ------------------------------------------------------------------ */

function StepShortlist({
  onNext,
  candidates,
  criteria,
}: {
  onNext: () => void;
  candidates: Candidate[];
  criteria: Record<string, boolean>;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set([0, 1, 2]));
  const [justSelected, setJustSelected] = useState<number | null>(null);
  const maxSelection = 3;

  const activeCriteriaCount = Object.values(criteria).filter(Boolean).length;

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
        return next;
      } else {
        if (next.size >= maxSelection) return prev;
        next.add(idx);
        setJustSelected(idx);
        // Clear justSelected after particle animation
        setTimeout(() => setJustSelected(null), 700);
        return next;
      }
    });
  };

  // Compute match score based on criteria selection
  const getMatchScore = (candidate: Candidate) => {
    const base = candidate.score;
    const criteriaBonus = activeCriteriaCount * 2;
    return Math.min(base + criteriaBonus, 99);
  };

  const notesPool = [
    "Excellent track record, +140% quota atteint 2 ans de suite. Très bon relationnel.",
    "Forte expertise sectorielle, référencé par son VP Sales. Approche structurée.",
    "Profil hunter confirmé, expérience prospection outbound B2B solide.",
    "Parcours impressionnant en scale-up, capacité à monter en compétence rapidement.",
    "Très bonne maîtrise des cycles de vente complexes, orientée résultats.",
    "Profil polyvalent, excellente communication et esprit d'équipe.",
    "Forte capacité d'adaptation, expérience multi-secteurs valorisante.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* 1 semaine badge */}
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
              <span className="text-lg font-bold text-primary">1 semaine écoulée</span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30"
              >
                LIVRÉE
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sélectionnez vos <span className="font-bold text-foreground">3 meilleurs candidats</span> pour passer aux entretiens.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Selection counter */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-muted-foreground">
          {selected.size}/{maxSelection} candidats sélectionnés
        </p>
        <div className="flex gap-1">
          {Array.from({ length: maxSelection }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i < selected.size ? "bg-primary" : "bg-muted/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* All candidates with selection toggle */}
      <div className="space-y-4">
        {candidates.map((c, i) => {
          const isSelected = selected.has(i);
          const matchScore = getMatchScore(c);
          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleSelect(i)}
              className={`rounded-2xl bg-background/80 backdrop-blur-xl border overflow-hidden shadow-lg shadow-black/5 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-primary/40 shadow-primary/10"
                  : "border-border/50 hover:border-border/80"
              }`}
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div
                      animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                        isSelected
                          ? "bg-primary/15 border-primary/40 text-primary"
                          : "bg-muted/10 border-border/30 text-muted-foreground"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{c.name.charAt(0)}</span>
                      )}
                    </motion.div>
                    {/* Particle burst on selection */}
                    {justSelected === i && <ParticleBurst />}
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
                      {c.spécialité} &middot; {c.company} &middot; {c.experience}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <ScoreBadge score={c.score} />
                    <span className="text-[10px] text-primary/70 font-semibold">
                      Match: {matchScore}%
                    </span>
                  </div>
                </div>

                {/* Expanded content for selected candidates */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        {/* Radar chart with draw animation */}
                        <div className="flex justify-center sm:justify-start">
                          <MiniRadarChart scores={c.radarScores} size={110} animate={true} />
                        </div>

                        {/* TA note with typing animation */}
                        <div className="flex-1 rounded-xl bg-rocket-dark/20 border border-border/30 p-4">
                          <div className="flex items-center gap-1.5 mb-2">
                            <MessageSquare className="w-3 h-3 text-muted-foreground" />
                            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                              Note du Talent Acquisition
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed italic text-foreground/80">
                            &ldquo;<TypingText
                              text={notesPool[i % notesPool.length]}
                              delay={300}
                            />&rdquo;
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all shadow-lg shadow-primary/20"
          >
            Voir les résultats ({selected.size} sélectionnés)
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Results (enhanced KPIs + timeline bars)                   */
/* ------------------------------------------------------------------ */

function StepResults({ onRestart }: { onRestart: () => void }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSavingsConfetti, setShowSavingsConfetti] = useState(false);
  const savingsResult = SavingsCounter({ target: 31, duration: 2000 });

  // Trigger confetti on mount
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger savings confetti when counter finishes
  useEffect(() => {
    if (savingsResult.done && !showSavingsConfetti) {
      setShowSavingsConfetti(true);
      const timer = setTimeout(() => setShowSavingsConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [savingsResult.done, showSavingsConfetti]);

  const kpis = [
    {
      label: "Time-to-hire",
      value: 21,
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

  const extraKpis = [
    {
      label: "Coût estimé",
      value: "3 000",
      unit: "EUR / recrutement",
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      tooltip: null,
    },
    {
      label: "Économie vs cabinet",
      value: "-40%",
      unit: "en moyenne",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      tooltip: null,
    },
    {
      label: "Satisfaction client",
      value: "97%",
      unit: "de recommandation",
      icon: ThumbsUp,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      tooltip: "(basé sur nos clients 2025-2026)",
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
      {/* Confetti celebration */}
      {showConfetti && <Confetti />}

      {/* KPI grid 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 p-5 md:p-6 text-center space-y-3 shadow-lg shadow-black/5 transition-transform"
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

      {/* Extra KPIs row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {extraKpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.04 }}
            className="rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 p-4 text-center shadow-md shadow-black/5 transition-transform"
          >
            <div className={`w-9 h-9 rounded-xl ${kpi.bgColor} flex items-center justify-center mx-auto mb-2`}>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className={`text-lg font-bold ${kpi.color} tabular-nums`}>{kpi.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium">{kpi.label}</p>
            {kpi.tooltip ? (
              <Tooltip text={kpi.tooltip}>
                <p className="text-[9px] text-muted-foreground/60 mt-0.5 border-b border-dashed border-muted-foreground/30 inline-block cursor-help">
                  {kpi.unit}
                </p>
              </Tooltip>
            ) : (
              <p className="text-[9px] text-muted-foreground/60 mt-0.5">{kpi.unit}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Timeline comparison bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-xl shadow-black/5"
      >
        <div className="px-6 py-5 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border/30">
          <h4 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Rocket4RPO vs Marché
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Comparez nos performances avec la moyenne du secteur
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Timeline bars with bounce */}
          <TimelineBar
            label="Rocket4RPO"
            days={21}
            maxDays={52}
            color="bg-gradient-to-r from-primary to-primary/70"
            delay={0.3}
          />
          <TimelineBar
            label="Marché"
            days={52}
            maxDays={52}
            color="bg-gradient-to-r from-muted/50 to-muted/30"
            delay={0.6}
            sourceNote="(source: LinkedIn Talent Solutions 2025)"
          />

          {/* Two-column comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            {/* Rocket4RPO column with glow pulse */}
            <div className="rounded-xl bg-primary/5 border-2 border-primary/30 p-5 text-center relative overflow-hidden">
              {/* Glow pulse behind Rocket4RPO column */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    "inset 0 0 20px 0 rgba(99, 102, 241, 0.05)",
                    "inset 0 0 40px 5px rgba(99, 102, 241, 0.12)",
                    "inset 0 0 20px 0 rgba(99, 102, 241, 0.05)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 border border-primary/20">
                  <Zap className="w-3 h-3" />
                  Rocket4RPO
                </div>
                <p className="text-4xl md:text-5xl font-bold text-primary tabular-nums leading-none">
                  <AnimatedCounter target={21} duration={1200} />
                </p>
                <p className="text-sm text-muted-foreground mt-1.5 font-medium">jours</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="mt-3"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                    <TrendingUp className="w-3.5 h-3.5" />
                    -60% plus rapide
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Marché column */}
            <div className="rounded-xl bg-muted/10 border border-border/30 p-5 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/20 text-muted-foreground text-xs font-bold mb-3 border border-border/30">
                Marché
              </div>
              <p className="text-4xl md:text-5xl font-bold text-muted-foreground tabular-nums leading-none">
                <AnimatedCounter target={52} duration={1200} />
              </p>
              <p className="text-sm text-muted-foreground mt-1.5 font-medium">jours</p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/20 text-muted-foreground text-xs font-bold border border-border/30">
                  Standard
                </span>
              </div>
            </div>
          </div>

          {/* Savings highlight with animated counter and confetti */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-center relative overflow-hidden"
          >
            {showSavingsConfetti && <Confetti />}
            <p className="text-sm font-semibold text-emerald-400">
              Économisez{" "}
              <motion.span
                className="text-2xl font-bold inline-block"
                animate={savingsResult.done ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {savingsResult.count} jours
              </motion.span>{" "}
              sur votre recrutement
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Soit plus d&apos;un <span className="font-semibold text-foreground/80">mois</span> de productivité gagnée pour votre équipe
            </p>
          </motion.div>
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
            Nos clients recrutent leur premier Sales en 2-3 semaines en moyenne.
            Réservez un appel de 15 min pour voir comment on peut faire pareil
            pour vous.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={HUBSPOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
            >
              Parler à un expert
              <ArrowRight className="w-4 h-4" />
            </a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-muted/10 border border-border/50 text-muted-foreground font-semibold text-sm hover:text-foreground hover:border-border/80 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Recommencer la démo
            </motion.button>
          </div>

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
  const [started, setStarted] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);
  const [jobTitle, setJobTitle] = useState("Account Executive SaaS");
  const [criteria, setCriteria] = useState<Record<string, boolean>>({
    saas: true,
    fullCycle: true,
    midMarket: false,
    hunter: true,
  });

  // Generate candidates based on the job title (memoized)
  const candidates = useMemo(() => generateCandidates(jobTitle), [jobTitle]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      setShowShimmer(true);
      setTimeout(() => {
        setCurrentStep(step);
        setShowShimmer(false);
        scrollToTop();
      }, 250);
    },
    [scrollToTop]
  );

  const next = () => {
    setShowShimmer(true);
    setTimeout(() => {
      setCurrentStep((s) => {
        const nextStep = Math.min(s + 1, 3);
        return nextStep;
      });
      setShowShimmer(false);
      scrollToTop();
    }, 250);
  };

  const restart = () => {
    setShowShimmer(true);
    setTimeout(() => {
      setCurrentStep(0);
      setStarted(false);
      setShowShimmer(false);
      scrollToTop();
    }, 250);
  };

  const handleStart = () => {
    setStarted(true);
    scrollToTop();
  };

  // Auto-start the demo
  useEffect(() => {
    if (!started) handleStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen pt-4">

      {/* Demo starts directly — no hero */}
        <div className="max-w-4xl mx-auto px-4 pb-20 relative">
          {/* Step transition shimmer */}
          <AnimatePresence>
            {showShimmer && <StepShimmer />}
          </AnimatePresence>

          {/* Step timeline navigation */}
          <StepTimeline currentStep={currentStep} onStepClick={goToStep} />

          {/* Step content */}
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <StepBrief
                key="brief"
                onNext={next}
                jobTitle={jobTitle}
                setJobTitle={setJobTitle}
                criteria={criteria}
                setCriteria={setCriteria}
              />
            )}
            {currentStep === 1 && (
              <StepSourcing key="sourcing" onNext={next} candidates={candidates} />
            )}
            {currentStep === 2 && (
              <StepShortlist
                key="shortlist"
                onNext={next}
                candidates={candidates}
                criteria={criteria}
              />
            )}
            {currentStep === 3 && <StepResults key="results" onRestart={restart} />}
          </AnimatePresence>
        </div>
    </main>
  );
}
