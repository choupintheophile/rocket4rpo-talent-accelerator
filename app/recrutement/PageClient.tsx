"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  Shield,
  Zap,
  GraduationCap,
  Globe,
  Clock,
  Star,
  Mail,
  Calendar,
  Target,
  Award,
  Quote,
  FileText,
  Handshake,
} from "lucide-react";

const HUBSPOT_LINK = "/rdv";

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.12, ease: "easeOut" },
  }),
};

/* ── Reusable hook for section animation ── */
function useSectionInView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

/* ── Data ── */
const BENEFITS = [
  {
    icon: Briefcase,
    title: "Missions régulières",
    description:
      "Pas de prospection. Nous vous proposons des missions RPO alignées avec votre expertise et vos préférences.",
    highlight: "Zéro prospection",
  },
  {
    icon: Zap,
    title: "Rémunération attractive",
    description:
      "Tarif journalier compétitif selon votre expérience et spécialisation. Paiement à 30\ jours, sans surprise.",
    highlight: "Paiement 30j",
  },
  {
    icon: Globe,
    title: "Autonomie totale",
    description:
      "Full remote, horaires flexibles. Travaillez où et quand vous le souhaitez. Paris, Lyon, ou ailleurs.",
    highlight: "Full remote",
  },
  {
    icon: Users,
    title: "Communauté de TA seniors",
    description:
      "Échanges, entraide, événements. Rejoignez un réseau de recruteurs expérimentés qui partagent vos ambitions.",
    highlight: "300+ membres",
  },
  {
    icon: Shield,
    title: "Support administratif",
    description:
      "Facturation, contrats, aspects juridiques : on gère tout l\’administratif pour que vous vous concentriez sur le recrutement.",
    highlight: "Zéro admin",
  },
  {
    icon: GraduationCap,
    title: "Montée en compétences",
    description:
      "Formations régulières, partage de bonnes pratiques, accès aux derniers outils et méthodes du marché.",
    highlight: "Formation continue",
  },
];

const CRITERIA = [
  {
    text: "3+ ans d\’expérience en Talent Acquisition ou RPO",
    detail: "Vous avez géré des missions de bout en bout avec des résultats mesurables.",
  },
  {
    text: "Sourcing multicanal maîtrisé",
    detail:
      "LinkedIn Recruiter, Boolean search, approche directe, chasse… vous savez où trouver les talents.",
  },
  {
    text: "Autonome et orienté résultats",
    detail:
      "Vous pilotez vos KPIs, anticipez les besoins clients et prenez des initiatives.",
  },
  {
    text: "Stack outils solide",
    detail:
      "LinkedIn Recruiter, ATS (Lever, Greenhouse, Teamtailor…), CRM, outils de sourcing.",
  },
  {
    text: "Français courant, anglais professionnel",
    detail:
      "Vous interagissez avec des candidats et stakeholders dans les deux langues.",
  },
  {
    text: "Statut freelance ou portage salarial",
    detail:
      "Micro-entreprise, SASU, portage… vous êtes déjà indépendant ou prêt à le devenir.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Candidature en ligne",
    duration: "5 min",
    description:
      "Remplissez le formulaire et partagez votre parcours. Simple, rapide, sans CV obligatoire.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Entretien de qualification",
    duration: "30 min",
    description:
      "Échange en visio avec notre équipe. On parle de votre expérience, vos spécialisations et vos attentes.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Évaluation sur 15 critères",
    duration: "Score 90%+ requis",
    description:
      "Sourcing, outils, autonomie, KPIs, qualification, posture conseil, expérience RPO.",
    icon: Target,
  },
  {
    step: "04",
    title: "Intégration au vivier",
    duration: "Bienvenue !",
    description:
      "Accès aux missions, onboarding personnalisé, et intégration dans la communauté Rocket4RPO.",
    icon: Handshake,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Depuis que j\’ai rejoint Rocket4RPO, j\’enchaîne les missions sans interruption. Le matching est rapide, les clients sont quali, et le TJM est juste. C\’est exactement ce que je cherchais en freelance.",
    name: "L.C.",
    role: "TA Specialist freelance",
    experience: "4 ans d\’expérience",
    rating: 5,
  },
  {
    quote:
      "Ce qui fait la différence, c\’est la communauté. On échange sur nos pratiques, on se recommande des outils, et l\’équipe Rocket4RPO est toujours dispo pour nous aider. On ne se sent jamais seul.",
    name: "M.R.",
    role: "TAM freelance",
    experience: "6 ans d\’expérience",
    rating: 5,
  },
  {
    quote:
      "J\’ai testé plusieurs plateformes de freelance en recrutement. Rocket4RPO est de loin la plus sérieuse : missions longues, clients engagés, et zéro galère administrative.",
    name: "S.B.",
    role: "TA Specialist freelance",
    experience: "5 ans d\’expérience",
    rating: 5,
  },
];

