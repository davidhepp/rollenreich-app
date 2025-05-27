"use client";

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const BestSellers = () => {
  const headerAnimation = useScrollAnimation({ amount: 0.2 });
  const gridAnimation = useScrollAnimation({ amount: 0.1 });

  const products = [
    { name: "Lorem Ipsum", price: "$00" },
    { name: "Lorem Ipsum", price: "$00" },
    { name: "Lorem Ipsum", price: "$00" },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerAnimation.ref}
          variants={fadeInUp}
          initial="hidden"
          animate={headerAnimation.animate}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-text-primary font-playfair">
            Best Sellers
          </h2>
          <a
            href="#"
            className="text-text-primary hover:text-btn-primary transition-colors underline"
          >
            View All
          </a>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          ref={gridAnimation.ref}
          variants={staggerContainer}
          initial="hidden"
          animate={gridAnimation.animate}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, index) => (
            <motion.div key={index} variants={staggerItem}>
              <ProductCard name={product.name} price={product.price} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
