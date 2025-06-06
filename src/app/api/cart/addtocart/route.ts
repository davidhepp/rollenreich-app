import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { productId, quantity } = await request.json();

    if (!productId || !quantity || quantity <= 0) {
      return new Response("Invalid product ID or quantity", { status: 400 });
    }

    let cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id!,
        },
      });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (cartItem) {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return new Response("Cart updated", { status: 200 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
