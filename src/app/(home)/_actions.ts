const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export const fetchFeaturedProducts = async () => {
  try {
    const featuredProducts = await fetch(
      `${baseUrl}/api/products/getfeatured`,
      { next: { revalidate: 60 } }
    ).then((res) => res.json());
    return featuredProducts;
  } catch (error) {
    console.error(
      "Failed to fetch featured products, returning empty array:",
      error
    );
    return [];
  }
};
