"use server";

import prisma from "@/lib/prisma.db"; // Assuming you have a schema for validation
import { updateUserSchema } from "@/schemas/auth-schems";
import { z } from "zod";

export async function editUser(
  userId: string,
  values: z.infer<typeof updateUserSchema>
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

    const { name, email, role } = validatedData.data;

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
    await prisma.user.update({
      where: { id: userId },
      data: { name, email, role },
    });

    return {
      success: true,
      message: "User updated successfully.",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error updating user:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint failed")) {
        return {
          success: false,
          message: "Email already exists.",
          statusCode: 409,
        };
      }
    }

    return {
      success: false,
      message: "An error occurred while updating the user.",
      statusCode: 500,
    };
  }
}
