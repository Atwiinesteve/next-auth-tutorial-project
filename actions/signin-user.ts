"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/auth-schems";
import { AuthError } from "next-auth";

export async function loginUserAction(values: z.infer<typeof loginSchema>) {
	try {
		await signIn("credentials", { ...values, redirect: false });
		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
				case "CallbackRouteError":
					return {
						success: false,
						error: "Invalid Credentials.",
						statusCode: 401,
					};
				case "OAuthAccountAlreadyLinked" as AuthError["type"]:
					return {
						success: false,
						error: "Login with your Google or Github Account.",
						statusCode: 401,
					};
				default:
					return {
						success: false,
						error: "Ooops, Something went wrong.",
						statusCode: 401,
					};
			}
		}
		console.error("Unexpected error:", error);
		return { success: false, error: "An unexpected error occurred." };
	}
}
