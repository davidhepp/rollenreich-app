"use client";
import Hero from "@/components/home/Hero";
import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ProductCard from "@/components/cards/ProductCard";
import Link from "next/link";
import CollectionCard from "@/components/cards/CollectionCard";
import { Button } from "@/components/ui/button";
import CooperationCard from "@/components/cards/CooperationCard";

export default function Home() {
  // Separate animation hooks for each section
  const bestSellersHeaderAnimation = useScrollAnimation({ amount: 0.2 });
  const bestSellersGridAnimation = useScrollAnimation({ amount: 0.1 });
  const collectionHeaderAnimation = useScrollAnimation({ amount: 0.2 });
  const collectionGridAnimation = useScrollAnimation({ amount: 0.1 });
  const cooperationLeftColumnAnimation = useScrollAnimation({ amount: 0.2 });
  const cooperationRightColumnAnimation = useScrollAnimation({ amount: 0.2 });
  const specialSectionAnimation = useScrollAnimation({ amount: 0.2 });

  const products = [
    {
      name: "Standard",
      price: "20",
      imageSrc: "/products/standard.png",
    },
    {
      name: "Standard Black",
      price: "30",
      imageSrc: "/products/standard_black.png",
    },
    {
      name: "Standard Green",
      price: "30",
      imageSrc: "/products/standard_green.png",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <section id="best-sellers" className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={bestSellersHeaderAnimation.ref}
            variants={fadeInUp}
            initial="hidden"
            animate={bestSellersHeaderAnimation.animate}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
              Best Sellers
            </h2>
            <Link
              href="#"
              className=" hover:text-btn-primary transition-colors"
            >
              View All
            </Link>
          </motion.div>
          <motion.div
            ref={bestSellersGridAnimation.ref}
            variants={staggerContainer}
            initial="hidden"
            animate={bestSellersGridAnimation.animate}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product, index) => (
              <motion.div key={index} variants={staggerItem}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  imageSrc={product.imageSrc}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="collection" className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={collectionHeaderAnimation.ref}
            variants={fadeInUp}
            initial="hidden"
            animate={collectionHeaderAnimation.animate}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
              Collection
            </h2>
          </motion.div>
          <motion.div
            ref={collectionGridAnimation.ref}
            variants={staggerContainer}
            initial="hidden"
            animate={collectionGridAnimation.animate}
            className="grid md:grid-cols-2 gap-6 auto-rows-auto"
          >
            <div className="flex flex-col gap-6">
              <motion.div variants={staggerItem}>
                <CollectionCard size="large" buttonText="Call To Action" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <CollectionCard buttonText="Call To Action" />
              </motion.div>
            </div>
            <div className="flex flex-col gap-6">
              <motion.div variants={staggerItem}>
                <CollectionCard buttonText="Call To Action" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <CollectionCard size="large" buttonText="Call To Action" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="special" className="w-full py-48 px-4 md:px-8 bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={specialSectionAnimation.ref}
            variants={staggerContainer}
            initial="hidden"
            animate={specialSectionAnimation.animate}
            className="text-center space-y-8"
          >
            <motion.h2
              variants={staggerItem}
              className="text-2xl md:text-3xl font-medium "
            >
              Lorem Ipsum Dolor Sit Amet
            </motion.h2>
            <motion.div variants={staggerItem} className="flex justify-center">
              <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
                Call To Action
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="cooperation" className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={cooperationLeftColumnAnimation.ref}
            variants={fadeInLeft}
            initial="hidden"
            animate={cooperationLeftColumnAnimation.animate}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]"
          >
            <motion.div
              variants={fadeInLeft}
              className="flex items-center justify-center lg:justify-start"
            >
              <CooperationCard title="Kooperationen Mit Anderen Firmen" />
            </motion.div>

            <motion.div
              ref={cooperationRightColumnAnimation.ref}
              variants={fadeInRight}
              initial="hidden"
              animate={cooperationRightColumnAnimation.animate}
              className="text-center space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-medium ">
                Lorem Ipsum Dolor Sit Amet
              </h3>
              <p className=" text-base leading-relaxed max-w-md mx-auto">
                Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed
                Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna
                Aliquyam Erat, Sed Diam Voluptua.
              </p>
              <motion.div
                variants={staggerItem}
                className="flex justify-center"
              >
                <div className="flex justify-center pt-4">
                  <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
                    Call To Action
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
