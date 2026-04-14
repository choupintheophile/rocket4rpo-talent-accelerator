"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Clock,
  Shield,
  MessageCircle,
  Search,
  BarChart3,
  CalendarCheck,
  Users,
  Target,
  Sparkles,
  Star,
  ChevronDown,
  Quote,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";

/* ─────────────────────────── data ─────────────────────────── */

const benefits = [
  {
    icon: Search,
    title: "Analyse de vos besoins actuels",
    description:
      "Cartographie de vos postes ouverts, de votre pipeline candidats et de vos enjeux prioritaires.",
  },
  {
    icon: Target,
    title: "Recommandation du meilleur modèle",
    description:
      "RPO, CDI ou CDD : nous identifions le format le plus adapté à votre contexte et vos contraintes.",
  },
  {
    icon: BarChart3,
    title: "Estimation budgétaire personnalisée",
    description:
      "Un chiffrage transparent comparé au coût d\’un cabinet classique, sans surprise.",
  },
  {
    icon: CalendarCheck,
    title: "Planning de démarrage réaliste",
    description:
      "Délais de mise en place, jalons clés et premières shortlists : vous savez à quoi vous attendre.",
  },
  {
    icon: Users,
    title: "Matching avec le TA idéal",
    description:
      "Présentation du profil de Talent Acquisition Specialist le plus pertinent pour vos recrutements.",
  },
];

const testimonials = [
  {
    quote:
      "En 3 mois, Rocket4RPO a structuré tout notre process de recrutement et pourvu 8 postes tech critiques.",
    author: "Marie L.",
    role: "DRH — Scale-up SaaS",
    rating: 5,
  },
  {
    quote:
      "Le diagnostic initial a permis de diviser par deux notre budget recrutement annuel. Impressionnant.",
    author: "Thomas B.",
    role: "COO — Fintech",
    rating: 5,
  },
  {
    quote:
      "Un vrai partenaire stratégique. La qualité des profils proposés est largement supérieure aux cabinets classiques.",
    author: "Sophie M.",
    role: "VP People — E-commerce",
    rating: 5,
  },
];

const stats = [
  { value: "200+", label: "Recrutements réalisés", icon: CheckCircle2 },
  { value: "50+", label: "Entreprises accompagnées", icon: TrendingUp },
  { value: "4 sem.", label: "Time-to-hire moyen", icon: Zap },
];

const faqs = [
  {
    question: "Le diagnostic est-il vraiment gratuit ?",
    answer:
      "Oui, à 100 %. C\’est un échange de 30 minutes sans engagement. L\’objectif est de comprendre votre besoin et de vous donner des premières recommandations actionnables, que vous décidiez ou non de travailler avec nous.",
  },
  {
    question: "Comment se déroule l\’appel ?",
    answer:
      "Un expert recrutement analyse votre contexte (postes ouverts, outils, budget, délais). Vous repartez avec une recommandation claire : RPO, CDI ou CDD, un chiffrage indicatif et un plan d\’action concret.",
  },
  {
    question: "Dois-je préparer quelque chose avant l\’appel ?",
    answer:
      "Rien d\’obligatoire. Si vous avez une fiche de poste ou un brief de recrutement, c\’est un plus — mais notre expert saura poser les bonnes questions pour cerner votre besoin.",
  },
  {
    question: "Que se passe-t-il après le diagnostic ?",
    answer:
      "Vous recevez un récapitulatif écrit sous 24h avec nos recommandations. Si vous souhaitez avancer, nous pouvons démarrer sous 1 semaine. Sinon, aucune relance non souhaitée.",
  },
];

/* ─────────────────────────── animation variants ─────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─────────────────────────── component ─────────────────────────── */

