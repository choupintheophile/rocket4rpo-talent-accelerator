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
  Linkedin,
  Target,
  TrendingUp,
  Users,
  Building2,
  FileText,
  Search,
  UserCheck,
  Award,
  Check,
} from "lucide-react";

const HUBSPOT = "/rdv";

const TEAM = [
  {
    name: "Clément Martin",
    role: "CEO & Fondateur",
    linkedin: "https://www.linkedin.com/in/clementmartinr4s/",
  },
  {
    name: "Théophile Choupin",
    role: "Sales Director",
    linkedin: "https://www.linkedin.com/in/theophile-choupin/",
  },
  {
    name: "Julien Regnacq",
    role: "Sales Director",
    linkedin: "https://www.linkedin.com/in/julien-regnacq/",
  },
  {
    name: "Marion Longo",
    role: "Chief of Staff",
    linkedin: "https://www.linkedin.com/in/marion-longo/",
  },
];

const METHOD = [
  {
    icon: FileText,
    title: "1. Diagnostic gratuit",
    desc: "30 minutes pour analyser votre contexte, vos postes et vos objectifs. Diagnostic offert, sans engagement.",
  },
  {
    icon: UserCheck,
    title: "2. Matching TA",
    desc: "Nous sélectionnons un TA senior dans notre réseau, expert de votre secteur et de vos profils cibles.",
  },
  {
    icon: Search,
    title: "3. Intégration & sourcing",
    desc: "Démarrage en 1 semaine. Première shortlist en 48h. Accès à vos outils, participation aux rituels d'équipe.",
  },
  {
    icon: Target,
    title: "4. Pilotage KPI",
    desc: "Reporting hebdomadaire, scorecards partagées, revues mensuelles. Transparence totale sur le pipeline.",
  },
];

const VALUES = [
  "Coût prévisible, jamais de frais cachés",
  "Un TA senior du top 1%, pas un junior sous-formé",
  "Première shortlist garantie en 48h",
  "Flexibilité mensuelle : ajustez le volume",
  "Transfert de compétences inclus",
  "Intégration totale à vos outils et rituels",
];

interface Props {
  faqs: { question: string; answer: string }[];
  stats: { label: string; value: string }[];
}

export default function AProposClient({ faqs, stats }: Props) {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "À propos" }]} />

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
              <Rocket className="w-3.5 h-3.5" /> Notre histoire
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-white">
              À propos de Rocket4RPO —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                recruteurs spécialisés RPO en France
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Cabinet spécialisé en Recruitment Process Outsourcing, membre du groupe Rocket4GTM.
              Nous intégrons les meilleurs Talent Acquisition Specialists directement dans vos
              équipes pour accélérer vos recrutements.
            </p>

            <div className="mt-8 rounded-2xl border border-rocket-teal/30 bg-rocket-teal/5 backdrop-blur p-6 md:p-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-rocket-teal-glow mb-4">
                En bref
              </p>
              <ul className="space-y-2.5 text-white/85 text-sm md:text-base">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>Cabinet fondé en 2020 à Paris, bureaux à Paris et Villeurbanne.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>Plus de 200 recrutements réalisés depuis la création.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-1 shrink-0 text-rocket-teal" />
                  <span>
                    Plus de 50 clients accompagnés : startups, scale-ups, ETI Tech.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Échanger avec l{"'"}équipe <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/offre"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all"
              >
                Découvrir notre offre
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section-padding" ref={missionRef}>
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Rendre le recrutement <span className="text-gradient">accessible</span> aux
              entreprises Tech
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Notre conviction : un modèle à 15-25% du salaire empêche les startups et scale-ups
              d{"'"}investir sereinement dans le recrutement. Chez Rocket4RPO, nous proposons un
              modèle forfaitaire prévisible, jusqu{"'"}à 5x moins cher, avec des Talent Acquisition
              Specialists intégrés directement dans vos équipes.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Notre objectif : permettre à chaque entreprise Tech française de recruter les bons
              profils, au bon moment, sans compromis sur la qualité ni exploser son budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="section-padding bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white"
        ref={statsRef}
      >
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Nos chiffres clés</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Notre méthode
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Notre méthodologie en 4 étapes</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHOD.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rocket-teal/10 text-rocket-teal mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section-padding" ref={teamRef}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              L{"'"}équipe
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              L{"'"}équipe <span className="text-gradient">dirigeante</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Une équipe passionnée par le recrutement et la croissance des entreprises Tech.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center p-6 rounded-xl bg-secondary border border-border/60"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-bold text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Nos engagements
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Ce que nous garantissons</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {VALUES.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/60"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rocket-teal/15 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-rocket-teal" />
                </span>
                <span className="text-sm font-medium">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Ils nous font confiance</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              50+ entreprises nous ont fait confiance pour accélérer leurs recrutements.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="aspect-[3/1] rounded-xl bg-secondary/40 border border-border/40 flex items-center justify-center"
              >
                <Building2 className="w-6 h-6 text-muted-foreground/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} title="Questions fréquentes sur Rocket4RPO" />

      {/* INTERNAL LINKS */}
      <InternalLinks
        currentPath="/a-propos"
        paths={["/offre", "/qu-est-ce-que-le-rpo", "/rocket4gtm", "/contact"]}
        title="Aller plus loin"
      />

      <CTASection />
    </>
  );
}
