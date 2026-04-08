"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CaseStudy {
  slug: string;
  company: string;
  industry: string;
  challenge: string;
  intervention: string;
  metrics: { value: string; label: string }[];
}

export default function CasClientsPageClient({ studies }: { studies: CaseStudy[] }) {
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
            {studies.map((cs, i) => (
              <motion.div
                key={cs.slug}
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
                <div className="flex flex-wrap items-center gap-8 mt-6 pt-6 border-t border-border">
                  {cs.metrics.map((m, j) => (
                    <div key={j}>
                      <p className="text-2xl font-bold text-primary">{m.value}</p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                  <Link
                    href={`/cas-clients/${cs.slug}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Voir le cas complet <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
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
