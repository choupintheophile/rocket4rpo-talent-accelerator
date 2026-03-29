import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Target, Crosshair, Monitor, Shuffle, Zap, Network } from "lucide-react";

const reasons = [
  { icon: Target, title: "Compréhension profonde du rôle de TA", text: "Nous connaissons les attentes, les KPIs et les défis quotidiens d'un Talent Acquisition Manager." },
  { icon: Crosshair, title: "Expertise chasse & approche directe", text: "Nos recruteurs spécialisés maîtrisent le sourcing avancé, le cold outreach et l'identification de talents passifs de part leur connaissance marché. " },
  { icon: Monitor, title: "Connaissance du métier cross sectoriel", text: "7 ans d'immersion dans le métier de recruteur, avec des expériences variés pour chaque industrie." },
  { icon: Shuffle, title: "Matching sélectif", text: "Nous ne plaçons que des profils qui correspondent à votre culture, votre stack et vos ambitions." },
  { icon: Zap, title: "Flexibilité opérationnelle", text: "Temps partagé, temps plein, mission ponctuelle : nous nous adaptons à vos contraintes." },
  { icon: Network, title: "Écosystème Rocket4GTM", text: "Accédez à un réseau d'experts Sales, Marketing et GTM pour une approche complète de votre croissance." },
];

export const WhySection = () => (
  <section className="section-padding bg-secondary">
    <div className="container-wide">
      <SectionHeading
        badge="Pourquoi Rocket4RPO"
        title={<>L'expertise Talent Acquisition<br className="hidden md:block" /> au service de votre croissance</>}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 rounded-xl bg-background border border-border"
          >
            <r.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
