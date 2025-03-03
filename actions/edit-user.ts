"use server";

import prisma from "@/lib/prisma.db"; // Assuming you have a schema for validation
import { updateUserSchema } from "@/schemas/auth-schems";
import { z } from "zod";

export async function editUser(
	userId: string,
	values: z.infer<typeof updateUserSchema>,
) {
	try {
		// Validate input data
		const validatedData = updateUserSchema.safeParse(values);

		if (!validatedData.success) {
			return {
				success: false,
				message: "Invalid input data.",
				statusCode: 400,
			};
		}

		const { name, email, role, id } = validatedData.data;
		// const userSession = await auth();

		// if (!userSession?.user?.id || userSession?.user?.id !== id) {
		// 	return {
		// 		success: false,
		// 		error: "Unauthorized.",
		// 		statusCode: 401,
		// 	};
		// }

		// if (userSession?.user?.name === name) {
		// 	return {
		// 		data: { email, name, role, id },
		// 		success: true,
		// 		statusCode: 200,
		// 	};
		// }

		// Check if the user exists
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return {
				success: false,
				message: "User not found.",
				statusCode: 404,
			};
		}

		// Update the user
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { name, email, role },
		});

		if (updatedUser) {
			return {
				success: true,
				message: "User updated successfully.",
				statusCode: 200,
			};
		} else {
			return {
				success: false,
				message: "User not updated successfully.",
				statusCode: 404,
			};
		}
	} catch (error) {
		console.error("Error updating user:", error);
	}
}
