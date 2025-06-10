import { fetchFeaturedProducts } from "@/lib/featured";
import ProductCard from "../cards/ProductCard";
import Link from "next/link";
import { Product, ProductImage } from "@prisma/client";

export default async function BestSellers() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <div className="overflow-x-auto scrollbar-hide scroll-smooth">
      <div className="flex gap-6 pb-4" style={{ width: "max-content" }}>
        {featuredProducts?.map(
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
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
