//  imports
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
<<<<<<< HEAD
import prisma from "./lib/prisma.db";
import { loginSchema } from "./schemas/auth-schems";
import { getUserByEmail } from "./utils/user-queries";
=======
import { getUserByEmail } from "./actions/get-user-by-email";
import { verifyEmail } from "./actions/verify-user-email";
import prisma from "./lib/prisma.db";
import { loginSchema } from "./schemas/auth-schems";
>>>>>>> ba4d7f26062ef11cec5246217f51e522bc072f7b

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/api/auth" },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["github", "google"].includes(account.provider)) {
        if (user.email) await verifyEmail(user.email);
      }
    },
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // get user from database
          const user = await getUserByEmail(email);
          if (!user) return null;
          if (!user?.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            const { password: _, ...userWithoutPassword } = user;
            return userWithoutPassword;
          }
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_ID,
    }),
  ],
});
