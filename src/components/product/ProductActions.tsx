"use client";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import NumberStepper from "../ui/numberstepper";

export default function ProductActions({
  productId,
  productPrice,
}: {
  productId: string;
  productPrice: number;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <p className="text-2xl font-bold ">{productPrice}€</p>
        <NumberStepper onChange={(value) => setQuantity(value)} />
      </div>
      <AddToCartButton productId={productId} quantity={quantity} />
    </>
  );
}
