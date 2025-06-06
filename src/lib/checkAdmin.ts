import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function checkAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });

  return user?.isAdmin || false;
}
