"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

/* ── Animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / 2000, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomepageSections() {
  return (
    <>
      {/* ── TRUST — Chiffres clés ── */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
            {[
              { value: 200, suffix: "+", label: "recrutements réalisés" },
              { value: 48, suffix: "h", label: "première shortlist" },
              { value: 92, suffix: "%", label: "rétention à 12 mois" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground italic max-w-xl mx-auto">
            &ldquo;En 4 mois, 8 postes pourvus. Le TA s&rsquo;est intégré comme un membre de l&rsquo;équipe.&rdquo;
            <span className="block mt-1 not-italic font-medium text-foreground">&mdash; VP People, Scale-up SaaS (120 pers.)</span>
          </p>
        </div>
      </section>

      {/* ── LE PROBLÈME ── */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Chaque semaine sans le bon recruteur vous coûte entre 5 000 et 15 000€</h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Clock, stat: "84 jours", title: "Time-to-hire moyen en France", text: "12 semaines en moyenne selon l'Apec (2024). Chaque jour de poste vacant, c'est du CA non généré et une équipe qui compense." },
              { icon: Users, stat: "Des dizaines d'h/mois", title: "Perdues par vos managers", text: "Trier des CVs, faire passer des entretiens non qualifiés, relancer les cabinets. Vos opérationnels méritent mieux." },
              { icon: Banknote, stat: "120-200K€", title: "Coût de 10 recrutements via cabinet", text: "15 à 25% du salaire annuel par recrutement. Avec le RPO : ~44 000€ pour les mêmes 10 postes." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-xl bg-background border border-border/60"
              >
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <p className="text-2xl font-bold text-primary mb-1">{item.stat}</p>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LA SOLUTION — Ce qu'on fait concrètement ── */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Notre solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Un recruteur senior intégré à votre équipe.{" "}
              <span className="text-gradient">Sans CDI.</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4" />
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Pas un cabinet externe. Pas un freelance lâché dans la nature. Un Talent Acquisition Specialist qui rejoint vos outils, vos rituels et votre culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Search, title: "Sourcing multi-canal", text: "LinkedIn, approche directe, réseau, communautés. Pas des CVs de job boards." },
              { icon: FileCheck, title: "Shortlists en 48h", text: "Chaque candidat évalué : compétences, motivation, culture fit. Pas de volume — de la qualité." },
              { icon: MessageSquare, title: "Coordination managers", text: "Briefs, debriefs, feedbacks, suivi. Vos managers se concentrent sur leur métier." },
              { icon: BarChart3, title: "Reporting hebdo", text: "Pipeline, KPIs, taux de conversion, délais. Vous savez toujours où vous en êtes." },
              { icon: Users, title: "Intégration totale", text: "ATS, Slack, Teams, rituels d'équipe. Le TA représente votre marque, pas Rocket4RPO." },
              { icon: Shield, title: "Tous types de postes", text: "Sales, Tech, Finance, Marketing, Support, Product, Data. Pas de limite sectorielle." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-4 p-5 rounded-xl border border-border/40 bg-background shadow-[0_1px_3px_0_rgb(0_0_0/0.04)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgb(0_0_0/0.08)] hover:border-primary/20 transition-all duration-300"
              >
                <item.icon className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl bg-rocket-cream border border-border/60 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Sans RPO</p>
                <p className="text-2xl font-bold text-destructive">84 jours</p>
                <p className="text-xs text-muted-foreground">time-to-hire moyen</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Avec Rocket4RPO</p>
                <p className="text-2xl font-bold text-primary">35 jours</p>
                <p className="text-xs text-muted-foreground">time-to-hire moyen</p>
              </div>
            </div>
          </div>

          <motion.div {...fade} className="mt-10 text-center">
            <Link
              href="/offre"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Voir le détail de l'offre <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE — 4 étapes ── */}
      <section className="section-padding bg-rocket-navy-soft text-background">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Du premier appel aux premiers recrutements signés</h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4" />
            <p className="mt-4 text-lg text-background/85 max-w-2xl mx-auto">
              Du premier appel à votre première shortlist : 48h.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", icon: Target, title: "Brief", text: "On analyse vos besoins et construit une scorecard avec vos managers.", time: "Jour 0" },
              { step: "02", icon: Users, title: "Matching", text: "On sélectionne le TA idéal pour votre secteur et votre culture.", time: "Jour 1" },
              { step: "03", icon: Rocket, title: "Intégration", text: "Le TA rejoint vos outils et rituels. Première shortlist en 48h.", time: "Jour 2" },
              { step: "04", icon: CheckCircle, title: "Résultats", text: "Sourcing ciblé, shortlists qualifiées, KPIs suivis chaque semaine.", time: "Semaine 2-4" },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-mono text-primary/80">{item.time}</span>
                <h3 className="font-bold text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-background/80 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTILS GRATUITS ── */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fade} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Explorez nos outils gratuits</h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-4" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { title: "Démo interactive", desc: "Vivez le process RPO en 4 étapes", href: "/demo", time: "2 min" },
              { title: "Comparateur", desc: "RPO vs Cabinet vs Interne", href: "/comparateur", time: "1 min" },
              { title: "Calculateur ROI", desc: "Estimez vos économies", href: "/calculateur", time: "30 sec" },
              { title: "Diagnostic", desc: "Évaluez votre process recrutement", href: "/assessment", time: "2 min" },
            ].map((tool) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link
                  href={tool.href}
                  className="group block p-5 rounded-xl border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold group-hover:text-primary transition-colors">{tool.title}</h3>
                    <span className="text-xs text-muted-foreground">{tool.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Utilisés par 300+ DRH et CEO</p>
        </div>
      </section>
    </>
  );
}
