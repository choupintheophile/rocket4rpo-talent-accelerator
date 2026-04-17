"use client";

import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Clock, Shield, MessageSquare } from "lucide-react";

const HUBSPOT_URL = "https://meetings.hubspot.com/theophile-choupin/rpo";

export default function RdvClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Diagnostic gratuit" }]} />

      {/* ── HERO — dark gradient, split layout ── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-[8%] w-[400px] h-[400px] rounded-full bg-rocket-teal/8 blur-[120px]" />
          <div className="absolute bottom-0 right-[15%] w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container-wide py-12 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
            {/* Left — Text */}
            <div className="lg:w-[55%]">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium mb-4">
                📅 Diagnostic gratuit
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] text-white">
                Échangeons sur vos besoins en{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  recrutement.
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
                30 minutes pour comprendre votre contexte, identifier votre TA idéal, et vous proposer une solution sur-mesure. Sans engagement.
              </p>

              {/* Inline stats */}
              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">30 min</strong> chrono</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Shield className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">Sans</strong> engagement</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <MessageSquare className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">Réponse</strong> sous 24h</span>
                </div>
              </div>
            </div>

            {/* Right — Image neutre (v25.1 retire photo perso sur demande) */}
            <div className="lg:w-[45%] w-full">
              <Image
                src="/photos/equipe-interieur.webp"
                alt="Équipe Rocket4RPO au travail"
                width={600}
                height={450}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="rounded-2xl shadow-2xl border border-white/10 object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── CALENDAR EMBED ── */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-border/60 bg-background shadow-lg shadow-black/5">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/60 bg-secondary/50">
              <Clock className="w-4 h-4 text-[hsl(var(--rocket-teal))]" />
              <span className="text-sm font-medium text-foreground">
                Choisissez votre créneau
              </span>
            </div>
            <iframe
              src={HUBSPOT_URL}
              className="w-full border-0"
              style={{ height: "700px" }}
              title="Réserver un créneau"
            />
          </div>
        </div>
      </section>
    </>
  );
}
