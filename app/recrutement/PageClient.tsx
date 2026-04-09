"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Star, Users, Target } from "lucide-react";

export default function RecrutementPageClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Nous rejoindre" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Carrières
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Vous êtes <span className="text-gradient">Talent Acquisition</span> ? Rejoignez le réseau Rocket4RPO
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Nous recherchons en permanence des Talent Acquisition Managers et Specialists d&apos;exception pour accompagner les entreprises Tech
                les plus ambitieuses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salary / Contract info */}
      <section className="section-padding bg-primary/5 border-y border-primary/10">
        <div className="container-wide">
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            <div className="p-5 rounded-xl bg-background border border-border">
              <h3 className="font-bold mb-1">TJM indicatif</h3>
              <p className="text-2xl font-bold text-primary">350 – 550€/jour</p>
              <p className="text-sm text-muted-foreground mt-1">Selon expérience et spécialisation</p>
            </div>
            <div className="p-5 rounded-xl bg-background border border-border">
              <h3 className="font-bold mb-1">Type de contrat</h3>
              <p className="text-lg font-semibold">Missions freelance de 3 à 12 mois</p>
              <p className="text-sm text-muted-foreground mt-1">Remote-friendly (Paris, Lyon, full remote)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Le profil que nous recherchons</h2>
              <ul className="space-y-4">
                {[
                  "2+ ans d'expérience en Talent Acquisition ou recrutement",
                  "Maîtrise des techniques d'approche directe et de sourcing avancé",
                  "Connaissance de l'écosystème Tech / SaaS français",
                  "Rigueur dans le suivi de process et le reporting",
                  "Capacité à s'intégrer rapidement dans des cultures d'entreprise variées",
                  "Excellent relationnel avec les hiring managers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Ce que nous offrons</h2>
              <div className="space-y-4">
                {[
                  { icon: Star, title: "Missions variées", text: "Travaillez avec des startups, scale-ups et grands groupes Tech." },
                  { icon: Users, title: "Communauté d'experts", text: "Intégrez un réseau de TA Specialists qui partagent leurs bonnes pratiques." },
                  {
                    icon: Target,
                    title: "Développement",
                    text: "Montez en compétences sur les dernières techniques de sourcing et de recrutement.",
                  },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-background border border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-bold">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment process */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-3xl font-bold mb-8 text-center">Notre process de recrutement</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Call découverte", duration: "30 min", desc: "Échange sur votre parcours et vos spécialités" },
              { step: "2", title: "Mise en situation", duration: "Cas pratique", desc: "Cas pratique de sourcing et qualification" },
              { step: "3", title: "Rencontre équipe", duration: "Échange", desc: "Échange avec un membre de l'équipe Rocket4RPO" },
              { step: "4", title: "Proposition", duration: "Sous 48h", desc: "Offre sous 48h après validation" },
            ].map((item, i) => (
              <div key={i} className="relative p-5 rounded-xl border border-border bg-card text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-xs font-medium text-primary mb-2">{item.duration}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-tight text-center">
          <h2 className="text-3xl font-bold mb-4">Intéressé(e) ?</h2>
          <p className="text-lg text-muted-foreground mb-8">Contactez-nous pour discuter des opportunités disponibles.</p>
          <a
            href="https://meetings.hubspot.com/theophile-choupin/rpo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Postuler ou rejoindre le réseau <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
