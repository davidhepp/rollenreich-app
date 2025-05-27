"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInLeft, fadeInRight, staggerItem } from "@/lib/animations";
import CooperationCard from "./CooperationCard";

const CooperationSection = () => {
  const leftColumnAnimation = useScrollAnimation({ amount: 0.2 });
  const rightColumnAnimation = useScrollAnimation({ amount: 0.2 });

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={leftColumnAnimation.ref}
          variants={fadeInLeft}
          initial="hidden"
          animate={leftColumnAnimation.animate}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]"
        >
          {/* Left side - Title */}
          <motion.div
            variants={fadeInLeft}
            className="flex items-center justify-center lg:justify-start"
          >
            <CooperationCard title="Kooperationen Mit Anderen Firmen" />
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            ref={rightColumnAnimation.ref}
            variants={fadeInRight}
            initial="hidden"
            animate={rightColumnAnimation.animate}
            className="text-center space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-medium text-text-primary">
              Lorem Ipsum Dolor Sit Amet
            </h3>
            <p className="text-text-primary text-base leading-relaxed max-w-md mx-auto">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam
              Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
              Erat, Sed Diam Voluptua.
            </p>
            <motion.div variants={staggerItem} className="flex justify-center">
              <div className="flex justify-center pt-4">
                <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
                  Call To Action
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CooperationSection;
