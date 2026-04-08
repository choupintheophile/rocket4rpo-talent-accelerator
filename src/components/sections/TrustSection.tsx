"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Award } from "lucide-react";

const stats = [
  { icon: Clock, value: "7+", label: "années d'expertise Talent Acquisition" },
  { icon: Shield, value: "200+", label: "recrutements accompagnés" },
  { icon: Award, value: "100%", label: "focus écosystème Tech & SaaS" },
];

export const TrustSection = () => (
  <section className="py-12 md:py-16 border-b border-border">
    <div className="container-wide">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
      >
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto"
      >
        Fondée sur l'expertise opérationnelle des équipes <a href="https://www.rocket4sales.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-current">Rocket4Sales</a> en Talent Acquisition au sein de l'écosystème Tech.
      </motion.p>
    </div>
  </section>
);
