import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { productId } = await request.json();
  const cart = await prisma.cart.findUnique({
    where: {
      userId: session.user?.id,
    },
  });
  if (!cart) {
    return new Response("Cart not found", { status: 404 });
  }
  await prisma.cartItem.delete({
    where: {
      id: productId,
      cart: {
        userId: session.user?.id,
      },
    },
  });
  return Response.json({ message: "Cart item removed" }, { status: 200 });
}
