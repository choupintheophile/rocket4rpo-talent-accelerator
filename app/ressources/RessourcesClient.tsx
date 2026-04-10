"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ClipboardCheck,
  BarChart3,
  CheckSquare,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

const resources = [
  {
    title: "Guide : RPO vs Cabinet — Le comparatif complet",
    description:
      "12 pages pour comprendre les différences de coût, flexibilité et efficacité entre RPO et cabinet de recrutement traditionnel.",
    badge: "Guide PDF",
    icon: FileText,
    downloads: "",
    file: "/resources/guide-rpo-vs-cabinet.pdf",
  },
  {
    title: "Template : Scorecard de recrutement",
    description:
      "Notre modèle de scorecard utilisé pour évaluer les candidats de manière structurée, quel que soit le poste.",
    badge: "Template",
    icon: ClipboardCheck,
    downloads: "",
    file: "/resources/scorecard-recrutement.pdf",
  },
  {
    title: "Étude : Grille de rémunération Tech 2026",
    description:
      "Fourchettes salariales actualisées pour 30+ postes Tech en Île-de-France et région.",
    badge: "Étude",
    icon: BarChart3,
    downloads: "",
    file: "/resources/grille-remuneration-tech-2026.pdf",
  },
  {
    title: "Checklist : Les 10 étapes d'un onboarding réussi",
    description:
      "La checklist utilisée par nos Talent Acquisition Specialists pour intégrer un nouveau collaborateur efficacement.",
    badge: "Checklist",
    icon: CheckSquare,
    downloads: "",
    file: "/resources/checklist-onboarding.pdf",
  },
];

export default function RessourcesClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Ressources" }]} />

      <section className="section-padding pt-8 bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {"Ressources gratuites pour "}
              <span className="text-gradient">
                {"accélérer vos recrutements"}
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Guides, templates et études conçus par nos experts Talent
              Acquisition
            </p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="p-6 rounded-xl border border-border bg-card flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-2">
                      {resource.badge}
                    </span>
                    <h2 className="text-lg font-bold leading-snug">
                      {resource.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {resource.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground/70">
                  {resource.downloads}
                </p>
                <a
                  href={resource.file}
                  download
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Télécharger le PDF <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
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
