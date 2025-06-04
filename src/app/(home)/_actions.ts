import { baseUrl } from "@/lib/utils";

export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await fetch(
      `${baseUrl}/api/products/getfeatured`
    ).then((res) => res.json());
    return featuredProducts;
  } catch (error) {
    // Fallback for build time or when API is unavailable
    console.warn(
      "Failed to fetch featured products, returning empty array:",
      error
    );
    return [];
  }
};
