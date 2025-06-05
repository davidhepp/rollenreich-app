const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const fetchProduct = async (sku: string) => {
  try {
    const product = await fetch(
      `${baseUrl}/api/products/getproduct?sku=${sku}`
    ).then((res) => res.json());
    return product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await fetch(
      `${baseUrl}/api/products/getfeatured`
    ).then((res) => res.json());
    return featuredProducts;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};
