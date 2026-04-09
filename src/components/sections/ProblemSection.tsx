"use client";

import { motion } from "framer-motion";
import { Clock, Users, Banknote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const problems = [
  {
    icon: Clock,
    title: "Vos recrutements tra\u00eenent",
    description:
      "Le time-to-hire moyen est de 42 jours dans la Tech. Chaque jour sans le bon profil co\u00fbte en productivit\u00e9 et en opportunit\u00e9s manqu\u00e9es.",
    solution: "Nous r\u00e9duisons le d\u00e9lai moyen \u00e0 6 semaines, sourcing inclus.",
  },
  {
    icon: Users,
    title: "Vos managers perdent du temps",
    description:
      "Tris de CVs, entretiens non qualifi\u00e9s, allers-retours avec les cabinets. Vos op\u00e9rationnels consacrent 30\u00a0% de leur temps au recrutement.",
    solution:
      "Notre TA g\u00e8re le pipe de A \u00e0 Z\u00a0: vos managers ne voient que les meilleurs profils.",
  },
  {
    icon: Banknote,
    title: "Les cabinets co\u00fbtent trop cher",
    description:
      "15-25\u00a0% du salaire annuel par recrutement, soit 60\u00a0000 \u00e0 200\u00a0000\u00a0\u20ac pour 10 postes. Avec le RPO Rocket4RPO\u00a0: ~44\u00a0000\u00a0\u20ac pour les m\u00eames 10 recrutements.",
    solution:
      "Le RPO co\u00fbte 2 \u00e0 3x moins cher qu\u2019un cabinet, avec un engagement flexible.",
  },
];

export const ProblemSection = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <SectionHeading
        badge="Le probl\u00e8me"
        title={
          <>
            {"Recruter dans la Tech, c\u2019est "}
            <span className="text-gradient">{"de plus en plus complexe"}</span>
          </>
        }
      />
      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border p-8 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
              {p.description}
            </p>
            <p className="text-sm font-semibold text-primary">{p.solution}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
