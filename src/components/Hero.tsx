"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, scaleIn } from "@/lib/animations";

const Hero = () => {
  const titleAnimation = useScrollAnimation({ amount: 0.2 });
  const buttonAnimation = useScrollAnimation({ amount: 0.3 });

  return (
    <section className="w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          ref={titleAnimation.ref}
          variants={scaleIn}
          initial="hidden"
          animate={titleAnimation.animate}
          className="font-playfair text-6xl md:text-8xl lg:text-9xl font-normal text-text-primary mb-12"
        >
          Rollenreich
        </motion.h1>
        <motion.div
          ref={buttonAnimation.ref}
          variants={fadeInUp}
          initial="hidden"
          animate={buttonAnimation.animate}
        >
          <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
            Call To Action
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
