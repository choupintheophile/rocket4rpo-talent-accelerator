import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { SEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Target, CheckCircle, Zap, Brain } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };

const RPOTempsPartage = () => (
  <Layout>
    <SEO
      title="RPO à temps partagé — Recrutement externalisé flexible"
      description="Externalisez vos recrutements avec un RPO à temps partagé. Un recruteur expert intégré quelques jours par semaine pour recruter mieux, plus vite, à moindre coût."
      canonical="/rpo-temps-partage"
      schema={[
        serviceSchema("RPO à temps partagé", "Recrutement externalisé flexible avec un expert intégré quelques jours par semaine.", "/rpo-temps-partage"),
        breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "RPO à temps partagé", url: "/rpo-temps-partage" },
        ]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Accueil", to: "/" }, { label: "RPO à temps partagé" }]} />

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              RPO flexible
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              RPO à temps partagé : l'expertise recrutement{" "}
              <span className="text-gradient">sans le coût d'un poste à temps plein</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Intégrez un recruteur RPO expérimenté quelques jours par semaine dans vos équipes. Flexibilité maximale, expertise immédiate, résultats mesurables.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Demander un devis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* SECTION 1 — Le modèle RPO temps partagé */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le modèle RPO à temps partagé expliqué</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le RPO (Recruitment Process Outsourcing) à temps partagé consiste à externaliser tout ou partie de votre processus de recrutement auprès d'un expert dédié, sans avoir à supporter le coût d'un recruteur interne à temps plein. Concrètement, un Talent Acquisition Specialist expérimenté s'intègre dans vos équipes quelques jours par semaine — de 1 à 4 jours selon vos besoins — pour piloter vos recrutements de bout en bout.
              </p>
              <p>
                Ce modèle est particulièrement adapté aux entreprises en croissance qui ont des besoins de recrutement réguliers mais pas suffisamment volumiques pour justifier un poste dédié. Il permet d'accéder à une expertise senior immédiatement opérationnelle : sourcing avancé, qualification structurée, coordination avec les hiring managers, pilotage des indicateurs de performance recrutement.
              </p>
              <p>
                Contrairement au recrutement au succès ou au cabinet classique, le RPO à temps partagé crée une relation de proximité avec vos équipes. Le recruteur comprend votre culture, vos enjeux métiers et vos processus internes, ce qui se traduit par des shortlists plus pertinentes et un time-to-hire significativement réduit.
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Pourquoi choisir le RPO à temps partagé</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "Flexibilité totale", text: "Ajustez le nombre de jours d'intervention selon votre volumétrie de recrutement. Montez en puissance ou réduisez sans engagement rigide." },
            { icon: Brain, title: "Expertise senior immédiate", text: "Un recruteur expérimenté, opérationnel en quelques jours, qui comprend les enjeux de chaque poste et sait qualifier avec précision." },
            { icon: Target, title: "Shortlists pertinentes", text: "Grâce à l'immersion dans votre culture et vos process, les profils présentés correspondent réellement à vos attentes." },
            { icon: Users, title: "Collaboration avec vos managers", text: "Le recruteur RPO travaille en binôme avec vos hiring managers pour cadrer les besoins, structurer les entretiens et optimiser les décisions." },
            { icon: Zap, title: "Réduction du time-to-hire", text: "Un processus structuré et une exécution rapide permettent de réduire significativement vos délais de recrutement." },
            { icon: CheckCircle, title: "Maîtrise budgétaire", text: "Vous accédez à une expertise de haut niveau sans les charges d'un CDI. Le coût est proportionnel à votre besoin réel." },
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

    {/* SECTION 3 — Pour qui */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">À qui s'adresse le RPO à temps partagé ?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Ce modèle convient aux startups et scale-ups qui recrutent entre 3 et 15 postes par trimestre, aux PME en structuration qui n'ont pas encore de fonction recrutement dédiée, et aux entreprises en transformation qui ont besoin d'accélérer ponctuellement leurs recrutements sans créer de poste supplémentaire.
              </p>
              <p>
                Il est également pertinent pour les entreprises disposant d'un recruteur interne qui a besoin de renfort : le RPO à temps partagé vient compléter la capacité existante avec une expertise complémentaire, notamment sur le sourcing de profils pénuriques ou la structuration de processus.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default RPOTempsPartage;
