"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  ClipboardCheck,
  BarChart3,
  CheckSquare,
  ArrowRight,
  Download,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Clock,
  Star,
  TrendingUp,
  Zap,
  Play,
  Calculator,
  Target,
  Shield,
  Eye,
  FileCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

/* ── Resource data ── */

type Category = "all" | "guide" | "template" | "etude" | "checklist";

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "Tout voir" },
  { value: "guide", label: "Guides" },
  { value: "template", label: "Templates" },
  { value: "etude", label: "Études" },
  { value: "checklist", label: "Checklists" },
];

const resources = [
  {
    title: "RPO vs Cabinet — Le comparatif complet",
    description:
      "12 pages pour comprendre les différences de coût, flexibilité et efficacité entre RPO et cabinet de recrutement traditionnel. Chiffres réels, cas concrets.",
    badge: "Guide PDF",
    category: "guide" as Category,
    icon: FileText,
    pages: "12 pages",
    readTime: "8 min",
    file: "/resources/guide-rpo-vs-cabinet.pdf",
    featured: true,
    gradient: "from-emerald-500 to-teal-600",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200/60",
    topics: ["Coûts", "Flexibilité", "Délais", "ROI"],
  },
  {
    title: "Scorecard de recrutement — Template prêt à l'emploi",
    description:
      "Notre modèle de scorecard utilisé sur 200+ recrutements. Critères pondérés, grille d'évaluation, système de notation — adaptable à tous les postes.",
    badge: "Template",
    category: "template" as Category,
    icon: ClipboardCheck,
    pages: "4 pages",
    readTime: "3 min",
    file: "/resources/scorecard-recrutement.pdf",
    featured: true,
    gradient: "from-blue-500 to-indigo-600",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200/60",
    topics: ["Évaluation", "Critères", "Objectivité"],
  },
  {
    title: "Grille de rémunération Tech 2026",
    description:
      "Fourchettes salariales actualisées pour 30+ postes Tech en Île-de-France et région. Données issues de nos 200+ recrutements et benchmarks marché.",
    badge: "Étude",
    category: "etude" as Category,
    icon: BarChart3,
    pages: "16 pages",
    readTime: "10 min",
    file: "/resources/grille-remuneration-tech-2026.pdf",
    featured: false,
    gradient: "from-violet-500 to-purple-600",
    accentBg: "bg-violet-500/10",
    accentText: "text-violet-700",
    accentBorder: "border-violet-200/60",
    topics: ["Salaires", "Tech", "Benchmark", "2026"],
  },
  {
    title: "Les 10 étapes d'un onboarding réussi",
    description:
      "La checklist utilisée par nos TA Specialists pour intégrer un nouveau collaborateur efficacement. De J-7 à J+90, rien n'est laissé au hasard.",
    badge: "Checklist",
    category: "checklist" as Category,
    icon: CheckSquare,
    pages: "6 pages",
    readTime: "5 min",
    file: "/resources/checklist-onboarding.pdf",
    featured: false,
    gradient: "from-amber-500 to-orange-600",
    accentBg: "bg-amber-500/10",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200/60",
    topics: ["Onboarding", "Rétention", "Process"],
  },
  {
    title: "Brief de poste parfait — Template",
    description:
      "Le template de brief utilisé par nos TA pour cadrer un besoin en 30 minutes. Fiche de poste, scorecard, critères must-have vs nice-to-have.",
    badge: "Template",
    category: "template" as Category,
    icon: FileCheck,
    pages: "3 pages",
    readTime: "2 min",
    file: "/resources/template-brief-poste.pdf",
    featured: false,
    gradient: "from-cyan-500 to-blue-600",
    accentBg: "bg-cyan-500/10",
    accentText: "text-cyan-700",
    accentBorder: "border-cyan-200/60",
    topics: ["Brief", "Scorecard", "Cadrage"],
  },
  {
    title: "KPIs recrutement — Le dashboard essentiel",
    description:
      "Les 12 KPIs que tout responsable recrutement devrait suivre. Formules de calcul, benchmarks marché, fréquence de suivi recommandée.",
    badge: "Guide PDF",
    category: "guide" as Category,
    icon: TrendingUp,
    pages: "8 pages",
    readTime: "6 min",
    file: "/resources/guide-kpis-recrutement.pdf",
    featured: false,
    gradient: "from-rose-500 to-pink-600",
    accentBg: "bg-rose-500/10",
    accentText: "text-rose-700",
    accentBorder: "border-rose-200/60",
    topics: ["KPIs", "Dashboard", "TTH", "Conversion"],
  },
];

