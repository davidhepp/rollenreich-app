"use client";

import { User, ShoppingCart, Search, Menu } from "lucide-react";
import Link from "next/link";

interface NavbundleProps {
  onMenuToggle: () => void;
}

export default function Navbundle({ onMenuToggle }: NavbundleProps) {
  return (
    <>
      <div className="flex items-center space-x-12 sm:space-x-4">
        <div className="cursor-pointer w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <User strokeWidth={1.5} />
          </Link>
        </div>
        <div className="cursor-pointer w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <ShoppingCart strokeWidth={1.5} />
          </Link>
        </div>
        <div className="cursor-pointer w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <Search strokeWidth={1.5} />
          </Link>
        </div>
        <div className="w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <button
            onClick={onMenuToggle}
            className="focus:outline-none cursor-pointer"
          >
            <Menu strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </>
  );
}
