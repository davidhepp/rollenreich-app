"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface FavoritItemProps {
  id: string;
  name: string;
  price: number;
  collection?: string;
  variation?: string;
  quantity: number;
  imageSrc?: string;

  onRemove: () => void;
  onAddToCart: () => void;
}

const FavoritItem = ({
  id,
  name,
  price,
  collection,
  variation,
  imageSrc,
  onRemove,
  onAddToCart,
}: FavoritItemProps) => {
  return (
    <div className="border-t border-b border-gray-200 py-6">
      <div className="flex gap-6 items-start">
        {imageSrc && (
          <Link href={`/shop/product/${id}`} key={id} className="group">
            <div className="relative w-40 h-40 flex-shrink-0 bg-bg-primary">
              <Image
                src={imageSrc}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>
        )}

        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            {collection && (
              <h3 className="text-gray-500 text-sm">{collection}</h3>
            )}
            {variation && (
              <h3 className="text-gray-500 text-sm">{variation}</h3>
            )}
            <span className="font-bold text-xl mt-2 block">
              €{price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500 mt-4">
            {}
            <Button
              onClick={onRemove}
              variant="ghost"
              className="flex items-center gap-1 p-0 rounded-none"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="px-6 py-3 border-text-primary hover:bg-bg-secondary bg-white rounded-none"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritItem;
