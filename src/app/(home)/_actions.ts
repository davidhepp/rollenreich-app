import {
  get_collections,
  get_featured_products,
} from "@/lib/ssr-fixes/actions";

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

export const fetchCollections = async () => {
  try {
    const collections = await get_collections();
    return collections;
  } catch (error) {
    console.error("Failed to fetch collections, returning empty array:", error);
    return [];
  }
};
