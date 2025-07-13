"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import AddToCartButton from "../product/AddToCartButton";
interface FavoritItemProps {
  id: string;
  sku: string;
  name: string;
  price: number;
  collection?: string;
  quantity: number;
  imageSrc?: string;

  onRemove: () => void;
  onAddToCart: () => void;
}

const FavoritItem = ({
  id,
  sku,
  name,
  price,
  collection,
  imageSrc,
  onRemove,
}: FavoritItemProps) => {
  return (
    <div className="border-t border-b border-gray-200 py-4 md:py-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {imageSrc && (
          <Link
            href={`/shop/product/${sku}`}
            key={sku}
            className="group w-full md:w-auto"
          >
            <div className="relative w-full md:w-32 lg:w-40 h-48 md:h-32 lg:h-40 flex-shrink-0 bg-bg-primary overflow-hidden">
              <Image
                src={imageSrc}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 128px, 160px"
                className="object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>
        )}

        <div className="flex flex-col justify-between flex-1 w-full">
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-1">{name}</h3>
            {collection && (
              <h3 className="text-gray-500 text-sm">{collection}</h3>
            )}
            <span className="font-bold text-lg md:text-xl mt-2 block">
              €{price.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm text-gray-500 mt-4">
            <Button
              onClick={onRemove}
              variant="ghost"
              className="flex items-center gap-1 p-0 rounded-none text-sm"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <AddToCartButton productId={id} quantity={1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritItem;