export default function ContactClient() {
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-80px" });

  const socialRef = useRef(null);
  const socialInView = useInView(socialRef, { once: true, margin: "-80px" });

  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* ───────── HERO — dark gradient, split layout ───────── */}
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
                ✉️ Contact
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] text-white">
                Parlons de vos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rocket-teal via-rocket-teal-glow to-emerald-400">
                  recrutements.
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
                Une question ? Un projet ? Notre équipe vous répond sous 24h.
              </p>

              {/* Inline stats */}
              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">Réponse</strong> sous 24h</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Users className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">2 bureaux</strong> (Paris + Lyon)</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-rocket-teal-glow" />
                  <span><strong className="text-white">50+</strong> clients satisfaits</span>
                </div>
              </div>
            </div>

            {/* Right — Contact info glass card */}
            <div className="lg:w-[45%] w-full">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-full bg-rocket-teal/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-rocket-teal-glow" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Nos coordonnées</div>
                    <div className="text-[10px] text-white/40">Contactez-nous directement</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rocket-teal/15 border border-rocket-teal/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-rocket-teal-glow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/45 uppercase tracking-wider font-medium">Email</p>
                      <a href="mailto:contact@rocket4sales.com" className="text-sm font-semibold text-white hover:text-rocket-teal-glow transition-colors">
                        contact@rocket4sales.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rocket-teal/15 border border-rocket-teal/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-rocket-teal-glow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/45 uppercase tracking-wider font-medium">Téléphone</p>
                      <p className="text-sm font-semibold text-white">+33 6 52 15 73 42</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rocket-teal/15 border border-rocket-teal/20 flex items-center justify-center">
                      <Target className="w-4 h-4 text-rocket-teal-glow" />
                    </div>
                    <div>
                      <p className="text-xs text-white/45 uppercase tracking-wider font-medium">Bureaux</p>
                      <p className="text-sm font-semibold text-white">Paris &amp; Lyon</p>
                      <p className="text-xs text-white/45 mt-0.5">France</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ───────── MAIN — 2 columns ───────── */}
      <section ref={benefitsRef} className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Left — Benefits (2 cols) */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              className="lg:col-span-2 space-y-3"
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--rocket-teal))]"
              >
                Votre diagnostic comprend
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-2xl md:text-3xl font-bold leading-tight"
              >
                Ce que vous obtiendrez
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-muted-foreground leading-relaxed pb-4"
              >
                En 30 minutes, repartez avec un plan d&apos;action clair et
                chiffré pour vos recrutements.
              </motion.p>

              <div className="space-y-4">
                {benefits.map(({ icon: Icon, title, description }, i) => (
                  <motion.div
                    key={title}
                    variants={fadeUp}
                    custom={i + 3}
                    className="group relative flex gap-4 p-4 rounded-xl border border-border/60 bg-card/50 hover:border-[hsl(var(--rocket-teal)/0.35)] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--rocket-teal)/0.1)] group-hover:bg-[hsl(var(--rocket-teal)/0.15)] transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[hsl(var(--rocket-teal))]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground leading-snug">
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — HubSpot iframe (3 cols) */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              className="lg:col-span-3"
            >
              <div className="sticky top-28 rounded-2xl overflow-hidden border border-border/60 bg-background shadow-lg shadow-black/5">
                {/* Iframe header bar */}
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border/60 bg-secondary/50">
                  <CalendarCheck className="w-4.5 h-4.5 text-[hsl(var(--rocket-teal))]" />
                  <span className="text-sm font-medium text-foreground">
                    Choisissez votre créneau
                  </span>
                </div>
                <iframe
                  src="https://meetings.hubspot.com/theophile-choupin/rpo?embed=true"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Réserver un créneau"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── SOCIAL PROOF ───────── */}
      <section
        ref={socialRef}
        className="section-padding bg-secondary/50 border-y border-border/40"
      >
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--rocket-teal))] mb-2">
              Social proof
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Ils nous ont fait confiance
            </h2>
          </motion.div>

          {/* Team photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={socialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 max-w-3xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/40">
              <Image
                src="/photos/image.webp"
                alt="L'{'é'}quipe Rocket4RPO en r{'é'}union"
                width={1200}
                height={500}
                className="w-full h-[200px] md:h-[260px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={socialInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-6 mb-14"
          >
            {testimonials.map(({ quote, author, role, rating }, i) => (
              <motion.div
                key={author}
                variants={fadeUp}
                custom={i}
                className="relative flex flex-col p-6 rounded-2xl border border-border/60 bg-background shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Quote className="w-8 h-8 text-[hsl(var(--rocket-teal)/0.2)] mb-3" />
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-border/60">
                  <p className="font-semibold text-sm text-foreground">
                    {author}
                  </p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={socialInView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(var(--rocket-teal)/0.1)] mb-3">
                  <Icon className="w-5 h-5 text-[hsl(var(--rocket-teal))]" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section ref={faqRef} className="section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--rocket-teal))] mb-2">
              FAQ
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">
              Questions sur le diagnostic
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={faqInView ? "visible" : "hidden"}
            className="max-w-2xl mx-auto space-y-3"
          >
            {faqs.map(({ question, answer }, i) => (
              <motion.div
                key={question}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border border-border/60 bg-card/50 overflow-hidden transition-colors duration-200 hover:border-border"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="font-medium text-foreground pr-4">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <CTASection />
    </>
  );
}
