import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuItems = [
    { url: "/shop/viewall", label: "Shop All" },
    { url: "/shop/collection/greek-seas", label: "Greek Seas" },
    { url: "/shop/collection/basics", label: "Basics" },
    { url: "/shop/collection/economic-wipes", label: "Economic Wipes" },
    { url: "/shop/collection/luxurious-nights", label: "Luxurious Nights" },
  ];

  const footerLinks = [{ url: "/orders", label: "My Orders" }];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay with blur and darkening */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md z-[9999] bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.4,
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-6 border-b border-gray-100">
                <button
                  onClick={onClose}
                  className="cursor-pointer w-8 h-8 flex items-center justify-center hover:text-btn-primary transition-colors duration-200"
                >
                  <X strokeWidth={1.5} size={24} />
                </button>
              </div>

              <div className="flex-1 px-6 py-8">
                <nav className="space-y-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={item.url}
                        className="block text-lg font-medium text-text-primary hover:text-btn-primary transition-colors duration-200"
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="px-6 py-6 border-t border-gray-100">
                <div className="space-y-4">
                  {footerLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + index * 0.05,
                        duration: 0.3,
                      }}
                    >
                      <Link
                        href={link.url}
                        className="block text-sm text-text-primary hover:text-btn-primary transition-colors duration-200"
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
