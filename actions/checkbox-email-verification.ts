"use server";

import { emailClient } from "@/app/mails/send-mails";
import prisma from "@/lib/prisma.db"; // Import Prisma client

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

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Stephen Kiiza",
    };

    const recipients = [
      {
        email: user.email,
      },
    ];

    emailClient
      .send({
        from: sender,
        to: recipients,
        template_uuid: "c6ed094e-dcc3-40b1-9353-cb42aaeb7c7c",
        template_variables: {
          name: user.name,
          email: user.email,
        },
      })
      .then(console.log)
      .catch((error) => console.log(error));

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
