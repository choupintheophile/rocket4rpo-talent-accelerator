"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Clock, Shield, MessageCircle, CheckCircle2 } from "lucide-react";

const HUBSPOT_URL = "https://meetings.hubspot.com/theophile-choupin/rpo";

const benefits = [
  { icon: CheckCircle2, text: "Analyse de vos besoins de recrutement" },
  { icon: CheckCircle2, text: "Recommandation du meilleur modèle (RPO, CDD, CDI)" },
  { icon: CheckCircle2, text: "Estimation budgétaire personnalisée" },
  { icon: CheckCircle2, text: "Planning de démarrage réaliste" },
];

export default function RdvClient() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Prendre rendez-vous" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative container-wide py-14 md:py-20">
          <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary border border-primary/20 mb-6">
              <MessageCircle className="w-3.5 h-3.5" />
              Diagnostic gratuit
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              Réservez votre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                diagnostic gratuit
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/55 leading-relaxed">
              30 minutes avec un expert RPO pour analyser vos besoins et vous recommander la meilleure solution.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/40">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 30 min</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Sans engagement</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> Réponse sous 24h</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-start">

            {/* Left — Benefits */}
            <div className="lg:sticky lg:top-28">
              <h2 className="text-lg font-bold mb-4">Ce que vous obtiendrez</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <b.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm font-medium mb-1">200+ recrutements réalisés</p>
                <p className="text-xs text-muted-foreground">307 TA Specialists dans notre vivier. Time-to-hire moyen : 2-3 semaines.</p>
              </div>
            </div>

            {/* Right — HubSpot iframe */}
            <div className="rounded-2xl border border-border/40 overflow-hidden bg-white shadow-sm min-h-[700px]">
              <div className="bg-gray-50 border-b border-border/40 px-5 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">rocket4rpo.com/rdv</span>
              </div>
              <iframe
                src={HUBSPOT_URL}
                className="w-full border-0"
                style={{ height: "750px" }}
                title="Réserver un rendez-vous"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
