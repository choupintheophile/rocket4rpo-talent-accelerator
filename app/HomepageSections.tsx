"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Search,
  FileCheck,
  MessageSquare,
  Shield,
  Target,
  Rocket,
  Banknote,
  Calculator,
  ClipboardCheck,
  Play,
  TrendingUp,
  AlertTriangle,
  Zap,
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

/* ── Animated counter with eased counting ── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

/* ── Animated bar for the comparison ── */
function AnimatedBar({ width, color, delay }: { width: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="h-3 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${width}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ── Fade-in wrapper with direction ── */
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };
  const d = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: d.x, y: d.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomepageSections() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          1. TRUST SECTION — Social proof stats
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary mb-4">
                Nos r&eacute;sultats
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Des chiffres qui parlent{" "}
                <span className="text-gradient">d&rsquo;eux-m&ecirc;mes</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto">
            {[
              {
                value: 200,
                suffix: "+",
                label: "Recrutements réalisés",
                icon: Users,
                gradient: "from-blue-500/10 to-primary/10",
                iconColor: "text-blue-500",
                delay: 0,
              },
              {
                value: 48,
                suffix: "h",
                label: "Première shortlist",
                icon: Clock,
                gradient: "from-emerald-500/10 to-teal-500/10",
                iconColor: "text-emerald-500",
                delay: 0.1,
              },
              {
                value: 92,
                suffix: "%",
                label: "Rétention à 12 mois",
                icon: TrendingUp,
                gradient: "from-primary/10 to-violet-500/10",
                iconColor: "text-primary",
                delay: 0.2,
              },
              {
                value: 50,
                suffix: "+",
                label: "Entreprises accompagnées",
                icon: Target,
                gradient: "from-amber-500/10 to-orange-500/10",
                iconColor: "text-amber-500",
                delay: 0.3,
              },
            ].map((stat) => (
              <FadeIn key={stat.label} delay={stat.delay}>
                <div className="relative group">
                  <div
                    className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-border/40 text-center transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Connecting line between cards (desktop only) */}
          <div className="hidden lg:block max-w-5xl mx-auto mt-[-2px]">
            <div className="flex justify-between px-[12.5%]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-[2px] flex-1 mx-4 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                />
              ))}
            </div>
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 grid md:grid-cols-[1fr_280px] gap-8 items-center max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10 text-center">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;En 4 mois, 8 postes pourvus. Le TA s&rsquo;est int&eacute;gr&eacute; comme un membre de l&rsquo;&eacute;quipe.&rdquo;
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  &mdash; VP People, Scale-up SaaS (120 pers.)
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/5 border border-border/40">
                <Image
                  src="/photos/equipe-interieur.webp"
                  alt="L'équipe Rocket4RPO"
                  width={560}
                  height={560}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. PROBLEM SECTION — Pain points
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-rocket-dark text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-red-500/10 text-red-400 mb-5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Le probl&egrave;me
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
                Chaque semaine sans le bon recruteur vous{" "}
                <span className="text-red-400">co&ucirc;te cher</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                stat: "84",
                unit: "jours",
                title: "Délai moyen de recrutement",
                text: "12 semaines en moyenne selon l\’Apec (2024). Chaque jour de poste vacant, c\’est du CA non généré et une équipe qui compense.",
                delay: 0,
              },
              {
                icon: Users,
                stat: "12",
                unit: "h/semaine",
                title: "Perdues par vos managers",
                text: "Trier des CVs, faire passer des entretiens non qualifiés, relancer les cabinets. Vos opérationnels méritent mieux.",
                delay: 0.15,
              },
              {
                icon: Banknote,
                stat: "120-200",
                unit: "K€",
                title: "Le coût d\’un cabinet",
                text: "15 à 25% du salaire annuel par recrutement. Pour 10 recrutements, la facture explose. Avec le RPO : ~44\ 000€.",
                delay: 0.3,
              },
            ].map((item) => (
              <FadeIn key={item.title} delay={item.delay}>
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-7 md:p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm h-full flex flex-col transition-all duration-500 hover:border-red-500/20 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                      <item.icon className="w-7 h-7 text-red-400" />
                    </div>
                    <div className="mb-4">
                      <span className="text-5xl md:text-6xl font-bold text-white/95 tracking-tight">
                        {item.stat}
                      </span>
                      <span className="text-lg font-semibold text-red-400 ml-2">
                        {item.unit}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-white/90 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed flex-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-12 text-center">
              <p className="text-lg md:text-xl font-medium text-white/70 max-w-2xl mx-auto">
                Le recrutement ne devrait pas &ecirc;tre un{" "}
                <span className="text-white font-bold">frein à votre croissance</span>.
              </p>
              <div className="mt-6">
                <Link
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:brightness-110 transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/25"
                >
                  Parlons-en <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. SOLUTION SECTION — What we do differently
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-0 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary mb-5">
                <Zap className="w-3.5 h-3.5" />
                Notre solution
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto">
                Un recruteur senior int&eacute;gr&eacute; à votre &eacute;quipe.{" "}
                <span className="text-gradient">Sans CDI.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Pas un cabinet externe. Pas un freelance l&acirc;ch&eacute; dans la nature. Un Talent Acquisition Specialist qui rejoint vos outils, vos rituels et votre culture.
              </p>
            </div>
          </FadeIn>

          {/* Photo: collaboration TA + manager */}
          <FadeIn delay={0.1}>
            <div className="max-w-5xl mx-auto mb-12">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/40">
                <Image
                  src="/photos/equipe-deux-personnel.webp"
                  alt="Un TA Specialist Rocket4RPO collabore avec un manager client"
                  width={1200}
                  height={600}
                  className="w-full h-[280px] md:h-[340px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-sm font-medium">
                    Votre TA Specialist, int{"é"}gr{"é"} directement dans votre {"é"}quipe
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: "Sourcing multi-canal",
                text: "LinkedIn, approche directe, réseau, communautés. Pas des CVs de job boards.",
                gradient: "from-blue-500/10 to-blue-600/5",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-500",
                delay: 0,
              },
              {
                icon: FileCheck,
                title: "Shortlists en 48h",
                text: "Chaque candidat évalué : compétences, motivation, culture fit. Pas de volume \— de la qualité.",
                gradient: "from-emerald-500/10 to-emerald-600/5",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-500",
                delay: 0.08,
              },
              {
                icon: MessageSquare,
                title: "Coordination managers",
                text: "Briefs, debriefs, feedbacks, suivi. Vos managers se concentrent sur leur métier.",
                gradient: "from-violet-500/10 to-violet-600/5",
                iconBg: "bg-violet-500/10",
                iconColor: "text-violet-500",
                delay: 0.16,
              },
              {
                icon: BarChart3,
                title: "Reporting hebdo",
                text: "Pipeline, KPIs, taux de conversion, délais. Vous savez toujours où vous en êtes.",
                gradient: "from-amber-500/10 to-amber-600/5",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-500",
                delay: 0.24,
              },
              {
                icon: Users,
                title: "Intégration totale",
                text: "ATS, Slack, Teams, rituels d\’équipe. Le TA représente votre marque, pas Rocket4RPO.",
                gradient: "from-primary/10 to-primary/5",
                iconBg: "bg-primary/10",
                iconColor: "text-primary",
                delay: 0.32,
              },
              {
                icon: Shield,
                title: "Tous types de postes",
                text: "Sales, Tech, Finance, Marketing, Support, Product, Data. Pas de limite sectorielle.",
                gradient: "from-rose-500/10 to-rose-600/5",
                iconBg: "bg-rose-500/10",
                iconColor: "text-rose-500",
                delay: 0.4,
              },
            ].map((item) => (
              <FadeIn key={item.title} delay={item.delay}>
                <div className={`group relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/40 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20`}>
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Result comparison box */}
          <FadeIn delay={0.3}>
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="p-7 md:p-8 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-emerald-500/[0.04] border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-6 relative">
                  R&eacute;sultat concret
                </p>

                <div className="space-y-5 relative">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Sans RPO
                      </span>
                      <span className="text-2xl font-bold text-red-500">
                        84 jours
                      </span>
                    </div>
                    <AnimatedBar width={100} color="bg-gradient-to-r from-red-400 to-red-500" delay={0} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Avec Rocket4RPO
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        35 jours
                      </span>
                    </div>
                    <AnimatedBar width={42} color="bg-gradient-to-r from-primary to-emerald-500" delay={0.3} />
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-border/40">
                  <p className="text-center text-sm font-semibold text-primary">
                    -58% de time-to-hire en moyenne
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 text-center">
              <Link
                href="/offre"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                Voir le d&eacute;tail de l&rsquo;offre{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. HOW IT WORKS — 4-step process
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-rocket-navy-soft text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/15 text-primary mb-5">
                Comment &ccedil;a marche
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Du premier appel aux premiers{" "}
                <span className="text-primary">recrutements sign&eacute;s</span>
              </h2>
              <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
                Du premier appel à votre première shortlist : 48h.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[68px] left-[12.5%] right-[12.5%] h-[2px]">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-8 lg:gap-10">
              {[
                {
                  step: "01",
                  icon: Target,
                  title: "Brief",
                  badge: "J0",
                  text: "On analyse vos besoins et construit une scorecard avec vos managers.",
                  delay: 0,
                },
                {
                  step: "02",
                  icon: Users,
                  title: "Matching",
                  badge: "J1",
                  text: "On sélectionne le TA idéal pour votre secteur et votre culture.",
                  delay: 0.15,
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Intégration",
                  badge: "J2",
                  text: "Le TA rejoint vos outils et rituels. Première shortlist en 48h.",
                  delay: 0.3,
                },
                {
                  step: "04",
                  icon: CheckCircle,
                  title: "Résultats",
                  badge: "S2-S4",
                  text: "Sourcing ciblé, shortlists qualifiées, KPIs suivis chaque semaine.",
                  delay: 0.45,
                },
              ].map((item) => (
                <FadeIn key={item.step} delay={item.delay}>
                  <div className="text-center relative">
                    {/* Step circle */}
                    <div className="relative mx-auto mb-5">
                      <div className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto backdrop-blur-sm">
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold tracking-wider bg-primary text-white rounded-full shadow-lg shadow-primary/30">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/55 leading-relaxed max-w-[220px] mx-auto">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Photo: closing / handshake */}
          <FadeIn delay={0.5}>
            <div className="mt-14 max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="/photos/perso-home-bureau-main.jpg"
                  alt="Recrutement sign{'é'} — poign{'é'}e de main"
                  width={1000}
                  height={500}
                  className="w-full h-[200px] md:h-[240px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <p className="text-white text-sm font-medium">Recrutement sign{"é"}. Mission accomplie.</p>
                  <span className="text-xs text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">35 jours en moyenne</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="mt-10 text-center">
              <Link
                href={HUBSPOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:brightness-110 transition-all duration-300 hover:gap-3 shadow-lg shadow-primary/25"
              >
                R&eacute;server un appel d&eacute;couverte <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. FREE TOOLS — Link to simulators
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-rocket-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary mb-5">
                Outils gratuits
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Explorez nos outils{" "}
                <span className="text-gradient">gratuits</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Pas besoin de s&rsquo;engager pour commencer à optimiser votre recrutement.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Calculator,
                title: "Calculateur ROI",
                desc: "Estimez vos économies par rapport à un cabinet de recrutement classique.",
                href: "/calculateur",
                time: "30 sec",
                gradient: "from-emerald-500/10 to-teal-500/5",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-500",
                delay: 0,
              },
              {
                icon: ClipboardCheck,
                title: "Diagnostic recrutement",
                desc: "Évaluez la maturité de votre process recrutement en 10 questions.",
                href: "/assessment",
                time: "2 min",
                gradient: "from-blue-500/10 to-indigo-500/5",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-500",
                delay: 0.12,
              },
              {
                icon: Play,
                title: "Démo interactive",
                desc: "Vivez le process RPO en 4 étapes, comme si vous y étiez.",
                href: "/demo",
                time: "2 min",
                gradient: "from-violet-500/10 to-purple-500/5",
                iconBg: "bg-violet-500/10",
                iconColor: "text-violet-500",
                delay: 0.24,
              },
            ].map((tool) => (
              <FadeIn key={tool.href} delay={tool.delay}>
                <Link href={tool.href} className="group block h-full">
                  <div className={`relative p-7 rounded-2xl bg-gradient-to-br ${tool.gradient} border border-border/40 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                        <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-background/80 text-muted-foreground border border-border/40">
                        {tool.time}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {tool.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                      Essayer gratuitement <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Utilis&eacute;s par 300+ DRH et CEO &mdash; sans cr&eacute;er de compte
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
