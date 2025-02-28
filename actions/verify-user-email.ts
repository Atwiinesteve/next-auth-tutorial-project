"use server";

import prisma from "@/lib/prisma.db";

// verify user email
export async function verifyEmail(email: string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email,
      password: null,
      emailVerified: null,
    },
    select: {
      id: true,
    },
  });
  if (existingUser?.id) {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });
  }
}
