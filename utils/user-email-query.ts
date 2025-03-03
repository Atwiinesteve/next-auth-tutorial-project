// import "server-only";
import prisma from "@/lib/prisma.db";

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
}