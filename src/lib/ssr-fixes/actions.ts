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

export async function get_product_by_sku(sku: string) {
  try {
    const product = await db.product.findUnique({
      where: { sku },
      include: {
        images: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
