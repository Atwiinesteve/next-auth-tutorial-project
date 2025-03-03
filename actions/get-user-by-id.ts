"use server";

import prisma from "@/lib/prisma.db";
import { notFound } from "next/navigation";

export async function getUserById(userId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return notFound();
		}

		return user;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw new Error("Failed to fetch user details.");
	}
}
