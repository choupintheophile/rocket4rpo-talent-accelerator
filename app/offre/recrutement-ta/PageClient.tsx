"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQSection } from "@/components/shared/FAQSection";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Eye,
  TrendingUp,
  Handshake,
  UserCheck,
  Briefcase,
  Search,
  Users,
} from "lucide-react";

const HUBSPOT = "https://meetings.hubspot.com/theophile-choupin/rpo";

const faqs = [
  {
    question: "Quel est le mod\u00e8le de r\u00e9mun\u00e9ration\u00a0?",
    answer:
      "Nous fonctionnons avec un mod\u00e8le au succ\u00e8s : des honoraires sont factur\u00e9s \u00e0 la signature du contrat du candidat retenu. Aucun frais en cas de non-aboutissement de la mission. Le montant exact est d\u00e9fini en amont selon le profil recherch\u00e9.",
  },
  {
    question: "Quelle garantie si le candidat ne reste pas\u00a0?",
    answer:
      "Nous offrons une garantie de remplacement de 3 mois. Si le candidat quitte le poste ou ne convient pas pendant cette p\u00e9riode, nous relan\u00e7ons la recherche sans frais suppl\u00e9mentaires.",
  },
  {
    question: "Combien de temps prend le process\u00a0?",
    answer:
      "En moyenne, nous pr\u00e9sentons une shortlist de 3 \u00e0 5 profils qualifi\u00e9s en 2 \u00e0 3 semaines. Le process complet (du brief \u00e0 la signature) prend g\u00e9n\u00e9ralement 4 \u00e0 6 semaines.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const whyUs = [
  {
    icon: Eye,
    title: "On \u00e9value des TA tous les jours",
    text: "On sait distinguer un bon recruteur d\u2019un excellent. Notre m\u00e9tier quotidien, c\u2019est le Talent Acquisition.",
  },
  {
    icon: TrendingUp,
    title: "On conna\u00eet le march\u00e9 TA",
    text: "Salaires, comp\u00e9tences, profils rares : on a une vision compl\u00e8te du march\u00e9 du recrutement.",
  },
  {
    icon: Handshake,
    title: "Suivi d\u2019int\u00e9gration",
    text: "On ne dispara\u00eet pas apr\u00e8s la signature. Suivi d\u2019int\u00e9gration de 3 mois pour s\u00e9curiser la r\u00e9ussite.",
  },
];

const profiles = [
  "Talent Acquisition Specialist / Manager",
  "Head of Talent Acquisition",
  "Sourceur senior",
  "Recruteur IT / Sales / Finance",
];

const steps = [
  {
    step: "J0-J3",
    title: "Brief",
    text: "Compr\u00e9hension du poste, de la culture, des attentes.",
  },
  {
    step: "S1-S3",
    title: "Sourcing & shortlist",
    text: "3-5 profils qualifi\u00e9s pr\u00e9sent\u00e9s.",
  },
  {
    step: "S3-S6",
    title: "Accompagnement",
    text: "Entretiens, offre, suivi d\u2019int\u00e9gration 3 mois.",
  },
];

export default function RecrutementTAPageClient() {
  const schemas = [
    serviceSchema(
      "Recrutez votre futur Talent Acquisition",
      "Vous voulez internaliser votre recrutement ? On vous trouve LE bon profil TA en CDI. Shortlist en 2-3 semaines, suivi d\u2019int\u00e9gration inclus.",
      "/offre/recrutement-ta"
    ),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: "Offre", url: "/offre/recrutement-ta" },
      { name: "Recrutez votre TA", url: "/offre/recrutement-ta" },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Breadcrumbs
        items={[
          { label: "Offre", href: "/offre/recrutement-ta" },
          { label: "Recrutez votre TA" },
        ]}
      />

      {/* ── 1. HERO ── */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fadeUp}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
                Recrutement sp\u00e9cialis\u00e9
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Trouvez le recruteur qui fera d\u00e9coller{" "}
                <span className="text-gradient">vos recrutements</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Vous voulez embaucher un Talent Acquisition en interne&nbsp;? On
                est les mieux plac\u00e9s pour \u00e9valuer un recruteur&nbsp;&mdash;&nbsp;c&apos;est notre m\u00e9tier au quotidien.
              </p>
              <div className="mt-8">
                <a
                  href={HUBSPOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Parler \u00e0 un expert <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. POURQUOI NOUS ── */}
      <section className="section-padding bg-[hsl(var(--rocket-cream))]">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Pourquoi nous confier ce recrutement
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROFILS RECRUT\u00c9S ── */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Profils recrut\u00e9s
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Nous recrutons l\u2019ensemble des profils Talent Acquisition, du
                sourceur au Head of TA, dans tous les secteurs.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <div className="space-y-3">
                {profiles.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"
                  >
                    <UserCheck className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. PROCESS ── */}
      <section className="section-padding bg-[hsl(var(--rocket-navy-soft))] text-background">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Notre process
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-background/5 border border-background/10"
              >
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3 text-background">
                  {s.title}
                </h3>
                <p className="text-background/70 leading-relaxed text-sm">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <FAQSection faqs={faqs} className="bg-[hsl(var(--rocket-cream))]" />

      {/* ── 6. CTA ── */}
      <CTASection
        title="Pr\u00eat \u00e0 recruter votre futur TA\u00a0?"
        subtitle="On conna\u00eet le march\u00e9, les profils et les bons r\u00e9flexes pour \u00e9valuer un recruteur."
        ctaLabel="Parler \u00e0 un expert"
      />
    </>
  );
}
