"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { caseStudies } from "@/data/caseStudies";

const gradients = [
  "from-primary/5 to-primary/10",
  "from-blue-500/5 to-blue-500/10",
  "from-violet-500/5 to-violet-500/10",
];

export const CaseStudiesPreview = () => (
  <section id="cas-clients" className="section-padding">
    <div className="container-wide">
      <SectionHeading
        badge="Cas clients"
        title={
          <>
            {"Des r\u00e9sultats concrets pour des entreprises "}
            <span className="text-gradient">ambitieuses</span>
          </>
        }
      />
      <div className="grid md:grid-cols-3 gap-6">
        {caseStudies.slice(0, 3).map((cs, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/cas-clients#${cs.slug}`}
              className={`group block rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]}`}
            >
              <div className="p-7">
                <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
                  {cs.industry}
                </span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {cs.company}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {cs.challenge}
                </p>

                {/* Large KPI numbers */}
                <div className="flex items-end gap-6 pt-5 border-t border-border/50">
                  {cs.metrics.map((m, j) => (
                    <div key={j}>
                      <p className="text-2xl md:text-3xl font-bold text-primary leading-none">
                        {m.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/cas-clients"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          {"Voir tous les cas clients"} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);
