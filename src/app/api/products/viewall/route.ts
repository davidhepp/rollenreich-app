import { prisma as db } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "1");
  const sort = searchParams.get("sort") || "newest";
  const skip = (page - 1) * limit;

  // Define sort options
  const sortOptions: Record<string, { [key: string]: "asc" | "desc" }> = {
    newest: { createdAt: "desc" },
    oldest: { createdAt: "asc" },
    "price-asc": { price: "asc" },
    "price-desc": { price: "desc" },
    "name-asc": { name: "asc" },
    "name-desc": { name: "desc" },
  };

  const orderBy = sortOptions[sort] || sortOptions["newest"];

  // Get total count for pagination metadata
  const totalProducts = await db.product.count({
    where: {
      isActive: true,
    },
  });

  // Get products with pagination and sorting
  const products = await db.product.findMany({
    include: {
      images: true,
    },
    skip,
    take: limit,
    where: {
      isActive: true,
    },
    orderBy,
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
      sort,
    },
  });
}
