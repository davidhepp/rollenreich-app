import React from "react";
import { User, ShoppingCart, Search, Heart } from "lucide-react";
import Link from "next/link";
const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-end items-center">
        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
            <Link href="/">
              <User />
            </Link>
          </div>
          <div className="w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
            <Link href="/">
              <ShoppingCart />
            </Link>
          </div>
          <div className="w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
            <Link href="/">
              <Search />
            </Link>
          </div>
          <div className="w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
            <Link href="/">
              <Heart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
