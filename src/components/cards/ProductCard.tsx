"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "../ui/button";

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
  const { data: session } = useSession();
  const { addToWishlist } = useWishlist(!!session);
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
        <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center hover:text-btn-primary transition-colors duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 hover:text-red-500 transition-colors duration-200"
            onClick={() => addToWishlist.mutate(productId)}
          >
            <Heart strokeWidth={1.5} />
          </Button>
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
