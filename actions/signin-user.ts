"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/auth-schems";

export async function loginUserAction(values: z.infer<typeof loginSchema>) {
	try {
		await signIn("credentials", { ...values, redirect: false });	
	  return { success: true };
	} catch (error) {
	  console.error("Unexpected error:", error);
	  return { success: false, error: "An unexpected error occurred." };
	}
  }