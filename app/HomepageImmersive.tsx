"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ArrowDown, Search, FileCheck, CheckCircle2, Sparkles, Zap, Shield, Clock } from "lucide-react";
import { StarField } from "@/components/homepage/StarField";
import { RocketSVG } from "@/components/homepage/RocketSVG";
import { TextReveal } from "@/components/homepage/TextReveal";
import { OrbitLogos } from "@/components/homepage/OrbitLogos";
import { MagneticButton } from "@/components/homepage/MagneticButton";
import { MarqueeLogos } from "@/components/homepage/MarqueeLogos";
import { GlowCard } from "@/components/homepage/GlowCard";
// Lenis retiré — interfère avec Framer Motion whileInView (sections invisibles)
// import { SmoothScroll } from "@/components/homepage/SmoothScroll";
import { trackHeroCTAClick, trackCTAClick } from "@/lib/analytics";

/* ====================================================================== */
/*  ANIMATED COUNTER                                                      */
/* ====================================================================== */

function Counter({ target, suffix = "", prefix = "", duration = 2000, className = "" }: {
  target: number; suffix?: string; prefix?: string; duration?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, target, duration]);

  return <span ref={ref} className={className}>{prefix}{value}{suffix}</span>;
}

/* ====================================================================== */
/*  COUNTDOWN                                                             */
/* ====================================================================== */

function LaunchCountdown({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const onCompleteCb = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const sequence = [3, 2, 1];
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setCount(sequence[i]);
        i++;
      } else {
        clearInterval(interval);
        setCount(0);
        onCompleteCb();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [started, onCompleteCb]);

  if (count === null) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={count}
        initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: count === 0 ? 0 : 0.12, filter: "blur(0px)" }}
        exit={{ scale: 0.3, opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5"
      >
        <span className="text-[200px] md:text-[350px] font-bold font-mono text-rocket-teal-glow/15 tabular-nums select-none">
          {count === 0 ? "" : count}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

/* ====================================================================== */
/*  GLITCH TEXT                                                           */
/* ====================================================================== */

function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          textShadow: "2px 0 rgba(239,68,68,0.5), -2px 0 rgba(59,130,246,0.5)",
          animation: "glitch 2.5s infinite",
          clipPath: "inset(0 0 50% 0)",
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <style>{`
        @keyframes glitch {
          0%, 85%, 100% { transform: translate(0); }
          87% { transform: translate(-3px, 1px) skewX(-2deg); }
          89% { transform: translate(3px, -1px) skewX(2deg); }
          91% { transform: translate(-2px, 2px); }
          93% { transform: translate(2px, -2px) skewX(-1deg); }
          95% { transform: translate(0) skewX(0); }
        }
      `}</style>
    </span>
  );
}

/* ====================================================================== */
/*  NOISE OVERLAY (film grain)                                            */
/* ====================================================================== */

function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
      aria-hidden="true"
    />
  );
}

/* ====================================================================== */
/*  SECTION WRAPPER (cinematic fade + scale)                              */
/* ====================================================================== */

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`relative flex items-center justify-center py-12 md:py-16 ${className}`}
    >
      {children}
    </section>
  );
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */

export default function HomepageImmersive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Warp: ramps UP then DOWN
  const warpFactor = useTransform(scrollYProgress, [0.02, 0.06, 0.10, 0.16], [0, 1, 1, 0]);
  const [warp, setWarp] = useState(0);
  useEffect(() => warpFactor.on("change", (v) => setWarp(Math.min(1, Math.max(0, v)))), [warpFactor]);

  // Rocket launch
  const rocketLaunch = useTransform(scrollYProgress, [0, 0.10], [0, 1]);
  const [launch, setLaunch] = useState(0);
  useEffect(() => rocketLaunch.on("change", (v) => setLaunch(Math.min(1, Math.max(0, v)))), [rocketLaunch]);

  // Hero opacity
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Countdown
  const [countdownDone, setCountdownDone] = useState(false);

  // Cursor glow
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Progress
  const [progress, setProgress] = useState(0);
  useEffect(() => scrollYProgress.on("change", (v) => setProgress(v)), [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Smooth scroll CSS natif (Lenis retiré — cassait whileInView) */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      {/* ═══ Film grain ═══ */}
      <NoiseOverlay />

      {/* ═══ Cursor glow ═══ */}
      <div
        className="fixed pointer-events-none z-[100] hidden lg:block mix-blend-screen"
        style={{
          left: cursor.x - 200,
          top: cursor.y - 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.07) 0%, transparent 70%)",
          transition: "left 0.08s ease-out, top 0.08s ease-out",
        }}
      />

      {/* ═══ Starfield ═══ */}
      <StarField warpFactor={warp} />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  ACTE 1 — OUVERTURE                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen">
        <div className="h-screen flex flex-col items-center justify-center overflow-hidden gap-0">
          <LaunchCountdown onComplete={() => setCountdownDone(true)} />

          {/* Rocket — tiny */}
          <RocketSVG launchProgress={launch} className="scale-50 md:scale-[0.6]" />

          {/* Title — VISIBLE IMMEDIATELY */}
          <motion.div
            className="text-center px-6 z-10 -mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold font-display leading-[1.05] tracking-tight">
              <span className="text-white">Vos meilleurs recrutements</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400 text-gradient-animated">
                commencent ici.
              </span>
            </h1>

            <motion.p
              className="mt-4 text-base md:text-lg text-white/40 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Un recruteur d&apos;élite rejoint votre équipe en 7 jours.
              <br className="hidden md:block" />
              Pas un cabinet. Pas un CDI. <span className="text-white/60 font-medium">Votre TA.</span>
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <a
                href="/rdv"
                onClick={() => trackHeroCTAClick("Réserver mon diagnostic", "/rdv")}
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-rocket-teal to-emerald-500 text-white hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-rocket-teal/20 overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Décollage</span>
                <ArrowRight className="w-4 h-4 relative" />
              </a>
              <a
                href="/calculateur"
                onClick={() => trackCTAClick("Calculer mes économies", "/calculateur")}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-white/15 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/25 transition-all"
              >
                Calculer mes économies
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <span>🚀 200+ recrutements</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>⚡ Opérationnel en 7j</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>💰 5x moins cher</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span>🏆 Top 1% des TA</span>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
