import { User } from "lucide-react";

import { ShoppingCart } from "lucide-react";

import { Search } from "lucide-react";

import { Menu } from "lucide-react";
import Link from "next/link";

export default function Navbundle() {
  return (
    <>
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
            <Menu />
          </Link>
        </div>
      </div>
    </>
  );
}
