"use client";

import { motion } from "framer-motion";
import { Clock, Users, Banknote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const problems = [
  {
    icon: Clock,
    title: "67 jours pour recruter un Sales\u00a0: votre pipeline n\u2019attend pas",
    description:
      "En France, le time-to-hire moyen d\u2019un profil commercial Tech d\u00e9passe 9 semaines. Chaque semaine de poste vacant, c\u2019est 15\u00a0000\u00a0\u20ac de pipeline non g\u00e9n\u00e9r\u00e9 et un objectif trimestriel compromis.",
    solution: "R\u00e9sultat Rocket4RPO\u00a0: premi\u00e8re shortlist en 48h, time-to-hire ramen\u00e9 \u00e0 6 semaines.",
  },
  {
    icon: Users,
    title: "Vos managers passent 30\u00a0% de leur temps \u00e0 recruter au lieu de vendre",
    description:
      "Tris de CVs non qualifi\u00e9s, entretiens improductifs, relances cabinets. Pendant ce temps, vos deals stagnent et votre \u00e9quipe compense les postes vacants.",
    solution:
      "Notre TA senior g\u00e8re 100\u00a0% du pipe\u00a0: vos managers ne voient que les 3 meilleurs profils par poste.",
  },
  {
    icon: Banknote,
    title: "60\u00a0000 \u00e0 200\u00a0000\u00a0\u20ac pour 10 recrutements en cabinet\u00a0: il existe mieux",
    description:
      "Les cabinets facturent 15 \u00e0 25\u00a0% du salaire brut annuel par recrutement. Pour 10 postes Sales, la facture atteint facilement six chiffres. Avec Rocket4RPO\u00a0: ~44\u00a0000\u00a0\u20ac pour les m\u00eames 10 recrutements.",
    solution:
      "Co\u00fbt 3x inf\u00e9rieur aux cabinets. Engagement flexible \u00e0 partir d\u20191 mois. Budget pr\u00e9visible.",
  },
];

export const ProblemSection = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <SectionHeading
        badge="Le probl\u00e8me"
        title={
          <>
            {"Recruter des Sales SaaS en 2026\u00a0: "}
            <span className="text-gradient">{"3 probl\u00e8mes qui co\u00fbtent cher"}</span>
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
