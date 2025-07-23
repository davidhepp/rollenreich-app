"use client";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import NumberStepper from "../ui/numberstepper";
import { Decimal } from "@prisma/client/runtime/library";

export default function ProductActions({
  productId,
  productPrice,
}: {
  productId: string | undefined;
  productPrice: Decimal | undefined;
}) {
  const [quantity, setQuantity] = useState(1);

  // Convert Decimal to number and handle undefined
  const priceAsNumber = productPrice ? parseFloat(productPrice.toString()) : 0;

  // Don't render if essential data is missing
  if (!productId || !productPrice) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <p className="text-2xl font-bold">{priceAsNumber.toFixed(2)}€</p>
        <NumberStepper onChange={(value) => setQuantity(value)} />
      </div>
      <AddToCartButton productId={productId} quantity={quantity} />
    </>
  );
}
