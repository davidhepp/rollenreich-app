import { Product } from "@prisma/client";
import { ProductImage } from "@prisma/client";
import ProductCard from "@/components/cards/ProductCard";

export default async function ViewAllProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const products = await fetch(`${baseUrl}/api/products/viewall`);
  const productsData = await products.json();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        <h1 className="text-3xl font-semibold text-text-primary font-playfair">
          SHOP
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsData.map((product: Product & { images: ProductImage[] }) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price.toString()}
              imageSrc={product.images?.[0]?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
