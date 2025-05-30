"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
}

export default function AnimatedSection({
  children,
  variants,
  className,
  viewport = { once: true, amount: 0.3 },
}: AnimatedSectionProps) {
  if (!variants) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}
