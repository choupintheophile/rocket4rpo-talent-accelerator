"use client";

import { motion } from "framer-motion";
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
  TrendingDown,
} from "lucide-react";

const HUBSPOT = "/rdv";

const faqs = [
  {
    question: "Quelle est la différence entre RPO et cabinet de recrutement ?",
    answer:
      "Un cabinet travaille en externe sur des missions ponctuelles, facturées 15-25% du salaire annuel. Le RPO intègre un recruteur directement dans vos équipes, vos outils et vos rituels — comme un membre de votre entreprise, mais sans CDI. Coût prévisible au TJM, zéro mauvaise surprise.",
  },
  {
    question: "Vous ne faites que du RPO ?",
    answer:
      "Non. Notre cœur de métier est le RPO, mais nous recrutons aussi en CDD et CDI selon vos besoins. Que vous ayez un pic d'activité (CDD), un poste stratégique à pourvoir (CDI) ou un besoin de structuration complète (RPO), on s'adapte. Un seul interlocuteur, toutes les solutions.",
  },
  {
    question: "Combien ça coûte concrètement ?",
    answer:
      "À partir de 500€/jour pour le RPO. Pour 10 recrutements sur 4 mois, comptez environ 30 000€ — soit jusqu'à 5x moins cher qu'un cabinet classique (120 000 à 200 000€). Facturation mensuelle, sans frais cachés. Pour le recrutement CDD/CDI, tarification sur devis.",
  },
  {
    question: "En combien de temps le recruteur est-il opérationnel ?",
    answer:
      "1 semaine. Le TA Specialist rejoint vos outils (ATS, Slack, Teams) et vos rituels dès le premier jour. Première shortlist qualifiée en 48h.",
  },
  {
    question: "Comment sélectionnez-vous vos TA Specialists ?",
    answer:
      "Nous maintenons un vivier de plus de 300+ Talent Acquisition Specialists freelances, évalués sur 15 critères (sourcing, outils, autonomie, KPIs, qualification, posture conseil, expérience RPO). Seuls les profils notés 90%+ intègrent notre vivier prioritaire — c'est le top 1% du marché français.",
  },
  {
    question: "Et si le recruteur ne convient pas ?",
    answer:
      "On le remplace sous 1 semaine. Notre vivier de TA seniors nous permet de réagir immédiatement, sans interruption de service. Zéro risque pour vous.",
  },
  {
    question: "Quels types de postes pouvez-vous recruter ?",
    answer:
      "Tous. Sales, Tech/IT, Finance, Marketing, Support, Product, Data, Management. Nos TA sont des généralistes expérimentés avec des spécialisations sectorielles — SaaS, ESN, Fintech, Santé, Industrie.",
  },
  {
    question: "Quelle durée d'engagement minimum ?",
    answer:
      "3 mois recommandé pour des résultats solides. Pas d'engagement rigide — préavis d'1 mois. Vous pouvez ajuster le rythme (1 à 5 jours/semaine) à tout moment.",
  },
];

