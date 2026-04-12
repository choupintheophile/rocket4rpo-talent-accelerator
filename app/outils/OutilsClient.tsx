"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Play,
  Calculator,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
  Zap,
  CheckCircle2,
  BarChart3,
  Users,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

const tools = [
  {
    title: "Démo interactive",
    subtitle: "Vivez le process RPO",
    description:
      "Découvrez en 4 étapes interactives comment nos TA Specialists identifient, qualifient et présentent vos candidats — comme si vous y étiez.",
    icon: Play,
    href: "/demo",
    cta: "Lancer la démo",
    badge: "2 min",
    gradient: "from-emerald-500 to-teal-600",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200/60",
    accentGlow: "hover:shadow-emerald-500/10",
    number: "01",
    preview: {
      lines: [
        { label: "Brief posté", pct: 100 },
        { label: "Candidats sourcés", pct: 85 },
        { label: "Shortlist envoyée", pct: 60 },
        { label: "Entretien planifié", pct: 40 },
      ],
    },
    benefits: ["Processus transparent", "Résultats en temps réel", "0 engagement"],
  },
  {
    title: "Calculateur ROI",
    subtitle: "Mesurez vos économies",
    description:
      "Comparez le coût réel du RPO vs cabinet vs recrutement interne. Ajustez vos paramètres, voyez l'impact instantanément.",
    icon: Calculator,
    href: "/calculateur",
    cta: "Calculer mon ROI",
    badge: "30 sec",
    gradient: "from-blue-500 to-indigo-600",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200/60",
    accentGlow: "hover:shadow-blue-500/10",
    number: "02",
    preview: {
      lines: [
        { label: "Cabinet", pct: 100 },
        { label: "Interne", pct: 70 },
        { label: "RPO Rocket", pct: 35 },
      ],
    },
    benefits: ["Chiffres personnalisés", "Comparaison 3 modèles", "Export possible"],
  },
  {
    title: "Diagnostic recrutement",
    subtitle: "Évaluez votre maturité",
    description:
      "7 questions stratégiques pour scorer votre process recrutement. Obtenez un diagnostic personnalisé avec vos 3 axes de progression prioritaires.",
    icon: ClipboardCheck,
    href: "/assessment",
    cta: "Faire le diagnostic",
    badge: "2 min",
    gradient: "from-violet-500 to-purple-600",
    accentBg: "bg-violet-500/10",
    accentText: "text-violet-700",
    accentBorder: "border-violet-200/60",
    accentGlow: "hover:shadow-violet-500/10",
    number: "03",
    preview: {
      lines: [
        { label: "Sourcing", pct: 90 },
        { label: "Process", pct: 55 },
        { label: "Outils", pct: 75 },
        { label: "KPIs", pct: 40 },
      ],
    },
    benefits: ["Score sur 21 points", "Top 3 faiblesses", "Plan d'action clair"],
  },
];

