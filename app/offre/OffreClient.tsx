"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import {
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Users,
  BarChart3,
  Search,
  FileCheck,
  MessageSquare,
  Shield,
  Target,
  Rocket,
  Zap,
  Crown,
  Star,
  Briefcase,
  Clock,
  TrendingUp,
  Award,
  UserCheck,
  Building2,
  Sparkles,
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const faqs = [
  {
    question: "Quelle est la différence entre RPO et cabinet de recrutement ?",
    answer:
      "Un cabinet travaille en externe sur des missions ponctuelles, facturées 15-25% du salaire annuel. Le RPO intègre un recruteur directement dans vos équipes, vos outils et vos rituels — comme un membre de votre entreprise, mais sans CDI. Coût prévisible au TJM.",
  },
  {
    question: "Vous ne faites que du RPO ?",
    answer:
      "Non. Notre cœur de métier est le RPO, mais nous recrutons aussi en CDD et CDI selon vos besoins. Que vous ayez un pic d\’activité (CDD), un poste stratégique à pourvoir (CDI) ou un besoin de structuration complète (RPO), on s\’adapte. Un seul interlocuteur, toutes les solutions.",
  },
  {
    question: "Combien ça coûte concrètement ?",
    answer:
      "À partir de 550€/jour pour le RPO. Pour 10 recrutements sur 4 mois, comptez environ 44 000€ — soit jusqu\’à 5x moins cher qu\’un cabinet classique (120 000 à 200 000€). Facturation mensuelle, sans frais cachés. Pour le recrutement CDD/CDI, tarification sur devis.",
  },
  {
    question: "En combien de temps le recruteur est-il opérationnel ?",
    answer:
      "48h. Le TA Specialist rejoint vos outils (ATS, Slack, Teams) et vos rituels dès le premier jour. Première shortlist qualifiée sous 48h.",
  },
  {
    question: "Comment sélectionnez-vous vos TA Specialists ?",
    answer:
      "Nous maintenons un vivier de plus de 50 Talent Acquisition Specialists freelances, évalués sur 7 critères (sourcing, outils, autonomie, KPIs, qualification, posture conseil, expérience RPO). Seuls les profils notés 80%+ intègrent notre vivier prioritaire — c\’est le top 1% du marché français.",
  },
  {
    question: "Et si le recruteur ne convient pas ?",
    answer:
      "On le remplace sous 48h. Notre vivier de TA seniors nous permet de réagir immédiatement, sans interruption de service.",
  },
  {
    question: "Quels types de postes pouvez-vous recruter ?",
    answer:
      "Tous. Sales, Tech/IT, Finance, Marketing, Support, Product, Data, Management. Nos TA sont des généralistes expérimentés avec des spécialisations sectorielles — SaaS, ESN, Fintech, Santé, Industrie.",
  },
  {
    question: "Quelle durée d\’engagement minimum ?",
    answer:
      "3 mois recommandé pour des résultats solides. Pas d\’engagement rigide — préavis d\’1 mois. Vous pouvez ajuster le rythme (1 à 5 jours/semaine) à tout moment.",
  },
];

