"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Play,
  Calculator,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  Zap,
  CheckCircle2,
  BarChart3,
  Users,
  Shield,
  Quote,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

/* ------------------------------------------------------------------ */
/*  Floating particles background (pure CSS + framer-motion, no deps) */
/* ------------------------------------------------------------------ */
function FloatingParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.25 + 0.05,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-rocket-teal-glow"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tool data                                                          */
/* ------------------------------------------------------------------ */
const tools = [
  {
    title: "Calculateur ROI",
    subtitle: "Mesurez vos économies",
    description:
      "Comparez le coût réel du RPO vs cabinet vs recrutement interne. Ajustez vos paramètres, voyez l’impact instantanément.",
    icon: Calculator,
    href: "/calculateur",
    cta: "Calculer mon ROI",
    ctaArrow: true,
    badge: "30 sec",
    badgeExtra: "Gratuit",
    // Teal accent
    gradient: "from-teal-400 to-emerald-600",
    glowColor: "rgba(20,184,166,0.35)",
    accentBorder: "border-teal-500/20",
    accentBorderHover: "hover:border-teal-400/60",
    accentText: "text-teal-400",
    accentBg: "bg-teal-500/10",
    ctaBg: "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500",
    number: "01",
    benefits: ["Chiffres personnalisés", "Comparaison 3 modèles", "Résultat immédiat"],
  },
  {
    title: "Diagnostic recrutement",
    subtitle: "Évaluez votre maturité",
    description:
      "7 questions stratégiques pour scorer votre process recrutement. Obtenez un diagnostic personnalisé avec vos 3 axes de progression prioritaires.",
    icon: ClipboardCheck,
    href: "/assessment",
    cta: "Lancer le diagnostic",
    ctaArrow: true,
    badge: "2 min",
    badgeExtra: "Gratuit",
    // Blue accent
    gradient: "from-blue-400 to-indigo-600",
    glowColor: "rgba(59,130,246,0.35)",
    accentBorder: "border-blue-500/20",
    accentBorderHover: "hover:border-blue-400/60",
    accentText: "text-blue-400",
    accentBg: "bg-blue-500/10",
    ctaBg: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500",
    number: "02",
    benefits: ["Score sur 21 points", "Top 3 faiblesses", "Plan d'action clair"],
  },
  {
    title: "Démo interactive",
    subtitle: "Vivez le process RPO",
    description:
      "Découvrez en 4 étapes interactives comment nos TA Specialists identifient, qualifient et présentent vos candidats.",
    icon: Play,
    href: "/demo",
    cta: "Démarrer la démo",
    ctaArrow: true,
    badge: "2 min",
    badgeExtra: "Immersif",
    // Violet accent
    gradient: "from-violet-400 to-purple-600",
    glowColor: "rgba(139,92,246,0.35)",
    accentBorder: "border-violet-500/20",
    accentBorderHover: "hover:border-violet-400/60",
    accentText: "text-violet-400",
    accentBg: "bg-violet-500/10",
    ctaBg:
      "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500",
    number: "03",
    benefits: ["Processus transparent", "Résultats en temps réel", "0 engagement"],
  },
];

