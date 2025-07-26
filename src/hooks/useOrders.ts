import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, createOrder } from "@/lib/orderActions";
import {
  Order,
  OrderItem,
  Product,
  ProductImage,
  ProductCollection,
  Collection,
} from "@prisma/client";

type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product & {
      images: ProductImage[];
      collections: (ProductCollection & {
        collection: Collection;
      })[];
    };
  })[];
};

export const useOrders = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled: enabled,
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Clear cart after successful order
    },
  });

  return {
    orders: (ordersData?.orders ?? []) as OrderWithItems[],
    isLoading,
    isError,
    error,
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    createOrderError: createOrderMutation.error,
    createOrderSuccess: createOrderMutation.isSuccess,
  };
};
