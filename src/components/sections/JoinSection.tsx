"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const JoinSection = () => (
  <section className="section-padding">
    <div className="container-wide">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border p-8 md:p-12 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            badge="Rejoignez-nous"
            title="Vous êtes Talent Acquisition Manager ou Specialist ?"
            description="Rocket4RPO recherche en permanence des experts du recrutement pour rejoindre notre réseau. Approche directe, missions variées, entreprises ambitieuses."
            centered
          />
          <div className="text-center">
            <Link
              href="/recrutement"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Découvrir les opportunités <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
