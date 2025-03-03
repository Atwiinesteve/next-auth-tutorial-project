"use server";

import { sendEmail } from "@/lib/email";
import prisma from "@/lib/prisma.db"; // Import Prisma client

export async function sendEmailVerificationNotification(userId: string) {
  try {
    // Fetch the user's email from the database
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

    // Send the email notification
    await sendEmail({
      to: user.email,
      subject: "Email Verified",
      text: "Your email has been verified successfully.",
    });

    // Mark the email as verified in the database
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(), // Set the emailVerified field to the current date
      },
    });

    return {
      success: true,
      message: "Email verification message has been sent.",
    };
  } catch (error) {
    console.error("Error sending email notification:", error);
    return {
      success: false,
      message: "Failed to send email notification.",
    };
  }
}
