"use client";

import { useState } from "react";
import HamburgerMenu from "@/components/home/HamburgerMenu";
import Header from "@/components/home/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Header onMenuToggle={toggleMenu} />
      {children}
      <HamburgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
