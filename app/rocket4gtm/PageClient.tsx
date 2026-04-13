"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import {
  ArrowRight,
  Rocket,
  Users,
  Building2,
  Target,
  TrendingUp,
  Award,
  Linkedin,
} from "lucide-react";

const HUBSPOT = "/rdv";

const BRANDS = [
  {
    name: "Rocket4Sales",
    description:
      "Cabinet de recrutement expert des profils commerciaux Tech & SaaS. Rocket4Sales identifie, qualifie et place les meilleurs talents sales pour accompagner la croissance de ses clients.",
    href: "https://www.rocket4sales.com",
    external: true,
    highlight: false,
  },
  {
    name: "Rocket4RPO",
    description:
      "Talent Acquisition as a Service : des experts TA du top 1% intégrés directement dans vos équipes pour recruter mieux, plus vite et moins cher. RPO, CDD, CDI.",
    href: "/",
    external: false,
    highlight: true,
  },
];

const STATS = [
  { value: "7+", label: "ans d'expertise", icon: Award },
  { value: "200+", label: "recrutements réalisés", icon: TrendingUp },
  { value: "50+", label: "entreprises accompagnées", icon: Building2 },
];

const TEAM = [
  {
    name: "Clément Martin",
    role: "CEO",
    linkedin: "https://www.linkedin.com/in/clementmartinr4s/",
  },
  {
    name: "Théophile Choupin",
    role: "Sales Director",
    linkedin: "https://www.linkedin.com/in/theophile-choupin/",
  },
  {
    name: "Julien Regnacq",
    role: "Sales Director",
    linkedin: "https://www.linkedin.com/in/julien-regnacq/",
  },
  {
    name: "Marion Longo",
    role: "Chief of Staff",
    linkedin: "https://www.linkedin.com/in/marion-longo/",
  },
];

export default function Rocket4GTMPageClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const brandsRef = useRef(null);
  const brandsInView = useInView(brandsRef, { once: true });
  const visionRef = useRef(null);
  const visionInView = useInView(visionRef, { once: true });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true });

  return (
    <>
      <Breadcrumbs items={[{ label: "Rocket4GTM" }]} />

      {/* ══ HERO (dark) ══ */}
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
            initial={{ opacity: 0, y: 25 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                <Rocket className="w-3.5 h-3.5" /> Le groupe
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-[1.08] text-white">
              Rocket4GTM :{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                le groupe derrière Rocket4RPO
              </span>
            </h1>

            <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
              Rocket4GTM regroupe deux marques complémentaires — Rocket4Sales et
              Rocket4RPO — pour offrir aux entreprises Tech un écosystème
              complet de recrutement commercial et de Talent Acquisition.
            </p>

            <div className="mt-3 flex flex-wrap gap-4">
              <a
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Échanger avec le groupe <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/offre"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
              >
                Découvrir le RPO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ NOS MARQUES ══ */}
      <section className="section-padding bg-secondary" ref={brandsRef}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={brandsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Nos <span className="text-gradient">marques</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Deux expertises complémentaires au service de la croissance des
              entreprises Tech.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                animate={brandsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className={`p-8 rounded-xl bg-background border ${
                  brand.highlight
                    ? "border-primary/30 ring-1 ring-primary/10"
                    : "border-border/60"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      brand.highlight
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {brand.highlight ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {brand.description}
                </p>
                {brand.external ? (
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Découvrir {brand.name} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href={brand.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Vous êtes ici <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NOTRE VISION ══ */}
      <section className="section-padding" ref={visionRef}>
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Notre <span className="text-gradient">vision</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Nous construisons le meilleur écosystème Sales et Talent
              Acquisition de France. Notre conviction : une entreprise Tech qui
              recrute les bons profils, au bon moment, avec les bonnes méthodes,
              prend une longueur d{"'"}avance durable sur son marché.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              En combinant l{"'"}expertise commerciale de{" "}
              <a
                href="https://www.rocket4sales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:underline"
              >
                Rocket4Sales
              </a>{" "}
              et l{"'"}expertise Talent Acquisition de{" "}
              <Link href="/" className="text-foreground font-medium hover:underline">
                Rocket4RPO
              </Link>
              , le groupe Rocket4GTM offre une réponse complète aux enjeux de
              croissance des entreprises Tech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section
        className="section-padding bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark text-white"
        ref={statsRef}
      >
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 * i }}
                className="p-8 rounded-xl bg-white/5 border border-white/10"
              >
                <stat.icon className="w-6 h-6 text-rocket-teal-glow mx-auto mb-3" />
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  {stat.value}
                </p>
                <p className="mt-2 text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="section-padding" ref={teamRef}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              L{"'"}équipe <span className="text-gradient">dirigeante</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Une équipe passionnée par le recrutement et la croissance des
              entreprises Tech.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center p-6 rounded-xl bg-secondary border border-border/60"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-bold text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {member.role}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <CTASection
        title="Envie d'en savoir plus sur le groupe ?"
        gradientWord="savoir"
        subtitle="Échangez avec notre équipe pour découvrir comment Rocket4GTM peut accompagner votre croissance."
        ctaLabel="Échanger avec le groupe"
      />
    </>
  );
}
