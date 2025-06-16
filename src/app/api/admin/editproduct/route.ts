import { checkAdmin } from "@/lib/checkAdmin";
import { prisma as db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, sku, name, price, inStock, isActive, isFeatured, description } =
    await request.json();

  const product = await db.product.update({
    where: { id },
    data: {
      sku,
      name,
      price,
      inStock,
      isActive,
      isFeatured,
      description,
    },
    include: {
      images: true, // Include images in the response
    },
  });

  return NextResponse.json(product);
}
