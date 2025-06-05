import { prisma as db } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "1");
  const skip = (page - 1) * limit;

  // Get total count for pagination metadata
  const totalProducts = await db.product.count({
    where: {
      isActive: true,
    },
  });

  // Get products with pagination
  const products = await db.product.findMany({
    include: {
      images: true,
    },
    skip,
    take: limit,
    where: {
      isActive: true,
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);
  const hasMore = page < totalPages;

  return NextResponse.json({
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      hasMore,
      limit,
    },
  });
}
