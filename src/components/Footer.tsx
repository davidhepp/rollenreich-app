import React from "react";
import { Button } from "./ui/button";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-text-primary mb-4">
            Join Our Club, Get 15% Off
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-btn-primary"
            />
            <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-6 py-2 rounded-none transition-colors duration-200">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-text-primary mt-4">
            By subscribing you agree to our Terms & Conditions and Privacy &
            Cookies Policy.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-medium text-text-primary mb-4">
              About Rollenreich
            </h4>
            <ul className="space-y-2 text-text-primary text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Pricing & Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Support System
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-4">
              Help & Support
            </h4>
            <ul className="space-y-2 text-text-primary text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Orders & Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-btn-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-text-primary mb-4">
              Copyright Notice
            </h4>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-8">
          <a
            href="#"
            className="text-text-primary hover:text-btn-primary transition-colors"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            className="text-text-primary hover:text-btn-primary transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            className="text-text-primary hover:text-btn-primary transition-colors"
          >
            <FaFacebook size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-text-primary">
          © {new Date().getFullYear()} Rollenreich. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
