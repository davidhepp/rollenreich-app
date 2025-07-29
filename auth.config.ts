import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./src/prisma";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub, Google],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;

        // Fetch isAdmin from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { isAdmin: true },
        });

        token.isAdmin = dbUser?.isAdmin || false;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        isAdmin: token.isAdmin as boolean,
      },
    }),
  },
} satisfies NextAuthConfig;
