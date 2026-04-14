"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { ArrowRight, BookOpen, Hash, Link2 } from "lucide-react";

const HUBSPOT = "/rdv";

export interface GlossaryTerm {
  id: string;
  term: string;
  alternate?: string;
  category: string;
  definition: string;
  example: string;
  internalLink?: { href: string; label: string };
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "rpo",
    term: "RPO",
    alternate: "Recruitment Process Outsourcing",
    category: "Modèle",
    definition:
      "Externalisation du processus de recrutement à un prestataire qui intègre ses recruteurs directement dans l'entreprise cliente. Modèle alternatif au cabinet, avec un coût forfaitaire prévisible jusqu'à 5x moins cher.",
    example:
      "Une scale-up qui recrute 10 profils sur 6 mois fait appel à un RPO 4 jours/semaine plutôt qu'à un cabinet.",
    internalLink: { href: "/qu-est-ce-que-le-rpo", label: "Qu'est-ce que le RPO" },
  },
  {
    id: "ta",
    term: "Talent Acquisition Specialist",
    alternate: "TA",
    category: "Rôle",
    definition:
      "Recruteur spécialisé dans l'acquisition de talents, responsable du sourcing, de la qualification et du closing des candidats. Il peut être interne, en cabinet, ou en RPO intégré à l'équipe.",
    example:
      "Un TA senior prend en charge de 3 à 8 postes simultanés selon leur complexité et la séniorité recherchée.",
  },
  {
    id: "time-to-hire",
    term: "Time-to-hire",
    alternate: "TTH / TTF / Time-to-fill",
    category: "KPI",
    definition:
      "Délai entre l'ouverture d'un poste et la signature du contrat d'un candidat. KPI majeur du recrutement qui mesure l'efficacité du process. Moyenne française : 40 à 60 jours selon le secteur.",
    example:
      "Un time-to-hire de 30 jours sur un poste Tech est considéré comme excellent en 2026.",
  },
  {
    id: "sourcing",
    term: "Sourcing multicanal",
    category: "Méthode",
    definition:
      "Identification et contact de candidats via plusieurs canaux complémentaires : LinkedIn Recruiter, jobboards, approches directes, cooptation, réseaux communautaires. L'efficacité dépend de la diversification.",
    example:
      "Un sourcing équilibré combine 40% LinkedIn, 20% jobboards, 20% approches directes, 20% cooptation.",
  },
  {
    id: "scorecard",
    term: "Scorecard",
    category: "Outil",
    definition:
      "Grille de notation structurée utilisée pour évaluer les candidats sur des critères prédéfinis (compétences, culture fit, motivation). Permet d'objectiver les décisions et de comparer les candidats de manière équitable.",
    example:
      "Une scorecard Tech typique note sur 5 : compétences techniques, communication, autonomie, curiosité, alignement culturel.",
  },
  {
    id: "cooptation",
    term: "Cooptation",
    alternate: "Referral",
    category: "Canal",
    definition:
      "Pratique consistant à recruter via les recommandations de collaborateurs internes, souvent associée à une prime. Génère des candidats de meilleure qualité avec une rétention supérieure, à un coût réduit.",
    example:
      "Chez les scale-ups Tech, la cooptation génère 20 à 40% des recrutements, avec une prime de 500 à 3000€.",
  },
  {
    id: "pipeline",
    term: "Pipeline candidats",
    category: "Process",
    definition:
      "Ensemble des candidats à différents stades du processus de recrutement (sourcés, qualifiés, entretien, offre). Un pipeline sain contient 3-5x plus de candidats que de postes à pourvoir.",
    example:
      "Pour 10 recrutements à pourvoir, un pipeline sain compte 30-50 candidats qualifiés en parallèle.",
  },
  {
    id: "ats",
    term: "ATS",
    alternate: "Applicant Tracking System",
    category: "Outil",
    definition:
      "Logiciel de suivi des candidatures qui centralise les candidats, les échanges et les décisions tout au long du processus de recrutement. Indispensable au-delà de 5-10 recrutements par an.",
    example:
      "Les ATS les plus utilisés en France : Greenhouse, Lever, Recruitee, Teamtailor, Welcome Kit.",
  },
  {
    id: "employer-branding",
    term: "Employer branding",
    alternate: "Marque employeur",
    category: "Stratégie",
    definition:
      "Ensemble des perceptions et de la réputation d'une entreprise en tant qu'employeur. Impacte directement l'attractivité, la qualité des candidats et les taux d'acceptation des offres.",
    example:
      "Une page carrière soignée, des témoignages collaborateurs et une politique de rémunération transparente renforcent l'employer branding.",
  },
  {
    id: "onboarding",
    term: "Onboarding",
    alternate: "Intégration",
    category: "Process",
    definition:
      "Processus d'intégration d'un nouveau collaborateur, de la signature du contrat à son autonomie complète. Un onboarding structuré réduit de 50% le risque de départ précoce dans les 6 premiers mois.",
    example:
      "Un onboarding Tech typique dure 3 à 6 mois : semaine 1 setup, mois 1 shadowing, mois 3 premier projet, mois 6 autonomie.",
  },
  {
    id: "hiring-manager",
    term: "Hiring manager",
    alternate: "Manager recruteur",
    category: "Rôle",
    definition:
      "Manager opérationnel responsable du recrutement pour son équipe. Décisionnaire final sur les candidats, il travaille en binôme avec le TA tout au long du processus.",
    example:
      "Un bon alignement TA / hiring manager démarre par un brief de cadrage de 45-60 minutes en début de mission.",
  },
  {
    id: "boolean",
    term: "Boolean search",
    alternate: "Recherche booléenne",
    category: "Technique",
    definition:
      "Technique de recherche candidats utilisant des opérateurs logiques (AND, OR, NOT, guillemets, parenthèses) pour affiner les résultats sur LinkedIn, Google ou les jobboards.",
    example:
      "(\"Software Engineer\" OR \"Développeur\") AND (Python OR Django) AND Paris NOT senior cible les devs Python juniors à Paris.",
  },
  {
    id: "cph",
    term: "Cost-per-hire",
    alternate: "CPH",
    category: "KPI",
    definition:
      "Coût total moyen pour réaliser un recrutement, incluant les salaires des recruteurs, les licences d'outils, les jobboards et les frais annexes. Permet de comparer objectivement les modèles (interne, RPO, cabinet).",
    example:
      "Un CPH moyen en interne est de 3000-5000€, contre 15000-30000€ via un cabinet au success fee.",
  },
  {
    id: "oar",
    term: "Offer acceptance rate",
    alternate: "OAR / Taux d'acceptation",
    category: "KPI",
    definition:
      "Pourcentage de candidats qui acceptent l'offre d'embauche qui leur est faite. KPI clé de l'efficacité du closing. Un OAR inférieur à 70% signale un problème sur la rémunération, la marque employeur ou le process.",
    example:
      "Un OAR de 85% est considéré comme excellent et indique un bon alignement offre / candidat tout au long du process.",
  },
  {
    id: "retention",
    term: "Retention rate",
    alternate: "Taux de rétention",
    category: "KPI",
    definition:
      "Pourcentage de collaborateurs qui restent en poste au-delà d'une période donnée (6 mois, 1 an, 2 ans). KPI final qui mesure la qualité globale du recrutement et de l'onboarding.",
    example:
      "Un taux de rétention à 12 mois supérieur à 90% est excellent. En dessous de 75%, cela signale un problème de fit ou d'onboarding.",
  },
];

