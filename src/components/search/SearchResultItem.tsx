"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Product,
  ProductImage,
  ProductCollection,
  Collection,
} from "@prisma/client";

type SearchProduct = Product & {
  images: ProductImage[];
  collections: (ProductCollection & {
    collection: Collection;
  })[];
};

interface SearchResultItemProps {
  product: SearchProduct;
  onSelect?: () => void;
}

export default function SearchResultItem({
  product,
  onSelect,
}: SearchResultItemProps) {
  return (
    <Link
      href={`/shop/product/${product.sku}`}
      onClick={onSelect}
      className="block"
    >
      <div className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
        <div className="relative w-12 h-12 bg-bg-primary rounded flex items-center justify-center flex-shrink-0">
          {product.images[0]?.url ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              width={48}
              height={48}
              className="w-8 h-8 object-contain"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 truncate">
            {product.name}
          </h4>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              €{product.price.toString()}
            </p>
            {product.collections[0] && (
              <span className="text-xs text-gray-500 truncate ml-2">
                {product.collections[0].collection.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
