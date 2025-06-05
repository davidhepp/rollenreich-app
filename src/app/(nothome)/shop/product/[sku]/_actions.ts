import {
  get_featured_products,
  get_product_by_sku,
} from "@/lib/ssr-fixes/actions";

export const fetchProduct = async (sku: string) => {
  try {
    const product = await get_product_by_sku(sku);
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await get_featured_products();
    return featuredProducts;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};
