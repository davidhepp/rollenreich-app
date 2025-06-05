import { get_featured_products } from "@/lib/ssr-fixes/actions";

export const fetchFeaturedProducts = async () => {
  try {
    // using lib function because of SSR
    const featuredProducts = await get_featured_products();
    return featuredProducts;
  } catch (error) {
    console.error(
      "Failed to fetch featured products, returning empty array:",
      error
    );
    return [];
  }
};
