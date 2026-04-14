"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Users,
  Clock,
  ShieldCheck,
  Star,
  TrendingUp,
  CheckCircle2,
  Building2,
  ArrowDown,
} from "lucide-react";
import type { HeroContent } from "@/lib/personalization";

/* ─── defaults ─── */
const defaultContent: HeroContent = {
  badge: "RPO - Recrutement externalisé sur-mesure",
  headline: "Vos recrutements vous coûtent une ",
  highlightedText: "fortune ?",
  subtitle:
    "Un recruteur senior du top 1% intégré à votre équipe en 1 semaine. Résultats dès la 2e semaine. 5x moins cher qu’un cabinet.",
};

/* ─── trust-bar data ─── */
const trustStats = [
  { icon: Users, value: "200+", label: "recrutements réalisés" },
  { icon: Clock, value: "1 sem.", label: "pour démarrer" },
  { icon: ShieldCheck, value: "4 sem.", label: "time-to-hire moyen" },
  { icon: Building2, value: "50+", label: "entreprises" },
];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1], delay: i * 0.05 },
  }),
};

const slideRight = {
  hidden: { opacity: 0.3, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 },
  },
};

const fadeIn = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.2 },
  },
};

/* ─── floating orb component ─── */
function FloatingOrb({
  size,
  color,
  top,
  left,
  delay = 0,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        top,
        left,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.3, 0.15],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─── glassmorphic proof card (right side) ─── */
function ProofCard() {
  return (
    <motion.div
      variants={slideRight}
      initial="hidden"
      animate="visible"
      className="relative w-[360px] xl:w-[400px]"
    >
      {/* Main glassmorphic card */}
      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-7 shadow-2xl shadow-black/40">
        {/* Cost comparison */}
        <div className="mb-5">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-3">
            Coût pour 10 recrutements
          </p>

          {/* Cabinet price - crossed out */}
          <div className="flex items-center justify-between mb-2 p-3 rounded-xl bg-red-500/[0.08] border border-red-500/[0.12]">
            <span className="text-sm text-white/60">Cabinet classique</span>
            <span className="text-xl font-bold text-red-400 line-through decoration-2">
              180 000 €
            </span>
          </div>

          {/* Rocket4RPO price - highlighted */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/[0.12] border border-emerald-500/[0.2]">
            <span className="text-sm font-semibold text-white/90">RPO Rocket4RPO</span>
            <span className="text-xl font-bold text-emerald-400">
              jusqu'à −75%
            </span>
          </div>
        </div>

        {/* Time-to-hire comparison */}
        <div className="mb-5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-2">
            Time-to-hire
          </p>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-red-400 line-through">84j</span>
            <ArrowDown className="w-4 h-4 text-emerald-400 rotate-[-90deg]" />
            <span className="text-2xl font-bold text-emerald-400">4 sem.</span>
            <span className="text-xs font-semibold text-emerald-400/80 bg-emerald-500/[0.12] px-2 py-0.5 rounded-full ml-auto">
              -58%
            </span>
          </div>
        </div>

        {/* Mini testimonial */}
        <div className="pt-4 border-t border-white/[0.06]">
          <div className="flex gap-0.5 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-[13px] text-white/75 leading-relaxed italic mb-3">
            &laquo; En 3 semaines, 8 candidats qualifiés présentés. On a recruté notre Head of Sales en 28 jours. &raquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              SL
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">Sarah L.</p>
              <p className="text-[10px] text-white/35">VP People, Scale-up SaaS B2B</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — Top 1% */}
      <motion.div
        className="absolute -top-4 -right-4 px-4 py-2 rounded-xl border border-amber-400/20 bg-gradient-to-r from-amber-500/20 to-orange-500/15 backdrop-blur-xl shadow-lg shadow-black/30"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-white">Top 1% des TA de France</span>
        </div>
      </motion.div>

      {/* Floating badge — savings */}
      <motion.div
        className="absolute -bottom-4 -left-6 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl shadow-lg shadow-black/30"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">5x moins cher qu{"'"}un cabinet</span>
        </div>
      </motion.div>

      {/* Floating badge — retention */}
      <motion.div
        className="absolute top-1/2 -left-5 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-gradient-to-r from-teal-500/15 to-cyan-500/15 backdrop-blur-xl shadow-lg shadow-black/30"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-white/90">4 sem. time-to-hire</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── HERO SECTION ─── */
export const HeroSection = ({ content }: { content?: HeroContent }) => {
  const hero = content || defaultContent;

  const headlineWords = hero.headline.trim().split(/\s+/);

  return (
    <section className="relative overflow-hidden bg-[hsl(220,20%,8%)] text-white min-h-[90vh] flex flex-col justify-center">
      {/* ── Multi-layer gradient background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,20%,8%)] via-[hsl(220,18%,12%)] to-[hsl(220,20%,8%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_20%_40%,hsl(160_84%_32%/0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_20%,hsl(200_90%_40%/0.05),transparent)]" />

      {/* ── Grid pattern overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(160 84% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(160 84% 50% / 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating orbs ── */}
      <FloatingOrb
        size={400}
        color="hsl(160 84% 32% / 0.12)"
        top="10%"
        left="60%"
        delay={0}
      />
      <FloatingOrb
        size={300}
        color="hsl(200 90% 40% / 0.08)"
        top="60%"
        left="10%"
        delay={2}
      />
      <FloatingOrb
        size={250}
        color="hsl(160 84% 50% / 0.06)"
        top="30%"
        left="90%"
        delay={4}
      />
      <FloatingOrb
        size={200}
        color="hsl(220 60% 50% / 0.06)"
        top="70%"
        left="70%"
        delay={1}
      />

      {/* ── Decorative geometric elements (right side) ── */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block">
        <div className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-[20%] right-[-2%] w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
        <div className="absolute top-[10%] right-[20%] w-px h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-[50%] right-[10%] w-px h-24 bg-gradient-to-b from-transparent via-[hsl(160,84%,50%,0.1)] to-transparent" />
        <div className="absolute top-[25%] right-[30%] w-1.5 h-1.5 rounded-full bg-[hsl(160,84%,50%,0.3)]" />
        <div className="absolute top-[45%] right-[15%] w-1 h-1 rounded-full bg-white/20" />
        <div className="absolute top-[65%] right-[25%] w-1 h-1 rounded-full bg-[hsl(160,84%,50%,0.2)]" />
      </div>

      {/* ── Main content ── */}
      <div className="container-wide relative z-10 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
          {/* ── LEFT: Text content ── */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-[hsl(160_84%_32%/0.12)] text-[hsl(160,84%,50%)] border border-[hsl(160_84%_32%/0.2)] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(160,84%,50%)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(160,84%,50%)]" />
                </span>
                {hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.08] tracking-tight">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i * 0.12 + 0.3}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block bg-gradient-to-r from-[hsl(160,84%,50%)] via-[hsl(150,70%,55%)] to-[hsl(140,90%,45%)] bg-clip-text text-transparent"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={headlineWords.length * 0.12 + 0.3}
              >
                {hero.highlightedText}
              </motion.span>
            </h1>

            {/* Subtitle */}
            <motion.p
              className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              {hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <a
                href="/rdv"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl bg-white text-[hsl(220,20%,10%)] hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Réserver un diagnostic gratuit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/calculateur"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-white/15 text-white hover:bg-white/[0.06] hover:border-white/25 transition-all duration-200"
              >
                <Calculator className="w-4 h-4" />
                Calculer mes économies
              </a>
            </motion.div>

            {/* Quick reassurance under CTAs */}
            <motion.p
              className="mt-4 text-xs text-white/35"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              Gratuit · 30 min · Sans engagement · Réponse sous 24h
            </motion.p>
          </div>

          {/* ── RIGHT: Proof card (desktop only) ── */}
          <div className="hidden lg:block">
            <ProofCard />
          </div>
        </div>
      </div>

      {/* ── Bottom trust bar ── */}
      <motion.div
        className="relative z-10 border-t border-white/[0.06]"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="container-wide py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustStats.map((stat) => (
              <div key={stat.value} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[hsl(160,84%,50%)]" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white">
                    {stat.value}
                  </span>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
