"use server";

import prisma from "@/lib/prisma.db"; // Import Prisma client

export async function unverifyUserEmail(userId: string) {
  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Unverify the user's email by setting emailVerified to null
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: null, // Unverify the email
      },
    });

    return {
      success: true,
      message: "Email unverified successfully.",
    };
  } catch (error) {
    console.error("Error unverifying user email:", error);
    return {
      success: false,
      message: "Failed to unverify email.",
    };
  }
}