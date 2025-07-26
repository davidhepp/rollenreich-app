import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      name: true,
      email: true,
      createdAt: true,
      accounts: {
        select: {
          provider: true,
          providerAccountId: true,
        },
      },
    },
  });
  return NextResponse.json({ user });
}
