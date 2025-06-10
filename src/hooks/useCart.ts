import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, updateQuantity, removeItem } from "@/lib/cartActions";
import {
  CartItem as CartItemType,
  Product,
  ProductImage,
} from "@prisma/client";

export const useCart = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: enabled,
  });

  const editQuantity = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => updateQuantity(productId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeFromCart = useMutation({
    mutationFn: removeItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return {
    cart: cartData?.items ?? [],
    isLoading,
    isError,
    total:
      cartData?.items?.reduce(
        (
          acc: number,
          item: CartItemType & { product: Product & { images: ProductImage[] } }
        ) => acc + Number(item.product.price) * item.quantity,
        0
      ) ?? 0,
    editQuantity: editQuantity.mutate,
    removeItem: removeFromCart.mutate,
    isMutating: editQuantity.isPending || removeFromCart.isPending,
  };
};
