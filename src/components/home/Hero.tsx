"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Transform the hero text to scale and fade on scroll
  const heroTextScale = useTransform(scrollY, [0, 300], [1, 0.5]);
  const heroTextOpacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);

  // Parallax effect for hero image
  const heroImageScale = useTransform(scrollY, [0, 800], [1.1, 1.3]);
  const heroImageY = useTransform(scrollY, [0, 800], [0, 100]);

  return (
    <section
      ref={heroRef}
      className="h-screen relative flex flex-col justify-between overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          scale: heroImageScale,
          y: heroImageY,
        }}
      >
        <Image
          src="/hero.png"
          alt="Luxury fashion item"
          fill
          className="object-cover brightness-75"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-7xl mx-auto text-center flex-1 flex items-center justify-center">
        <motion.h1
          className="font-playfair text-6xl md:text-8xl lg:text-9xl font-normal mb-12 relative z-10 text-white"
          style={{
            scale: heroTextScale,
            opacity: heroTextOpacity,
          }}
        >
          Rollenreich
        </motion.h1>
      </div>

      <div className="relative z-10 text-center pb-20">
        <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
          Call To Action
        </Button>
      </div>
    </section>
  );
};

export default Hero;