/* ------------------------------------------------------------------ */
/*  Tool Card                                                          */
/* ------------------------------------------------------------------ */
function ToolCard({ tool, index }: { tool: (typeof tools)[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <Link
        href={tool.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col h-full rounded-2xl border ${tool.accentBorder} ${tool.accentBorderHover} bg-[#0d1117] overflow-hidden transition-all duration-500 hover:-translate-y-2`}
        style={{
          boxShadow: isHovered
            ? `0 20px 60px -15px ${tool.glowColor}, 0 0 0 1px ${tool.glowColor}`
            : "0 4px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Gradient glow background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} transition-opacity duration-700 ${isHovered ? "opacity-[0.06]" : "opacity-0"}`}
        />

        {/* Card content */}
        <div className="relative p-7 flex flex-col h-full">
          {/* Number watermark */}
          <span className="absolute top-4 right-5 text-6xl font-black text-white/[0.03] font-mono select-none">
            {tool.number}
          </span>

          {/* Icon with glow */}
          <div className="mb-5 relative">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110`}
              style={{
                boxShadow: isHovered
                  ? `0 8px 32px ${tool.glowColor}`
                  : `0 4px 16px rgba(0,0,0,0.3)`,
              }}
            >
              <tool.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Subtitle */}
          <div
            className={`text-[10px] font-bold uppercase tracking-[0.15em] ${tool.accentText} mb-1`}
          >
            {tool.subtitle}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-white mb-3 leading-snug">{tool.title}</h2>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-5">{tool.description}</p>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full ${tool.accentBg} ${tool.accentText}`}
            >
              <Clock className="w-3 h-3" />
              {tool.badge}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full ${tool.accentBg} ${tool.accentText}`}
            >
              <Zap className="w-3 h-3" />
              {tool.badgeExtra}
            </span>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-6">
            {tool.benefits.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle2 className={`w-3.5 h-3.5 ${tool.accentText} shrink-0`} />
                <span className="text-xs text-white/45">{b}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-auto pt-5 border-t border-white/[0.06]">
            <span
              className={`inline-flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-white ${tool.ctaBg} transition-all duration-300 group-hover:shadow-lg`}
              style={{
                boxShadow: isHovered ? `0 8px 24px ${tool.glowColor}` : "none",
              }}
            >
              {tool.cta}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Benefits data                                                      */
/* ------------------------------------------------------------------ */
const benefits = [
  {
    icon: Shield,
    title: "100% gratuit, sans inscription",
    desc: "Aucune carte bancaire, aucun compte à créer. Lancez un simulateur en un clic.",
  },
  {
    icon: Zap,
    title: "Résultats personnalisés en temps réel",
    desc: "Chaque réponse adapte les calculs et recommandations à votre situation précise.",
  },
  {
    icon: BarChart3,
    title: "Basé sur 200+ recrutements réalisés",
    desc: "Nos benchmarks viennent de données terrain, pas de moyennes sectorielles génériques.",
  },
  {
    icon: Target,
    title: "Recommandations actionnables",
    desc: "Pas de théorie : des actions concrètes à mettre en place dès demain.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials data                                                  */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    quote:
      "Le calculateur m’a permis de convaincre mon COMEX en 10 minutes. Les chiffres parlent d’eux-mêmes.",
    author: "Marie L.",
    role: "DRH, Scale-up SaaS (120 salariés)",
  },
  {
    quote:
      "Le diagnostic a révélé que notre point faible était le sourcing, pas le process. On a réorienté toute notre stratégie.",
    author: "Thomas D.",
    role: "Head of Talent Acquisition, E-commerce",
  },
  {
    quote:
      "La démo interactive nous a rassurés sur la transparence du modèle RPO. On a signé dans la foulée.",
    author: "Sophie M.",
    role: "COO, Startup Fintech (45 salariés)",
  },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function OutilsClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" });
  const proofRef = useRef(null);
  const proofInView = useInView(proofRef, { once: true, margin: "-80px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "Nos simulateurs" }]} />

      {/* ============================================================ */}
      {/*  HERO — split layout with photo                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[8%] w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[120px]" />
          <div className="absolute bottom-0 right-[15%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <FloatingParticles />

        <div className="relative container-wide py-12 md:py-16 lg:py-20">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 1, y: 0 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
              <Sparkles className="w-4 h-4 text-rocket-teal-glow" />
              100% gratuit · Sans inscription · Résultats instantanés
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-white">
              Prenez les bonnes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                décisions
              </span>{" "}
              en 2 minutes
            </h1>

            <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-xl mx-auto">
              3 simulateurs conçus pour les décideurs. Calculez, diagnostiquez, visualisez — puis
              décidez en connaissance de cause.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL CARDS — spectacular, dark bg                           */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-rocket-dark via-[#0a0f18] to-[#0d1117]">
        <div className="container-wide">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rocket-teal-glow px-3 py-1 rounded-full bg-rocket-teal/10 border border-rocket-teal/20 mb-4">
              <Zap className="w-3 h-3" />
              Choisissez votre simulateur
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">
              Une question ? Un outil pour y répondre.
            </h2>
            <p className="mt-4 text-white/40 max-w-2xl mx-auto text-base">
              Chaque simulateur est conçu pour vous aider à prendre une décision éclairée sur votre
              stratégie de recrutement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {tools.map((tool, i) => (
              <ToolCard key={tool.title} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  POURQUOI UTILISER NOS OUTILS ?                              */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20 bg-[#0d1117]">
        <div className="container-wide">
          <motion.div
            ref={benefitsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Pourquoi utiliser nos outils ?
            </h2>
            <p className="mt-3 text-white/40 max-w-xl mx-auto">
              Des outils concrets, basés sur notre expérience terrain.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-rocket-teal/10 flex items-center justify-center mb-4 group-hover:bg-rocket-teal/20 transition-colors">
                  <b.icon className="w-5 h-5 text-rocket-teal-glow" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{b.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF                                                */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#0d1117] to-rocket-dark">
        <div className="container-wide">
          <motion.div
            ref={proofRef}
            initial={{ opacity: 0, y: 20 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium text-white/50 mb-4">
              <Users className="w-4 h-4 text-rocket-teal-glow/60" />
              Utilisé par 50+ entreprises pour optimiser leur recrutement
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ce qu'en disent nos utilisateurs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-300"
              >
                <Quote className="w-8 h-8 text-rocket-teal-glow/15 mb-3" />
                <p className="text-sm text-white/60 leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rocket-teal/30 to-emerald-500/30 flex items-center justify-center text-xs font-bold text-white/70">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/80">{t.author}</div>
                    <div className="text-[11px] text-white/35">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <CTASection
        title="Besoin d'un accompagnement sur mesure ?"
        subtitle="Discutez avec un expert Talent Acquisition senior. Il analysera vos besoins et vous proposera le meilleur modèle — RPO, CDD/CDI ou mission ponctuelle."
        ctaLabel="Réserver un diagnostic gratuit"
      />
    </>
  );
}
