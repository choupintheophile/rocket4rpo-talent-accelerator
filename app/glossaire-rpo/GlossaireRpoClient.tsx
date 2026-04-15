"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { InternalLinks } from "@/components/shared/InternalLinks";
import { EnBref } from "@/components/shared/EnBref";
import { ArrowRight, BookOpen, Hash, Link2 } from "lucide-react";

const HUBSPOT = "/rdv";

import { GLOSSARY_TERMS, CATEGORIES } from "./terms";
export type { GlossaryTerm } from "./terms";



export default function GlossaireRpoClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Glossaire RPO" }]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full bg-rocket-teal/8 blur-[150px]" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative container-wide py-12 md:py-16 lg:py-20">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 1, y: 0 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Glossaire
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-white">
              Glossaire RPO & Recrutement —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                15 termes essentiels
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Les définitions claires et accessibles des 15 termes incontournables du RPO, du
              Talent Acquisition et du recrutement en entreprise. Pour parler le bon langage avec
              vos équipes et vos prestataires.
            </p>

            <EnBref
              theme="dark"
              bullets={[
                "15 termes clés du RPO et du recrutement, définis en 1-2 phrases chacun.",
                "Acronymes essentiels : RPO, TA, ATS, TTF, TTH, NPS, scorecard, cooptation.",
                "Couvre les 3 niveaux : stratégique (marque employeur, talent review), tactique (plan de chasse, pipeline) et opérationnel (booléen, sourcing multicanal).",
                "Ressource de référence utilisée par les équipes RH, DRH et managers en recrutement.",
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-10 bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-4">
            Navigation rapide
          </h2>
          <div className="flex flex-wrap gap-2">
            {GLOSSARY_TERMS.map((term) => (
              <a
                key={term.id}
                href={`#${term.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/60 text-xs font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all"
              >
                <Hash className="w-3 h-3" />
                {term.term}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GLOSSARY ENTRIES */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="space-y-10">
            {GLOSSARY_TERMS.map((term, i) => (
              <motion.article
                key={term.id}
                id={term.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="scroll-mt-24 p-6 md:p-8 rounded-2xl bg-background border border-border/60 hover:border-rocket-teal/30 hover:shadow-lg transition-all"
              >
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
                    {term.category}
                  </span>
                  <a
                    href={`#${term.id}`}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                    aria-label={`Lien direct vers ${term.term}`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold">
                  {term.term}
                  {term.alternate && (
                    <span className="ml-3 text-base md:text-lg font-normal text-muted-foreground">
                      ({term.alternate})
                    </span>
                  )}
                </h2>

                <p className="mt-4 text-base text-foreground/80 leading-relaxed">
                  {term.definition}
                </p>

                <div className="mt-4 p-4 rounded-xl bg-rocket-teal/5 border border-rocket-teal/20">
                  <p className="text-xs font-semibold tracking-wider uppercase text-rocket-teal mb-1.5">
                    Exemple concret
                  </p>
                  <p className="text-sm text-foreground/75">{term.example}</p>
                </div>

                {term.internalLink && (
                  <div className="mt-4">
                    <Link
                      href={term.internalLink.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      {term.internalLink.label} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SUMMARY */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Termes par <span className="text-gradient">catégorie</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {CATEGORIES.map((cat) => {
              const terms = GLOSSARY_TERMS.filter((t) => t.category === cat);
              return (
                <div
                  key={cat}
                  className="p-5 rounded-xl bg-background border border-border/60"
                >
                  <h3 className="text-sm font-bold text-primary mb-3">{cat}</h3>
                  <ul className="space-y-1.5">
                    {terms.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="text-sm text-foreground/80 hover:text-primary hover:underline"
                        >
                          {t.term}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <InternalLinks
        currentPath="/glossaire-rpo"
        paths={["/qu-est-ce-que-le-rpo", "/combien-coute-un-rpo", "/offre", "/assessment"]}
        title="Aller plus loin"
      />

      <CTASection
        title="Besoin d'un expert pour vos recrutements ?"
        gradientWord="expert"
        subtitle="30 minutes de diagnostic gratuit avec un Talent Acquisition senior. Sans engagement."
      />
    </>
  );
}
