"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Each word fades in with blur → sharp */
  blurReveal?: boolean;
}

/**
 * v26 — Cinematic text reveal: each word animates from blurred/below to sharp/in-place.
 * Much more premium than typewriter — feels like a movie title card.
 */
export function TextReveal({ text, className = "", delay = 0, blurReveal = true }: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.3em]"
          initial={{
            opacity: 0,
            y: 30,
            filter: blurReveal ? "blur(10px)" : "none",
          }}
          animate={inView ? {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
