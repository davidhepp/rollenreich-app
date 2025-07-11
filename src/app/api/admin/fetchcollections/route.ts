import { prisma as db } from "@/prisma";
import { checkAdmin } from "@/lib/checkAdmin";
import { NextResponse } from "next/server";

export async function GET() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const collections = await db.collection.findMany({
    include: {
      image: true,
      products: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(collections);
}
