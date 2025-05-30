import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, LogIn } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
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

  // Close dropdown when clicking outside
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

  const handleSignIn = () => {
    signIn("github");
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
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
            className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="p-4">
              {status === "loading" ? (
                <div className="text-center text-sm text-gray-500">
                  Loading...
                </div>
              ) : session?.user ? (
                <div className="space-y-3">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="text-sm font-medium text-gray-900">
                      Welcome back!
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {session.user.name || session.user.email}
                    </p>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Sign in to access your account
                  </p>
                  <Button
                    onClick={handleSignIn}
                    className="w-full justify-start gap-2 bg-btn-primary hover:bg-btn-primary-hover"
                  >
                    <LogIn size={16} />
                    Sign In with GitHub
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
