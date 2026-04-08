"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

const scopes = [
  { label: "Sales", href: "/metiers/recrutement-sales", emoji: "🎯" },
  { label: "IT / Tech", href: "/metiers/recrutement-it", emoji: "💻" },
  { label: "Finance", href: "/metiers/recrutement-finance", emoji: "📊" },
  { label: "Marketing", href: "/metiers/recrutement-marketing", emoji: "📣" },
  { label: "Support", href: "/metiers/recrutement-support", emoji: "🤝" },
];

export const ScopeSection = () => (
  <section className="section-padding">
    <div className="container-wide">
      <SectionHeading
        badge="Périmètre"
        title="Nous recrutons sur toutes les fonctions clés"
        description="Sales, Tech, Finance, Marketing, Support : nos TA Specialists couvrent l'ensemble de vos besoins de recrutement."
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {scopes.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={s.href}
              className="flex flex-col items-center p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all text-center group"
            >
              <span className="text-3xl mb-3">{s.emoji}</span>
              <span className="font-semibold group-hover:text-primary transition-colors">{s.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
