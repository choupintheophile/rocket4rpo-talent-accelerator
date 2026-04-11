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
          1. LE PROBL\u00c8ME — Dark background, pain points with big numbers
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
                Le probl\u00e8me
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
                Chaque semaine sans le bon recruteur vous{" "}
                <span className="text-red-400">co\u00fbte cher</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                stat: "84",
                unit: "jours",
                title: "D\u00e9lai moyen de recrutement",
                text: "12 semaines en moyenne selon l'Apec (2024). Chaque jour de poste vacant, c'est du CA non g\u00e9n\u00e9r\u00e9 et une \u00e9quipe qui compense.",
                delay: 0,
              },
              {
                icon: Users,
                stat: "12",
                unit: "h/semaine",
                title: "Perdues par vos managers",
                text: "Trier des CVs, faire passer des entretiens non qualifi\u00e9s, relancer les cabinets. Vos op\u00e9rationnels m\u00e9ritent mieux.",
                delay: 0.15,
              },
              {
                icon: Banknote,
                stat: "120-200",
                unit: "K\u20ac",
                title: "Le co\u00fbt d'un cabinet",
                text: "15 \u00e0 25% du salaire annuel par recrutement. Pour 10 recrutements, la facture explose. Avec le RPO : ~44\u00a0000\u20ac.",
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
                Le recrutement ne devrait pas{" "}
                <span className="text-white font-bold">freiner votre croissance.</span>
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
          2. LA SOLUTION ROCKET4RPO — White background, benefits + photo + comparison
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight">
                Un recruteur senior int\u00e9gr\u00e9 en 48h.{" "}
                <span className="text-gradient">Pas un cabinet. Pas un freelance. Un expert.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Un Talent Acquisition Specialist qui rejoint vos outils, vos rituels et votre culture. Il repr\u00e9sente votre marque, pas la n\u00f4tre.
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
                title: "Shortlists en 48h",
                text: "Chaque candidat \u00e9valu\u00e9 : comp\u00e9tences, motivation, culture fit. Pas de volume \u2014 de la qualit\u00e9.",
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
                text: "ATS, Slack, Teams, rituels d'\u00e9quipe. Le TA repr\u00e9sente votre marque, pas Rocket4RPO.",
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
                  R\u00e9sultat concret
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
                Voir le d\u00e9tail de l\u2019offre{" "}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. POURQUOI ROCKET4RPO — Authority / differentiation
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
                Le{" "}
                <span className="text-gradient">top 1%</span>{" "}
                des Talent Acquisition de France
              </h2>
              <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Nous ne travaillons pas avec n'importe quel recruteur. Notre processus de s\u00e9lection est le plus exigeant du march\u00e9.
              </p>
            </div>
          </FadeIn>

          {/* 4 authority cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: UserCheck,
                number: "50+",
                title: "TA \u00e9valu\u00e9s sur 7 crit\u00e8res",
                text: "Comp\u00e9tences techniques, soft skills, sp\u00e9cialisation sectorielle, culture fit. Chaque TA est audit\u00e9 en profondeur.",
                gradient: "from-blue-500/10 to-blue-600/5",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-500",
                delay: 0,
              },
              {
                icon: Award,
                number: "80%+",
                title: "Score minimum pour int\u00e9grer le vivier",
                text: "Seuls les meilleurs int\u00e8grent notre r\u00e9seau. Si un TA ne passe pas nos crit\u00e8res, il ne travaille pas avec nos clients.",
                gradient: "from-amber-500/10 to-amber-600/5",
                iconBg: "bg-amber-500/10",
                iconColor: "text-amber-500",
                delay: 0.1,
              },
              {
                icon: Rocket,
                number: "48h",
                title: "Op\u00e9rationnel, pas en 3 mois",
                text: "Votre TA d\u00e9marre en 48h. Premi\u00e8re shortlist qualifi\u00e9e d\u00e8s la premi\u00e8re semaine. Pas de formation longue.",
                gradient: "from-emerald-500/10 to-emerald-600/5",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-500",
                delay: 0.2,
              },
              {
                icon: RefreshCw,
                number: "48h",
                title: "Remplacement sous 48h si besoin",
                text: "Si le match n'est pas parfait, on remplace votre TA en 48h. Sans frais suppl\u00e9mentaires. Z\u00e9ro risque.",
                gradient: "from-rose-500/10 to-rose-600/5",
                iconBg: "bg-rose-500/10",
                iconColor: "text-rose-500",
                delay: 0.3,
              },
            ].map((item) => (
              <FadeIn key={item.title} delay={item.delay}>
                <div className={`group relative p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-border/40 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20`}>
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{item.number}</p>
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
                  alt="L'\u00e9quipe Rocket4RPO"
                  width={560}
                  height={560}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border border-primary/10">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic leading-relaxed mb-3">
                  &ldquo;En 4 mois, 8 postes pourvus. Le TA s'est int\u00e9gr\u00e9 comme un membre de l'\u00e9quipe. On a divis\u00e9 notre time-to-hire par deux et lib\u00e9r\u00e9 nos managers.&rdquo;
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
          4. COMMENT \u00c7A MARCHE — 4-step process, dark navy background
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
                Comment \u00e7a marche
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Du premier appel aux premiers{" "}
                <span className="text-primary">recrutements sign\u00e9s</span>
              </h2>
              <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
                Du premier appel \u00e0 votre premi\u00e8re shortlist : 48h.
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
                  text: "On s\u00e9lectionne le TA id\u00e9al pour votre secteur et votre culture.",
                  delay: 0.15,
                },
                {
                  step: "03",
                  icon: Rocket,
                  title: "Int\u00e9gration",
                  badge: "J2",
                  text: "Le TA rejoint vos outils et rituels. Premi\u00e8re shortlist en 48h.",
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

          {/* Photo */}
          <FadeIn delay={0.5}>
            <div className="mt-14 max-w-2xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <Image
                  src="/photos/perso-home-bureau-main.jpg"
                  alt="Recrutement sign\u00e9 \u2014 mission accomplie"
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
                R\u00e9server un appel d\u00e9couverte <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. SIMULATEURS GRATUITS — 3 tool cards
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Explorez nos outils{" "}
                <span className="text-gradient">gratuits</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Pas besoin de s'engager pour commencer \u00e0 optimiser votre recrutement.
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
                gradient: "from-emerald-500/10 to-teal-500/5",
                iconBg: "bg-emerald-500/10",
                iconColor: "text-emerald-500",
                delay: 0,
              },
              {
                icon: ClipboardCheck,
                title: "Diagnostic recrutement",
                desc: "\u00c9valuez la maturit\u00e9 de votre process recrutement en 10 questions. Score personnalis\u00e9.",
                href: "/assessment",
                time: "2 min",
                gradient: "from-blue-500/10 to-indigo-500/5",
                iconBg: "bg-blue-500/10",
                iconColor: "text-blue-500",
                delay: 0.12,
              },
              {
                icon: Play,
                title: "D\u00e9mo interactive",
                desc: "Vivez le process RPO en 4 \u00e9tapes, comme si vous y \u00e9tiez. D\u00e9couvrez comment \u00e7a fonctionne concr\u00e8tement.",
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
            <div className="mt-8 text-center">
              <Link
                href="/outils"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
              >
                Voir tous nos outils <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">
                Utilis\u00e9s par 300+ DRH et CEO \u2014 sans cr\u00e9er de compte
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
