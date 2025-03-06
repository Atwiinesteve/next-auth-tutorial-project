import { NextAuthConfig } from "next-auth";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { verifyEmail } from "./actions/verify-user-email";
import { USER_ROLES } from "./lib/constants";
import prisma from "./lib/prisma.db";
// import { changeUserRoleAction } from "./actions/change-user-role";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/api/auth" },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user?.id) token.id = user.id;
      if (user?.role) token.role = user.role;

      if (
        user?.email &&
        process.env.ADMIN_EMAIL_ADDRESS?.toLocaleLowerCase() ===
          user.email.toLowerCase()
      ) {
        token.role = USER_ROLES.ADMIN;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
    signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return !!profile?.email_verified;
      }
      if (account?.provider === "github") {
        return true;
      }
      if (account?.provider === "credentials") {
        // return false; // blocks out users with unverified emails
        if (user?.emailVerified) {
          return true;
        }
        // return true;
      }
      return false;
    },
    authorized({ auth, request }) {
      const { nextUrl } = request;

      const isLoggedIn = !!auth?.user;
      const isOnAdminPage = nextUrl.pathname.startsWith("/dashboard/admin");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnAdminPage) {
        if (isLoggedIn) {
          return true;
        }
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      if (isOnAuth) {
        if (!isLoggedIn) return true;
        return Response.redirect(new URL("/dashboard/admin", nextUrl));
      }
      return true;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (["github", "google"].includes(account.provider)) {
        if (user.email) await verifyEmail(user.email);
      }
    },
    // async createUser({ user }) {
    // 	if (
    // 		user?.email &&
    // 		process.env.ADMIN_EMAIL_ADDRESS?.toLocaleLowerCase() ===
    // 			user.email.toLowerCase()
    // 	) {
    // 		await changeUserRoleAction(user.email, USER_ROLES.ADMIN);
    // 	}
    // },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_ID,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
