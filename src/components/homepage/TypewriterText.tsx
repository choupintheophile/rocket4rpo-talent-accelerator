"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  glowColor?: string;
  delay?: number;
}

/**
 * Text that types itself out letter by letter when in view.
 * Cursor blinks at the end.
 */
export function TypewriterText({
  text,
  speed = 50,
  className = "",
  glowColor = "rgba(20, 184, 166, 0.6)",
  delay = 0,
}: TypewriterTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  const done = displayed.length >= text.length;

  return (
    <span
      ref={ref}
      className={className}
      style={{
        textShadow: displayed.length > 0 ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}` : "none",
      }}
    >
      {displayed}
      <span
        className="inline-block w-[3px] h-[1em] ml-1 align-middle"
        style={{
          backgroundColor: glowColor,
          animation: done ? "blink 1s step-end infinite" : "none",
          opacity: done ? 1 : 0.8,
        }}
      />
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
}
