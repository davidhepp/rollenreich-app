"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerContainer, staggerItem } from "@/lib/animations";

const SpecialSection = () => {
  const sectionAnimation = useScrollAnimation({ amount: 0.2 });

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={sectionAnimation.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={sectionAnimation.animate}
          className="text-center space-y-8"
        >
          <motion.h2
            variants={staggerItem}
            className="text-2xl md:text-3xl font-medium text-text-primary"
          >
            Lorem Ipsum Dolor Sit Amet
          </motion.h2>
          <motion.div variants={staggerItem} className="flex justify-center">
            <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
              Call To Action
            </Button>
          </motion.div>
          <motion.h3
            variants={staggerItem}
            className="text-2xl md:text-3xl font-medium text-text-primary mt-12"
          >
            Specials? Muttertag O.A
          </motion.h3>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialSection;
