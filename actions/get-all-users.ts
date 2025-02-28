"use server";

import prisma from "@/lib/prisma.db";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
}
