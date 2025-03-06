"use server";

import prisma from "@/lib/prisma.db";

export async function verifyTokenAction(token: string) {
  try {
    // Find the token in the database
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return { success: false, message: "Invalid token." };
    }

    // Check if the token has expired
    if (verificationToken.expires < new Date()) {
      return { success: false, message: "Token has expired." };
    }

    // If valid, delete the token (optional)
    await prisma.verificationToken.delete({
      where: { token },
    });

    return { success: true, message: "Token verified successfully!" };
  } catch (error) {
    console.error("Error verifying token:", error);
    return { success: false, message: "An error occurred while verifying the token." };
  }
}