import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { teamMembers } from "@/data/team";

export const TeamPreview = () => (
  <section className="section-padding bg-secondary">
    <div className="container-wide">
      <SectionHeading
        badge="L'équipe"
        title="Des experts qui connaissent votre marché"
      />
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {teamMembers.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-8 rounded-2xl bg-background border border-border"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{m.initials}</span>
            </div>
            <h3 className="font-bold text-lg">{m.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{m.shortBio}</p>
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary hover:underline">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
