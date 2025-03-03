// "use server";

// import { createUserSchema } from "@/schemas/auth-schems";
// import { z } from "zod";
// import { getUserByEmail } from "./get-user-by-email";
// import prisma from "@/lib/prisma.db";

// export async function changeUserRoleAction(email: string,
//     newRole: z.infer<typeof createUserSchema>
// ) {
//     const existingUser = await getUserByEmail(email);

//     if(existingUser?.id ) {
//         await prisma.user.update({
//             data: {
//                 role: newRole
//             },
//             select: {
//                 role: true
//             },
//             where: {
//                 id: existingUser?.id
//             }
//         })
//     }
// }