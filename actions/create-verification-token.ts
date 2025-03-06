import { VERIFICATION_TOKEN_EXP_MIN } from "@/lib/constants";
import prisma from "@/lib/prisma.db";

export async function createVerificationTokenAction(identifier: string) {
  const expires = new Date(Date.now() + VERIFICATION_TOKEN_EXP_MIN * 60 * 1000);

  // Generate a 6-digit token
  const token = Math.floor(100000 + Math.random() * 900000).toString();

  // Convert the token to uppercase (though it's already numeric)
  const uppercaseToken = token.toUpperCase();

  const newVerificationToken = await prisma.verificationToken.create({
    data: {
      identifier,
      token: uppercaseToken,
      expires,
    },
    select: {
      token: true,
    },
  });

  // console.log(newVerificationToken);

  return newVerificationToken;
}