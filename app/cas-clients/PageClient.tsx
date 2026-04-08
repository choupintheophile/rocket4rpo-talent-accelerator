"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { caseStudies } from "@/data/caseStudies";
import { motion } from "framer-motion";

export default function CasClientsPageClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cas clients" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Des résultats concrets pour des entreprises <span className="text-gradient">ambitieuses</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">Chaque mission est unique. Voici comment nous avons accompagné nos clients.</p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={i}
                id={cs.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-10 rounded-2xl border border-border"
              >
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">{cs.industry}</span>
                <h2 className="text-2xl font-bold mb-4">{cs.company}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-2">Le défi</h3>
                    <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Notre intervention</h3>
                    <p className="text-muted-foreground leading-relaxed">{cs.intervention}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-6 pt-6 border-t border-border">
                  {cs.metrics.map((m, j) => (
                    <div key={j}>
                      <p className="text-2xl font-bold text-primary">{m.value}</p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