/* ── Resource Card ── */

function ResourceCard({ resource, index }: { resource: (typeof resources)[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative flex flex-col rounded-2xl border ${resource.accentBorder} bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
    >
      {/* Top gradient bar */}
      <div className={`h-1 bg-gradient-to-r ${resource.gradient}`} />

      <div className="p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center shadow-sm`}>
            <resource.icon className="w-6 h-6 text-white" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${resource.accentText} ${resource.accentBg} px-2.5 py-1 rounded-full`}>
            {resource.badge}
          </span>
        </div>

        {/* Title + desc */}
        <h2 className="text-lg font-bold leading-snug mb-2">{resource.title}</h2>
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 flex-1">{resource.description}</p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.topics.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
              {t}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-5">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {resource.pages}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {resource.readTime} de lecture
          </span>
        </div>

        {/* CTA */}
        <a
          href={resource.file}
          download
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${resource.gradient} text-white shadow-sm hover:shadow-md`}
        >
          <Download className="w-4 h-4" />
          Télécharger gratuitement
        </a>
      </div>
    </motion.div>
  );
}

/* ── Featured Card (large) ── */

function FeaturedCard({ resource }: { resource: (typeof resources)[number] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`group relative flex flex-col md:flex-row rounded-2xl border ${resource.accentBorder} bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden`}
    >
      {/* Left: visual */}
      <div className={`relative md:w-[280px] shrink-0 bg-gradient-to-br ${resource.gradient} p-8 flex flex-col justify-center items-center text-center`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
        <resource.icon className="w-14 h-14 text-white/90 mb-4 relative" />
        <div className="relative">
          <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">{resource.badge}</span>
          <div className="text-white font-bold text-lg mt-1">{resource.pages}</div>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] text-white font-semibold">
          <Star className="w-3 h-3" /> Populaire
        </div>
      </div>

      {/* Right: content */}
      <div className="p-7 md:p-8 flex flex-col flex-1">
        <h2 className="text-xl md:text-2xl font-bold leading-snug mb-3">{resource.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{resource.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {resource.topics.map((t) => (
            <span key={t} className={`text-[11px] px-2.5 py-1 rounded-full ${resource.accentBg} ${resource.accentText} font-medium`}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[12px] text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {resource.pages}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {resource.readTime} de lecture
          </span>
        </div>

        <a
          href={resource.file}
          download
          className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r ${resource.gradient} text-white shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all self-start`}
        >
          <Download className="w-4 h-4" />
          Télécharger le guide complet
        </a>
      </div>
    </motion.div>
  );
}

/* ── Main ── */

export default function RessourcesClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [filter, setFilter] = useState<Category>("all");

  const featured = resources.filter((r) => r.featured);
  const filtered = filter === "all" ? resources.filter((r) => !r.featured) : resources.filter((r) => r.category === filter);

  return (
    <>
      <Breadcrumbs items={[{ label: "Ressources" }]} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-[15%] w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[140px] animate-pulse" />
          <div className="absolute bottom-1/4 right-[20%] w-[300px] h-[300px] rounded-full bg-blue-500/6 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

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
              100% gratuit · Sans inscription · Téléchargement immédiat
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white">
              Les outils des{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                meilleurs recruteurs
              </span>
              {" "}sont maintenant les v{"\ô"}tres
            </h1>

            <p className="mt-5 text-lg text-white/55 leading-relaxed max-w-2xl">
              Guides, templates et {"\é"}tudes con{"\ç"}us par des experts avec 200+ recrutements {"\à"} leur actif. Les m{"\ê"}mes outils que nos TA Specialists utilisent au quotidien.
            </p>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { icon: BookOpen, value: "6", label: "ressources disponibles" },
              { icon: Award, value: "200+", label: "recrutements d'exp\érience" },
              { icon: Download, value: "Gratuit", label: "sans inscription" },
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

      {/* ── FEATURED RESOURCES ── */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Star className="w-3 h-3" />
              Les plus populaires
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3">
              Ressources incontournables
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {featured.map((r) => (
              <FeaturedCard key={r.title} resource={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL RESOURCES ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Toutes nos ressources</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Filtrez par cat{"\é"}gorie pour trouver exactement ce qu{"'"}il vous faut.
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  filter === cat.value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filtered.map((r, i) => (
              <ResourceCard key={r.title} resource={r} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERTISE SECTION ── */}
      <section className="py-20 bg-rocket-dark">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rocket-teal-glow px-3 py-1 rounded-full bg-rocket-teal/10 border border-rocket-teal/20 mb-5">
                <Award className="w-3 h-3" />
                Pourquoi nos ressources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Pas de th{"\é"}orie. Du terrain.
              </h2>
              <p className="mt-5 text-white/55 leading-relaxed">
                Chaque guide, template et {"\é"}tude est issu de notre exp{"\é"}rience concr{"\è"}te sur le march{"\é"} fran{"\ç"}ais. 200+ recrutements, 50+ entreprises accompagn{"\é"}es, 7 ans d{"'"}expertise. Ce ne sont pas des contenus g{"\é"}n{"\é"}riques — ce sont les outils que nos TA Specialists utilisent au quotidien.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "200+", label: "recrutements r\éalis\és" },
                  { value: "50+", label: "entreprises accompagn\ées" },
                  { value: "7 ans", label: "d'expertise TA" },
                  { value: "92%", label: "r\étention \à 12 mois" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xl font-bold text-rocket-teal-glow font-mono">{stat.value}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Expert photo */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="/photos/header-rocket4sales.webp"
                  alt="Nos experts en action"
                  width={800}
                  height={400}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white/80 text-xs font-medium">
                  Expertise et rigueur au quotidien
                </div>
              </div>

              <div className="space-y-4">
              {[
                { icon: Eye, title: "Bas\é sur des donn\ées r\éelles", desc: "Chiffres issus de nos propres recrutements et benchmarks march\é — pas de donn\ées g\én\ériques" },
                { icon: Target, title: "Actionnable imm\édiatement", desc: "Chaque ressource inclut des templates pr\êts \à l'emploi que vous pouvez utiliser d\ès aujourd'hui" },
                { icon: Shield, title: "Mis \à jour r\éguli\èrement", desc: "Grilles de salaires, tendances march\é et best practices actualis\ées chaque trimestre" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-rocket-teal/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-rocket-teal-glow" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULATEURS CROSS-SELL ── */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Allez plus loin avec nos simulateurs</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Testez nos outils interactifs pour obtenir des r{"\é"}sultats personnalis{"\é"}s.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Calculator, title: "Calculateur ROI", desc: "Estimez vos \économies avec le RPO", href: "/calculateur", time: "30 sec" },
              { icon: Target, title: "Diagnostic recrutement", desc: "\Évaluez votre maturit\é TA en 7 questions", href: "/assessment", time: "2 min" },
              { icon: Play, title: "D\émo interactive", desc: "Vivez le process RPO en 4 \étapes", href: "/demo", time: "2 min" },
            ].map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={tool.href}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tool.desc}</p>
                  <span className="flex items-center gap-1 text-xs text-primary font-medium">
                    <Clock className="w-3 h-3" />
                    {tool.time}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Besoin d'un accompagnement personnalis{e} ?"
        subtitle="Discutez avec un expert Talent Acquisition senior. Il analysera vos besoins et vous recommandera les ressources et solutions adapt{e}es."
        ctaLabel="R{e}server mon diagnostic gratuit"
      />
    </>
  );
}
