import { Layout } from "@/components/layout/Layout";
import { SEO, personSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { teamMembers } from "@/data/team";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const Equipe = () => (
  <Layout>
    <SEO
      title="L'équipe Rocket4RPO — experts Talent Acquisition"
      description="Découvrez l'équipe Rocket4RPO : des experts du recrutement Tech et du Talent Acquisition avec 7+ ans d'expérience dans l'écosystème SaaS."
      canonical="/equipe"
      schema={teamMembers.map((m) => personSchema(m.name, m.role, m.shortBio, m.linkedin))}
    />
    <Breadcrumbs items={[{ label: "Équipe" }]} />

    <section className="section-padding pt-8">
      <div className="container-wide">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">L'équipe <span className="text-gradient">Rocket4RPO</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Des experts qui vivent le recrutement Tech au quotidien.</p>
        </div>

        <div className="space-y-12 max-w-3xl">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 p-8 rounded-2xl border border-border"
            >
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-primary">{m.initials}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{m.name}</h2>
                <p className="text-sm text-primary font-medium">{m.role}</p>
                <p className="mt-3 text-muted-foreground leading-relaxed">{m.fullBio}</p>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary hover:underline">
                    <Linkedin className="w-4 h-4" /> Voir le profil LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
  </Layout>
);

export default Equipe;
