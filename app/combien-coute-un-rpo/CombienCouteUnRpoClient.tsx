"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { InternalLinks } from "@/components/shared/InternalLinks";
import {
  ArrowRight,
  Rocket,
  Check,
  X,
  Calculator,
  Calendar,
  Package,
  Target,
  TrendingDown,
  Shield,
  Building2,
  Briefcase,
  Users,
  Minus,
} from "lucide-react";

const HUBSPOT = "/rdv";

const BILLING_MODELS = [
  {
    icon: Calendar,
    title: "Forfait mensuel",
    subtitle: "Le plus courant",
    desc: "Nombre de jours/semaine fixe (3, 4 ou 5) facturé mensuellement. Visibilité budgétaire totale. Ajustable chaque mois après 3 mois.",
    pros: ["Prévisibilité budgétaire", "Volume de recrutements illimité", "Plus le volume ↑, plus le coût unitaire ↓"],
  },
  {
    icon: Target,
    title: "TJM",
    subtitle: "Taux journalier moyen",
    desc: "Facturation au jour travaillé. Utile pour des missions courtes ou des pics ponctuels. Plus cher au prorata qu'un forfait mensuel.",
    pros: ["Flexibilité totale", "Idéal pour un pic ponctuel", "Pas d'engagement long terme"],
  },
  {
    icon: Package,
    title: "À la mission",
    subtitle: "Rare en RPO",
    desc: "Facturation par recrutement livré, à l'image d'un cabinet. Peu courant en RPO — rapproche du modèle cabinet traditionnel.",
    pros: ["Résultat garanti", "Coût connu d'avance", "Pas de risque si pas de recrutement"],
  },
];

const PRICING_BY_SIZE = [
  {
    type: "Startup",
    size: "< 50 salariés",
    profile: "1-3 recrutements / mois",
    duration: "3-6 mois",
    recommendation: "Forfait 3 jours/semaine",
    note: "Tarification sur devis",
  },
  {
    type: "Scale-up",
    size: "50-250 salariés",
    profile: "3-8 recrutements / mois",
    duration: "6-12 mois",
    recommendation: "Forfait 4-5 jours/semaine",
    note: "Tarification sur devis",
  },
  {
    type: "ETI",
    size: "250+ salariés",
    profile: "5-15 recrutements / mois",
    duration: "12 mois+",
    recommendation: "Équipe de 2-3 TA dédiés",
    note: "Tarification sur devis",
  },
];

const INCLUDED = [
  "Sourcing multicanal (LinkedIn Recruiter, jobboards, approches directes)",
  "Qualification candidats et pré-screening téléphonique",
  "Scorecard et reporting KPI hebdomadaire",
  "Coordination avec les hiring managers internes",
  "Suivi des promesses d'embauche et closing",
  "Participation aux rituels d'équipe (stand-up, retros)",
  "Transfert de documentation et process",
];

const EXCLUDED = [
  "Licences ATS (Greenhouse, Lever, Recruitee…)",
  "Licence LinkedIn Recruiter dédiée (≈ 120€/mois)",
  "Jobboards premium (Welcome to the Jungle, APEC…)",
  "Tests techniques externes (Codility, HackerRank)",
  "Frais de déplacement si présentiel demandé",
];

const NEGOTIATION_TIPS = [
  {
    icon: Calendar,
    title: "Durée d'engagement",
    desc: "Un engagement de 6-12 mois permet d'obtenir un meilleur tarif journalier qu'un engagement de 3 mois.",
  },
  {
    icon: Users,
    title: "Volume de jours",
    desc: "5 jours/semaine sur un seul TA coûtent moins cher au prorata que 3 jours/semaine partagés.",
  },
  {
    icon: Shield,
    title: "Clause de sortie",
    desc: "Négociez un préavis de 1 mois après 3 mois d'engagement pour garder de la flexibilité.",
  },
  {
    icon: Package,
    title: "Partage d'outils",
    desc: "Si vous fournissez l'ATS et la licence LinkedIn, le tarif du RPO peut être réduit.",
  },
];

