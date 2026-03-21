'use client';

import { motion } from 'framer-motion';

export function AnimatedText({ 
  text, 
  highlightText = "", 
  delay = 0,
  accent,
  darkMode = false
}: { 
  text: string, 
  highlightText?: string,
  delay?: number,
  accent?: {
    from: string,
    to: string,
    text: string
  },
  darkMode?: boolean
}) {
  const fullText = text + (highlightText ? highlightText : "");
  const letters = Array.from(fullText);
  // Find index where highlight begins
  const highlightStartIndex = highlightText ? text.length : fullText.length;

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    },
  };

  const child = {
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, damping: 15, stiffness: 150 } },
    hidden: { opacity: 0, y: 30, scale: 0.9 },
  };

  return (
    <motion.span
      className="inline-block relative z-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {letters.map((letter, index) => {
        const isHighlight = index >= highlightStartIndex;
        const gradientClass = accent ? `bg-linear-to-r ${accent.from} ${accent.to}` : "bg-linear-to-r from-primary via-blue-400 to-violet-400";
        
        return (
          <motion.span 
            variants={child} 
            key={index} 
            className={`inline-block ${
              isHighlight 
                ? `text-transparent bg-clip-text ${gradientClass} font-black animate-[pulse_4s_ease-in-out_infinite]` 
                : (darkMode ? "text-white" : "text-slate-900")
            }`}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
