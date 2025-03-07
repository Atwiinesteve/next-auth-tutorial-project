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

    // Find the user associated with the token
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return { success: false, message: "User not found." };
    }

    // Update the user's emailVerified field
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(), // Mark the email as verified
      },
    });

    // Delete the verification token (optional but recommended)
    await prisma.verificationToken.delete({
      where: { token },
    });

    return {
      success: true,
      message: "Email verified successfully! You can now log in.",
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return {
      success: false,
      message: "An error occurred while verifying the token.",
    };
  }
}
