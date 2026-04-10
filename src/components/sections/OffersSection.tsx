"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle, Users, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const benefits = [
  { icon: Clock, text: "Première shortlist en 48h" },
  { icon: Users, text: "Intégration totale dans vos outils et rituels" },
  { icon: CheckCircle, text: "Tous types de postes, tous secteurs" },
  { icon: BarChart3, text: "Reporting hebdomadaire des KPIs" },
];

export const OffersSection = () => (
  <section className="section-padding">
    <div className="container-wide">
      <SectionHeading
        badge="Notre offre"
        title={
          <>
            {"Un recruteur senior intégré à votre équipe. "}
            <span className="text-gradient">Sans CDI.</span>
          </>
        }
        description="De 1 à 5 jours par semaine, un Talent Acquisition Specialist expérimenté rejoint vos outils, vos rituels et votre culture pour recruter à votre place."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="p-8 md:p-10 rounded-2xl border border-primary/20 bg-background shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <b.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <div>
              <p className="text-2xl font-bold text-primary">À partir de 550€/jour</p>
              <p className="text-sm text-muted-foreground">~44 000€ pour 10 recrutements — 3x moins qu'un cabinet</p>
            </div>
            <Link
              href="/offre"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
            >
              Découvrir l'offre <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
