import { Layout } from "@/components/layout/Layout";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { SEO, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Code, Users, Target, CheckCircle, Zap } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };

const RecrutementTechStartup = () => (
  <Layout>
    <SEO
      title="Recrutement Tech Startup — RPO spécialisé startups & scale-ups"
      description="Recrutez les meilleurs talents tech pour votre startup ou scale-up. RPO spécialisé dans le recrutement de développeurs, product managers et profils techniques."
      canonical="/recrutement-tech-startup"
      schema={[
        serviceSchema("Recrutement Tech Startup", "RPO spécialisé dans le recrutement tech pour startups et scale-ups.", "/recrutement-tech-startup"),
        breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Recrutement Tech Startup", url: "/recrutement-tech-startup" },
        ]),
      ]}
    />
    <Breadcrumbs items={[{ label: "Accueil", to: "/" }, { label: "Recrutement Tech Startup" }]} />

    {/* HERO */}
    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-4xl">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
              Recrutement Tech
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Recrutement Tech pour startups :{" "}
              <span className="text-gradient">les bons profils, au bon moment</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Rocket4RPO accompagne les startups et scale-ups tech dans le recrutement de leurs talents techniques : développeurs, product managers, data engineers, DevOps et plus encore.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Recruter mes profils tech <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* SECTION 1 — Le défi du recrutement tech en startup */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Le défi du recrutement tech en startup</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Recruter des profils techniques en startup est un exercice particulièrement exigeant. Les meilleurs développeurs, product managers et ingénieurs sont sollicités en permanence, et les startups doivent rivaliser avec des entreprises plus grandes disposant de budgets plus importants et de marques employeurs plus visibles. Le recrutement tech en startup ne peut pas se limiter à publier une annonce et attendre : il nécessite une approche proactive, ciblée et rapide.
              </p>
              <p>
                Chez Rocket4RPO, nos Talent Acquisition Specialists comprennent les spécificités du recrutement en environnement startup. Ils savent identifier les candidats qui sont non seulement compétents techniquement, mais aussi capables de s'épanouir dans un contexte de forte croissance : autonomie, polyvalence, capacité à évoluer avec l'organisation, adhésion à la mission. Cette compréhension fine du profil startup permet de présenter des candidats qui restent et performent, pas simplement des CVs qui cochent des cases.
              </p>
              <p>
                Notre approche combine sourcing avancé sur les communautés tech (GitHub, Stack Overflow, meetups), chasse directe de profils passifs, qualification technique structurée et accompagnement du candidat tout au long du processus. Le résultat : un time-to-hire réduit de 30 à 50 %, des profils mieux alignés et un taux de rétention supérieur à la moyenne du marché.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* SECTION 2 — Profils recrutés */}
    <section className="section-padding">
      <div className="container-wide">
        <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Les profils tech que nous recrutons</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Code, title: "Développeurs", text: "Frontend, Backend, Full-Stack — React, Node.js, Python, Go, Java, TypeScript et tout stack moderne." },
            { icon: Rocket, title: "Product & Engineering", text: "Product Managers, Engineering Managers, CTO, VP Engineering, Tech Leads." },
            { icon: Target, title: "Data & Infrastructure", text: "Data Engineers, Data Scientists, DevOps, SRE, Cloud Architects." },
            { icon: Users, title: "Design & UX", text: "Product Designers, UX Researchers, Design System Leads." },
            { icon: Zap, title: "Cybersécurité", text: "Security Engineers, RSSI, Pentesteurs, DevSecOps." },
            { icon: CheckCircle, title: "Profils leadership", text: "VP Engineering, Head of Product, Head of Data, CTO — profils de direction technique." },
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

    {/* SECTION 3 — Pourquoi Rocket4RPO */}
    <section className="section-padding bg-secondary">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pourquoi les startups choisissent Rocket4RPO</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Les startups ont besoin de rapidité, d'agilité et de compréhension de leur réalité. Nos recruteurs sont eux-mêmes issus de l'écosystème tech : ils parlent le même langage que vos équipes, comprennent les stacks techniques et savent évaluer le potentiel d'un candidat au-delà de son CV. Ils s'intègrent dans vos équipes et deviennent un vrai partenaire de votre croissance.
              </p>
              <p>
                Que vous ayez besoin d'un recruteur à temps partagé pour vos premiers recrutements stratégiques ou d'un RPO dédié à temps plein pour une phase d'hypercroissance, Rocket4RPO adapte son modèle d'intervention à vos besoins et à votre budget. Pas de frais au succès, pas de surprise : un engagement transparent et des résultats mesurables.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default RecrutementTechStartup;
