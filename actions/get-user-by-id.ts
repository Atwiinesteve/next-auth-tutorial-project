"use server";

import prisma from "@/lib/prisma.db";

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return null; // Return null if the user is not found
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user details.");
  }
}
