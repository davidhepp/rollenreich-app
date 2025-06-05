import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProduct, fetchFeaturedProducts } from "./_actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ProductImage, Product } from "@prisma/client";
import { Truck, Heart } from "lucide-react";

import ProductCard from "@/components/cards/ProductCard";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await fetchProduct(sku);
  const featuredProducts = await fetchFeaturedProducts();

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 bg-white pb-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/shop/viewall">Collection</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square relative ">
            <div>
              {product?.images?.[0]?.url && (
                <Image
                  src={product?.images?.[0]?.url}
                  alt={product?.name}
                  width={500}
                  height={500}
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-30">
              <h1 className="text-3xl font-bold mb-6">{product?.name}</h1>
              <p className="text-lg  mb-2">{product?.description}</p>
            </div>

            <Button className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200">
              Add To Cart
            </Button>

            <div className="flex justify-between items-center pt-4">
              <button className="flex items-center gap-2  ">
                <Truck strokeWidth={1.5} />
                Easy Return
              </button>
              <button className="flex items-center gap-2 ">
                <Heart strokeWidth={1.5} />
                Add To Wish List
              </button>
            </div>
          </div>
        </div>
        <section id="best-sellers" className="w-full py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
                Best Sellers
              </h2>
              <Link
                href="/shop/viewall"
                className=" hover:text-btn-primary transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto scrollbar-hide scroll-smooth">
              <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
                {featuredProducts?.map(
                  (
                    product: Product & { images: ProductImage[] },
                    index: number
                  ) => (
                    <div
                      key={product.id || index}
                      className="flex-shrink-0 w-72 sm:w-80"
                    >
                      <Link href={`/shop/product/${product.sku}`}>
                        <ProductCard
                          name={product.name}
                          price={product.price.toString()}
                          imageSrc={product.images[0]?.url}
                        />
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
