import { prisma as db } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
