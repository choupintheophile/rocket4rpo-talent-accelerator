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
  Star,
  Award,
  RefreshCw,
  UserCheck,
  Building2,
} from "lucide-react";

const HUBSPOT = "/rdv";

/* ── Animated counter with eased counting ── */
function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2200,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ── Animated bar for the comparison ── */
function AnimatedBar({
  width,
  color,
  delay,
}: {
  width: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="h-3 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${width}%` } : { width: 0 }}
        transition={{
          duration: 1.5,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
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
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Step card with InView highlight ── */
function StepCard({
  item,
  index,
  total,
}: {
  item: {
    step: string;
    icon: React.ElementType;
    title: string;
    badge: string;
    text: string;
    delay: number;
  };
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <FadeIn delay={item.delay}>
      <div ref={ref} className="text-center relative">
        {/* Vertical timeline connector (mobile only) */}
        {index < total - 1 && (
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-[76px] w-[2px] h-[calc(100%+32px)] bg-gradient-to-b from-primary/40 to-primary/10" />
        )}

        {/* Step number with circular progress ring */}
        <div className="relative mx-auto mb-5">
          {/* Outer progress ring */}
          <div className="relative w-[84px] h-[84px] mx-auto">
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 84 84"
            >
              <circle
                cx="42"
                cy="42"
                r="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/10"
              />
              <motion.circle
                cx="42"
                cy="42"
                r="38"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-primary"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 38}
                initial={{
                  strokeDashoffset: 2 * Math.PI * 38,
                }}
                animate={
                  inView
                    ? {
                        strokeDashoffset:
                          2 * Math.PI * 38 * (1 - (index + 1) / total),
                      }
                    : { strokeDashoffset: 2 * Math.PI * 38 }
                }
                transition={{
                  duration: 1.2,
                  delay: item.delay + 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </svg>
            <div
              className={`absolute inset-[6px] rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-700 ${
                inView
                  ? "bg-gradient-to-br from-primary/25 to-primary/10 border-2 border-primary/40 shadow-lg shadow-primary/20"
                  : "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15"
              }`}
            >
              <item.icon className="w-7 h-7 text-primary" />
            </div>
          </div>
          <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold tracking-wider bg-primary text-white rounded-full shadow-lg shadow-primary/30">
            {item.badge}
          </span>
          {/* Step number */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/60 tracking-widest">
            {item.step}
          </span>
        </div>

        <h3
          className={`font-bold text-xl mb-2 transition-colors duration-700 ${
            inView ? "text-white" : "text-white/70"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed max-w-[220px] mx-auto">
          {item.text}
        </p>
      </div>
    </FadeIn>
  );
}

export default function HomepageSections() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          1. LE PROBLEME — Dark background, pain points with big animated numbers
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-rocket-dark text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-500/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-red-500/10 text-red-400 mb-5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Le probl&egrave;me
              </span>
              <h2 className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-tight">
                Chaque semaine sans le bon recruteur vous{" "}
                <span className="text-red-400">co&ucirc;te cher</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                statNum: 84,
                unit: "jours",
                title: "D\u00e9lai moyen de recrutement",
                text: "12 semaines en moyenne selon l\u2019Apec (2024). Chaque jour de poste vacant, c\u2019est du CA non g\u00e9n\u00e9r\u00e9 et une \u00e9quipe qui compense.",
                delay: 0,
              },
              {
                icon: Users,
                statNum: 12,
                unit: "h/semaine",
                title: "Perdues par vos managers",
                text: "Trier des CVs, faire passer des entretiens non qualifi\u00e9s, relancer les cabinets. Vos op\u00e9rationnels m\u00e9ritent mieux.",
                delay: 0.15,
              },
              {
                icon: Banknote,
                statNum: 200,
                statPrefix: "120-",
                unit: "K\u20ac",
                title: "Le co\u00fbt d\u2019un cabinet",
                text: "15 \u00e0 25% du salaire annuel par recrutement. Pour 10 recrutements, la facture explose. Avec le RPO\u00a0: ~30\u00a0000\u20ac.",
                delay: 0.3,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="relative group h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-7 md:p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm h-full flex flex-col transition-all duration-500 hover:border-red-500/20 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                      <item.icon className="w-7 h-7 text-red-400" />
                    </div>
                    <div className="mb-4">
                      <span className="text-5xl md:text-6xl font-bold text-white/95 tracking-tight">
                        {item.statPrefix && (
                          <span>{item.statPrefix}</span>
                        )}
                        <Counter target={item.statNum} />
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
              </motion.div>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-12 text-center">
              <p className="text-lg md:text-xl font-medium text-white/70 max-w-2xl mx-auto">
                Le recrutement ne devrait pas{" "}
                <span className="text-white font-bold">
                  freiner votre croissance.
                </span>
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
          2. LA SOLUTION ROCKET4RPO — Benefits + photo + animated comparison
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
                La solution
              </span>
              <h2 className="text-2xl md:text-3xl font-bold max-w-4xl mx-auto leading-tight">
                Un recruteur senior int&eacute;gr&eacute; en 1 semaine.{" "}
                <span className="text-gradient">
                  Pas un cabinet. Pas un freelance. Un expert.
                </span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Un Talent Acquisition Specialist qui rejoint vos outils, vos
                rituels et votre culture. Il repr&eacute;sente votre marque, pas
                la n&ocirc;tre.
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
                    Votre TA Specialist, int&eacute;gr&eacute; directement dans
                    votre &eacute;quipe
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 6 benefit cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: "Sourcing multicanal",
                text: "LinkedIn, approche directe, r\u00e9seau, communaut\u00e9s. Pas des CVs de job boards. Des profils qualifi\u00e9s et motiv\u00e9s.",
                gradient: "from-blue-500/10 to-blue-600/5",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-500",
                delay: 0,
              },
              {
                icon: FileCheck,
                title: "Shortlists en 5-7 jours",
                text: "Chaque candidat \u00e9valu\u00e9\u00a0: comp\u00e9tences, motivation, culture fit. Pas de volume \u2014 de la qualit\u00e9.",
                gradient: "from-emerald-500/10 to-emerald-600/5",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-500",
                delay: 0.08,
              },
              {
                icon: MessageSquare,
                title: "Coordination managers",
                text: "Briefs, debriefs, feedbacks, suivi. Vos managers se concentrent sur leur m\u00e9tier, pas sur le recrutement.",
                gradient: "from-violet-500/10 to-violet-600/5",
                iconBg: "bg-violet-500/10",
                iconColor: "text-violet-500",
                delay: 0.16,
              },
              {
                icon: BarChart3,
                title: "Reporting hebdo",
                text: "Pipeline, KPIs, taux de conversion, d\u00e9lais. Vous savez toujours o\u00f9 vous en \u00eates.",
                gradient: "from-amber-500/10 to-amber-600/5",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-500",
                delay: 0.24,
              },
              {
                icon: Users,
                title: "Int\u00e9gration totale",
                text: "ATS, Slack, Teams, rituels d\u2019\u00e9quipe. Le TA repr\u00e9sente votre marque, pas Rocket4RPO.",
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
                <div
                  className={`group relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/40 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}
                  >
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
                        <Counter target={84} /> jours
                      </span>
                    </div>
                    <AnimatedBar
                      width={100}
                      color="bg-gradient-to-r from-red-400 to-red-500"
                      delay={0}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Avec Rocket4RPO
                        </span>
                        {/* Pulsing "Recommande" badge */}
                        <motion.span
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/15 text-primary border border-primary/25"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(20,184,166,0)",
                              "0 0 0 6px rgba(20,184,166,0.15)",
                              "0 0 0 0 rgba(20,184,166,0)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <CheckCircle className="w-2.5 h-2.5" />
                          Recommand&eacute;
                        </motion.span>
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        2-3 semaines
                      </span>
                    </div>
                    <AnimatedBar
                      width={42}
                      color="bg-gradient-to-r from-primary to-emerald-500"
                      delay={0.3}
                    />
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-border/40">
                  <p className="text-center text-sm font-semibold text-primary">
                    -<Counter target={58} suffix="%" /> de time-to-hire en
                    moyenne
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
                Voir le d&eacute;tail de l&apos;offre{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. POURQUOI ROCKET4RPO — Authority / differentiation + trust
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-amber-500/10 text-amber-600 mb-5">
                <Star className="w-3.5 h-3.5" />
                Pourquoi Rocket4RPO
              </span>
              <h2 className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-tight">
                Le{" "}
                <span className="text-gradient">top 1%</span> des Talent
                Acquisition de France
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Nous ne travaillons pas avec n&apos;importe quel recruteur.
                Notre processus de s&eacute;lection est le plus exigeant du
                march&eacute;.
              </p>
            </div>
          </FadeIn>

          {/* Trust banner */}
          <FadeIn delay={0.05}>
            <div className="max-w-4xl mx-auto mb-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-5 px-6 rounded-2xl bg-gradient-to-r from-primary/[0.04] via-amber-500/[0.04] to-primary/[0.04] border border-border/30">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <Building2 className="w-4.5 h-4.5 text-primary" />
                  <span>
                    <Counter target={50} suffix="+" /> entreprises nous font
                    confiance
                  </span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-border/50" />
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  {[
                    "SaaS",
                    "Scale-ups",
                    "PME",
                    "ESN",
                    "FinTech",
                    "HealthTech",
                  ].map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-background/80 border border-border/40 text-muted-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 4 authority cards with hover lift */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: UserCheck,
                number: "300+",
                title: "TA \u00e9valu\u00e9s sur 15 crit\u00e8res",
                text: "Comp\u00e9tences techniques, soft skills, sp\u00e9cialisation sectorielle, culture fit. Chaque TA est audit\u00e9 en profondeur.",
                gradient: "from-blue-500/10 to-blue-600/5",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-500",
                delay: 0,
              },
              {
                icon: Award,
                number: "90%+",
                title: "Score minimum pour int\u00e9grer le vivier",
                text: "Seuls les meilleurs int\u00e8grent notre r\u00e9seau. Si un TA ne passe pas nos crit\u00e8res, il ne travaille pas avec nos clients.",
                gradient: "from-amber-500/10 to-amber-600/5",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-500",
                delay: 0.1,
              },
              {
                icon: Rocket,
                number: "1 sem.",
                title: "Op\u00e9rationnel, pas en 3 mois",
                text: "Votre TA d\u00e9marre en 1 semaine. Premi\u00e8re shortlist qualifi\u00e9e d\u00e8s la premi\u00e8re semaine. Pas de formation longue.",
                gradient: "from-emerald-500/10 to-emerald-600/5",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-500",
                delay: 0.2,
              },
              {
                icon: RefreshCw,
                number: "1 sem.",
                title: "Remplacement sous 1 semaine si besoin",
                text: "Si le match n\u2019est pas parfait, on remplace votre TA en 1 semaine. Sans frais suppl\u00e9mentaires. Z\u00e9ro risque.",
                gradient: "from-rose-500/10 to-rose-600/5",
                iconBg: "bg-rose-500/10",
                iconColor: "text-rose-500",
                delay: 0.3,
              },
            ].map((item) => (
              <FadeIn key={item.title} delay={item.delay}>
                <div
                  className={`group relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/40 h-full transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-[6px] hover:border-primary/25`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}
                  >
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {item.number}
                  </p>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Photo + testimonial side by side */}
          <FadeIn delay={0.4}>
            <div className="mt-12 grid md:grid-cols-[280px_1fr] gap-8 items-center max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/5 border border-border/40">
                <Image
                  src="/photos/equipe-interieur.webp"
                  alt="L'&eacute;quipe Rocket4RPO"
                  width={560}
                  height={560}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-3">
                  &ldquo;En 4 mois, 8 postes pourvus. Le TA s&apos;est
                  int&eacute;gr&eacute; comme un membre de l&apos;&eacute;quipe.
                  On a divis&eacute; notre time-to-hire par deux et
                  lib&eacute;r&eacute; nos managers.&rdquo;
                </p>
                <p className="text-sm font-semibold text-foreground">
                  &mdash; VP People, Scale-up SaaS (120 pers.)
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. COMMENT CA MARCHE — 4-step process with timeline + progress
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
              <h2 className="text-2xl md:text-3xl font-bold">
                Du premier appel aux premiers{" "}
                <span className="text-primary">recrutements sign&eacute;s</span>
              </h2>
              <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
                Du premier appel &agrave; votre premi&egrave;re shortlist : 1
                semaine.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto relative">
            {/* Horizontal timeline connecting line (desktop only) */}
            <div className="hidden md:block absolute top-[42px] left-[12.5%] right-[12.5%] h-[2px]">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
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
                  text: "On s\u00e9lectionne le TA id\u00e9al pour votre secteur et votre culture.",
                  delay: 0.15,
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Int\u00e9gration",
                  badge: "J2",
                  text: "Le TA rejoint vos outils et rituels. Premi\u00e8re shortlist en 5-7 jours.",
                  delay: 0.3,
                },
                {
                  step: "04",
                  icon: CheckCircle,
                  title: "R\u00e9sultats",
                  badge: "S2-S4",
                  text: "Sourcing cibl\u00e9, shortlists qualifi\u00e9es, KPIs suivis chaque semaine. Premiers recrutements sign\u00e9s.",
                  delay: 0.45,
                },
              ].map((item, idx, arr) => (
                <StepCard
                  key={item.step}
                  item={item}
                  index={idx}
                  total={arr.length}
                />
              ))}
            </div>
          </div>

          {/* Photo */}
          <FadeIn delay={0.5}>
            <div className="mt-14 max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="/photos/perso-home-bureau-main.jpg"
                  alt="Recrutement sign&eacute; — mission accomplie"
                  width={1000}
                  height={500}
                  className="w-full h-[200px] md:h-[240px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <p className="text-white text-sm font-medium">
                    Recrutement sign&eacute;. Mission accomplie.
                  </p>
                  <span className="text-xs text-white/60 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    2-3 semaines en moyenne
                  </span>
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
                R&eacute;server un appel d&eacute;couverte{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. SIMULATEURS GRATUITS — 3 tool cards with gradients + badges
          ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-rocket-cream relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="container-wide relative">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary mb-5">
                Simulateurs gratuits
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                Explorez nos outils{" "}
                <span className="text-gradient">gratuits</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Pas besoin de s&apos;engager pour commencer &agrave; optimiser
                votre recrutement.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Calculator,
                title: "Calculateur ROI",
                desc: "Estimez vos \u00e9conomies par rapport \u00e0 un cabinet de recrutement classique. R\u00e9sultat instantan\u00e9.",
                href: "/calculateur",
                time: "30 sec",
                gradientBg:
                  "bg-gradient-to-br from-emerald-500/[0.12] via-teal-500/[0.08] to-emerald-600/[0.04]",
                iconBg:
                  "bg-gradient-to-br from-emerald-500/20 to-teal-500/10",
                iconColor: "text-emerald-500",
                borderHover: "hover:border-emerald-500/30",
                badge: "Populaire",
                delay: 0,
              },
              {
                icon: ClipboardCheck,
                title: "Diagnostic recrutement",
                desc: "\u00c9valuez la maturit\u00e9 de votre process recrutement en 7 questions. Score personnalis\u00e9.",
                href: "/assessment",
                time: "2 min",
                gradientBg:
                  "bg-gradient-to-br from-blue-500/[0.12] via-indigo-500/[0.08] to-blue-600/[0.04]",
                iconBg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/10",
                iconColor: "text-blue-500",
                borderHover: "hover:border-blue-500/30",
                badge: null,
                delay: 0.12,
              },
              {
                icon: Play,
                title: "D\u00e9mo interactive",
                desc: "Vivez le process RPO en 4 \u00e9tapes, comme si vous y \u00e9tiez. D\u00e9couvrez comment \u00e7a fonctionne concr\u00e8tement.",
                href: "/demo",
                time: "2 min",
                gradientBg:
                  "bg-gradient-to-br from-violet-500/[0.12] via-purple-500/[0.08] to-violet-600/[0.04]",
                iconBg:
                  "bg-gradient-to-br from-violet-500/20 to-purple-500/10",
                iconColor: "text-violet-500",
                borderHover: "hover:border-violet-500/30",
                badge: null,
                delay: 0.24,
              },
            ].map((tool) => (
              <FadeIn key={tool.href} delay={tool.delay}>
                <Link href={tool.href} className="group block h-full">
                  <div
                    className={`relative p-7 rounded-2xl ${tool.gradientBg} border border-border/40 h-full transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${tool.borderHover}`}
                  >
                    {/* Badge "Populaire" */}
                    {tool.badge && (
                      <motion.span
                        className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/15 text-emerald-600 border border-emerald-500/20"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(16,185,129,0)",
                            "0 0 0 5px rgba(16,185,129,0.12)",
                            "0 0 0 0 rgba(16,185,129,0)",
                          ],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Star className="w-2.5 h-2.5 fill-emerald-500" />
                        {tool.badge}
                      </motion.span>
                    )}

                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-xl ${tool.iconBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
                      >
                        <tool.icon
                          className={`w-7 h-7 ${tool.iconColor}`}
                        />
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-background/80 text-muted-foreground border border-border/40">
                        {tool.time}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {tool.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3 px-4 py-2 rounded-lg bg-primary/10 group-hover:bg-primary/15">
                      Essayer gratuitement{" "}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-8 text-center">
              <Link
                href="/outils"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                Voir tous nos outils <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">
                Utilis&eacute;s par 300+ DRH et CEO &mdash; sans cr&eacute;er
                de compte
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
