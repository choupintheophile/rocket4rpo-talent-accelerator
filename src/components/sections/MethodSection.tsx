"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ClipboardCheck, UserCheck, Plug, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Audit & Brief",
    text: "Nous analysons vos besoins et construisons une scorecard pr\u00e9cise avec vos managers.",
  },
  {
    num: "02",
    icon: UserCheck,
    title: "Matching",
    text: "Notre TA Specialist est s\u00e9lectionn\u00e9 selon votre secteur, vos enjeux et votre culture.",
  },
  {
    num: "03",
    icon: Plug,
    title: "Int\u00e9gration",
    text: "Le TA s\u2019int\u00e8gre dans vos outils et rituels. Op\u00e9rationnel en quelques jours.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "R\u00e9sultats",
    text: "Sourcing cibl\u00e9, shortlists qualifi\u00e9es, recrutements sign\u00e9s. KPIs suivis chaque semaine.",
  },
];

export const MethodSection = () => (
  <section className="section-padding bg-foreground text-background">
    <div className="container-wide">
      <SectionHeading
        badge="Notre m\u00e9thode"
        title="Un processus simple pour des r\u00e9sultats mesurables"
        description="De l\u2019audit initial aux recrutements sign\u00e9s, chaque \u00e9tape est pens\u00e9e pour maximiser la qualit\u00e9 et la rapidit\u00e9."
      />

      {/* Horizontal timeline */}
      <div className="grid md:grid-cols-4 gap-6 relative">
        {/* Connection line (visible on md+) */}
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-background/15" />

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative text-center"
          >
            {/* Step number circle */}
            <div className="relative z-10 w-20 h-20 mx-auto rounded-full border-2 border-primary/40 bg-foreground flex items-center justify-center mb-5">
              <s.icon className="w-7 h-7 text-primary" />
            </div>

            {/* Arrow between steps (md+) */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 -right-3 transform -translate-y-1/2 text-primary/40">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 7h10m0 0L7 3m4 4L7 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}

            <span className="text-xs font-semibold text-primary tracking-wider uppercase">
              {"\u00c9tape "}
              {s.num}
            </span>
            <h3 className="text-lg font-bold mt-2 mb-2">{s.title}</h3>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs mx-auto">
              {s.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
