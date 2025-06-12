"use client";

import React from "react";
import Image from "next/image";

import { X } from "lucide-react";
import { Button } from "../ui/button";

interface FavoritItemProps {
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
          <div className="relative w-40 h-40 flex-shrink-0">
            <Image
              src={imageSrc}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="bg-bg-primary rounded-md"
            />
          </div>
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
              className="flex items-center gap-1 p-0 h-auto"
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="px-6 py-3 rounded-none bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
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
