"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const akaru = [0.165, 0.84, 0.44, 1] as const;

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

interface Props {
  testimonials: Testimonial[];
}

export const TestimonialsSection = ({ testimonials }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!testimonials.length) return null;

  return (
    <section className="section-padding bg-[hsl(var(--rocket-warm))]">
      <div className="container-wide">
        <SectionHeading
          badge="Témoignages"
          title={
            <>
              {"Ils ont choisi Rocket4RPO. "}
              <span className="text-gradient">{"Voici ce qui a changé."}</span>
            </>
          }
          description="Des DRH, des CEO et des Head of Sales partagent leur expérience. Des résultats concrets, pas des promesses."
        />

        <motion.div
          initial={{ opacity: 0, y: 60, skewY: 1 }}
          whileInView={{ opacity: 1, y: 0, skewY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: akaru }}
          className="relative"
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40, skewY: 1.5 }}
                    whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.1,
                      ease: akaru,
                    }}
                    className="bg-background rounded-2xl border border-border p-8 h-full flex flex-col"
                  >
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.1 + j * 0.05 + 0.3,
                            ease: akaru,
                          }}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              j < t.rating
                                ? "fill-primary text-primary"
                                : "text-border"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote — fade in with translateY */}
                    <motion.blockquote
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.1 + 0.2,
                        ease: akaru,
                      }}
                      className="text-foreground/80 italic leading-relaxed flex-1 mb-6"
                    >
                      {"\u00ab\u00a0"}
                      {t.quote}
                      {"\u00a0\u00bb"}
                    </motion.blockquote>

                    {/* Author — appears after quote */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1 + 0.5,
                        ease: akaru,
                      }}
                    >
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}
                        {" \u2014 "}
                        {t.company}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
              aria-label="Suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
