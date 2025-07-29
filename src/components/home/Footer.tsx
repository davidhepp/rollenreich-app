"use client";
import React, { useRef, useState } from "react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Input } from "../ui/input";
import { MailPopup, MailPopupRef } from "./MailPopup";
import Link from "next/link";

const Footer = () => {
  const mailPopupRef = useRef<MailPopupRef>(null);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mailPopupRef.current) {
      mailPopupRef.current.triggerPopup();
    }
  };

  return (
    <footer className="w-full py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <h3 className="text-lg font-bold mb-4">
              Join Our Club, Get 15% Off
            </h3>
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="flex-1 px-4 py-2 rounded-none border-black focus:outline-none focus:ring-2 focus:ring-btn-primary"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MailPopup ref={mailPopupRef} />
              </div>
            </form>
            <p className="text-sm mt-4 font-medium">
              By subscribing you agree to our Terms & Conditions and Privacy &
              Cookies Policy.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="lg:col-span-1">
            <h4 className="font-medium mb-4">About Rollenreich</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Collections
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Pricing & Delivery
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-medium mb-4">Help & Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Orders & Shipping
                </span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Returns & Refunds
                </span>
              </li>

              <li>
                <span className="text-gray-400 cursor-not-allowed">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <Link href="/" className="hover:text-btn-primary transition-colors">
            <FaInstagram size={24} />
          </Link>
          <Link href="/" className="hover:text-btn-primary transition-colors">
            <FaFacebook size={24} />
          </Link>
          <Link href="/" className="hover:text-btn-primary transition-colors">
            <FaTwitter size={24} />
          </Link>
        </div>

        <div className="text-sm ">
          © {new Date().getFullYear()} Rollenreich. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
