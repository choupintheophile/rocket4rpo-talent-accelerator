"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CheckCircle2, Clock, Shield, Users, Search, Zap } from "lucide-react";

const HUBSPOT_URL = "https://meetings.hubspot.com/theophile-choupin/rpo";

export default function RdvClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Trouver votre TA" }]} />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">

            {/* Left — Messaging */}
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-5">
                <Users className="w-3 h-3" /> Échangeons
              </span>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Trouvez le recruteur{" "}
                <span className="text-primary">idéal</span>{" "}
                pour votre équipe
              </h1>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                Réservez 30 minutes avec un expert. On analyse vos besoins ensemble et on vous recommande le TA Specialist parfait parmi plus de 4 100 profils évalués.
              </p>

              <div className="mt-8 space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Ce qu{"'"}on fera pendant l{"'"}appel</h2>
                {[
                  { icon: Search, text: "Comprendre vos postes à pourvoir et vos enjeux" },
                  { icon: Zap, text: "Identifier le format adapté : RPO, CDD ou CDI" },
                  { icon: Users, text: "Vous présenter le profil de TA qui matche" },
                  { icon: CheckCircle2, text: "Vous donner un planning et un budget réalistes" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 30 min</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Gratuit & sans engagement</span>
              </div>
            </div>

            {/* Right — Calendar */}
            <div className="rounded-2xl border border-border/40 overflow-hidden bg-white shadow-sm">
              <iframe
                src={HUBSPOT_URL}
                className="w-full border-0"
                style={{ height: "700px" }}
                title="Réserver un créneau"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
