import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: { id: true },
  });
  if (!user) {
    return new Response("User not found", { status: 401 });
  }
  const { productId } = await request.json();
  if (!productId) {
    return new Response("Product ID is required", { status: 400 });
  }

  try {
    // First, find or create the user's wishlist
    const wishlist = await prisma.wishlist.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
      },
    });

    // Then, add the item to the wishlist (if it doesn't already exist)
    const wishlistItem = await prisma.wishlistItem.upsert({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: productId,
        },
      },
      update: {},
      create: {
        wishlistId: wishlist.id,
        productId: productId,
      },
    });

    return NextResponse.json({ success: true, wishlistItem });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
