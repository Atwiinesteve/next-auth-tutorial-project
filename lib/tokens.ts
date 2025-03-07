import prisma from "@/lib/prisma.db";
import { v4 as uuidv4 } from "uuid";

export async function generatePasswordResetToken(userId: string) {
  const token = uuidv4(); // Generate a unique token
  const expires = new Date(Date.now() + 3600 * 1000); // Token expires in 1 hour

  // Save the token in the database
  const resetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expires,
    },
  });

  return resetToken;
}