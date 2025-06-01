import { prisma as db } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await db.product.findMany({
    include: {
      images: true,
    },
  });
  return NextResponse.json(products);
}
