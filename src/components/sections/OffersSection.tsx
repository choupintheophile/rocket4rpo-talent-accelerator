"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, UserPlus, ClipboardCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const offers = [
  {
    icon: Users,
    title: "Un recruteur int\u00e9gr\u00e9 \u00e0 votre \u00e9quipe",
    description:
      "Int\u00e9grez un Talent Acquisition senior dans vos outils, vos rituels et votre culture. De 1 \u00e0 5 jours par semaine, sans CDI. Premi\u00e8re shortlist en 48h.",
    href: "/offre/rpo",
    popular: true,
  },
  {
    icon: UserPlus,
    title: "Trouvez votre futur TA",
    description:
      "Vous voulez internaliser votre recrutement\u00a0? On vous trouve LE bon profil Talent Acquisition en CDI. Shortlist en 2-3 semaines, suivi d\u2019int\u00e9gration inclus.",
    href: "/offre/recrutement-ta",
    popular: false,
  },
  {
    icon: ClipboardCheck,
    title: "Auditez votre process recrutement",
    description:
      "Diagnostic complet de votre organisation recrutement\u00a0: process, outils, KPIs, exp\u00e9rience candidat. Plan d\u2019action concret en 2 semaines.",
    href: "/offre/audit-recrutement",
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
            {"3 fa\u00e7ons d\u2019acc\u00e9l\u00e9rer vos recrutements, "}
            <span className="text-gradient">
              {"sans les prix d\u2019un cabinet"}
            </span>
          </>
        }
        description="Chaque entreprise a des besoins diff\u00e9rents. Toutes m\u00e9ritent un recrutement rapide, pr\u00e9visible et rentable. Choisissez la formule qui correspond \u00e0 votre rythme de croissance."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
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
