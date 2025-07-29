import { prisma as db } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const skip = (page - 1) * limit;

  // Return empty results if query is too short
  if (query.trim().length < 2) {
    return NextResponse.json({
      products: [],
      pagination: {
        currentPage: page,
        totalPages: 0,
        totalProducts: 0,
        hasMore: false,
        limit,
        query: query.trim(),
      },
    });
  }

  try {
    // Create search conditions for name, description, and sku
    const searchConditions = {
      isActive: true,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
        {
          sku: {
            contains: query,
            mode: "insensitive" as const,
          },
        },
      ],
    };

    // Get total count for pagination metadata
    const totalProducts = await db.product.count({
      where: searchConditions,
    });

    // Get products with pagination
    const products = await db.product.findMany({
      include: {
        images: true,
        collections: {
          include: {
            collection: true,
          },
        },
      },
      skip,
      take: limit,
      where: searchConditions,
      orderBy: [
        // Prioritize exact matches in name
        {
          name: "asc",
        },
        // Then by creation date
        {
          createdAt: "desc",
        },
      ],
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
        query: query.trim(),
      },
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
