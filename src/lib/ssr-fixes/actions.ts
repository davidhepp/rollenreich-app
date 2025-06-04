import { prisma as db } from "@/prisma";

export async function get_featured_products() {
  try {
    const products = await db.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        images: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
