// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
	interface User {
		role: string; // Add the `role` property
		emailVerified: string;
	}

	interface Session {
		user: User & {
			role: string; // Optionally add `role` to the session user
		};
	}
}
