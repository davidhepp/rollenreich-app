import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UserDropdownProps {
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function UserDropdown({
  className,
  onOpenChange,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Notify parent when dropdown state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="cursor-pointer w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200"
      >
        <User strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 bg-white shadow-md border border-gray-100 z-50"
          >
            <div className="py-6 px-8">
              {status === "loading" ? (
                <div className="text-center text-sm text-gray-500">
                  Loading...
                </div>
              ) : (
                <div className="space-y-6">
                  {session?.user ? (
                    <button
                      onClick={handleSignOut}
                      className="cursor-pointer flex items-center gap-2 font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    >
                      SIGN OUT
                    </button>
                  ) : (
                    <Link
                      href="/signin"
                      className="block font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    >
                      SIGN IN
                    </Link>
                  )}
                  <Link
                    href="/orders"
                    className="block font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    MY ORDERS
                  </Link>
                  <Link
                    href="/account"
                    className="block font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    MY ACCOUNT
                  </Link>
                  {/* <Link
                    href="/address-book"
                    className="block font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    MY ADDRESS BOOK
                  </Link> */}
                  {/* <Link
                    href="/payment-methods"
                    className="block font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    CREDIT CARDS
                  </Link> */}
                  <Link
                    href="/favorites"
                    className="block font-semibold text-sm text-gray-900 hover:text-btn-primary transition-colors"
                    onClick={handleLinkClick}
                  >
                    FAVORITES
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
