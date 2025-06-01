import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function checkAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { isAdmin: true },
  });

  return user?.isAdmin || false;
}
