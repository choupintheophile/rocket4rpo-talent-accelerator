"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
}

export function SplitText({ text, className, as: Tag = "h1", delay = 0 }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0, skewY: 5 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  skewY: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.165, 0.84, 0.44, 1],
                  },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