export default function CombienCouteUnRpoClient({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Combien coûte un RPO" }]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[150px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative container-wide py-12 md:py-16 lg:py-20">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 1, y: 0 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium mb-6">
              <Calculator className="w-3.5 h-3.5" /> Tarifs RPO
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-white">
              Combien coûte un RPO en France ?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                Prix, modèles et exemples (2026)
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Modèles de facturation, fourchettes par taille d{"'"}entreprise, simulation 10
              recrutements et levier de négociation. Tout ce qu{"'"}il faut savoir pour bien
              budgéter un RPO.
            </p>

            <div className="mt-8 rounded-2xl border border-rocket-teal/30 bg-rocket-teal/5 backdrop-blur p-6 md:p-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-rocket-teal-glow mb-4">
                En bref
              </p>
              <ul className="space-y-2.5 text-white/85 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>
                    Tarification sur devis, basée sur jours/semaine et durée de mission.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>
                    Jusqu{"'"}à 5x moins cher qu{"'"}un cabinet classique sur 10+ recrutements.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>
                    Plusieurs modèles : forfait mensuel (le plus courant), TJM, ou à la mission.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/calculateur"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Calculator className="w-4 h-4" /> Calculer mes économies
              </Link>
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BILLING MODELS */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Modèles
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              3 modèles de facturation d{"'"}un RPO
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {BILLING_MODELS.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${
                  i === 0
                    ? "border-rocket-teal/40 bg-rocket-teal/5 ring-1 ring-rocket-teal/10"
                    : "border-border/60 bg-background"
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rocket-teal/10 text-rocket-teal mb-4">
                  <model.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-1">{model.title}</h3>
                <p className="text-xs text-rocket-teal font-medium uppercase tracking-wider mb-4">
                  {model.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{model.desc}</p>
                <ul className="space-y-2">
                  {model.pros.map((pro, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-rocket-teal" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING BY SIZE */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Par taille
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Recommandations par taille d{"'"}entreprise
            </h2>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[700px] border-collapse text-sm bg-background rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="text-left py-4 px-5 font-semibold">Profil</th>
                  <th className="text-left py-4 px-5 font-semibold">Taille</th>
                  <th className="text-left py-4 px-5 font-semibold">Volume recrutements</th>
                  <th className="text-left py-4 px-5 font-semibold">Durée mission</th>
                  <th className="text-left py-4 px-5 font-semibold">Recommandation</th>
                  <th className="text-left py-4 px-5 font-semibold">Tarif</th>
                </tr>
              </thead>
              <tbody>
                {PRICING_BY_SIZE.map((row, i) => (
                  <tr
                    key={row.type}
                    className="border-t border-border/60 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-4 px-5 font-bold">{row.type}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.size}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.profile}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.duration}</td>
                    <td className="py-4 px-5 text-muted-foreground">{row.recommendation}</td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rocket-teal/10 text-rocket-teal text-xs font-semibold">
                        {row.note}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SCENARIO 10 HIRES */}
      <section className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Simulation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Scénario : 10 recrutements sur 6 mois
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comparaison des 3 modèles pour une scale-up qui doit recruter 10 profils Tech/Sales
              sur 6 mois.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border-2 border-rocket-teal/40 bg-rocket-teal/5 p-6 ring-2 ring-rocket-teal/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-5 h-5 text-rocket-teal" />
                <h3 className="font-bold">RPO</h3>
              </div>
              <p className="text-3xl font-bold text-rocket-teal">Sur devis</p>
              <p className="text-xs text-muted-foreground mt-1">
                Jusqu{"'"}à 5x moins cher qu{"'"}un cabinet
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-rocket-teal shrink-0" /> Forfait mensuel
                  prévisible
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-rocket-teal shrink-0" /> Coût unitaire
                  décroissant
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-rocket-teal shrink-0" /> Pas de frais cachés
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold">Cabinet de recrutement</h3>
              </div>
              <p className="text-3xl font-bold">120 – 200K €</p>
              <p className="text-xs text-muted-foreground mt-1">15-25 % du salaire annuel brut</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Minus className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" /> Facturation au
                  succès
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" /> Explose sur profils
                  seniors
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" /> Pas d{"'"}économie
                  d{"'"}échelle
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border/60 bg-background p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold">Recruteur interne</h3>
              </div>
              <p className="text-3xl font-bold">60 – 90K € / an</p>
              <p className="text-xs text-muted-foreground mt-1">Salaire chargé d{"'"}un TA senior</p>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Minus className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" /> + coût outils (ATS,
                  LinkedIn)
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" /> Recrutement long (2-3 mois)
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" /> Charge fixe CDI
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/calculateur"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <Calculator className="w-4 h-4" /> Simuler mon scénario précis
            </Link>
          </div>
        </div>
      </section>

      {/* INCLUDED / EXCLUDED */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Inclus / exclus
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Ce qui est dans le prix (et pas)</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-background border-2 border-emerald-500/30"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                <Check className="w-5 h-5 text-emerald-500" /> Inclus dans le prix
              </h3>
              <ul className="space-y-3">
                {INCLUDED.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-background border border-border/60"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                <X className="w-5 h-5 text-red-500" /> Souvent en supplément
              </h3>
              <ul className="space-y-3">
                {EXCLUDED.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEGOTIATION */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Négociation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              4 leviers pour négocier un contrat RPO
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEGOTIATION_TIPS.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rocket-teal/10 text-rocket-teal mb-4">
                  <tip.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Questions fréquentes sur le prix du RPO" />

      {/* INTERNAL LINKS */}
      <InternalLinks
        currentPath="/combien-coute-un-rpo"
        paths={["/calculateur", "/qu-est-ce-que-le-rpo", "/rpo-vs-cabinet", "/offre"]}
        title="Aller plus loin"
      />

      <CTASection />
    </>
  );
}
