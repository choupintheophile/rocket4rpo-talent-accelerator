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
import { SmoothScroll } from "@/components/homepage/SmoothScroll";
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-screen flex items-center justify-center py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
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
      {/* ═══ Smooth scroll ═══ */}
      <SmoothScroll />

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

      {/* ═══ Progress bar ═══ */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
        <div className="relative w-[2px] h-[180px] bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-rocket-teal to-emerald-400"
            style={{ height: `${progress * 100}%` }}
          />
          {/* Glow dot at progress tip */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rocket-teal-glow shadow-[0_0_10px_rgba(20,184,166,0.8)]"
            style={{ top: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* ═══ Starfield ═══ */}
      <StarField warpFactor={warp} />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  ACTE 1 — OUVERTURE                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[180vh]">
        <motion.div
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ opacity: heroOpacity }}
        >
          <LaunchCountdown onComplete={() => setCountdownDone(true)} />
          <RocketSVG launchProgress={launch} className="mb-6" />

          <motion.div
            className="text-center px-6 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: countdownDone ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-bold font-display leading-[1.02] tracking-tight">
              <TextReveal
                text="Vos meilleurs recrutements"
                className="text-white"
                delay={0}
              />
              <br />
              <TextReveal
                text="commencent ici."
                className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400"
                delay={0.8}
              />
            </h1>

            <motion.p
              className="mt-8 text-lg md:text-xl text-white/40 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={countdownDone ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.5, duration: 1 }}
            >
              Un recruteur d&apos;élite rejoint votre équipe en 7 jours.
              <br className="hidden md:block" />
              Pas un cabinet. Pas un chasseur. Votre TA.
            </motion.p>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-16 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={countdownDone ? { opacity: 1 } : {}}
            transition={{ delay: 3.5, duration: 1 }}
          >
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 rounded-full bg-white/40"
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Marquee separator ═══ */}
      <MarqueeLogos />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  ACTE 2 — LE CONSTAT                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-black/90">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold tracking-wider uppercase text-red-400/80 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Le constat
          </motion.span>

          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold font-display text-white mb-6 leading-[1.08]">
            <TextReveal text="Chaque poste ouvert vous coûte" className="text-white" />
            <br />
            <TextReveal text="1 500€ par semaine." className="text-red-400" delay={0.5} />
          </h2>

          <motion.p
            className="text-base md:text-lg text-white/35 max-w-2xl mx-auto mb-20 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            Salaire non-productif, surcharge managers, opportunités business manquées.
            Le recrutement classique est <GlitchText className="text-red-400/80">lent, cher, incertain.</GlitchText>
          </motion.p>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { value: 84, suffix: "j", label: "Délai moyen d'embauche en France", icon: Clock },
              { value: 15, suffix: "%", label: "Des recrutements échouent dans les 12 mois", icon: Shield },
              { value: 200, suffix: "K€", label: "Coût d'un cabinet pour 10 postes", icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard className="p-8 md:p-10">
                  <stat.icon className="w-6 h-6 text-red-400/60 mb-6" />
                  <div className="text-5xl md:text-6xl font-bold text-red-400 mb-3 tabular-nums">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">{stat.label}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  ACTE 3 — LA RÉPONSE                                             */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-black/90">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-rocket-teal/10 border border-rocket-teal/20 text-xs font-semibold tracking-wider uppercase text-rocket-teal-glow/80 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            La réponse
          </motion.span>

          <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold font-display text-white mb-6 leading-[1.08]">
            <TextReveal text="Un TA senior. Dans vos murs." className="text-white" />
            <br />
            <TextReveal text="En 7 jours." className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal to-emerald-400" delay={0.5} />
          </h2>

          <motion.p
            className="text-base md:text-lg text-white/35 max-w-2xl mx-auto mb-20 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Il utilise votre Slack, votre ATS, votre marque employeur.
            Vos candidats ne savent même pas qu&apos;il est externe.
          </motion.p>

          {/* Transformed stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
            {[
              { old: "84 jours", value: 28, suffix: "j", label: "Time-to-hire moyen" },
              { old: "200K€", value: 44, suffix: "K€", label: "Pour 10 recrutements" },
              { old: "15% d'échec", value: 94, suffix: "%", label: "Taux de rétention à 12 mois" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlowCard className="p-8 md:p-10">
                  <div className="text-xs text-white/20 line-through mb-3 tracking-wide">{stat.old}</div>
                  <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-rocket-teal-glow to-emerald-400 mb-3 tabular-nums">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">{stat.label}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* Process cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Sourcing", desc: "LinkedIn, GitHub, vivier privé, cooptation. Première shortlist en 48h. Sourcing multicanal intensif." },
              { icon: FileCheck, title: "Évaluation", desc: "Scorecard structurée. Compétences, motivation, culture fit. Zéro CV touriste, zéro compromis." },
              { icon: CheckCircle2, title: "Closing", desc: "Négociation, onboarding, suivi d'intégration. Du brief à la signature, votre TA gère tout." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
              >
                <GlowCard className="p-8 text-left h-full">
                  <card.icon className="w-8 h-8 text-rocket-teal-glow/70 mb-5" />
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  ACTE 4 — LA PREUVE                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-black/90">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase text-amber-400/80 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              La preuve
            </motion.span>

            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold font-display text-white leading-[1.08]">
              <TextReveal text="200+ recrutements signés." className="text-white" />
              <br />
              <TextReveal text="50+ entreprises convaincues." className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400" delay={0.5} />
            </h2>
          </div>

          <OrbitLogos />

          {/* Proof badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-14">
            {[
              { label: "Top 1% des TA évalués", color: "border-rocket-teal/20 text-rocket-teal-glow/70" },
              { label: "Opérationnel en 7 jours", color: "border-emerald-500/20 text-emerald-400/70" },
              { label: "5x moins cher qu'un cabinet", color: "border-blue-500/20 text-blue-400/70" },
              { label: "Remplacement sous 7 jours", color: "border-violet-500/20 text-violet-400/70" },
            ].map((badge, i) => (
              <motion.span
                key={badge.label}
                className={`inline-flex items-center px-4 py-2 rounded-full border bg-white/[0.02] text-xs font-medium ${badge.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
              >
                {badge.label}
              </motion.span>
            ))}
          </div>

          {/* Testimonial */}
          <motion.blockquote
            className="mt-20 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-lg md:text-xl text-white/50 italic leading-relaxed">
              &laquo; On a remplacé notre cabinet par Rocket4RPO.
              3x plus de candidats qualifiés, 2x plus vite, pour un tiers du prix.
              Le choix le plus évident de l&apos;année. &raquo;
            </p>
            <footer className="mt-6 text-sm text-white/25">
              — VP People · Scale-up SaaS · 120 collaborateurs
            </footer>
          </motion.blockquote>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/*  ACTE 5 — LE DÉCOLLAGE                                           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <Section className="bg-black/80 min-h-screen">
        <div className="relative z-10 text-center px-6">
          {/* Concentric rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[700px] h-[700px] rounded-full border border-rocket-teal/10 animate-spin" style={{ animationDuration: "80s" }} />
            <div className="absolute w-[500px] h-[500px] rounded-full border border-rocket-teal/15 animate-spin" style={{ animationDuration: "50s", animationDirection: "reverse" }} />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-rocket-teal/20 animate-spin" style={{ animationDuration: "30s" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Sparkles className="w-12 h-12 text-rocket-teal-glow/60 mx-auto mb-10" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.02]">
              <TextReveal text="Prêt à" className="text-white" />
              {" "}
              <TextReveal text="décoller ?" className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400" delay={0.3} />
            </h2>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-white/35 max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              30 minutes. Votre besoin compris. Votre TA idéal identifié.
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative inline-block mt-14"
          >
            <motion.div
              className="absolute -inset-5 rounded-2xl bg-gradient-to-r from-rocket-teal/30 to-emerald-500/30 blur-2xl"
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />

            <MagneticButton
              href="/rdv"
              onClick={() => { trackHeroCTAClick("Réserver mon diagnostic", "/rdv"); trackCTAClick("Réserver mon diagnostic", "/rdv"); }}
              className="relative inline-flex items-center gap-3 px-14 py-7 text-xl font-bold rounded-2xl bg-gradient-to-r from-rocket-teal to-emerald-500 text-white active:scale-95 transition-all duration-300 shadow-2xl shadow-rocket-teal/30"
              strength={0.2}
            >
              Réserver mon diagnostic
              <ArrowRight className="w-6 h-6" />
            </MagneticButton>
          </motion.div>

          <motion.p
            className="mt-8 text-sm text-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            Gratuit · Sans engagement · Réponse sous 24h
          </motion.p>
        </div>
      </Section>
    </div>
  );
}
