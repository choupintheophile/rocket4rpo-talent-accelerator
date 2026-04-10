"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Video,
  Shield,
  MapPin,
  Mail,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const infoCards = [
  {
    icon: Clock,
    title: "Réponse sous 24h",
    description: "Notre équipe vous recontacte en moins d\u2019un jour ouvré.",
  },
  {
    icon: Video,
    title: "Diagnostic gratuit de 30 min",
    description: "Un audit de votre processus de recrutement, sans engagement.",
  },
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Aucun engagement long terme. Vous pilotez la durée de la mission.",
  },
];

export default function ContactClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT -- Info (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-5 p-6 rounded-2xl bg-[hsl(var(--rocket-cream))]"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {"Réservez votre "}
                <span className="text-gradient">{"diagnostic gratuit"}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                30 minutes pour analyser votre besoin de recrutement et recevoir nos premières recommandations. Sans engagement.
              </p>

              {/* Trust cards */}
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border bg-card flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Addresses */}
              <div className="p-5 rounded-xl border border-border bg-card space-y-4">
                <h3 className="font-bold">Nos bureaux</h3>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Paris</p>
                    <p className="text-sm text-muted-foreground">
                      {"\u00cele-de-France"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Villeurbanne</p>
                    <p className="text-sm text-muted-foreground">
                      {"Auvergne-Rh\u00f4ne-Alpes"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-xl border border-border bg-card flex gap-3 items-center">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@rocket4rpo.com"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  contact@rocket4rpo.com
                </a>
              </div>
            </motion.div>

            {/* RIGHT -- HubSpot embed (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://meetings.hubspot.com/theophile-choupin/rpo?embed=true"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Réserver un créneau avec Rocket4RPO"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mini-testimonial */}
      <section className="py-12 bg-muted/30">
        <div className="container-tight text-center">
          <p className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
            &ldquo;En 30 minutes de diagnostic, l&apos;équipe Rocket4RPO a
            identifié 3 optimisations immédiates dans notre process de
            recrutement. Pragmatique et sans bullshit.&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold">
            — T.B., CEO, Start-up HealthTech (30 pers.)
          </p>
        </div>
      </section>
    </>
  );
}
