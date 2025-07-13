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
    // First, find the user's wishlist
    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
    });

    if (!wishlist) {
      return new Response("Wishlist not found", { status: 404 });
    }

    // Then, delete the wishlist item
    await prisma.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: productId,
        },
      },
    });

    return NextResponse.json(
      { message: "Wishlist item removed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
