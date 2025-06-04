import { get_featured_products } from "@/lib/ssr-fixes/actions";

export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await get_featured_products();
    return featuredProducts;
  } catch (error) {
    // Fallback for build time or when API is unavailable
    console.error(
      "Failed to fetch featured products, returning empty array:",
      error
    );
    return [];
  }
};
