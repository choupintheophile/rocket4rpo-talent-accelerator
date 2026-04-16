"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ArrowDown, Search, FileCheck, CheckCircle2, Sparkles } from "lucide-react";
import { StarField } from "@/components/homepage/StarField";
import { RocketSVG } from "@/components/homepage/RocketSVG";
import { TypewriterText } from "@/components/homepage/TypewriterText";
import { OrbitLogos } from "@/components/homepage/OrbitLogos";
import { MagneticButton } from "@/components/homepage/MagneticButton";
import { trackHeroCTAClick, trackCTAClick } from "@/lib/analytics";

/* ====================================================================== */
/*  COUNTDOWN T-10                                                        */
/* ====================================================================== */

function LaunchCountdown({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState<number | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
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
        onComplete();
      }
    }, 600);
    return () => clearInterval(interval);
  }, [started, onComplete]);

  if (count === null) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={count}
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: count === 0 ? 0 : 0.15 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-5"
      >
        <span className="text-[200px] md:text-[300px] font-bold font-mono text-rocket-teal-glow/20 tabular-nums">
          {count === 0 ? "🚀" : count}
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
          animation: "glitch 3s infinite",
          clipPath: "inset(0 0 50% 0)",
        }}
        aria-hidden="true"
      >
        {children}
      </span>
      <style>{`
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, 2px); }
          98% { transform: translate(1px, -2px); }
        }
      `}</style>
    </span>
  );
}

/* ====================================================================== */
/*  ANIMATED COUNTER (reusable)                                           */
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
/*  FLIP CARD (CSS 3D perspective)                                        */
/* ====================================================================== */

