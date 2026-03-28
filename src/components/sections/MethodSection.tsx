import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  { num: "01", title: "Audit", text: "Analyse de vos besoins, processus existants et culture d'entreprise." },
  { num: "02", title: "Scorecard", text: "Définition précise du profil recherché avec critères objectifs." },
  { num: "03", title: "Sourcing", text: "Approche directe multicanale, chasse de profils passifs et actifs." },
  { num: "04", title: "Qualification", text: "Entretiens de pré-qualification approfondis selon vos critères." },
  { num: "05", title: "Coordination", text: "Pilotage du process avec les hiring managers, planification des entretiens." },
  { num: "06", title: "Reporting", text: "Suivi des KPIs, pipeline de candidats et optimisation continue." },
];

export const MethodSection = () => (
  <section className="section-padding bg-foreground text-background">
    <div className="container-wide">
      <SectionHeading
        badge="Notre méthode"
        title="Un processus structuré pour des résultats mesurables"
        description="De l'audit initial à l'optimisation continue, chaque étape est pensée pour maximiser la qualité et la rapidité de vos recrutements."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-xl border border-background/10"
          >
            <span className="text-primary font-display font-bold text-sm">{s.num}</span>
            <h3 className="font-bold text-lg mt-2 mb-2">{s.title}</h3>
            <p className="text-sm text-background/60 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
