import { User } from "lucide-react";

import { ShoppingCart } from "lucide-react";

import { Search } from "lucide-react";

import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbundle() {
  return (
    <>
      <div className="flex items-center space-x-12 sm:space-x-4">
        <div className="w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <User strokeWidth={1.5} />
          </Link>
        </div>
        <div className="w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <ShoppingCart strokeWidth={1.5} />
          </Link>
        </div>
        <div className="w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <Search strokeWidth={1.5} />
          </Link>
        </div>
        <div className="w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/">
            <Menu strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </>
  );
}
