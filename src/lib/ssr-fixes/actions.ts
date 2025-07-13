import { auth } from "@/auth";
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

export async function get_collections() {
  try {
    const collections = await db.collection.findMany({
      where: {
        isActive: true,
        isFeatured: true,
      },
      include: {
        image: true,
      },
      orderBy: {
        index: "asc",
      },
    });
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export async function addToWishlist(productId: string) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  const wishlist = await db.wishlist.findFirst({
    where: {
      userId: session.user?.id,
    },
  });
  if (!wishlist) {
    return { error: "Wishlist not found" };
  }
  await db.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId: productId,
    },
  });
  return { success: "Product added to wishlist" };
}
