import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { caseStudies } from "@/data/caseStudies";

export const CaseStudiesPreview = () => (
  <section className="section-padding">
    <div className="container-wide">
      <SectionHeading
        badge="Cas clients"
        title={<>Des résultats concrets pour des entreprises <span className="text-gradient">ambitieuses</span></>}
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
              to={`/cas-clients#${cs.slug}`}
              className="group block p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all h-full"
            >
              <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">{cs.industry}</span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{cs.company}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cs.challenge}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {cs.metrics.map((m, j) => (
                  <div key={j}>
                    <p className="text-lg font-bold text-primary">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/cas-clients" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
          Voir tous les cas clients <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);
