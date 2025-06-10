import { useQuery } from "@tanstack/react-query";
import { Product, ProductImage } from "@prisma/client";

const fetchFeaturedProducts = async (): Promise<
  (Product & { images: ProductImage[] })[]
> => {
  const response = await fetch("/api/products/getfeatured");
  if (!response.ok) {
    throw new Error("Failed to fetch featured products");
  }
  return response.json();
};

export const useBestSellers = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
  });

  return {
    products: products ?? [],
    isLoading,
    isError,
    error,
  };
};
