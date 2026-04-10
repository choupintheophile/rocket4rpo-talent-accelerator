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
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import type { HeroContent } from "@/lib/personalization";

/* ─── defaults ─── */
const defaultContent: HeroContent = {
  badge: "RPO — Recrutement externalisé sur-mesure",
  headline: "Vos recrutements freinent votre ",
  highlightedText: "croissance\u00a0?",
  subtitle:
    "Première shortlist qualifiée en 48h. 92\u00a0% de rétention à 12 mois. ~44\u00a0000\u00a0€ pour 10 recrutements.",
};

/* ─── trust-bar data ─── */
const trustStats = [
  { icon: Users, value: "200+", label: "recrutements réalisés" },
  { icon: Clock, value: "48h", label: "pour démarrer" },
  { icon: ShieldCheck, value: "92%", label: "rétention à 12 mois" },
  { icon: Star, value: "Top 1%", label: "des Talent Acquisition" },
];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: i * 0.1 },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5 },
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

/* ─── mini bar chart ─── */
function MiniBarChart() {
  const bars = [
    { height: "60%", delay: 0.5 },
    { height: "85%", delay: 0.6 },
    { height: "45%", delay: 0.7 },
    { height: "95%", delay: 0.8 },
    { height: "70%", delay: 0.9 },
  ];

  return (
    <div className="flex items-end gap-1.5 h-12">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-sm"
          style={{
            background:
              "linear-gradient(to top, hsl(160 84% 32%), hsl(160 84% 50%))",
          }}
          initial={{ height: 0 }}
          animate={{ height: bar.height }}
          transition={{
            duration: 0.5,
            delay: bar.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── dashboard card ─── */
function DashboardCard() {
  return (
    <motion.div
      variants={slideRight}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Main card */}
      <div className="relative w-[340px] xl:w-[380px] rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 shadow-2xl shadow-black/40">
        {/* Card header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[hsl(160_84%_32%/0.2)] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[hsl(160,84%,50%)]" />
            </div>
            <span className="text-sm font-medium text-white/90">
              Dashboard RPO
            </span>
          </div>
          <span className="text-[11px] text-white/40">Temps réel</span>
        </div>

        {/* Stat row 1 */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <span className="text-[13px] text-white/60">
            Recrutements ce mois
          </span>
          <span className="text-xl font-bold text-white tabular-nums">12</span>
        </div>

        {/* Chart area */}
        <div className="py-4 border-b border-white/[0.06]">
          <span className="text-[11px] text-white/40 uppercase tracking-wider mb-2 block">
            Performance hebdomadaire
          </span>
          <MiniBarChart />
        </div>

        {/* Stat row 2 */}
        <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
          <span className="text-[13px] text-white/60">Time-to-hire</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white tabular-nums">
              28 jours
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
              -34%
            </span>
          </div>
        </div>

        {/* Stat row 3 */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-[13px] text-white/60">
            Candidats présentés
          </span>
          <span className="text-lg font-semibold text-white tabular-nums">
            47
          </span>
        </div>
      </div>

      {/* Floating badge — offset */}
      <motion.div
        className="absolute -bottom-4 -left-6 px-4 py-2.5 rounded-xl border border-white/[0.1] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl shadow-lg shadow-black/30"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">
            92% rétention
          </span>
        </div>
      </motion.div>

      {/* Floating accent — top right */}
      <motion.div
        className="absolute -top-3 -right-3 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-xl shadow-lg shadow-black/30"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-xs font-medium text-white/90">+24%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── HERO SECTION ─── */
export const HeroSection = ({ content }: { content?: HeroContent }) => {
  const hero = content || defaultContent;

  // Split headline into words for stagger animation
  const headlineWords = hero.headline.trim().split(/\s+/);

  return (
    <section className="relative overflow-hidden bg-[hsl(220,20%,8%)] text-white min-h-[90vh] flex flex-col justify-center">
      {/* ── Multi-layer gradient background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,20%,8%)] via-[hsl(220,18%,12%)] to-[hsl(220,20%,8%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,hsl(160_84%_32%/0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,hsl(200_80%_40%/0.05),transparent)]" />

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
        color="hsl(200 80% 40% / 0.08)"
        top="60%"
        left="10%"
        delay={2}
      />
      <FloatingOrb
        size={250}
        color="hsl(160 84% 50% / 0.06)"
        top="30%"
        left="80%"
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
        {/* Large circle */}
        <div className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-[20%] right-[-2%] w-[400px] h-[400px] rounded-full border border-white/[0.04]" />
        {/* Decorative lines */}
        <div className="absolute top-[10%] right-[20%] w-px h-32 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-[50%] right-[10%] w-px h-24 bg-gradient-to-b from-transparent via-[hsl(160,84%,50%,0.1)] to-transparent" />
        {/* Small dot accents */}
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

            {/* Headline — stagger word by word */}
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.08] tracking-tight">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={i * 0.5 + 1}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block bg-gradient-to-r from-[hsl(160,84%,50%)] via-[hsl(150,70%,55%)] to-[hsl(140,80%,45%)] bg-clip-text text-transparent"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={headlineWords.length * 0.5 + 1}
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
                href="https://meetings.hubspot.com/theophile-choupin/rpo"
                target="_blank"
                rel="noopener noreferrer"
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
          </div>

          {/* ── RIGHT: Dashboard card (desktop only) ── */}
          <div className="hidden lg:block">
            <DashboardCard />
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
          {/* Stats row */}
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

          {/* Reassurance line */}
          <p className="mt-5 text-[13px] text-white/35 text-center md:text-left">
            Gratuit · 30 min · Sans engagement · Réponse sous 24h
          </p>
        </div>
      </motion.div>
    </section>
  );
};