function FlipCard({ icon, title, back, delay = 0 }: {
  icon: React.ReactNode; title: string; back: string; delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setFlipped(true), delay + 1500);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  return (
    <motion.div
      ref={ref}
      className="w-full h-[220px] md:h-[260px] perspective-[1000px] cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.6 }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-4xl">{icon}</div>
          <h3 className="text-lg md:text-xl font-bold text-white text-center">{title}</h3>
          <span className="text-xs text-white/40">Cliquez pour retourner</span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-rocket-teal/20 to-emerald-500/10 border border-rocket-teal/30 p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-sm md:text-base text-white/90 text-center leading-relaxed">{back}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ====================================================================== */
/*  MAIN COMPONENT                                                        */
/* ====================================================================== */

export default function HomepageImmersive() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global scroll progress (0 to 1 over the full page)
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Warp factor: ramps UP 3-10% scroll, then back DOWN 10-18%
  const warpFactor = useTransform(scrollYProgress, [0.03, 0.08, 0.12, 0.18], [0, 1, 1, 0]);
  const [warp, setWarp] = useState(0);
  useEffect(() => {
    const unsub = warpFactor.on("change", (v) => setWarp(Math.min(1, Math.max(0, v))));
    return unsub;
  }, [warpFactor]);

  // Custom cursor glow
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll progress for progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  // Rocket launch: 0 at top, 1 at 15% scroll
  const rocketLaunch = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const [launch, setLaunch] = useState(0);
  useEffect(() => {
    const unsub = rocketLaunch.on("change", (v) => setLaunch(Math.min(1, Math.max(0, v))));
    return unsub;
  }, [rocketLaunch]);

  // Hero opacity: fades out as rocket launches
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Countdown state
  const [countdownDone, setCountdownDone] = useState(false);

  // Section refs for in-view detection
  const act2Ref = useRef(null);
  const act3Ref = useRef(null);
  const act4Ref = useRef(null);
  const act5Ref = useRef(null);

  const act2InView = useInView(act2Ref, { once: true, margin: "-200px" });
  const act3InView = useInView(act3Ref, { once: true, margin: "-200px" });
  const act4InView = useInView(act4Ref, { once: true, margin: "-150px" });
  const act5InView = useInView(act5Ref, { once: true, margin: "-150px" });

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* ═══ Custom cursor glow (desktop only) ═══ */}
      <div
        className="fixed pointer-events-none z-[100] hidden lg:block"
        style={{
          left: cursor.x - 150,
          top: cursor.y - 150,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)",
          transition: "left 0.1s ease-out, top 0.1s ease-out",
        }}
      />

      {/* ═══ Scroll progress bar (right side) ═══ */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="relative w-[3px] h-[200px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-rocket-teal to-emerald-400"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        {/* Act indicators */}
        <div className="absolute left-3 top-0 h-full flex flex-col justify-between text-[10px] text-white/30 font-mono">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
        </div>
      </div>

      {/* ═══ STARFIELD (fixed background) ═══ */}
      <StarField warpFactor={warp} />

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  ACT 1 — "L'ESPACE" (hero fullscreen)                         */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[200vh]">
        <motion.div
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ opacity: heroOpacity }}
        >
          {/* Countdown T-3, 2, 1 before title appears */}
          <LaunchCountdown onComplete={() => setCountdownDone(true)} />

          {/* Rocket */}
          <RocketSVG launchProgress={launch} className="mb-8" />

          {/* Title — appears after countdown */}
          <motion.div
            className="text-center px-4 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: countdownDone ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.05] tracking-tight">
              <TypewriterText
                text="Votre prochain recrutement"
                speed={40}
                className="text-white"
                delay={300}
              />
              <br />
              <TypewriterText
                text="décolle ici."
                speed={50}
                className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400"
                glowColor="rgba(20, 184, 166, 0.8)"
                delay={1800}
              />
            </h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-white/50 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              Cabinet RPO. Recruteur senior intégré en 1 semaine.
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <span className="text-xs text-white/30 uppercase tracking-widest">Scrollez pour explorer</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-white/30" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  ACT 2 — "LE PROBLÈME"                                        */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section ref={act2Ref} className="relative min-h-screen flex items-center justify-center py-20 md:py-32 bg-black/90">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={act2InView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-sm font-semibold text-red-400 mb-8">
              ⚠️ Le problème
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-16">
              Le recrutement traditionnel est{" "}
              <GlitchText className="text-red-400">cassé.</GlitchText>
            </h2>
          </motion.div>

          {/* Broken numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { value: 84, suffix: " jours", label: "Délai moyen d'un recrutement", color: "text-red-400" },
              { value: 200, suffix: "K€", label: "Coût d'un cabinet pour 10 postes", color: "text-red-400", prefix: "" },
              { value: 12, suffix: "h/sem", label: "Perdues par vos managers", color: "text-red-400" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="relative"
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                animate={act2InView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
              >
                <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm">
                  <div className={`text-5xl md:text-7xl font-bold ${stat.color} mb-3`}>
                    <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ""} />
                  </div>
                  <p className="text-sm md:text-base text-white/50">{stat.label}</p>
                </div>
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-red-500/30"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  ACT 3 — "LA SOLUTION" (the twist)                             */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section ref={act3Ref} className="relative min-h-screen flex items-center justify-center py-20 md:py-32 bg-black/90">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={act3InView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-rocket-teal/15 border border-rocket-teal/30 text-sm font-semibold text-rocket-teal-glow mb-8">
              ⚡ La solution
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              Un recruteur senior.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal to-emerald-400">
                Intégré. En 1 semaine.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-16">
              Pas un cabinet. Pas un chasseur de têtes. Un Talent Acquisition Specialist
              qui rejoint votre équipe, utilise vos outils, recrute à votre nom.
            </p>
          </motion.div>

          {/* Transformed numbers (teal) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-16">
            {[
              { old: "84 jours", value: 28, suffix: " jours", label: "Time-to-hire divisé par 3" },
              { old: "200K€", value: 44, suffix: "K€", label: "Budget recrutement divisé par 5" },
              { old: "12h/sem", value: 0, suffix: "h", label: "Temps manager libéré" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={act3InView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                className="p-8 rounded-2xl bg-rocket-teal/5 border border-rocket-teal/20 backdrop-blur-sm"
              >
                <div className="text-sm text-white/30 line-through mb-2">{stat.old}</div>
                <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-rocket-teal-glow to-emerald-400 mb-3">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Flip cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              icon={<Search className="w-10 h-10 text-rocket-teal-glow" />}
              title="Sourcing multicanal"
              back="LinkedIn, GitHub, jobboards, cooptation, vivier — votre TA source sur tous les canaux. Première shortlist en 48h."
              delay={0}
            />
            <FlipCard
              icon={<FileCheck className="w-10 h-10 text-rocket-teal-glow" />}
              title="Shortlist qualifiée"
              back="Chaque candidat évalué sur les compétences, la motivation et le culture fit. Zéro CV touriste."
              delay={200}
            />
            <FlipCard
              icon={<CheckCircle2 className="w-10 h-10 text-rocket-teal-glow" />}
              title="Recrutement signé"
              back="Du brief à la signature en 4 semaines. Votre TA gère tout : sourcing, entretiens, closing, onboarding."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  ACT 4 — "LA PREUVE" (social proof immersif)                   */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section ref={act4Ref} className="relative min-h-screen flex items-center justify-center py-20 md:py-32 bg-black/90">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={act4InView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-sm font-semibold text-amber-400 mb-8">
              🏆 La preuve
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
              Ils nous font{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                confiance.
              </span>
            </h2>
          </motion.div>

          {/* Orbit */}
          <OrbitLogos />

          {/* Floating badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              { label: "Top 1% des TA", color: "bg-rocket-teal/15 border-rocket-teal/30 text-rocket-teal-glow" },
              { label: "5x moins cher", color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" },
              { label: "4 sem. time-to-hire", color: "bg-blue-500/15 border-blue-500/30 text-blue-400" },
              { label: "50+ entreprises", color: "bg-violet-500/15 border-violet-500/30 text-violet-400" },
            ].map((badge, i) => (
              <motion.span
                key={badge.label}
                className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${badge.color}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={act4InView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 200 }}
              >
                {badge.label}
              </motion.span>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div
            className="mt-16 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={act4InView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <blockquote className="text-lg md:text-xl text-white/70 italic leading-relaxed">
              <TypewriterText
                text="&laquo; On a remplacé notre cabinet par Rocket4RPO. Résultat : 3x plus de candidats qualifiés, 2x plus vite, pour un tiers du prix. &raquo;"
                speed={25}
                delay={2000}
                glowColor="rgba(255, 255, 255, 0.2)"
              />
            </blockquote>
            <p className="mt-4 text-sm text-white/40">— VP People, Scale-up SaaS (120 collaborateurs)</p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/*  ACT 5 — "LE DÉCOLLAGE" (CTA final)                           */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section ref={act5Ref} className="relative min-h-screen flex items-center justify-center py-24 bg-black/80">
        <div className="relative z-10 text-center px-6">
          {/* Decorative rings */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={act5InView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="w-[600px] h-[600px] rounded-full border border-rocket-teal/5 animate-spin" style={{ animationDuration: "60s" }} />
            <div className="absolute w-[400px] h-[400px] rounded-full border border-rocket-teal/10 animate-spin" style={{ animationDuration: "40s", animationDirection: "reverse" }} />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-rocket-teal/15 animate-spin" style={{ animationDuration: "20s" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={act5InView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-14 h-14 text-rocket-teal-glow mx-auto mb-8" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-8">
              Prêt à{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                décoller ?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-white/50 max-w-xl mx-auto mb-14">
              30 minutes pour comprendre votre besoin et vous proposer le TA idéal. Sans engagement.
            </p>
          </motion.div>

          {/* Magnetic CTA button with glow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={act5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative inline-block"
          >
            {/* Glow ring */}
            <motion.div
              className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-rocket-teal/40 to-emerald-500/40 blur-2xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <MagneticButton
              href="/rdv"
              onClick={() => { trackHeroCTAClick("Réserver mon diagnostic gratuit", "/rdv"); trackCTAClick("Réserver mon diagnostic gratuit", "/rdv"); }}
              className="relative inline-flex items-center gap-3 px-12 py-6 text-xl font-bold rounded-2xl bg-gradient-to-r from-rocket-teal to-emerald-500 text-white hover:from-rocket-teal-glow hover:to-emerald-400 active:scale-95 transition-all duration-300 shadow-2xl shadow-rocket-teal/40"
              strength={0.25}
            >
              Réserver mon diagnostic gratuit
              <ArrowRight className="w-6 h-6" />
            </MagneticButton>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-white/30"
            initial={{ opacity: 0 }}
            animate={act5InView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            Gratuit · 30 min · Sans engagement · Réponse sous 24h
          </motion.p>
        </div>
      </section>
    </div>
  );
}
