"use client";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, Target, CheckCircle, Layers, ShieldCheck } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

export default function RPOTempsPleinPageClient() {
  const schemas = [
    serviceSchema("RPO à temps plein", "Un recruteur RPO senior dédié à 100% pour piloter vos recrutements avec exigence et méthode.", "/rpo-temps-plein"),
    breadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "RPO à temps plein", url: "/rpo-temps-plein" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <Breadcrumbs items={[{ label: "Accueil", href: "/" }, { label: "RPO à temps plein" }]} />

      {/* HERO */}
      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.div {...fadeUp}>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">RPO dédié</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                RPO à temps plein : une puissance de recrutement{" "}
                <span className="text-gradient">dédiée à votre croissance</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Un Talent Acquisition Specialist senior intégré à 100% dans votre organisation pour structurer, accélérer et piloter l&apos;ensemble de vos recrutements.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="https://bit.ly/4bJGsuZ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Parler à un expert <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Le RPO à temps plein : un recruteur expert intégré dans vos équipes</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Le RPO à temps plein consiste à intégrer un recruteur externalisé senior dans votre entreprise, dédié à 100% à vos recrutements. Contrairement à un cabinet de recrutement classique qui intervient à distance et au succès, le recruteur RPO s&apos;immerge dans votre culture, comprend vos enjeux business et travaille au quotidien avec vos hiring managers.
                </p>
                <p>
                  Ce modèle est conçu pour les entreprises en forte croissance qui doivent recruter de manière soutenue — typiquement 10 à 30 postes par trimestre — et qui ont besoin d&apos;une ressource capable de gérer la volumétrie sans sacrifier la qualité. Le recruteur RPO prend en charge l&apos;ensemble du cycle de recrutement : cadrage des besoins, sourcing multicanal, qualification approfondie, coordination des entretiens, négociation et closing.
                </p>
                <p>
                  L&apos;avantage décisif du RPO à temps plein est la continuité. En étant intégré au quotidien, le recruteur développe une compréhension profonde de chaque équipe, de chaque manager, de chaque enjeu technique ou business. Il devient un véritable partenaire stratégique capable d&apos;anticiper les besoins, d&apos;optimiser les process et de construire un pipeline de talents dans la durée.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Avantages */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Les avantages du RPO à temps plein</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Capacité de recrutement élevée", text: "Gérez simultanément 8 à 15 recrutements avec un recruteur capable de prioriser, accélérer et maintenir un niveau d'exécution constant." },
              { icon: Layers, title: "Structuration durable", text: "Au-delà de l'exécution, le RPO temps plein structure vos process, vos outils et vos rituels de recrutement pour une performance long terme." },
              { icon: Target, title: "Qualité des profils", text: "L'immersion totale dans votre organisation permet de présenter des profils parfaitement alignés avec vos exigences techniques et culturelles." },
              { icon: Users, title: "Partenaire des managers", text: "Le recruteur RPO construit une relation de confiance avec vos managers, comprend leurs attentes et anticipe leurs besoins futurs." },
              { icon: ShieldCheck, title: "Pilotage de la performance", text: "Suivi continu des KPIs recrutement : time-to-hire, qualité des shortlists, taux de conversion, satisfaction des managers." },
              { icon: CheckCircle, title: "Alternative au recrutement interne", text: "Bénéficiez immédiatement d'une expertise senior sans les délais et coûts d'un recrutement CDI (sourcing, onboarding, période d'essai)." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="p-6 rounded-xl bg-background border border-border">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Quand choisir */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Quand choisir le RPO à temps plein ?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Le RPO à temps plein est pertinent lorsque votre volume de recrutement est soutenu et que vous avez besoin d&apos;une ressource dédiée au quotidien. Il convient aux scale-ups en hypercroissance, aux entreprises qui ouvrent un nouveau bureau ou un nouveau marché, et aux organisations qui souhaitent professionnaliser leur fonction recrutement rapidement.
                </p>
                <p>
                  C&apos;est aussi la solution idéale lorsque vos managers sont surchargés par le recrutement opérationnel et que vous avez besoin d&apos;un interlocuteur unique capable de prendre en main l&apos;ensemble du processus, de libérer du temps aux opérationnels et de garantir une exécution de qualité constante.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
