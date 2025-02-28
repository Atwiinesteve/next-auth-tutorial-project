"use server";

import prisma from "@/lib/prisma.db";

export async function deleteUser(userId: string) {
  try {
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

    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      message: "User deleted successfully.",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "An error occurred while deleting the user.",
      statusCode: 500,
    };
  }
}
