"use client";

import {
  Clock,
  Video,
  Shield,
  MapPin,
  Mail,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

export default function ContactClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* Hero */}
      <section className="section-padding pt-8">
        <div className="container-tight text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Réservez votre diagnostic <span className="text-gradient">gratuit</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            30 minutes pour analyser votre besoin de recrutement et recevoir nos premières recommandations. Sans engagement.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-primary" /> Réponse sous 24h</div>
            <div className="flex items-center gap-2 text-sm"><Video className="w-4 h-4 text-primary" /> Diagnostic 30 min</div>
            <div className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-primary" /> Sans engagement</div>
          </div>
        </div>
      </section>

      {/* HubSpot embed — full width */}
      <section className="pb-12">
        <div className="container-tight">
          <div className="rounded-xl overflow-hidden border border-border/60 bg-background">
            <iframe
              src="https://meetings.hubspot.com/theophile-choupin/rpo?embed=true"
              width="100%"
              height="700"
              frameBorder="0"
              title="Réserver un créneau"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-8 bg-secondary">
        <div className="container-tight">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Paris — 22 rue de l&apos;Échiquier, 75010</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Lyon — 70 cours Tolstoï, 69100</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@rocket4rpo.com</span>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
