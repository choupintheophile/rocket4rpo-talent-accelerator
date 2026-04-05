import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const CTASection = ({
  title = "Besoin de structurer ou accélérer vos recrutements ?",
  subtitle = "Nos experts Talent Acquisition sont prêts à s'intégrer à vos équipes.",
  ctaLabel = "Échanger avec Rocket4RPO",
  ctaHref = "https://bit.ly/4bJGsuZ",
}: Props) => (
  <section className="section-padding bg-foreground text-background">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="container-tight text-center"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
      <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">{subtitle}</p>
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-8 px-8 py-4 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {ctaLabel} <ArrowRight className="w-4 h-4" />
      </a>
    </motion.div>
  </section>
);
