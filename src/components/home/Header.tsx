"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbundle from "./Navbundle";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {

      if(event.clientY <= 100){
        setShowNavbar(true);
      }
      if(window.scrollY < 300 && event.clientY > 100){ {
        setShowNavbar(false);
      }
    }}

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("scroll", handleScroll);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: showNavbar ? 1 : 0,
          y: showNavbar ? 0 : -100,
          pointerEvents: showNavbar ? "auto" : "none",
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between py-8 sm:py-4 px-4 relative">
          {/* Left side - empty for balance */}
          <div className="flex-1"></div>

          {/* Center - Rollenreich logo */}
          <div className="absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="text-2xl font-playfair tracking-tight">
              Rollenreich
            </Link>
          </div>

          {/* Right side - Navigation bundle */}
          <div className="flex-1 flex justify-end">
            <Navbundle />
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
