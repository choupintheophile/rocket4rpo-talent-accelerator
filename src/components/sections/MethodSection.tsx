"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ClipboardCheck, Users, Rocket, Target } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardCheck,
    title: "Audit & Brief",
    time: "J0-J1",
    text: "Analyse de vos besoins, construction de la scorecard, brief avec les hiring managers.",
  },
  {
    num: "02",
    icon: Users,
    title: "Matching",
    time: "J1-J2",
    text: "Selection du TA Specialist ideal selon votre secteur, vos enjeux et votre culture.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Integration",
    time: "J2-J5",
    text: "Onboarding express : outils, rituels, equipe. Operationnel en quelques jours.",
  },
  {
    num: "04",
    icon: Target,
    title: "Resultats",
    time: "S2-S4",
    text: "Premiere shortlist sous 48h. Sourcing cible, KPIs hebdomadaires, recrutements signes.",
  },
];

/* ------------------------------------------------------------------ */
/*  Single timeline step                                               */
/* ------------------------------------------------------------------ */

function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-[1fr] md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start ${
        !isLast ? "pb-12 md:pb-16" : ""
      }`}
    >
      {/* Left content (visible on desktop for even steps) */}
      <div
        className={`hidden md:block ${isEven ? "" : "order-3"}`}
      >
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-right pr-8"
          >
            <StepContent step={step} Icon={Icon} align="right" />
          </motion.div>
        )}
      </div>

      {/* Center node + connector */}
      <div className="flex flex-col items-center relative">
        {/* Node circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative z-10 w-14 h-14 rounded-full border-2 border-primary bg-foreground flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>

        {/* Connector line (not on last step) */}
        {!isLast && (
          <div className="w-px flex-1 min-h-[60px] bg-border relative overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-primary origin-top"
            />
          </div>
        )}
      </div>

      {/* Right content (visible on desktop for odd steps) */}
      <div
        className={`hidden md:block ${isEven ? "order-3" : ""}`}
      >
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pl-8"
          >
            <StepContent step={step} Icon={Icon} align="left" />
          </motion.div>
        )}
      </div>

      {/* Mobile content (always to the right) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:hidden col-start-1 row-start-1 pl-20"
      >
        <StepContent step={step} Icon={Icon} align="left" />
      </motion.div>

      {/* Mobile node overlay (positioned absolutely on the left) */}
      <div className="md:hidden absolute left-0 top-0 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="relative z-10 w-14 h-14 rounded-full border-2 border-primary bg-foreground flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        {!isLast && (
          <div className="w-px flex-1 min-h-[60px] bg-border relative overflow-hidden">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-primary origin-top"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step content card                                                  */
/* ------------------------------------------------------------------ */

function StepContent({
  step,
  Icon,
  align,
}: {
  step: (typeof steps)[number];
  Icon: React.ElementType;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-3">
        {step.time}
      </span>
      <h3 className="text-xl font-bold mb-2">
        <span className="text-primary mr-2">{step.num}.</span>
        {step.title}
      </h3>
      <p className="text-sm text-background/60 leading-relaxed max-w-sm">
        {step.text}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export const MethodSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Overall progress line opacity
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container-wide">
        <SectionHeading
          badge="Notre methode"
          title="Un processus simple pour des resultats mesurables"
          description="De l'audit initial aux recrutements signes, chaque etape est pensee pour maximiser la qualite et la rapidite."
        />

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <TimelineStep
              key={step.num}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
