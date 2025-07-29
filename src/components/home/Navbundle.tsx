import { ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import UserDropdown from "@/components/home/UserDropdown";
import CollapsibleSearchBar from "@/components/search/CollapsibleSearchBar";

interface NavbundleProps {
  onMenuToggle: () => void;
  onUserDropdownOpenChange?: (isOpen: boolean) => void;
  onSearchDropdownOpenChange?: (isOpen: boolean) => void;
}

export default function Navbundle({
  onMenuToggle,
  onUserDropdownOpenChange,
  onSearchDropdownOpenChange,
}: NavbundleProps) {
  return (
    <>
      <div className="flex items-center space-x-12 sm:space-x-4">
        <UserDropdown
          className="w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center"
          onOpenChange={onUserDropdownOpenChange}
        />
        <div className="cursor-pointer w-1 h-1 sm:w-6 sm:h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Link href="/cart">
            <ShoppingCart strokeWidth={1.5} />
          </Link>
        </div>
        <CollapsibleSearchBar
          className="min-w-0"
          onDropdownOpenChange={onSearchDropdownOpenChange}
        />
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
