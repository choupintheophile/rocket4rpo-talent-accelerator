"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, UserPlus, Search, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const offers = [
  {
    icon: Users,
    title: "Expertise senior sans le co\u00fbt d\u2019un CDI",
    description:
      "Un Talent Acquisition Specialist senior int\u00e9gr\u00e9 \u00e0 vos \u00e9quipes quelques jours par semaine. Vous acc\u00e9dez \u00e0 7 ans d\u2019expertise Sales SaaS, sans charges fixes. Id\u00e9al pour 3 \u00e0 8 recrutements par trimestre.",
    href: "/offre/talent-acquisition-temps-partage",
    popular: true,
  },
  {
    icon: UserPlus,
    title: "Une \u00e9quipe TA d\u00e9di\u00e9e, imm\u00e9diatement op\u00e9rationnelle",
    description:
      "Un expert TA \u00e0 100\u00a0% sur vos recrutements, immerg\u00e9 dans votre culture. Pour les scale-ups qui recrutent 10+ profils Sales par trimestre et veulent un time-to-hire garanti.",
    href: "/offre/talent-acquisition-temps-plein",
    popular: false,
  },
  {
    icon: Search,
    title: "Recrutez votre propre TA sans risque d\u2019erreur",
    description:
      "Nous identifions et qualifions les meilleurs Talent Acquisition Managers et Specialists du march\u00e9. Des profils qui connaissent le recrutement Sales SaaS, pas des g\u00e9n\u00e9ralistes.",
    href: "/offre/recrutement-talent-acquisition",
    popular: false,
  },
  {
    icon: Wrench,
    title: "Divisez vos co\u00fbts de sourcing par 2",
    description:
      "Audit de votre stack recrutement, s\u00e9lection d\u2019outils performants et abordables, formation de vos \u00e9quipes. R\u00e9sultat\u00a0: plus de candidats qualifi\u00e9s, moins de d\u00e9penses outils.",
    href: "/offre/outils-sourcing-enablement",
    popular: false,
  },
];

export const OffersSection = () => (
  <section className="section-padding">
    <div className="container-wide">
      <SectionHeading
        badge="Notre offre"
        title={
          <>
            {"4 fa\u00e7ons d\u2019acc\u00e9l\u00e9rer vos recrutements Sales, "}
            <span className="text-gradient">
              {"sans les prix d\u2019un cabinet"}
            </span>
          </>
        }
        description="Chaque entreprise a des besoins diff\u00e9rents. Toutes m\u00e9ritent un recrutement rapide, pr\u00e9visible et rentable. Choisissez la formule qui correspond \u00e0 votre rythme de croissance."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              href={offer.href}
              className={`group relative block p-8 rounded-2xl border hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full ${offer.popular ? "border-primary/30 shadow-[0_0_20px_-5px_rgba(var(--primary-rgb,99,102,241),0.15)] hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb,99,102,241),0.25)]" : "border-border"}`}
            >
              {offer.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  Le plus populaire
                </span>
              )}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <offer.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {offer.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {"En savoir plus"} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