function ToolPreview({ tool, isHovered }: { tool: (typeof tools)[number]; isHovered: boolean }) {
  return (
    <div className="relative rounded-xl bg-gray-900/5 p-4 mb-5 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-[0.03]`} />
      <div className="relative space-y-2.5">
        {tool.preview.lines.map((line, i) => (
          <div key={line.label} className="flex items-center gap-3">
            <span className="text-[10px] text-gray-400 w-24 shrink-0 truncate">{line.label}</span>
            <div className="flex-1 h-2 bg-gray-200/60 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${tool.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? `${line.pct}%` : `${line.pct * 0.6}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
            <span className={`text-[10px] font-mono font-semibold ${tool.accentText} w-8 text-right`}>
              {line.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool, index }: { tool: (typeof tools)[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <Link
        href={tool.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col h-full p-7 rounded-2xl border ${tool.accentBorder} bg-white hover:shadow-2xl ${tool.accentGlow} hover:-translate-y-1.5 transition-all duration-500`}
      >
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

        {/* Header */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-sm`}>
              <tool.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${tool.accentText}`}>{tool.subtitle}</div>
              <h2 className="text-lg font-bold leading-snug">{tool.title}</h2>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${tool.accentBg} ${tool.accentText} flex items-center gap-1 shrink-0`}>
            <Clock className="w-2.5 h-2.5" />
            {tool.badge}
          </span>
        </div>

        {/* Description */}
        <p className="relative text-[13px] text-muted-foreground leading-relaxed mb-4">{tool.description}</p>

        {/* Preview chart */}
        <ToolPreview tool={tool} isHovered={isHovered} />

        {/* Benefits */}
        <div className="relative flex flex-wrap gap-2 mb-5">
          {tool.benefits.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 text-[11px] text-gray-500">
              <CheckCircle2 className={`w-3 h-3 ${tool.accentText}`} />
              {b}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className={`relative mt-auto flex items-center justify-between pt-4 border-t ${tool.accentBorder}`}>
          <span className={`text-sm font-semibold ${tool.accentText} group-hover:gap-3 transition-all flex items-center gap-2`}>
            {tool.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </span>
          <span className="text-4xl font-bold text-gray-100/80 font-mono select-none">{tool.number}</span>
        </div>
      </Link>
    </motion.div>
  );
}

const useCases = [
  { icon: Users, title: "DRH & RH", desc: "Évaluez si externaliser une partie de vos recrutements vous ferait gagner du temps et de l'argent" },
  { icon: TrendingUp, title: "CEO / COO", desc: "Obtenez des chiffres concrets pour arbitrer entre RPO, cabinet ou recrutement interne" },
  { icon: BarChart3, title: "Talent Acquisition", desc: "Benchmarkez votre maturité recrutement et identifiez vos axes d'amélioration" },
];

export default function OutilsClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <Breadcrumbs items={[{ label: "Nos simulateurs" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/5 w-[400px] h-[400px] rounded-full bg-rocket-teal/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/5 w-[300px] h-[300px] rounded-full bg-rocket-teal-glow/8 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative container-wide py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
                <Sparkles className="w-4 h-4 text-rocket-teal-glow" />
                100% gratuit · Sans inscription · Résultats instantanés
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white">
                Prenez les bonnes{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  décisions
                </span>{" "}
                en 2 minutes
              </h1>

              <p className="mt-6 text-lg text-white/55 leading-relaxed max-w-lg">
                3 simulateurs conçus pour les décideurs. Calculez, diagnostiquez, visualisez — puis décidez en connaissance de cause.
              </p>

              {/* Quick links */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/calculateur"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calculator className="w-4 h-4" />
                  Calculer mon ROI
                </Link>
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Diagnostic express
                </Link>
              </div>
            </motion.div>

            {/* Right: Floating preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-[11px] text-white/40 font-mono">rocket4rpo.com/calculateur</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Coût pour 10 recrutements</div>
                      <div className="space-y-2">
                        {[
                          { label: "Cabinet", value: "180 000 €", pct: 100, color: "bg-red-400/60" },
                          { label: "Interne", value: "95 000 €", pct: 53, color: "bg-amber-400/60" },
                          { label: "RPO Rocket", value: "30 000 €", pct: 24, color: "bg-rocket-teal-glow" },
                        ].map((row, i) => (
                          <div key={row.label} className="flex items-center gap-3">
                            <span className="text-[11px] text-white/50 w-20">{row.label}</span>
                            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${row.color}`}
                                initial={{ width: 0 }}
                                animate={heroInView ? { width: `${row.pct}%` } : {}}
                                transition={{ duration: 1, delay: 0.8 + i * 0.2, ease: "easeOut" }}
                              />
                            </div>
                            <span className="text-[11px] text-white/70 font-mono w-16 text-right">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                      <Zap className="w-4 h-4 text-rocket-teal-glow" />
                      <span className="text-[12px] text-white/60">Économie estimée : </span>
                      <span className="text-[14px] font-bold text-rocket-teal-glow font-mono">136 000 €</span>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-emerald-500 text-white rounded-xl px-4 py-2.5 shadow-xl shadow-emerald-500/20"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-semibold">-75% vs cabinet</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              { icon: Shield, value: "200+", label: "recrutements réalisés" },
              { icon: Clock, value: "1 sem.", label: "pour démarrer" },
              { icon: Target, value: "2-3 sem.", label: "time-to-hire moyen" },
              { icon: Users, value: "50+", label: "entreprises accompagnées" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="w-4 h-4 text-rocket-teal-glow/60" />
                <span className="text-white font-bold text-sm">{stat.value}</span>
                <span className="text-white/35 text-xs">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
        <div className="container-wide">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Zap className="w-3 h-3" />
              Choisissez votre simulateur
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Une question ? Un outil pour y répondre.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              Chaque simulateur est conçu pour vous aider à prendre une décision éclairée sur votre stratégie de recrutement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {tools.map((tool, i) => (
              <ToolCard key={tool.title} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 bg-rocket-dark">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Conçu pour les décideurs
            </h2>
            <p className="mt-3 text-white/50 max-w-xl mx-auto">
              Quel que soit votre rôle, nos outils vous donnent les données pour convaincre.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <uc.icon className="w-8 h-8 text-rocket-teal-glow mb-4" />
                <h3 className="text-white font-semibold mb-2">{uc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="container-tight">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold">Comment ça fonctionne</h2>
            <p className="mt-3 text-muted-foreground">En 3 étapes, obtenez des réponses concrètes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-7 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-rocket-teal/20 via-rocket-teal/40 to-rocket-teal/20" />

            {[
              { step: "1", title: "Choisissez votre outil", desc: "Selon votre question : coûts, maturité ou process" },
              { step: "2", title: "Répondez en 2 min", desc: "Quelques clics — aucune donnée sensible, aucun compte requis" },
              { step: "3", title: "Décidez avec les chiffres", desc: "Score, économies estimées et recommandations personnalisées" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rocket-teal to-rocket-teal-glow text-white text-xl font-bold flex items-center justify-center mb-5 shadow-lg shadow-rocket-teal/20 relative z-10">
                  {item.step}
                </div>
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[250px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Besoin d'un accompagnement sur mesure ?"
        subtitle="Discutez avec un expert Talent Acquisition senior. Il analysera vos besoins et vous proposera le meilleur modèle — RPO, CDD/CDI ou mission ponctuelle."
        ctaLabel="Réserver un diagnostic gratuit"
      />
    </>
  );
}