export default function RecrutementPageClient() {
  /* Section refs for scroll-triggered animations */
  const benefits = useSectionInView();
  const profile = useSectionInView();
  const process = useSectionInView();
  const testimonials = useSectionInView();
  const cta = useSectionInView();

  return (
    <>
      <Breadcrumbs items={[{ label: "Nous rejoindre" }]} />

      {/* ═══════════════════════════════════════════
          HERO — Dark gradient, split layout
      ═══════════════════════════════════════════ */}
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
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rocket-teal/20 border border-rocket-teal/30 text-sm text-rocket-teal-glow font-medium">
                  🚀 Rejoignez-nous
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/20 text-sm text-amber-300 font-medium">
                  💰 Freelance
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] text-white">
                Devenez Talent Acquisition freelance chez{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  Rocket4RPO.
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
                Vous êtes un expert du recrutement ? Rejoignez notre réseau de 300+ TA Specialists et travaillez avec les meilleures startups et scale-ups de France.
              </p>

              {/* Inline stats */}
              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Users className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">300+</strong> TA dans le vivier</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Briefcase className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">50+</strong> missions actives</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Zap className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">100%</strong> remote-friendly</span>
                </div>
              </div>

              {/* Dual CTA */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={HUBSPOT_LINK}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-rocket-dark hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Postuler maintenant
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pourquoi"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/15 transition-all"
                >
                  Voir nos missions
                </a>
              </div>
            </div>

            {/* Right — Benefits glass card */}
            <div className="lg:w-[45%] w-full">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-rocket-teal/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-rocket-teal-glow" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Pourquoi nous rejoindre</div>
                    <div className="text-[10px] text-white/40">Les avantages Rocket4RPO</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Star, title: "Missions premium", desc: "Startups, scale-ups et grands comptes ambitieux. Des missions longues et bien rémunérées." },
                    { icon: Globe, title: "Flexibilité totale", desc: "Full remote, horaires libres. Travaillez où et quand vous le souhaitez." },
                    { icon: Users, title: "Réseau d’experts", desc: "Échanges, entraide et événements avec 300+ TA Specialists expérimentés." },
                    { icon: Shield, title: "Support continu", desc: "Facturation, contrats, admin — on gère tout pour vous. Zéro galère." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rocket-teal/15 border border-rocket-teal/20 flex items-center justify-center">
                        <item.icon className="w-4.5 h-4.5 text-rocket-teal-glow" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══════════════════════════════════════════
          WHY JOIN — Benefit cards
      ═══════════════════════════════════════════ */}
      <section id="pourquoi" className="section-padding" ref={benefits.ref}>
        <div className="container-wide">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            variants={fadeUp}
            initial="hidden"
            animate={benefits.isInView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Avantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Pourquoi rejoindre{" "}
              <span className="text-gradient">Rocket4RPO</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Tout ce dont vous avez besoin pour réussir en freelance, sans les
              inconvénients.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {BENEFITS.map((card, i) => (
              <motion.div
                key={i}
                className="group relative p-7 rounded-2xl border border-border/60 bg-background hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                variants={scaleIn}
                initial="hidden"
                animate={benefits.isInView ? "visible" : "hidden"}
                custom={i + 1}
              >
                {/* Highlight tag */}
                <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                  {card.highlight}
                </span>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROFILE — Checklist with visual impact
      ═══════════════════════════════════════════ */}
      <section
        className="section-padding bg-[hsl(var(--rocket-cream))]"
        ref={profile.ref}
      >
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left column — intro */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={profile.isInView ? "visible" : "hidden"}
              custom={0}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Profil recherché
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Le profil que nous{" "}
                <span className="text-gradient">recherchons</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Nous ne cherchons pas des CV, mais des experts autonomes, passionnés
                par le recrutement et capables de générer un impact immédiat chez nos
                clients.
              </p>
              <div className="mt-8 p-5 rounded-xl bg-background border border-border/60">
                <p className="text-sm font-medium text-foreground mb-1">
                  Taux d\’acceptation
                </p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-primary">12%</span>
                  <span className="text-sm text-muted-foreground pb-1">
                    des candidatures retenues
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-primary/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--rocket-teal))] to-[hsl(var(--rocket-teal-glow))]"
                    initial={{ width: 0 }}
                    animate={profile.isInView ? { width: "12%" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right column — checklist */}
            <div className="space-y-4">
              {CRITERIA.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-background border border-border/60 hover:border-primary/20 transition-colors"
                  variants={fadeUp}
                  initial="hidden"
                  animate={profile.isInView ? "visible" : "hidden"}
                  custom={i + 1}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{item.text}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PROCESS — Timeline with dark background
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[hsl(var(--rocket-navy-soft))] text-white"
        ref={process.ref}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(var(--rocket-teal))] opacity-[0.03] blur-[100px]" />

        <div className="relative container-wide section-padding">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            variants={fadeUp}
            initial="hidden"
            animate={process.isInView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[hsl(var(--rocket-teal))]/10 text-[hsl(var(--rocket-teal-glow))] border border-[hsl(var(--rocket-teal))]/20 mb-4">
              Process de sélection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              4 étapes pour rejoindre le réseau
            </h2>
            <p className="mt-4 text-white/50 text-lg">
              Un process transparent et rapide. De la candidature à l’intégration
              en moins de 2 semaines.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PROCESS_STEPS.map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                variants={fadeUp}
                initial="hidden"
                animate={process.isInView ? "visible" : "hidden"}
                custom={i + 1}
              >
                {/* Connector line (visible on lg) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-white/10" />
                )}

                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-center h-full">
                  {/* Step number */}
                  <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--rocket-teal))]/10 border border-[hsl(var(--rocket-teal))]/20 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-6 h-6 text-[hsl(var(--rocket-teal-glow))]" />
                  </div>

                  <span className="text-xs font-bold tracking-widest uppercase text-[hsl(var(--rocket-teal-glow))]">
                    Étape {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-xs font-medium text-[hsl(var(--rocket-teal-glow))]/60">
                    {item.duration}
                  </p>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA under process */}
          <motion.div
            className="mt-12 text-center"
            variants={fadeIn}
            initial="hidden"
            animate={process.isInView ? "visible" : "hidden"}
            custom={6}
          >
            <a
              href={HUBSPOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl bg-[hsl(var(--rocket-teal))] text-white hover:bg-[hsl(var(--rocket-teal-glow))] transition-all duration-300 shadow-lg shadow-[hsl(var(--rocket-teal))]/20"
            >
              Démarrer ma candidature
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — Social proof
      ═══════════════════════════════════════════ */}
      <section className="section-padding" ref={testimonials.ref}>
        <div className="container-wide">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            variants={fadeUp}
            initial="hidden"
            animate={testimonials.isInView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ce que disent nos{" "}
              <span className="text-gradient">TA freelances</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Ils ont rejoint le réseau. Voici leur expérience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                className="relative p-7 rounded-2xl border border-border/60 bg-background hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                variants={scaleIn}
                initial="hidden"
                animate={testimonials.isInView ? "visible" : "hidden"}
                custom={i + 1}
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/15 mb-4" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 fill-[hsl(var(--rocket-teal))] text-[hsl(var(--rocket-teal))]"
                    />
                  ))}
                </div>

                <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                  <p className="text-xs text-primary mt-1">{t.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA — High-conversion close
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[hsl(var(--rocket-dark))] text-white"
        ref={cta.ref}
      >
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[hsl(var(--rocket-teal))] opacity-[0.04] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[hsl(var(--rocket-teal))] opacity-[0.03] blur-[80px]" />

        <div className="relative container-tight section-padding text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={cta.isInView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-[hsl(var(--rocket-teal))]/10 text-[hsl(var(--rocket-teal-glow))] border border-[hsl(var(--rocket-teal))]/20 mb-6">
              <Clock className="w-3.5 h-3.5" />
              Candidature en 5 minutes
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            variants={fadeUp}
            initial="hidden"
            animate={cta.isInView ? "visible" : "hidden"}
            custom={1}
          >
            Prêt à rejoindre le réseau{" "}
            <span className="text-gradient">Rocket4RPO</span>
            {" "}?
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-white/50 max-w-xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate={cta.isInView ? "visible" : "hidden"}
            custom={2}
          >
            Un échange de 30 minutes suffit pour comprendre votre profil et vous
            proposer des missions alignées avec vos ambitions.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate={cta.isInView ? "visible" : "hidden"}
            custom={3}
          >
            <a
              href={HUBSPOT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-10 py-4 text-base font-semibold rounded-xl bg-[hsl(var(--rocket-teal))] text-white hover:bg-[hsl(var(--rocket-teal-glow))] transition-all duration-300 shadow-lg shadow-[hsl(var(--rocket-teal))]/25 hover:shadow-[hsl(var(--rocket-teal))]/35"
            >
              Prendre RDV maintenant
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:recrutement@rocket4rpo.com"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border border-white/20 text-white/90 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Envoyer un email
            </a>
          </motion.div>

          <motion.p
            className="mt-8 text-sm text-white/30"
            variants={fadeIn}
            initial="hidden"
            animate={cta.isInView ? "visible" : "hidden"}
            custom={5}
          >
            Ou écrivez-nous à{" "}
            <a
              href="mailto:recrutement@rocket4rpo.com"
              className="text-[hsl(var(--rocket-teal-glow))] hover:underline"
            >
              recrutement@rocket4rpo.com
            </a>
          </motion.p>
        </div>
      </section>
    </>
  );
}