export default function OffreClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Notre offre" }]} />

      {/* ══ SECTION 1 — HERO (dark gradient, split layout) ══ */}
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

        <div className="relative container-wide py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
            {/* Text side */}
            <div className="lg:w-[55%]">
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                  <Zap className="w-3.5 h-3.5" /> RPO
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/20 text-sm text-blue-300 font-medium">
                  <Briefcase className="w-3.5 h-3.5" /> CDD / CDI
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/20 text-sm text-amber-300 font-medium">
                  <Crown className="w-3.5 h-3.5" /> Top 1%
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] text-white">
                Recrutez avec le{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  top 1% des Talent Acquisition
                </span>{" "}
                de France.
              </h1>

              <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
                300+ experts évalués sur 15 critères. Seuls les profils à 90%+ intègrent notre vivier. Votre TA Specialist est opérationnel en 1 semaine — pas 3 mois. Dès 500€/jour.
              </p>

              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">200+</strong> recrutements réalisés</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">4 sem.</strong> time-to-hire moyen</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <TrendingDown className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">5x</strong> moins cher qu{"'"}un cabinet</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Réserver un diagnostic gratuit →
                </a>
                <a
                  href="#tarifs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all"
                >
                  Voir nos tarifs
                </a>
              </div>
            </div>

            {/* Visual side — TA Scorecard */}
            <div className="hidden lg:block lg:w-[45%]">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rocket-teal/20 flex items-center justify-center text-rocket-teal-glow text-xs font-bold">TA</div>
                    <div>
                      <div className="text-sm font-semibold text-white">Évaluation TA Specialist</div>
                      <div className="text-[10px] text-white/40">Score minimum requis : 90%</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">PRIORITAIRE</span>
                </div>

                {/* 5 scoring criteria with animated bars */}
                <div className="space-y-3 mb-5">
                  {[
                    { name: "Sourcing & identification", score: 95 },
                    { name: "Qualification candidat", score: 92 },
                    { name: "Autonomie & ownership", score: 88 },
                    { name: "Pilotage & KPIs", score: 94 },
                    { name: "Closing & négo", score: 90 },
                  ].map((c, i) => (
                    <div key={c.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{c.name}</span>
                        <span className="text-rocket-teal-glow font-mono font-semibold">{c.score}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-rocket-teal to-emerald-400"
                          initial={{ width: "0%" }}
                          animate={{ width: `${c.score}%` }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <div className="text-center">
                    <div className="text-lg font-bold font-mono text-white">300+</div>
                    <div className="text-[10px] text-white/40">experts évalués</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold font-mono text-rocket-teal-glow">15</div>
                    <div className="text-[10px] text-white/40">critères</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold font-mono text-emerald-400">90%+</div>
                    <div className="text-[10px] text-white/40">seuil requis</div>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-rocket-teal/10 via-transparent to-emerald-500/5 -z-10 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — LE COÛT DE L'INACTION ══ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-4">
              <TrendingUp className="w-3 h-3" />
              Ce que l{"'"}inaction vous coûte
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Chaque jour sans bon recruteur vous coûte une fortune
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              Vous pensez que le statu quo est gratuit ? Les chiffres disent le
              contraire. Voici ce que vous perdez en ce moment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                value: "500€/jour",
                title: "Productivité perdue par poste vacant",
                desc: "Chaque poste non pourvu coûte en moyenne 500€/jour en productivité perdue, projets retardés et équipes surchargées. Un poste ouvert 3 mois = 45 000€ envolés.",
                color: "text-red-600",
                bg: "bg-red-50",
                border: "border-red-100",
              },
              {
                icon: Users,
                value: "45 000€",
                title: "Coût d'un mauvais recrutement",
                desc: "Salaire, formation, intégration, départ, re-recrutement. Un mauvais recrutement coûte en moyenne 45 000€. Et c'est sans compter le moral de l'équipe.",
                color: "text-orange-600",
                bg: "bg-orange-50",
                border: "border-orange-100",
              },
              {
                icon: BarChart3,
                value: "15-25%",
                title: "La ponction des cabinets",
                desc: "Un cabinet de recrutement prend 15 à 25% du salaire annuel brut. Pour un profil à 60K€, c'est 9 000 à 15 000€ par tête. Multipliez par 10 recrutements…",
                color: "text-amber-600",
                bg: "bg-amber-50",
                border: "border-amber-100",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-2xl ${card.bg} border ${card.border} text-center`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mx-auto mb-5`}
                >
                  <card.icon className={`w-7 h-7 ${card.color}`} />
                </div>
                <div
                  className={`text-3xl font-bold font-mono mb-2 ${card.color}`}
                >
                  {card.value}
                </div>
                <h3 className="font-bold text-base mb-3">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Il existe une meilleure solution{" "}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 3 — TOP 1% DES TA ══ */}
      <section id="solutions" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-5">
                <Crown className="w-3 h-3" />
                Notre avantage décisif
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Le top 1% des Talent Acquisition Specialists de France
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed text-base">
                Les cabinets vous envoient un chargé de recherche junior. Les
                plateformes vous laissent trier des CV seul. Nous, on fait
                l{"'"}inverse : nous avons construit{" "}
                <strong>le vivier le plus exigeant du marché français</strong>.
                Chaque TA a été évalué sur{" "}
                <strong>15 critères exigeants</strong> — sourcing, outils,
                autonomie, KPIs, qualification, posture conseil et expérience
                RPO.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                Seuls les profils notés{" "}
                <strong>90%+ sur notre grille propriétaire</strong> intègrent le
                vivier prioritaire. Résultat : quand vous nous dites
                {" « "}j{"'"}ai besoin d{"'"}un recruteur{" » "}, on vous
                envoie <strong>le meilleur du marché en 1 semaine</strong>. Pas un
                junior en formation — un expert opérationnel immédiatement.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "300+", label: "TA dans notre vivier" },
                  { value: "15", label: "critères d'évaluation" },
                  { value: "90%+", label: "score minimum requis" },
                  { value: "1 sem.", label: "délai de mobilisation" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="text-2xl font-bold text-primary font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual: scoring grid */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">
                      Grille d{"'"}évaluation R4RPO
                    </div>
                    <div className="text-xs text-muted-foreground">
                      15 critères · Score sur 35
                    </div>
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
                      <span className="text-[12px] text-muted-foreground w-40 shrink-0">
                        {crit.name}
                      </span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-rocket-teal-glow"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${crit.score}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-primary w-8 text-right">
                        {crit.score}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-muted-foreground">
                    Moyenne de notre vivier prioritaire :{" "}
                    <strong className="text-foreground">90%</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — 3 MODES DE RECRUTEMENT ══ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Sparkles className="w-3 h-3" />
              Flexible par design
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              3 modes de recrutement. Un seul partenaire.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              RPO, CDD ou CDI — peu importe votre besoin, nous avons la
              solution. Et contrairement aux cabinets, vous ne payez pas 20% du
              salaire.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Rocket,
                badge: "Le plus demandé",
                title: "RPO — Recruteur intégré",
                desc: "Un TA Specialist intégré dans vos équipes, vos outils et vos rituels. Il recrute à votre place, au nom de votre entreprise. Le modèle le plus efficace et le plus économique du marché.",
                points: [
                  "Sourcing multi-canal dédié (LinkedIn Recruiter, approche directe)",
                  "Intégration totale dans vos outils (ATS, Slack, Teams)",
                  "Reporting hebdomadaire avec KPIs précis",
                  "Marque employeur protégée — le TA recrute en VOTRE nom",
                  "1 à 5 jours/semaine, 3 mois min",
                ],
                prix: "À partir de 500€/jour",
                highlight: true,
                color: "border-primary/30 ring-1 ring-primary/10",
                badgeColor: "bg-primary text-primary-foreground",
              },
              {
                icon: UserCheck,
                badge: null,
                title: "CDI — Recrutement permanent",
                desc: "Vous avez un poste stratégique à pourvoir ? Nos TA identifient le candidat idéal et vous accompagnent jusqu'à la signature. Bien plus efficace qu'un cabinet.",
                points: [
                  "Chasse directe de profils seniors et pénuriques",
                  "Shortlist qualifiée en 2 semaines max",
                  "Accompagnement négociation salariale",
                  "Garantie de remplacement incluse",
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
                desc: "Pic d'activité, remplacement, projet spécifique ? On vous trouve le bon profil rapidement, en CDD ou freelance. Sans la lenteur d'un process classique.",
                points: [
                  "Mobilisation rapide (< 2 semaines)",
                  "Profils pré-qualifiés dans notre vivier",
                  "Suivi pendant toute la mission",
                  "Conversion CDI possible à tout moment",
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
                  <span
                    className={`absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full ${mode.badgeColor}`}
                  >
                    {mode.badge}
                  </span>
                )}
                <mode.icon
                  className={`w-8 h-8 mb-4 ${mode.highlight ? "text-primary" : "text-muted-foreground"}`}
                />
                <h3 className="text-xl font-bold mb-3">{mode.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {mode.desc}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {mode.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${mode.highlight ? "text-primary" : "text-muted-foreground/60"}`}
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-gray-100">
                  <div
                    className={`text-lg font-bold mb-4 ${mode.highlight ? "text-primary" : ""}`}
                  >
                    {mode.prix}
                  </div>
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

      {/* ══ SECTION 5 — CE QUE VOUS OBTENEZ ══ */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ce que vous obtenez concrètement
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              Pas de promesses vagues. Voici les résultats concrets que votre TA
              Specialist produit dès les premières semaines.
            </p>
          </div>

          {/* Photo: bureau */}
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
                alt="L'équipe Rocket4RPO en action"
                width={1200}
                height={500}
                className="w-full h-[240px] md:h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: "Sourcing multi-canal",
                text: "LinkedIn Recruiter, approche directe, réseau, communautés spécialisées, job boards ciblés. Votre TA active tous les canaux pertinents pour chasser les meilleurs profils du marché.",
              },
              {
                icon: FileCheck,
                title: "Shortlists qualifiées en 1 semaine",
                text: "Chaque candidat présenté a été évalué sur ses compétences, sa motivation et son adéquation culturelle. Pas de volume inutile — de la précision chirurgicale.",
              },
              {
                icon: MessageSquare,
                title: "Coordination totale avec vos managers",
                text: "Votre TA gère les briefs, les debriefs, les feedbacks et le suivi. Vos hiring managers se concentrent sur leur métier — on s'occupe du reste.",
              },
              {
                icon: BarChart3,
                title: "Reporting hebdomadaire transparent",
                text: "Chaque semaine : pipeline, KPIs, taux de conversion, délais. Vous savez exactement où en sont vos recrutements. Zéro zone d'ombre.",
              },
              {
                icon: Users,
                title: "Intégration totale dans vos équipes",
                text: "Le TA rejoint vos outils (ATS, Slack, Teams), vos rituels d'équipe et votre culture. Il représente VOTRE marque employeur comme un salarié.",
              },
              {
                icon: Shield,
                title: "Marque employeur protégée",
                text: "Chaque message, chaque approche candidat est faite au nom de votre entreprise. Votre réputation est entre les mains du top 1% — pas d'un stagiaire en cabinet.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-white border border-gray-100 hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — COMMENT ÇA MARCHE (dark) ══ */}
      <section className="py-20 bg-rocket-dark">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              De votre appel à votre premier recrutement
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              Un process rodé, transparent et rapide. Pendant que les cabinets
              {" « "}cherchent{" » "}, nous recrutons déjà.
            </p>
          </div>

          {/* Photo: bureau-travail */}
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
                alt="L'équipe Rocket4RPO en mission"
                width={1200}
                height={500}
                className="w-full h-[200px] md:h-[260px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5 text-white/70 text-xs font-medium">
                Nos équipes en mission
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-rocket-teal/20 via-rocket-teal/40 to-rocket-teal/20" />

            {[
              {
                step: "J0",
                icon: Target,
                title: "Brief & scorecard",
                text: "On analyse vos besoins et on construit une scorecard précise avec vos managers. Pas de brief vague — des critères mesurables.",
              },
              {
                step: "J1",
                icon: Users,
                title: "Matching TA",
                text: "On sélectionne le TA Specialist idéal selon votre secteur, vos enjeux et votre culture. Un matching sur-mesure, pas un CV aléatoire.",
              },
              {
                step: "J2",
                icon: Rocket,
                title: "Intégration 1 semaine",
                text: "Le TA rejoint vos outils et rituels. Opérationnel immédiatement. Première shortlist qualifiée le jour même.",
              },
              {
                step: "S2-S4",
                icon: CheckCircle,
                title: "Résultats concrets",
                text: "Sourcing ciblé, shortlists qualifiées, recrutements signés. KPIs suivis chaque semaine. Vous voyez le ROI immédiatement.",
              },
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
                <span className="inline-block text-xs font-mono text-rocket-teal-glow font-bold bg-rocket-teal/10 px-2.5 py-0.5 rounded-full">
                  {item.step}
                </span>
                <h3 className="font-bold text-white text-base mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7 — COMBIEN ÇA COÛTE VRAIMENT ══ */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              Combien ça coûte vraiment ?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Comparaison honnête pour 10 recrutements sur 4 mois. Les chiffres
              parlent d{"'"}eux-mêmes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                model: "RPO Rocket4RPO",
                price: "~30 000€",
                detail: "TJM prévisible, tout inclus, zéro frais cachés",
                highlight: true,
                savings: "Jusqu'à 75% d'économies",
              },
              {
                model: "Cabinet classique",
                price: "120 000 – 200 000€",
                detail: "15-25% du salaire par recrutement",
                highlight: false,
                savings: null,
              },
              {
                model: "Recruteur interne (CDI)",
                price: "40 – 55 000€/an + charges",
                detail: "3 mois pour le recruter + onboarding",
                highlight: false,
                savings: null,
              },
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
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <p className="text-sm font-medium mb-3 text-muted-foreground">
                  {item.model}
                </p>
                <p
                  className={`text-3xl font-bold mb-2 ${item.highlight ? "text-primary" : ""}`}
                >
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

      {/* ══ SECTION 8 — TÉMOIGNAGES ══ */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Star className="w-3 h-3" />
              Résultats prouvés
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Ils recrutaient mal. Maintenant ils recrutent avec nous.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
              Ce ne sont pas des témoignages édulcorés. Ce sont des résultats
              mesurables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "En 3 semaines, notre TA avait déjà présenté 8 candidats qualifiés. On a recruté notre Head of Sales en 28 jours. Avec un cabinet, on en aurait eu pour 3 mois et le triple du budget.",
                name: "Sarah L.",
                role: "VP People",
                company: "Scale-up SaaS B2B",
                metric: "28 jours",
                metricLabel: "time-to-hire",
              },
              {
                quote:
                  "Ce qui m'a convaincu, c'est la qualité du sourcing. Pas de CV génériques — chaque profil était ciblé et validé. On sentait qu'ils connaissaient notre marché mieux que notre propre équipe RH.",
                name: "Thomas R.",
                role: "CEO",
                company: "Fintech, 45 collaborateurs",
                metric: "2-3 sem.",
                metricLabel: "rétention 12 mois",
              },
              {
                quote:
                  "On avait besoin de 5 développeurs en 4 mois. Le TA s'est intégré à notre équipe comme s'il avait toujours été là. Résultat : 5 recrutements, 0 départ à 12 mois. On ne reviendra jamais en arrière.",
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
                className="p-7 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed flex-1 mb-5">
                  {"«"} {t.quote} {"»"}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}, {t.company}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary font-mono">
                      {t.metric}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {t.metricLabel}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 9 — POURQUOI ROCKET4RPO (dark) ══ */}
      <section className="py-20 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[150px]" />
        </div>
        <div className="relative container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pourquoi Rocket4RPO est le choix évident
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              Ce ne sont pas des arguments marketing. Ce sont des faits
              vérifiables qui expliquent pourquoi les entreprises qui nous
              essaient ne reviennent jamais en arrière.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Crown,
                title: "Le top 1% des TA de France",
                desc: "50+ recruteurs évalués sur 15 critères exigeants. Seuls les 90%+ intègrent notre vivier. Vous ne travaillez qu'avec l'élite absolue du recrutement français.",
              },
              {
                icon: Zap,
                title: "Opérationnel en 1 semaine, pas en 3 mois",
                desc: "Un cabinet met 2-3 semaines à démarrer. Recruter un recruteur interne prend 3 mois. Nous : 1 semaine, première shortlist dès les premiers jours.",
              },
              {
                icon: Shield,
                title: "Zéro risque, flexibilité totale",
                desc: "Pas de success fee. Pas d'engagement long. Si le TA ne convient pas, remplacement en 1 semaine. Ajustez votre rythme à tout moment. Vous gardez le contrôle.",
              },
              {
                icon: Building2,
                title: "Un vivier de 300+ experts derrière chaque mission",
                desc: "Vous ne dépendez pas d'un seul recruteur. Derrière chaque mission, c'est toute la force de notre vivier. Le bon profil, immédiatement.",
              },
              {
                icon: Target,
                title: "200+ recrutements, Time-to-hire : 4 semaines",
                desc: "200+ recrutements réalisés avec Time-to-hire : 4 semaines en moyenne. Ce n'est pas du volume — c'est de la précision. Chaque recrutement est un succès mesurable.",
              },
              {
                icon: TrendingUp,
                title: "5x moins cher qu'un cabinet",
                desc: "10 recrutements : ~30K€ vs 120-200K€ en cabinet. Même qualité (voire meilleure), 5x moins cher. Le choix rationnel est évident.",
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
                  <h3 className="text-white font-semibold mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Urgency CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-2xl mx-auto text-center p-8 rounded-2xl bg-rocket-teal/10 border border-rocket-teal/20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-semibold mb-4">
              <Clock className="w-3 h-3" />
              Disponibilité limitée
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Nos meilleurs TA sont très demandés et nos créneaux se remplissent
              vite. Plus vous attendez, plus le délai de matching s{"'"}allonge
              — et plus vos postes vacants vous coûtent cher. Réservez votre
              diagnostic gratuit maintenant.
            </p>
            <a
              href={HUBSPOT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-5 px-8 py-3.5 text-sm font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Réserver mon créneau avant qu{"'"}il soit trop tard{" "}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTION 10 — FAQ + CTA ══ */}
      <FAQSection faqs={faqs} className="bg-rocket-cream" />

      <CTASection
        title="Arrêtez de perdre du temps et de l'argent. Passez au RPO."
        subtitle="30 min de diagnostic gratuit avec un expert RPO. On analyse votre besoin et on vous dit honnêtement quel modèle — RPO, CDD ou CDI — est fait pour vous. Aucun engagement, aucun frais."
        ctaLabel="Réserver mon diagnostic gratuit"
      />
    </>
  );
}
