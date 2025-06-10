import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
  try {
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

    const { productId, quantity } = await request.json();

    if (!productId || !quantity || quantity <= 0) {
      return new Response("Invalid product ID or quantity", { status: 400 });
    }

    let cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!cart) {
      console.log("Creating cart for user:", user.id);
      cart = await prisma.cart.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
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

    return Response.json({ message: "Cart updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
