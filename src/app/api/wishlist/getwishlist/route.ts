import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
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
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true,
              collections: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json(wishlist || { items: [] });
}
