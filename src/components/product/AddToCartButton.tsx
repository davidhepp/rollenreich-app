"use client";
import { addToCart } from "@/app/(nothome)/shop/product/[sku]/_actions";
import { Button } from "../ui/button";

export default function AddToCartButton({ productId }: { productId: string }) {
  return (
    <Button
      onClick={() => addToCart(productId, 1)}
      className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200"
    >
      Add To Cart
    </Button>
  );
}
