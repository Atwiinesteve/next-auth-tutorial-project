"use server"

import prisma from "@/lib/prisma.db";

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
        throw new Error("No user was found.")
    }
    return user;
}