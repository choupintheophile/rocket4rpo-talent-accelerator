"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  Target,
  Home,
  Rocket,
  Quote,
} from "lucide-react";

const HUBSPOT_LINK =
  "https://meetings.hubspot.com/theophile-choupin/rpo";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function fadeInDelay(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  };
}

export default function RecrutementPageClient() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Nous rejoindre" }]} />

      {/* ── Hero ── */}
      <section className="section-padding pt-8 bg-[hsl(var(--rocket-navy-soft))] text-background">
        <div className="container-wide">
          <div className="max-w-3xl">
            <motion.div {...fadeIn}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/20 text-primary mb-4">
                Rejoignez le réseau Rocket4RPO
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Vous êtes{" "}
                <span className="text-gradient">
                  Talent Acquisition freelance
                </span>{" "}
                ? Rejoignez les meilleurs.
              </h1>
              <p className="mt-6 text-lg text-background/70 leading-relaxed max-w-2xl">
                Rocket4RPO sélectionne les meilleurs TA et TAM freelance pour
                des missions RPO chez des entreprises ambitieuses. Missions
                longues, variées, et bien rémunérées.
              </p>
              <a
                href={HUBSPOT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Postuler — prendre RDV <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeInDelay(0.2)}
              className="mt-10 grid grid-cols-3 gap-6 max-w-lg"
            >
              {[
                { value: "15+", label: "missions actives" },
                { value: "350-550€", label: "TJM / jour" },
                { value: "3 à 12", label: "mois de mission" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-background/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pourquoi rejoindre Rocket4RPO ── */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.h2
            {...fadeIn}
            className="text-3xl font-bold mb-8 text-center"
          >
            Pourquoi rejoindre Rocket4RPO
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: DollarSign,
                title: "TJM attractif",
                text: "350 à 550\u00a0€/jour selon expérience et spécialisation. Paiement à 30 jours.",
              },
              {
                icon: Target,
                title: "Missions variées",
                text: "Startups, scale-ups, ETI, grands groupes. Tous secteurs, tous types de postes.",
              },
              {
                icon: Home,
                title: "Flexibilité totale",
                text: "Remote-friendly. Paris, Lyon, ou full remote. Missions de 3 à 12 mois.",
              },
              {
                icon: Rocket,
                title: "Communauté d'experts",
                text: "Rejoignez un réseau de TA seniors. Échanges, entraide, événements.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeInDelay(i * 0.1)}
                className="p-6 rounded-xl border border-border/60 bg-background hover:-translate-y-0.5 hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Profil recherché ── */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <motion.h2 {...fadeIn} className="text-3xl font-bold mb-8">
              Le profil que nous recherchons
            </motion.h2>
            <ul className="space-y-4">
              {[
                "2+ ans d'expérience en Talent Acquisition ou recrutement",
                "Maîtrise du sourcing (LinkedIn Recruiter, Boolean, approche directe)",
                "Expérience en entreprise Tech/SaaS (un plus, pas obligatoire)",
                "Autonomie et capacité à s'intégrer rapidement dans une équipe",
                "Statut freelance/indépendant (micro-entreprise, portage, etc.)",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  {...fadeInDelay(i * 0.08)}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Process de sélection ── */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.h2
            {...fadeIn}
            className="text-3xl font-bold mb-8 text-center"
          >
            Notre process de sélection
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Call découverte",
                duration: "30 min",
                desc: "Échange sur votre parcours et vos spécialités",
              },
              {
                step: "2",
                title: "Mise en situation",
                duration: "Cas pratique",
                desc: "Cas pratique de sourcing et qualification",
              },
              {
                step: "3",
                title: "Rencontre équipe",
                duration: "Échange",
                desc: "Échange avec l'équipe Rocket4RPO",
              },
              {
                step: "4",
                title: "Intégration au réseau",
                duration: "Bienvenue",
                desc: "Accès aux missions et matching avec les clients",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeInDelay(i * 0.1)}
                className="relative p-5 rounded-xl border border-border/60 bg-background text-center"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-xs font-medium text-primary mb-2">
                  {item.duration}
                </p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignage ── */}
      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <motion.div
            {...fadeIn}
            className="max-w-2xl mx-auto text-center"
          >
            <Quote className="w-8 h-8 text-primary/40 mx-auto mb-4" />
            <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
              &ldquo;Depuis que j&apos;ai rejoint Rocket4RPO, j&apos;enchaîne
              les missions sans interruption. Le matching est rapide, les
              clients sont quali, et le TJM est juste.&rdquo;
            </blockquote>
            <p className="mt-4 font-semibold">L.C.</p>
            <p className="text-sm text-muted-foreground">
              TA Specialist freelance, 4 ans d&apos;expérience
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="section-padding">
        <div className="container-tight text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">
              Prêt à rejoindre le réseau ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Un call de 15 minutes suffit pour comprendre votre profil et vous
              proposer des missions adaptées.
            </p>
            <a
              href={HUBSPOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Prendre RDV maintenant <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-6 text-sm text-muted-foreground">
              Pas encore prêt ? Envoyez votre CV à{" "}
              <a
                href="mailto:recrutement@rocket4rpo.com"
                className="text-primary hover:underline"
              >
                recrutement@rocket4rpo.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
