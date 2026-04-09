"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  challenge: string;
  intervention: string;
  metrics: Metric[];
}

const testimonialQuotes: Record<string, { quote: string; author: string }> = {
  "saas-scale-up-sales": {
    quote: "Le TA Rocket4RPO s\u2019est intégré à nos rituels comme un membre de l\u2019équipe. La qualité des shortlists grâce à leur base de profils Sales est incomparable.",
    author: "S.D., VP People",
  },
  "fintech-engineering": {
    quote: "Le premier CV pertinent est arrivé en 3 jours. Sans fonction TA en interne, nous étions bloqués \u2014 le modèle temps partagé a tout débloqué.",
    author: "M.L., CTO",
  },
  "editeur-logiciel-marketing": {
    quote: "La méthodologie structurée nous a donné une visibilité inédite sur notre pipeline.",
    author: "J.M., DRH",
  },
};

export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Cas clients", href: "/cas-clients" },
          { label: study.company },
        ]}
      />

      {/* Hero */}
      <section className="section-padding pt-8 pb-12">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary mb-6">
              {study.industry}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-10">
              {study.company}
            </h1>

            {/* KPI metrics row */}
            <div className="flex flex-wrap items-center gap-10">
              {study.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  <p className="text-4xl md:text-5xl font-bold text-primary">{m.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two-column content */}
      <section className="section-padding pt-0">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl border border-border"
            >
              <h2 className="text-xl font-bold mb-4">Le défi</h2>
              <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-border"
            >
              <h2 className="text-xl font-bold mb-4">Notre intervention</h2>
              <p className="text-muted-foreground leading-relaxed">{study.intervention}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Résultats obtenus
            </h2>
            <div className="flex flex-wrap justify-center gap-12">
              {study.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary">{m.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial quote */}
      {testimonialQuotes[study.slug] && (
        <section className="section-padding bg-primary/5 border-y border-primary/10">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-xl md:text-2xl italic text-muted-foreground leading-relaxed">
                &ldquo;{testimonialQuotes[study.slug].quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">
                &mdash; {testimonialQuotes[study.slug].author}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        title="Obtenez les mêmes résultats"
        subtitle="Nos experts Talent Acquisition sont prêts à transformer vos recrutements."
        ctaLabel="Échanger avec Rocket4RPO"
        ctaHref="/contact"
      />

      {/* Back link */}
      <div className="container-wide py-8">
        <Link
          href="/cas-clients"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voir tous les cas clients
        </Link>
      </div>
    </>
  );
}
