"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, UserPlus, Search, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const offers = [
  {
    icon: Users,
    title: "TA \u00e0 temps partag\u00e9",
    description:
      "Un Talent Acquisition Specialist senior int\u00e9gr\u00e9 \u00e0 vos \u00e9quipes quelques jours par semaine. Flexibilit\u00e9 maximale, expertise imm\u00e9diate.",
    href: "/offre/talent-acquisition-temps-partage",
    popular: true,
  },
  {
    icon: UserPlus,
    title: "TA \u00e0 temps plein",
    description:
      "Un expert Talent Acquisition d\u00e9di\u00e9 \u00e0 100\u00a0% \u00e0 vos recrutements. Immersion totale dans votre culture et vos processus.",
    href: "/offre/talent-acquisition-temps-plein",
    popular: false,
  },
  {
    icon: Search,
    title: "Recrutement de Talent Acquisition",
    description:
      "Nous recrutons pour vous des Talent Acquisition Managers et Specialists adapt\u00e9s \u00e0 vos enjeux de croissance.",
    href: "/offre/recrutement-talent-acquisition",
    popular: false,
  },
  {
    icon: Wrench,
    title: "Outils de sourcing & enablement",
    description:
      "S\u00e9lection d\u2019outils de sourcing abordables, formation de vos \u00e9quipes et optimisation de votre stack recrutement.",
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
            {"Des solutions de Talent Acquisition "}
            <span className="text-gradient">
              {"adapt\u00e9es \u00e0 chaque besoin"}
            </span>
          </>
        }
        description="Du temps partag\u00e9 au recrutement en passant par l\u2019outillage, nous couvrons l\u2019ensemble de vos besoins en Talent Acquisition."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={offer.href}
              className="group relative block p-8 rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
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
