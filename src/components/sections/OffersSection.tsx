"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, UserPlus, Search, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const offers = [
  {
    icon: Users,
    title: "Expertise senior sans le coût d\u2019un CDI",
    description:
      "Un recruteur senior dans votre équipe quelques jours par semaine. Vous accédez à 7 ans d\u2019expertise en recrutement, sans charges fixes. Idéal pour 3 à 8 recrutements par trimestre.",
    href: "/offre/talent-acquisition-temps-partage",
    popular: true,
  },
  {
    icon: UserPlus,
    title: "Une équipe TA dédiée, immédiatement opérationnelle",
    description:
      "Un recruteur dédié à 100\u00a0% intégré dans vos équipes, immergé dans votre culture. Pour les entreprises qui recrutent 10+ profils par trimestre et veulent un time-to-hire garanti.",
    href: "/offre/talent-acquisition-temps-plein",
    popular: false,
  },
  {
    icon: Search,
    title: "Recrutez votre propre TA sans risque d\u2019erreur",
    description:
      "Nous identifions et qualifions les meilleurs Talent Acquisition Managers et Specialists du marché. Des profils expérimentés, adaptés à vos enjeux de croissance.",
    href: "/offre/recrutement-talent-acquisition",
    popular: false,
  },
  {
    icon: Wrench,
    title: "Divisez vos coûts de sourcing par 2",
    description:
      "Audit de votre stack recrutement, sélection d\u2019outils performants et abordables, formation de vos équipes. Résultat\u00a0: plus de candidats qualifiés, moins de dépenses outils.",
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
            {"4 façons d\u2019accélérer vos recrutements, "}
            <span className="text-gradient">
              {"sans les prix d\u2019un cabinet"}
            </span>
          </>
        }
        description="Chaque entreprise a des besoins différents. Toutes méritent un recrutement rapide, prévisible et rentable. Choisissez la formule qui correspond à votre rythme de croissance."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={offer.popular ? "md:col-span-2" : ""}
          >
            <Link
              href={offer.href}
              className={`group relative block p-8 rounded-2xl bg-background/80 backdrop-blur-xl border hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 h-full ${
                offer.popular
                  ? "border-primary/20 shadow-sm"
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              {/* Gradient top accent */}
              <div
                className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${
                  offer.popular
                    ? "bg-gradient-to-r from-transparent via-primary to-transparent"
                    : "bg-gradient-to-r from-transparent via-border to-transparent"
                }`}
              />

              {offer.popular && (
                <span className="absolute -top-3 right-6 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  Le plus populaire
                </span>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-200">
                <offer.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {offer.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-200">
                {"En savoir plus"}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
