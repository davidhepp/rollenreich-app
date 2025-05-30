"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Variants } from "framer-motion";

interface AnimatedStaggerProps {
  children: ReactNode;
  containerVariants?: Variants;
  className?: string;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
}

export default function AnimatedStagger({
  children,
  containerVariants,
  className,
  viewport = { once: true, amount: 0.2 },
}: AnimatedStaggerProps) {
  if (!containerVariants) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedStaggerItemProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
}

export function AnimatedStaggerItem({
  children,
  variants,
  className,
}: AnimatedStaggerItemProps) {
  if (!variants) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
