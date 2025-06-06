import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { productId, quantity } = await request.json();
  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user?.id,
    },
  });
  if (!cart) {
    return new Response("Cart not found", { status: 404 });
  }
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id: productId,
    },
  });
  if (!cartItem) {
    return new Response("Cart item not found", { status: 404 });
  }
  await prisma.cartItem.update({
    where: { id: productId },
    data: { quantity },
  });
  return Response.json({ message: "Cart item updated" }, { status: 200 });
}
