"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Clock, Shield, MessageCircle } from "lucide-react";

const HUBSPOT_URL = "https://meetings.hubspot.com/theophile-choupin/rpo";

export default function RdvClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Prendre rendez-vous" }]} />

      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Prendre rendez-vous
            </h1>
            <p className="mt-3 text-muted-foreground">
              30 minutes pour échanger sur vos besoins en recrutement.
            </p>
            <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 30 min</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Gratuit</span>
              <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> Sans engagement</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 overflow-hidden bg-white shadow-sm">
            <iframe
              src={HUBSPOT_URL}
              className="w-full border-0"
              style={{ height: "700px" }}
              title="Réserver un rendez-vous"
            />
          </div>
        </div>
      </section>
    </>
  );
}
