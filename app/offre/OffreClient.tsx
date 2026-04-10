"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Search,
  FileCheck,
  MessageSquare,
  Zap,
  Shield,
  Target,
  Rocket,
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const faqs = [
  {
    question: "Quelle est la différence entre RPO et cabinet de recrutement ?",
    answer:
      "Un cabinet travaille en externe sur des missions ponctuelles, facturées 15-25% du salaire annuel. Le RPO intègre un recruteur directement dans vos équipes, vos outils et vos rituels — comme un membre de votre entreprise, mais sans CDI. Coût prévisible au TJM.",
  },
  {
    question: "Combien ça coûte concrètement ?",
    answer:
      "À partir de 550€/jour. Pour 10 recrutements sur 4 mois, comptez environ 44 000€ — soit 3x moins qu'un cabinet classique (60 000 à 200 000€). Facturation mensuelle, sans frais cachés.",
  },
  {
    question: "En combien de temps le recruteur est-il opérationnel ?",
    answer:
      "48h. Le TA Specialist rejoint vos outils (ATS, Slack, Teams) et vos rituels dès le premier jour. Première shortlist qualifiée sous 48h.",
  },
  {
    question: "Et si le recruteur ne convient pas ?",
    answer:
      "On le remplace sous 48h. Notre réseau de freelances TA seniors nous permet de réagir immédiatement, sans interruption de service.",
  },
  {
    question: "Quels types de postes pouvez-vous recruter ?",
    answer:
      "Tous. Sales, Tech/IT, Finance, Marketing, Support, Product, Data, Management. Nos TA sont des généralistes expérimentés avec des spécialisations sectorielles.",
  },
  {
    question: "Quelle durée d'engagement minimum ?",
    answer:
      "3 mois recommandé pour des résultats solides. Pas d'engagement rigide — préavis d'1 mois. Vous pouvez ajuster le rythme (1 à 5 jours/semaine) à tout moment.",
  },
];

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function OffreClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Notre offre" }]} />

      {/* ── HERO ── */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fade}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Notre offre
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Un recruteur senior intégré à votre équipe.{" "}
                <span className="text-gradient">Sans CDI.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Rocket4RPO met un Talent Acquisition Specialist expérimenté directement dans vos
                locaux, vos outils et vos rituels. Il recrute à votre place — tous types de postes,
                tous secteurs — avec la même rigueur qu'un recruteur interne, mais sans le coût d'un CDI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Réserver un diagnostic gratuit <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/calculateur"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-secondary transition-colors"
                >
                  Calculer mes économies
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS OBTENEZ ── */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Ce que vous obtenez concrètement</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Pas de jargon. Voici exactement ce qui se passe quand vous travaillez avec nous.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "Sourcing multi-canal", text: "LinkedIn, approche directe, réseau, communautés. Votre TA source activement les meilleurs profils, pas des CVs de job boards." },
              { icon: FileCheck, title: "Shortlists qualifiées en 48h", text: "Chaque candidat présenté a été évalué sur ses compétences, sa motivation et son adéquation culturelle. Pas de volume — de la qualité." },
              { icon: MessageSquare, title: "Coordination avec vos managers", text: "Votre TA gère les briefs, les debriefs, les feedbacks et le suivi. Vos managers se concentrent sur leur métier." },
              { icon: BarChart3, title: "Reporting hebdomadaire", text: "Chaque semaine : pipeline, KPIs, taux de conversion, délais. Vous savez exactement où en sont vos recrutements." },
              { icon: Users, title: "Intégration totale", text: "Le TA rejoint vos outils (ATS, Slack, Teams), vos rituels d'équipe et votre culture. Il représente VOTRE marque employeur, pas Rocket4RPO." },
              { icon: Shield, title: "Marque employeur protégée", text: "Chaque message, chaque approche candidat est faite au nom de votre entreprise. Votre image est entre de bonnes mains." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-6 rounded-xl bg-background border border-border/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Comment ça marche</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              De votre premier appel à vos premiers recrutements signés.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", icon: Target, title: "Brief & scorecard", text: "On analyse vos besoins et on construit une scorecard précise avec vos managers. Durée : 1 jour.", time: "J0" },
              { step: "02", icon: Users, title: "Matching", text: "On sélectionne le TA Specialist idéal selon votre secteur, vos enjeux et votre culture.", time: "J1" },
              { step: "03", icon: Rocket, title: "Intégration", text: "Le TA rejoint vos outils et rituels. Opérationnel en 48h. Première shortlist immédiate.", time: "J2" },
              { step: "04", icon: CheckCircle, title: "Résultats", text: "Sourcing ciblé, shortlists qualifiées, recrutements signés. KPIs suivis chaque semaine.", time: "S2-S4" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary font-bold">{item.time}</span>
                <h3 className="font-bold text-lg mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOISISSEZ VOTRE RYTHME ── */}
      <section className="section-padding bg-rocket-cream">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Choisissez votre rythme</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Un seul service, plusieurs formats. Vous ajustez selon votre volume de recrutement.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Temps partagé",
                rythme: "1 à 3 jours / semaine",
                ideal: "3-8 recrutements par trimestre",
                prix: "À partir de 550€/jour",
                popular: false,
              },
              {
                name: "Temps plein",
                rythme: "4 à 5 jours / semaine",
                ideal: "10+ recrutements par trimestre",
                prix: "Nous consulter",
                popular: true,
              },
              {
                name: "Sur-mesure",
                rythme: "Selon vos besoins",
                ideal: "Pic d'activité, projet spécifique",
                prix: "Nous consulter",
                popular: false,
              },
            ].map((format, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative p-8 rounded-2xl border text-center ${
                  format.popular
                    ? "border-primary/30 bg-background shadow-md"
                    : "border-border/60 bg-background"
                }`}
              >
                {format.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    Le plus demandé
                  </span>
                )}
                <h3 className="text-xl font-bold mb-4">{format.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{format.rythme}</p>
                <p className="text-sm text-muted-foreground mb-4">Idéal pour : {format.ideal}</p>
                <p className="text-lg font-bold text-primary mb-6">{format.prix}</p>
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full"
                >
                  Choisir ce format
                </a>
              </motion.div>
            ))}
          </div>
          <motion.p {...fade} className="mt-8 text-center text-sm text-muted-foreground">
            Engagement minimum recommandé : 3 mois. Préavis : 1 mois. Facturation mensuelle.
          </motion.p>
        </div>
      </section>

      {/* ── COÛT COMPARÉ ── */}
      <section className="section-padding bg-rocket-navy-soft text-background">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Combien ça coûte vraiment ?</h2>
            <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">
              Comparaison pour 10 recrutements sur 4 mois.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { model: "RPO Rocket4RPO", price: "~44 000€", detail: "TJM prévisible, tout inclus", highlight: true },
              { model: "Cabinet classique", price: "60 000 – 200 000€", detail: "15-25% du salaire par recrutement", highlight: false },
              { model: "Recruteur interne (CDI)", price: "40 – 55 000€/an + charges", detail: "2-3 mois pour le recruter", highlight: false },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-8 rounded-2xl text-center ${
                  item.highlight
                    ? "bg-primary/10 border border-primary/30"
                    : "bg-background/5 border border-background/10"
                }`}
              >
                <p className="text-sm font-medium mb-2 text-background/80">{item.model}</p>
                <p className={`text-3xl font-bold mb-2 ${item.highlight ? "text-primary" : "text-background"}`}>
                  {item.price}
                </p>
                <p className="text-sm text-background/60">{item.detail}</p>
                {item.highlight && (
                  <a
                    href={HUBSPOT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Choisir le RPO <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection faqs={faqs} className="bg-rocket-cream" />

      {/* ── CTA ── */}
      <CTASection />
    </>
  );
}
