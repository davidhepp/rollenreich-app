import { NextRequest, NextResponse } from "next/server";
import { prisma as db } from "@/prisma";
import { checkAdmin } from "@/lib/checkAdmin";

export async function POST(request: NextRequest) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const images = data.images.map((image: string) => ({ url: image }));

  const product = await db.product.create({
    data: { ...data, images: { create: images } },
  });
  return NextResponse.json(product);
}
