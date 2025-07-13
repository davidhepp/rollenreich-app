import Hero from "@/components/home/Hero";
import AnimatedSection from "@/components/home/AnimatedSection";
import AnimatedStagger, {
  AnimatedStaggerItem,
} from "@/components/home/AnimatedStagger";
import {
  scrollFadeInLeft,
  scrollFadeInRight,
  scrollFadeInUp,
  scrollStaggerContainer,
  scrollStaggerItem,
} from "@/lib/animations";
import ProductCard from "@/components/cards/ProductCard";
import Link from "next/link";
import CollectionCard from "@/components/cards/CollectionCard";
import { Button } from "@/components/ui/button";
import CooperationCard from "@/components/cards/CooperationCard";
import Image from "next/image";
import { Product, ProductImage } from "@prisma/client";
import { fetchFeaturedProducts, fetchCollections } from "./_actions";

export default async function Home() {
  const featuredProducts = await fetchFeaturedProducts();
  const collections = await fetchCollections();

  return (
    <main className="min-h-screen bg-white">
      <Hero />

      <section id="best-sellers" className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection
            variants={scrollFadeInUp}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
              Best Sellers
            </h2>
            <Link
              href="/shop/viewall"
              className=" hover:text-btn-primary transition-colors"
            >
              View All
            </Link>
          </AnimatedSection>
          <AnimatedStagger
            containerVariants={scrollStaggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
              {featuredProducts.map(
                (
                  product: Product & { images: ProductImage[] },
                  index: number
                ) => (
                  <AnimatedStaggerItem
                    key={product.id || index}
                    variants={scrollStaggerItem}
                    className="flex-shrink-0 w-72 sm:w-80"
                  >
                    <Link href={`/shop/product/${product.sku}`}>
                      <ProductCard
                        name={product.name}
                        price={product.price.toString()}
                        imageSrc={product.images[0]?.url}
                      />
                    </Link>
                  </AnimatedStaggerItem>
                )
              )}
            </div>
          </AnimatedStagger>
        </div>
      </section>

      <section id="collection" className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection
            variants={scrollFadeInUp}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
              Collection
            </h2>
          </AnimatedSection>
          <AnimatedStagger
            containerVariants={scrollStaggerContainer}
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-6 auto-rows-auto"
          >
            <div className="flex flex-col gap-6">
              {collections[0] && (
                <AnimatedStaggerItem variants={scrollStaggerItem}>
                  <CollectionCard
                    size="large"
                    imageSrc={collections[0].image?.url}
                    buttonText={collections[0].name}
                    href={`/shop/collection/${collections[0].slug}`}
                  />
                </AnimatedStaggerItem>
              )}
              {collections[1] && (
                <AnimatedStaggerItem variants={scrollStaggerItem}>
                  <CollectionCard
                    buttonText={collections[1].name}
                    imageSrc={collections[1].image?.url}
                    href={`/shop/collection/${collections[1].slug}`}
                  />
                </AnimatedStaggerItem>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {collections[2] && (
                <AnimatedStaggerItem variants={scrollStaggerItem}>
                  <CollectionCard
                    buttonText={collections[2].name}
                    imageSrc={collections[2].image?.url}
                    href={`/shop/collection/${collections[2].slug}`}
                  />
                </AnimatedStaggerItem>
              )}
              {collections[3] && (
                <AnimatedStaggerItem variants={scrollStaggerItem}>
                  <CollectionCard
                    size="large"
                    buttonText={collections[3].name}
                    imageSrc={collections[3].image?.url}
                    href={`/shop/collection/${collections[3].slug}`}
                  />
                </AnimatedStaggerItem>
              )}
            </div>
          </AnimatedStagger>
        </div>
      </section>

      <section
        id="special"
        className="w-full py-48 px-4 md:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            src="/specials/test.png"
            alt="Special section background"
            className="object-cover brightness-75"
            fill
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedStagger
            containerVariants={scrollStaggerContainer}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-8"
          >
            <AnimatedStaggerItem
              variants={scrollStaggerItem}
              className="text-2xl md:text-3xl font-semibold text-white"
            >
              Mother&apos;s Day Special
            </AnimatedStaggerItem>
            <AnimatedStaggerItem
              variants={scrollStaggerItem}
              className="flex justify-center"
            >
              <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
                Discover Now
              </Button>
            </AnimatedStaggerItem>
          </AnimatedStagger>
        </div>
      </section>

      <section id="cooperation" className="w-full py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedStagger
            containerVariants={scrollStaggerContainer}
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]"
          >
            <AnimatedStaggerItem
              variants={scrollFadeInLeft}
              className="flex items-center justify-center lg:justify-start"
            >
              <CooperationCard title="Kooperationen Mit Anderen Firmen" />
            </AnimatedStaggerItem>

            <AnimatedStaggerItem
              variants={scrollFadeInRight}
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
              <AnimatedStaggerItem
                variants={scrollStaggerItem}
                className="flex justify-center"
              >
                <div className="flex justify-center pt-4">
                  <Button className="bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
                    Call To Action
                  </Button>
                </div>
              </AnimatedStaggerItem>
            </AnimatedStaggerItem>
          </AnimatedStagger>
        </div>
      </section>
    </main>
  );
}
