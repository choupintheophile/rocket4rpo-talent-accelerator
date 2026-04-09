"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { toast } from "sonner";

interface Props {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const CTASection = ({
  title = "Vos prochains recrutements méritent mieux qu\u2019un cabinet à 20\u00a0%",
  subtitle = "30 minutes de diagnostic gratuit. Sans engagement. Première shortlist en 48h.",
  ctaLabel = "Réserver mon diagnostic gratuit",
  ctaHref = "/contact",
}: Props) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Veuillez entrer une adresse email valide.");
      return;
    }
    console.log("CTA email captured:", email);
    toast.success("Merci ! Vous recevrez votre diagnostic sous 24h.");
    setEmail("");
  };

  return (
    <section className="section-padding bg-foreground text-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container-tight text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-lg text-background/60 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Email form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3.5 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
          >
            {"Recevoir mon diagnostic gratuit \u2192"}
          </button>
        </form>

        {/* Risk reversal */}
        <p className="mt-6 text-sm text-background/50">
          {"Pas de frais cachés. Pas de relance non souhaitée. Juste des résultats."}
        </p>

        {/* Secondary CTA */}
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-background/50">
          <Phone className="w-4 h-4" />
          <span>{"Ou planifiez un appel directement"}</span>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
          >
            {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
