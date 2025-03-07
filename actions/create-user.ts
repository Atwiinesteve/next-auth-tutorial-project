"use server";

import * as z from "zod";

import prisma from "@/lib/prisma.db";
import { createUserSchema } from "@/schemas/auth-schems";

export async function createUserAction(
  values: z.infer<typeof createUserSchema>
) {
  const parsedValues = createUserSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      success: false,
      message: "Error during parsing user data.",
      statusCode: 500,
    };
  }

  const { name, email, role } = parsedValues.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser?.email) {
      return {
        success: false,
        message: "Email already taken.",
        statusCode: 400,
      };
    }

    const data = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    });

    return { success: true, data, statusCode: 201, message: "User created successfully." };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal Server Error.",
      statusCode: 500,
    };
  }
}
