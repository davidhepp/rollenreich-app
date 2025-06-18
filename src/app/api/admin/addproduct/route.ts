import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/prisma";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const images = data.images.map((image: string) => ({ url: image }));

  const product = await db.product.create({
    data: { ...data, images: { create: images } },
  });
  return NextResponse.json(product);
}
