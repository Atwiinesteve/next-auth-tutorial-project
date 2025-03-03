//  imports

import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "./auth.config";
import { loginSchema } from "./schemas/auth-schems";
import { OAuthAccountLinkedError } from "./utils/custom-errors";
import { getUserByEmail } from "./utils/user-email-query";

const { providers: authConfigProviders, ...restOfAuthConfig } = authConfig;

export const { handlers, signIn, signOut, auth } = NextAuth({
	...restOfAuthConfig,
	providers: [
		...authConfigProviders,
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = loginSchema.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;

					// get user from database
					const user = await getUserByEmail(email);
					if (!user) return null;

					if (!user?.password) throw new OAuthAccountLinkedError();

					const passwordsMatch = await bcrypt.compare(password, user.password);

					if (passwordsMatch) {
						const { password: _, ...userWithoutPassword } = user;
						return userWithoutPassword;
					}
				}
				return null;
			},
		}),
	],
});
