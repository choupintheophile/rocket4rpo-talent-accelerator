import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  badge?: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
}

export const SectionHeading = ({ badge, title, description, centered = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-12 md:mb-16`}
  >
    {badge && (
      <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{title}</h2>
    {description && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{description}</p>}
  </motion.div>
);
