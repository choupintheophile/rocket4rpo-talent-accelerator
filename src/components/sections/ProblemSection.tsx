"use client";

import { motion } from "framer-motion";
import { Clock, Users, Banknote } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const akaru = [0.165, 0.84, 0.44, 1] as const;

const problems = [
  {
    icon: Clock,
    title: "Vos recrutements traînent",
    description:
      "Le time-to-hire moyen est de 42 jours. Chaque jour sans le bon profil coûte en productivité et en opportunités manquées.",
    solution: "Résultat Rocket4RPO\u00a0: première shortlist en 48h, time-to-hire ramené à 6 semaines.",
  },
  {
    icon: Users,
    title: "Vos managers perdent du temps",
    description:
      "Tris de CVs non qualifiés, entretiens improductifs, relances cabinets. Pendant ce temps, vos équipes compensent les postes vacants et la productivité baisse.",
    solution:
      "Notre TA senior gère 100\u00a0% du pipe\u00a0: vos managers ne voient que les 3 meilleurs profils par poste.",
  },
  {
    icon: Banknote,
    title: "Les cabinets coûtent trop cher",
    description:
      "Les cabinets facturent 15 à 25\u00a0% du salaire brut annuel par recrutement. Pour 10 postes, la facture atteint facilement six chiffres. Avec Rocket4RPO\u00a0: ~44\u00a0000\u00a0€ pour les mêmes 10 recrutements.",
    solution:
      "Coût 3x inférieur aux cabinets. Engagement flexible à partir d\u20191 mois. Budget prévisible.",
  },
];

export const ProblemSection = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <SectionHeading
        badge="Le problème"
        title={
          <>
            {"Recruter en 2026\u00a0: "}
            <span className="text-gradient">{"3 problèmes qui coûtent cher"}</span>
          </>
        }
      />
      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, skewY: 2 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: akaru,
            }}
            className="relative rounded-2xl border border-border p-8 flex flex-col overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <p.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
              {p.description}
            </p>
            {/* Solution text animates AFTER the card */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.15 + 0.5,
                ease: akaru,
              }}
              className="text-sm font-semibold text-primary"
            >
              {p.solution}
            </motion.p>
            {/* Animated border-bottom line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.15 + 0.3,
                ease: akaru,
              }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/30 origin-left"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