const CATEGORIES = Array.from(new Set(GLOSSARY_TERMS.map((t) => t.category)));

export default function GlossaireRpoClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Glossaire RPO" }]} />

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
              <BookOpen className="w-3.5 h-3.5" /> Glossaire
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-white">
              Glossaire RPO & Recrutement —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                15 termes essentiels
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Les définitions claires et accessibles des 15 termes incontournables du RPO, du
              Talent Acquisition et du recrutement en entreprise. Pour parler le bon langage avec
              vos équipes et vos prestataires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-10 bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">
            Navigation rapide
          </h2>
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_TERMS.map((term) => (
              <a
                key={term.id}
                href={`#${term.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/60 text-xs font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <Hash className="w-3 h-3" />
                {term.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GLOSSARY ENTRIES */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="space-y-10">
            {GLOSSARY_TERMS.map((term, i) => (
              <motion.article
                key={term.id}
                id={term.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="scroll-mt-24 p-6 md:p-8 rounded-2xl bg-background border border-border/60 hover:border-rocket-teal/30 hover:shadow-lg transition-all"
              >
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
                    {term.category}
                  </span>
                  <a
                    href={`#${term.id}`}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                    aria-label={`Lien direct vers ${term.term}`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  {term.term}
                  {term.alternate && (
                    <span className="ml-3 text-base md:text-lg font-normal text-muted-foreground">
                      ({term.alternate})
                    </span>
                  )}
                </h2>

                <p className="mt-4 text-base text-foreground/80 leading-relaxed">
                  {term.definition}
                </p>

                <div className="mt-4 p-4 rounded-xl bg-rocket-teal/5 border border-rocket-teal/20">
                  <p className="text-xs font-semibold tracking-wider uppercase text-rocket-teal mb-1.5">
                    Exemple concret
                  </p>
                  <p className="text-sm text-foreground/75">{term.example}</p>
                </div>

                {term.internalLink && (
                  <div className="mt-4">
                    <Link
                      href={term.internalLink.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {term.internalLink.label} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SUMMARY */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Termes par <span className="text-gradient">catégorie</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {CATEGORIES.map((cat) => {
              const terms = GLOSSARY_TERMS.filter((t) => t.category === cat);
              return (
                <div
                  key={cat}
                  className="p-5 rounded-xl bg-background border border-border/60"
                >
                  <h3 className="text-sm font-bold text-primary mb-3">{cat}</h3>
                  <ul className="space-y-1.5">
                    {terms.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="text-sm text-foreground/80 hover:text-primary hover:underline"
                        >
                          {t.term}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <InternalLinks
        currentPath="/glossaire-rpo"
        paths={["/qu-est-ce-que-le-rpo", "/combien-coute-un-rpo", "/offre", "/assessment"]}
        title="Aller plus loin"
      />

      <CTASection
        title="Besoin d'un expert pour vos recrutements ?"
        gradientWord="expert"
        subtitle="30 minutes de diagnostic gratuit avec un Talent Acquisition senior. Sans engagement."
      />
    </>
  );
}
