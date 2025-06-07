"use client";
import { addToCart } from "@/app/(nothome)/shop/product/[sku]/_actions";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddToCartButton({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => addToCart(productId, quantity),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddToCart = () => {
    addToCartMutation.mutate({ productId, quantity: quantity });
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={addToCartMutation.isPending}
      className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white px-8 py-3 rounded-none transition-colors duration-200"
    >
      Add To Cart
    </Button>
  );
}