export default function OffreClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Notre offre" }]} />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[150px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

        <div className="relative container-wide py-20 md:py-28 lg:py-32">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 25 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                <Zap className="w-3.5 h-3.5" /> RPO
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-sm text-blue-300 font-medium">
                <Briefcase className="w-3.5 h-3.5" /> CDD / CDI
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/20 text-sm text-amber-300 font-medium">
                <Crown className="w-3.5 h-3.5" /> Top 1% des TA
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-white">
              Le recrutement que vous m{"é"}ritez.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                Les meilleurs TA de France
              </span>{" "}
              {"à"} votre service.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/55 leading-relaxed max-w-3xl">
              RPO, CDD ou CDI — peu importe le format. Nous mobilisons en 48h un Talent Acquisition Specialist
              du top 1% fran{"ç"}ais, s{"é"}lectionn{"é"} parmi plus de 50 experts {"é"}valu{"é"}s sur 7 crit{"è"}res.
              Votre besoin, notre vivier, vos r{"é"}sultats.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                R{"é"}server un diagnostic gratuit <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/calculateur"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all"
              >
                Calculer mes {"é"}conomies
              </a>
            </div>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "200+", label: "recrutements r{e}alis{e}s", icon: CheckCircle },
              { value: "48h", label: "pour d{e}marrer", icon: Clock },
              { value: "92%", label: "r{e}tention {a} 12 mois", icon: TrendingUp },
              { value: "Top 1%", label: "des TA s{e}lectionn{e}s", icon: Crown },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <stat.icon className="w-5 h-5 text-rocket-teal-glow" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-white/40 text-xs">{stat.label.replace(/\{e\}/g, "é").replace(/\{a\}/g, "à")}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TOP 1% DES TA ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-5">
                <Crown className="w-3 h-3" />
                Notre avantage d{"é"}cisif
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Le top 1% des Talent Acquisition Specialists de France
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-base">
                Nous ne travaillons pas avec n{"'"}importe qui. Chaque TA de notre vivier a {"é"}t{"é"} {"é"}valu{"é"} sur <strong>7 crit{"è"}res exigeants</strong> — sourcing, outils, autonomie, KPIs, qualification, posture conseil et exp{"é"}rience RPO.
                Seuls les profils not{"é"}s 80%+ sur notre grille propri{"é"}taire int{"è"}grent le vivier prioritaire.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                R{"é"}sultat : quand vous nous dites {"\«"} j{"'"}ai besoin d{"'"}un recruteur {"\»"}, on vous envoie le meilleur du march{"é"} en 48h. Pas un junior en formation — un expert op{"é"}rationnel imm{"é"}diatement.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "50+", label: "TA dans notre vivier" },
                  { value: "7", label: "critères d'évaluation" },
                  { value: "80%+", label: "score minimum requis" },
                  { value: "48h", label: "délai de mobilisation" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-2xl font-bold text-primary font-mono">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual: photo + scoring grid */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <Image
                  src="/photos/reunion.webp"
                  alt="Un TA Specialist Rocket4RPO int{'é'}gr{'é'} dans une {'é'}quipe client"
                  width={800}
                  height={450}
                  className="w-full h-[220px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  Int{"é"}gration TA chez un client
                </div>
              </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-sm">Grille d{"\’"}{"é"}valuation R4RPO</div>
                  <div className="text-xs text-muted-foreground">7 crit{"è"}res · Score sur 35</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Chasse & sourcing", score: 92 },
                  { name: "Outils & stack", score: 88 },
                  { name: "Autonomie & ownership", score: 95 },
                  { name: "Pilotage & KPIs", score: 85 },
                  { name: "Qualification candidat", score: 90 },
                  { name: "Posture conseil HM", score: 87 },
                  { name: "Expérience RPO/embedded", score: 93 },
                ].map((crit) => (
                  <div key={crit.name} className="flex items-center gap-3">
                    <span className="text-[12px] text-muted-foreground w-40 shrink-0">{crit.name}</span>
                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-rocket-teal-glow"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${crit.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-primary w-8 text-right">{crit.score}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-muted-foreground">Moyenne de notre vivier prioritaire : <strong className="text-foreground">90%</strong></span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 MODES DE RECRUTEMENT ── */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Sparkles className="w-3 h-3" />
              Flexible par design
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              RPO, CDD, CDI — un seul partenaire, toutes les solutions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              Chaque entreprise a des besoins diff{"é"}rents. Nous nous adaptons {"à"} votre contexte, pas l{"'"}inverse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Rocket,
                badge: "Le plus demandé",
                title: "RPO — Recruteur intégré",
                desc: "Un TA Specialist intégré dans vos équipes, vos outils et vos rituels. Il recrute à votre place, au nom de votre entreprise.",
                points: [
                  "Sourcing multi-canal dédié",
                  "Intégration totale (ATS, Slack, Teams)",
                  "Reporting hebdomadaire",
                  "Marque employeur protégée",
                  "1 à 5 jours/semaine, 3 mois min",
                ],
                prix: "À partir de 550€/jour",
                highlight: true,
                color: "border-primary/30 ring-1 ring-primary/10",
                badgeColor: "bg-primary text-primary-foreground",
              },
              {
                icon: UserCheck,
                badge: null,
                title: "CDI — Recrutement permanent",
                desc: "Vous avez un poste stratégique à pourvoir ? Nos TA identifient le candidat idéal et vous accompagnent jusqu\’à la signature.",
                points: [
                  "Chasse directe de profils seniors",
                  "Shortlist qualifiée en 2 semaines",
                  "Accompagnement négociation",
                  "Garantie de remplacement",
                  "Tous secteurs, tous niveaux",
                ],
                prix: "Sur devis",
                highlight: false,
                color: "border-blue-200/60",
                badgeColor: "",
              },
              {
                icon: Clock,
                badge: null,
                title: "CDD — Besoin temporaire",
                desc: "Pic d\’activité, remplacement, projet spécifique ? On vous trouve le bon profil rapidement, en CDD ou freelance.",
                points: [
                  "Mobilisation rapide (< 2 semaines)",
                  "Profils pré-qualifiés dans notre vivier",
                  "Suivi pendant la mission",
                  "Conversion CDI possible",
                  "Flexibilité totale sur la durée",
                ],
                prix: "Sur devis",
                highlight: false,
                color: "border-amber-200/60",
                badgeColor: "",
              },
            ].map((mode) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative p-8 rounded-2xl border bg-white ${mode.color} ${mode.highlight ? "shadow-xl shadow-primary/5" : "shadow-sm"} flex flex-col`}
              >
                {mode.badge && (
                  <span className={`absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full ${mode.badgeColor}`}>
                    {mode.badge}
                  </span>
                )}
                <mode.icon className={`w-8 h-8 mb-4 ${mode.highlight ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="text-xl font-bold mb-3">{mode.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{mode.desc}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {mode.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${mode.highlight ? "text-primary" : "text-muted-foreground/60"}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-gray-100">
                  <div className={`text-lg font-bold mb-4 ${mode.highlight ? "text-primary" : ""}`}>{mode.prix}</div>
                  <a
                    href={HUBSPOT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                      mode.highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-gray-100 text-foreground hover:bg-gray-200"
                    }`}
                  >
                    {mode.highlight ? "Choisir le RPO" : "Demander un devis"}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS OBTENEZ ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ce que vous obtenez concr{"è"}tement</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              Pas de jargon. Voici exactement ce qui se passe quand vous travaillez avec nous.
            </p>
          </div>

          {/* Photo: bureau élégant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src="/photos/bureau.webp"
                alt="R{'é'}union d'{'é'}quipe dans les locaux Rocket4RPO"
                width={1200}
                height={500}
                className="w-full h-[240px] md:h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Sourcing multi-canal", text: "LinkedIn Recruiter, approche directe, réseau, communautés. Votre TA source activement les meilleurs profils, pas des CVs de job boards." },
              { icon: FileCheck, title: "Shortlists qualifiées en 48h", text: "Chaque candidat présenté a été évalué sur ses compétences, sa motivation et son adéquation culturelle. Pas de volume — de la qualité." },
              { icon: MessageSquare, title: "Coordination avec vos managers", text: "Votre TA gère les briefs, les debriefs, les feedbacks et le suivi. Vos managers se concentrent sur leur métier." },
              { icon: BarChart3, title: "Reporting hebdomadaire", text: "Chaque semaine : pipeline, KPIs, taux de conversion, délais. Vous savez exactement où en sont vos recrutements." },
              { icon: Users, title: "Intégration totale", text: "Le TA rejoint vos outils (ATS, Slack, Teams), vos rituels d\’équipe et votre culture. Il représente VOTRE marque employeur." },
              { icon: Shield, title: "Marque employeur protégée", text: "Chaque message, chaque approche candidat est faite au nom de votre entreprise. Votre image est entre de bonnes mains." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-gray-50 border border-gray-100 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="py-20 bg-rocket-dark">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">De votre appel {"à"} votre premier recrutement</h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              Un process rod{"é"}, transparent et rapide. Pas de surprise.
            </p>
          </div>

          {/* Photo: open space en action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-3xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/photos/bureau-travail.webp"
                alt="L'{'é'}quipe en action dans l'open space"
                width={1200}
                height={500}
                className="w-full h-[200px] md:h-[260px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white/70 text-xs font-medium">
                Nos {"é"}quipes en mission
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-rocket-teal/20 via-rocket-teal/40 to-rocket-teal/20" />

            {[
              { step: "J0", icon: Target, title: "Brief & scorecard", text: "On analyse vos besoins et on construit une scorecard précise avec vos managers." },
              { step: "J1", icon: Users, title: "Matching TA", text: "On sélectionne le TA Specialist idéal selon votre secteur, vos enjeux et votre culture." },
              { step: "J2", icon: Rocket, title: "Intégration 48h", text: "Le TA rejoint vos outils et rituels. Opérationnel immédiatement. Première shortlist le jour même." },
              { step: "S2-S4", icon: CheckCircle, title: "Résultats", text: "Sourcing ciblé, shortlists qualifiées, recrutements signés. KPIs suivis chaque semaine." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <item.icon className="w-7 h-7 text-rocket-teal-glow" />
                </div>
                <span className="inline-block text-xs font-mono text-rocket-teal-glow font-bold bg-rocket-teal/10 px-2.5 py-0.5 rounded-full">{item.step}</span>
                <h3 className="font-bold text-white text-base mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COÛT COMPARÉ ── */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">Combien {"ç"}a co{"û"}te vraiment ?</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Comparaison pour 10 recrutements sur 4 mois.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { model: "RPO Rocket4RPO", price: "~44 000€", detail: "TJM prévisible, tout inclus", highlight: true, savings: "Jusqu\’à 75% d\’économies" },
              { model: "Cabinet classique", price: "120 000 \– 200 000€", detail: "15-25% du salaire par recrutement", highlight: false, savings: null },
              { model: "Recruteur interne (CDI)", price: "40 \– 55 000€/an + charges", detail: "3 mois pour le recruter", highlight: false, savings: null },
            ].map((item) => (
              <motion.div
                key={item.model}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`p-8 rounded-2xl text-center ${
                  item.highlight
                    ? "bg-primary/5 border-2 border-primary/20 shadow-lg shadow-primary/5"
                    : "bg-white border border-gray-200"
                }`}
              >
                <p className="text-sm font-medium mb-3 text-muted-foreground">{item.model}</p>
                <p className={`text-3xl font-bold mb-2 ${item.highlight ? "text-primary" : ""}`}>
                  {item.price}
                </p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
                {item.savings && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {item.savings}
                  </div>
                )}
                {item.highlight && (
                  <a
                    href={HUBSPOT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Choisir le RPO <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Star className="w-3 h-3" />
              Ce qu{"'"}ils en disent
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "En 3 semaines, notre TA avait déjà présenté 8 candidats qualifiés. On a recruté notre Head of Sales en 28 jours. Avec un cabinet, on en aurait eu pour 3 mois.",
                name: "Sarah L.",
                role: "VP People",
                company: "Scale-up SaaS B2B",
                metric: "28 jours",
                metricLabel: "time-to-hire",
              },
              {
                quote: "Ce qui m'a convaincu, c'est la qualité du sourcing. Pas de CV génériques — chaque profil était ciblé et validé. On sentait qu'ils connaissaient notre marché.",
                name: "Thomas R.",
                role: "CEO",
                company: "Fintech, 45 collaborateurs",
                metric: "92%",
                metricLabel: "rétention 12 mois",
              },
              {
                quote: "On avait besoin de 5 développeurs en 4 mois. Le TA s'est intégré à notre équipe comme s'il avait toujours été là. Résultat : 5 recrutements, 0 départ à 12 mois.",
                name: "Marion D.",
                role: "CTO",
                company: "Éditeur logiciel",
                metric: "5/5",
                metricLabel: "recrutements réussis",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed flex-1 mb-5">
                  {"\«"} {t.quote} {"\»"}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}, {t.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary font-mono">{t.metric}</div>
                    <div className="text-[10px] text-muted-foreground">{t.metricLabel}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI ROCKET4RPO ── */}
      <section className="py-20 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[150px]" />
        </div>
        <div className="relative container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pourquoi les meilleurs nous choisissent
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              Ce n{"'"}est pas du marketing. Ce sont des faits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Crown,
                title: "Le top 1% des TA de France",
                desc: "Nos recruteurs sont sélectionnés sur 7 critères exigeants. Seuls les profils 80%+ intègrent notre vivier. Vous ne travaillez qu'avec l'élite.",
              },
              {
                icon: Zap,
                title: "Opérationnel en 48h, pas en 3 mois",
                desc: "Quand un cabinet met 2-3 semaines à démarrer et qu'un CDI prend 3 mois à recruter, nous sommes opérationnels en 48h. Première shortlist le jour même.",
              },
              {
                icon: Shield,
                title: "Zéro risque, flexibilité totale",
                desc: "Pas de success fee. Pas d'engagement long. Si le TA ne convient pas, on le remplace en 48h. Ajustez votre rythme à tout moment.",
              },
              {
                icon: Building2,
                title: "Un vivier de 50+ experts, pas un seul recruteur",
                desc: "Derrière chaque mission, c'est toute la force de notre vivier. Le moindre besoin, la moindre recherche — on a le profil qu'il vous faut, immédiatement.",
              },
              {
                icon: Target,
                title: "200+ recrutements, 92% de rétention",
                desc: "Nos chiffres parlent : 200+ recrutements réalisés, 92% de rétention à 12 mois. Ce n'est pas du volume — c'est de la précision.",
              },
              {
                icon: TrendingUp,
                title: "5x moins cher qu'un cabinet",
                desc: "Pour 10 recrutements : ~44K€ vs 120-200K€ en cabinet. Même qualité (voire meilleure), 5x moins cher. Les chiffres sont là.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-rocket-teal/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-rocket-teal-glow" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Urgency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto text-center p-6 rounded-2xl bg-rocket-teal/10 border border-rocket-teal/20"
          >
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-rocket-teal-glow">Disponibilit{"é"} limit{"é"}e</strong> — Nos meilleurs TA sont tr{"è"}s demand{"é"}s.
              Plus vous attendez, plus le d{"é"}lai de matching s{"'"}allonge.
              R{"é"}servez votre diagnostic gratuit maintenant pour bloquer un cr{"é"}neau.
            </p>
            <a
              href={HUBSPOT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 px-8 py-3 text-sm font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              R{"é"}server mon cr{"é"}neau <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection faqs={faqs} className="bg-rocket-cream" />

      {/* ── CTA ── */}
      <CTASection
        title="Votre prochain recrutement commence ici"
        subtitle="30 min de diagnostic gratuit avec un expert RPO. On analyse votre besoin et on vous dit honnêtement quel modèle — RPO, CDD ou CDI — est fait pour vous."
        ctaLabel="Réserver mon diagnostic gratuit"
      />
    </>
  );
}
