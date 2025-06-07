"use client";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import NumberStepper from "../ui/numberstepper";

export default function ProductActions({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="flex">
        <NumberStepper
          className="ml-auto mb-5"
          onChange={(value) => setQuantity(value)}
        />
      </div>
      <AddToCartButton productId={productId} quantity={quantity} />
    </>
  );
}
