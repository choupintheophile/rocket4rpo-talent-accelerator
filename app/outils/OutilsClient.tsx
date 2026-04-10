"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play,
  Scale,
  Calculator,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

const tools = [
  {
    title: "Démo interactive",
    description:
      "Vivez le process RPO en 4 étapes interactives. Voyez comment nous trouvons vos candidats.",
    icon: Play,
    href: "/demo",
    cta: "Lancer la démo",
    badge: "2 min",
  },
  {
    title: "Comparateur RPO",
    description:
      "RPO vs cabinet vs recrutement interne : comparez les coûts, délais et flexibilité.",
    icon: Scale,
    href: "/comparateur",
    cta: "Comparer",
    badge: "1 min",
  },
  {
    title: "Calculateur ROI",
    description:
      "Estimez combien vous pouvez économiser en passant au RPO. Résultat instantané.",
    icon: Calculator,
    href: "/calculateur",
    cta: "Calculer",
    badge: "30 sec",
  },
  {
    title: "Diagnostic recrutement",
    description:
      "7 questions pour évaluer la maturité de votre process recrutement. Score + recommandations.",
    icon: ClipboardCheck,
    href: "/assessment",
    cta: "Faire le diagnostic",
    badge: "2 min",
  },
];

export default function OutilsClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Outils" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {"Nos outils "}
              <span className="text-gradient">{"gratuits"}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Évaluez vos besoins, calculez vos économies, et découvrez notre
              process — en quelques minutes.
            </p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="relative p-6 rounded-2xl border border-border bg-card flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                {/* Badge */}
                <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {tool.badge}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h2 className="text-lg font-bold leading-snug mb-2">
                  {tool.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {tool.description}
                </p>

                {/* CTA */}
                <Link
                  href={tool.href}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {tool.cta} <ArrowRight className="w-4 h-4" />
                </Link>
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
