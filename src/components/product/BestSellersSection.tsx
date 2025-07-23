import Link from "next/link";
import { Product, ProductImage } from "@prisma/client";
import ProductCard from "@/components/cards/ProductCard";

interface BestSellersSectionProps {
  products: (Product & { images: ProductImage[] })[] | null;
  className?: string;
}

export default function BestSellersSection({
  products,
  className = "",
}: BestSellersSectionProps) {
  return (
    <section className={`w-full py-16 px-4 md:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold">
            Best Sellers
          </h2>
          <Link
            href="/shop/viewall"
            className="hover:text-btn-primary transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide scroll-smooth">
          <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
            {products?.map(
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
                      productId={product.id}
                    />
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
