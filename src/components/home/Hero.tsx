"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scrollThreshold = 200;

  // Before threshold: normal size and position
  // After threshold: scale down and move to navbar position
  const heroTextScale = useTransform(
    scrollY,
    [0, scrollThreshold, scrollThreshold + 100],
    [1, 1, 0.3]
  );

  const heroTextY = useTransform(
    scrollY,
    [0, scrollThreshold, scrollThreshold + 100],
    [0, 0, -300]
  );

  const heroTextOpacity = useTransform(
    scrollY,
    [0, scrollThreshold, scrollThreshold + 50],
    [1, 1, 0]
  );

  // Apply spring animation to the transforms
  const heroTextScaleSpring = useSpring(heroTextScale, springConfig);
  const heroTextYSpring = useSpring(heroTextY, springConfig);
  const heroTextOpacitySpring = useSpring(heroTextOpacity, springConfig);

  // Simplified parallax effect for hero image with spring animation
  const heroImageScaleRaw = useTransform(scrollY, [0, 800], [1.1, 1.3]);
  const heroImageYRaw = useTransform(scrollY, [0, 800], [0, 100]);

  const heroImageScale = useSpring(heroImageScaleRaw, springConfig);
  const heroImageY = useSpring(heroImageYRaw, springConfig);

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
          willChange: "transform",
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
        <motion.div
          className="relative z-10 w-full max-w-4xl"
          style={{
            scale: heroTextScaleSpring,
            y: heroTextYSpring,
            opacity: heroTextOpacitySpring,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src="/herotext.svg"
            alt="Rollenreich"
            width={800}
            height={200}
            className="w-full h-auto brightness-0 invert px-4"
            priority
          />
        </motion.div>
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
