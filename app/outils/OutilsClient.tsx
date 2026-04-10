"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Play,
  Calculator,
  ClipboardCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

const tools = [
  {
    title: "Démo interactive",
    description:
      "Vivez le process RPO en 4 étapes interactives. Voyez comment nos TA Specialists identifient, qualifient et présentent vos candidats.",
    icon: Play,
    href: "/demo",
    cta: "Lancer la démo",
    badge: "2 min",
    accent: "from-emerald-500 to-teal-600",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    number: "01",
  },
  {
    title: "Calculateur ROI",
    description:
      "Estimez combien vous pouvez économiser en passant au RPO vs un cabinet ou un recrutement interne. Résultat instantané et personnalisé.",
    icon: Calculator,
    href: "/calculateur",
    cta: "Calculer mon ROI",
    badge: "30 sec",
    accent: "from-blue-500 to-indigo-600",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200",
    number: "02",
  },
  {
    title: "Diagnostic recrutement",
    description:
      "7 questions pour évaluer la maturité de votre process recrutement. Score personnalisé et recommandations actionnables.",
    icon: ClipboardCheck,
    href: "/assessment",
    cta: "Faire le diagnostic",
    badge: "2 min",
    accent: "from-violet-500 to-purple-600",
    accentBg: "bg-violet-500/10",
    accentText: "text-violet-700",
    accentBorder: "border-violet-200",
    number: "03",
  },
];

function ToolCard({ tool, index }: { tool: (typeof tools)[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link
        href={tool.href}
        className={`group relative flex flex-col h-full p-8 rounded-2xl border ${tool.accentBorder} bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
      >
        {/* Top row: number + badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-5xl font-bold text-gray-100 font-mono select-none">{tool.number}</span>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${tool.accentBg} ${tool.accentText} flex items-center gap-1.5`}>
            <Clock className="w-3 h-3" />
            {tool.badge}
          </span>
        </div>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${tool.accentBg} flex items-center justify-center mb-5`}>
          <tool.icon className={`w-6 h-6 ${tool.accentText}`} />
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold leading-snug mb-3">{tool.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.description}</p>

        {/* CTA */}
        <div className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${tool.accentText} group-hover:gap-3 transition-all`}>
          {tool.cta}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function OutilsClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Nos simulateurs" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(160 84% 32% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(160 84% 50% / 0.2) 0%, transparent 40%)" }} />

        <div className="relative container-wide py-20 md:py-28">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80 mb-6">
              <Sparkles className="w-4 h-4 text-rocket-teal-glow" />
              100% gratuit · Sans inscription
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Vos outils pour{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal to-rocket-teal-glow">
                décider vite
              </span>
            </h1>

            <p className="mt-5 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
              Calculez vos économies, testez notre process et évaluez votre maturité recrutement — en quelques minutes, sans engagement.
            </p>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { icon: Target, value: "3 outils", label: "complémentaires" },
              { icon: Clock, value: "< 5 min", label: "pour tout tester" },
              { icon: TrendingUp, value: "100%", label: "actionnable" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-rocket-teal-glow" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{stat.value}</div>
                  <div className="text-white/40 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              Choisissez votre outil
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Chaque simulateur répond à une question clé de votre stratégie de recrutement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tools.map((tool, i) => (
              <ToolCard key={tool.title} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works mini section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-tight text-center">
          <h2 className="text-2xl font-bold mb-10">Comment ça fonctionne</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choisissez un outil", desc: "Sélectionnez le simulateur adapté à votre besoin" },
              { step: "2", title: "Répondez en 2 min", desc: "Quelques clics, aucune donnée sensible requise" },
              { step: "3", title: "Obtenez vos résultats", desc: "Score, recommandations et prochaines étapes claires" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-rocket-teal text-white text-lg font-bold flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Besoin d'un accompagnement sur mesure ?"
        subtitle="Discutez avec un expert Talent Acquisition et recevez un diagnostic gratuit de votre processus de recrutement."
        ctaLabel="Parler à un expert"
      />
    </>
  );
}
