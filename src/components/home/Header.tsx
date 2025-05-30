import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbundle from "./Navbundle";
import Image from "next/image";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY <= 100) {
        setShowNavbar(true);
      }
      if (window.scrollY < 300 && event.clientY > 100 && !isDropdownOpen) {
        {
          setShowNavbar(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDropdownOpen]);

  const handleDropdownOpenChange = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

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
          {/* empty for balance */}
          <div className="flex-1"></div>

          <div className="absolute sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="text-2xl font-playfair tracking-tight">
              <Image
                src="/herotext.svg"
                alt="Rollenreich"
                width={150}
                height={150}
              />
            </Link>
          </div>

          <div className="flex-1 flex justify-end">
            <Navbundle
              onMenuToggle={onMenuToggle}
              onDropdownOpenChange={handleDropdownOpenChange}
            />
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
