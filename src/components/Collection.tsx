"use client";

import React from "react";
import { motion } from "framer-motion";
import CollectionCard from "./CollectionCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const Collection = () => {
  const headerAnimation = useScrollAnimation({ amount: 0.2 });
  const gridAnimation = useScrollAnimation({ amount: 0.1 });

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.h2
          ref={headerAnimation.ref}
          variants={fadeInUp}
          initial="hidden"
          animate={headerAnimation.animate}
          className="text-2xl md:text-3xl font-medium text-text-primary mb-8 font-playfair"
        >
          Collection
        </motion.h2>

        {/* Collection Grid */}
        <motion.div
          ref={gridAnimation.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={gridAnimation.animate}
          className="grid md:grid-cols-2 gap-6 auto-rows-auto"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <motion.div variants={staggerItem}>
              <CollectionCard size="large" buttonText="Call To Action" />
            </motion.div>
            <motion.div variants={staggerItem}>
              <CollectionCard buttonText="Call To Action" />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <motion.div variants={staggerItem}>
              <CollectionCard buttonText="Call To Action" />
            </motion.div>
            <motion.div variants={staggerItem}>
              <CollectionCard size="large" buttonText="Call To Action" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Collection;
