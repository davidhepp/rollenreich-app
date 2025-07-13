"use client";
import Image from "next/image";
import React from "react";
import AddToWishlistButton from "../favorites/AddToWishlistButton";

interface ProductCardProps {
  name: string;
  price: string;
  imageSrc?: string;
  productId: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  imageSrc,
  productId,
}) => {
  return (
    <div className="overflow-hidden group cursor-pointer">
      <div className="relative bg-bg-primary aspect-square flex items-center justify-center">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={name}
            width={1024}
            height={1024}
            className="w-3/4 h-3/4 object-contain transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center">
          <AddToWishlistButton
            productId={productId}
            variant="icon"
            className="w-6 h-6"
            iconSize={16}
            strokeWidth={1.5}
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium mb-2">{name}</h3>
        <p className="font-semibold">{price}€</p>
      </div>
    </div>
  );
};

export default ProductCard;
