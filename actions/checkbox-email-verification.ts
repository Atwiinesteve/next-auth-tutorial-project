"use server";

import prisma from "@/lib/prisma.db";
import { sendNotificationEmail } from "@/lib/verification-email";

export async function sendEmailVerificationNotification(
  userId: string,
  verify: boolean // New parameter to indicate whether to verify or unverify
) {
  try {
    // Fetch the user's email from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Update the email verification status in the database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: verify ? new Date() : null, // Set to current date if verifying, null if unverifying
      },
    });

    // Send a notification email to the user
    await sendNotificationEmail({
      email: user.email,
      name: user.name,
      verified: verify,
    });

    return {
      success: true,
      message: verify
        ? "Email verified successfully."
        : "Email unverified successfully.",
    };
  } catch (error) {
    console.error("Error updating email verification status:", error);
    return {
      success: false,
      message: "Failed to update email verification status.",
    };
  }
}