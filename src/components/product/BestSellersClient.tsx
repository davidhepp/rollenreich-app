"use client";
import { useBestSellers } from "@/hooks/useBestSellers";
import ProductCard from "../cards/ProductCard";
import Link from "next/link";
import { Product, ProductImage } from "@prisma/client";
import { BestSellersSkeleton } from "../skeletons/BestSellersSkeleton";

export default function BestSellersClient() {
  const { products, isLoading, isError } = useBestSellers();

  if (isLoading) {
    return <BestSellersSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-hide scroll-smooth">
      <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
        {products?.map(
          (product: Product & { images: ProductImage[] }, index: number) => (
            <div
              key={product.id || index}
              className="flex-shrink-0 w-72 sm:w-80"
            >
              <Link href={`/shop/product/${product.sku}`}>
                <ProductCard
                  name={product.name}
                  price={product.price.toString()}
                  imageSrc={product.images[0]?.url}
                  productId={product.id}
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
