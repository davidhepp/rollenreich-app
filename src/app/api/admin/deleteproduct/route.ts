import { checkAdmin } from "@/lib/checkAdmin";
import { prisma as db } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const product = await db.product.delete({
    where: { id },
    include: {
      images: true,
    },
  });

  return NextResponse.json(product);
}
