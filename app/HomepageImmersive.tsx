"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { StarField } from "@/components/homepage/StarField";
import { RocketSVG } from "@/components/homepage/RocketSVG";
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

  // v24.3 — page hero-only + h-screen strict : scrollYProgress devenait 1
  // dès le load et envoyait la fusée à -600px hors viewport. warp figé à 0.
  const warp = 0;
  // v24.5.8 — décollage géré en CSS pur via :has() (voir <style> dans JSX).
  // launch statique à 0 (flamme/glow de repos).
  const launch = 0;

  // Countdown
  const [countdownDone, setCountdownDone] = useState(false);

  // Cursor glow
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

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
      {/* v24.1 — h-screen strict + overflow-hidden : pas de scroll, tout le
          contenu doit tenir dans la viewport. Padding top = hauteur navbar fixed. */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 pt-20 pb-4 lg:pt-24 lg:pb-8 overflow-hidden">
        {/* v24.5.8 — Décollage en CSS pur via :has(). Quand l'utilisateur
            hover le CTA .cta-hero, le .rocket-inner décolle. Zéro état React,
            zéro interaction avec le DOM (évite les 7 problèmes précédents). */}
        <style>{`
          .rocket-inner {
            transform: translateY(0) scale(1);
            transform-origin: center bottom;
            transition: transform 2.8s cubic-bezier(0.55, 0, 0.4, 1);
          }
          section:has(.cta-hero:hover) .rocket-inner,
          section:has(.cta-hero:focus-visible) .rocket-inner {
            transform: translateY(-110vh) scale(1.3);
          }
        `}</style>
        <div className="w-full flex flex-col items-center justify-center">
          <LaunchCountdown onComplete={() => setCountdownDone(true)} />

          {/* Rocket — v24.2 agrandi (demande user) + toujours visible */}
          <RocketSVG launchProgress={launch} className="scale-[0.7] md:scale-[0.9] lg:scale-[1] mb-2" />

          {/* Title — VISIBLE IMMEDIATELY */}
          <motion.div
            className="text-center px-6 z-10 -mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* v24.4 — chip retirée (demande user) */}

            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold font-display leading-[1.05] tracking-tight">
              <span className="text-white">Vos meilleurs recrutements</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400 text-gradient-animated">
                commencent ici.
              </span>
            </h1>

            <motion.p
              className="mt-3 text-sm md:text-lg text-white/40 max-w-lg mx-auto leading-relaxed text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Un recruteur d&apos;élite rejoint votre équipe en 7 jours.
              <br className="hidden md:block" />
              Pas un cabinet. Pas un CDI. <span className="text-white/60 font-medium">Votre TA.</span>
            </motion.p>

            {/* CTA cluster — primary dominant, secondary en lien discret
                v24.1 — mt-7 → mt-5, gap-3 → gap-2 (serré) */}
            <motion.div
              className="mt-5 flex flex-col items-center justify-center gap-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <a
                href="/rdv"
                onClick={() => trackHeroCTAClick("Monter à bord", "/rdv")}
                className="cta-hero group relative inline-flex items-center gap-2.5 px-9 py-4 text-base font-bold rounded-xl bg-white text-rocket-dark hover:scale-[1.03] active:scale-95 transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_0_40px_-5px_rgba(255,255,255,0.35),0_10px_40px_-10px_rgba(20,184,166,0.5)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_0_50px_-5px_rgba(94,234,212,0.5),0_12px_45px_-5px_rgba(20,184,166,0.6)] overflow-hidden"
              >
                {/* Shimmer teal qui glisse sur le blanc */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-rocket-teal/20 to-transparent" />
                <span className="relative">Monter à bord</span>
                <ArrowRight className="w-4 h-4 relative text-rocket-teal transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* v23.7 — microcopy risk-reversal sous le CTA primary
                  v24.0 — retire "Gratuit" (demande user) */}
              <p className="text-[11px] md:text-xs text-white/35 tracking-wide">
                15 min <span className="text-white/20 mx-1">·</span> Sans engagement
              </p>

              {/* Secondary en lien discret (réduit l'attention split) */}
              <a
                href="/demo"
                onClick={() => trackCTAClick("Simulation de votre voyage chez nous", "/demo")}
                className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/85 transition-colors underline-offset-4 decoration-white/20 hover:decoration-rocket-teal/60 hover:underline"
              >
                Simulation de votre voyage chez nous
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </motion.div>

            {/* v24.4 — trust bar retirée (demande user) */}

            {/* Testimonial compressé (source: ancien HomepageSections).
                v24.1 — caché si viewport trop court pour garantir no-scroll strict */}
            <motion.figure
              className="hidden [@media(min-height:720px)]:block mt-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <blockquote className="text-xs md:text-[13px] text-white/45 italic leading-relaxed">
                <span className="text-rocket-teal/60 font-serif text-base align-[-2px] mr-0.5">&ldquo;</span>
                Time-to-hire divisé par 2. 8 postes signés en 4 mois.
                <span className="text-rocket-teal/60 font-serif text-base align-[-2px] ml-0.5">&rdquo;</span>
              </blockquote>
              <figcaption className="mt-1.5 text-[10px] tracking-[0.1em] uppercase text-white/25">
                VP People · Scale-up SaaS, 120 pers.
              </figcaption>
            </motion.figure>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
