import prisma from "@/lib/prisma.db";
import "server-only";

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
}