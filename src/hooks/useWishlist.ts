import { getWishlist } from "@/lib/wishlistActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlistActions";

export const useWishlist = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  const {
    data: wishlistData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: enabled,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishlist"] }),
  });

  return {
    wishlist: wishlistData,
    isLoading,
    isError,
    addToWishlist: addToWishlistMutation,
    removeFromWishlist: removeFromWishlistMutation,
    isMutating:
      addToWishlistMutation.isPending || removeFromWishlistMutation.isPending,
  };
};
