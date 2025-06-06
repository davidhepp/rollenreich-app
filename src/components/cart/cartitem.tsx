"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Heart } from "lucide-react";
import { Button } from "../ui/button";

interface CartItemProps {
  name: string;
  price: number;
  collection?: string;
  variation?: string;
  quantity: number;
  imageSrc?: string;
  onQuantityChange?: (newQuantity: number) => void;
}

const CartItem = ({
  name,
  price,
    collection,
    variation,
  quantity,
  imageSrc,
  onQuantityChange,
}: CartItemProps) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    setCurrentQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  return (
    <div className="border-t border-b border-gray-200 py-6">
      <div className="flex gap-6 items-start">
        {imageSrc && (
          <div className="relative">
            <Image
              src={imageSrc}
              alt={name}
              width={160}
              height={160}
              className="bg-bg-primary object-cover"
            />
          </div>
        )}

        <div className="flex flex-col justify-between flex-1 h-40">
          <div>
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-gray-500 text-sm mb-1">{collection}</p>
            <p className="text-gray-500 text-sm">{variation}</p>
          </div>
          {/* TODO: fix styling */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
            <button className="cursor-pointer hover:text-gray-700 transition-colors">
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button className="cursor-pointer hover:text-gray-700 transition-colors">
              Remove
            </button>
            <span className="text-gray-300">|</span>
            <button className="cursor-pointer hover:text-gray-700 transition-colors flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Saved Items
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between h-40 items-end">
          <div className="flex items-center gap-4">
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-none bg-white border border-gray-100"
                  >
                    <span>{currentQuantity}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-none bg-white shadow-md border border-gray-100">
                  {[...Array(10)].map((_, i) => (
                    <DropdownMenuItem
                      key={i + 1}
                      onClick={() => handleQuantityChange(i + 1)}
                    >
                      <span>{i + 1}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span className="font-bold text-xl">
              ${(price * currentQuantity).toFixed(0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
