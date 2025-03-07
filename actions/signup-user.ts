"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import prisma from "@/lib/prisma.db";
import { registerSchema } from "@/schemas/auth-schems";
import { createVerificationTokenAction } from "./create-verification-token";

export async function registerUserAction(
  values: z.infer<typeof registerSchema>
) {
  const parsedValues = registerSchema.safeParse(values);

  if (!parsedValues.success) {
    return {
      success: false,
      message: "Error during parsing user data.",
      statusCode: 500,
    };
  }

  const { name, email, password } = parsedValues.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    if (existingUser?.id) {
      if (!existingUser.emailVerified) {
        const verificationToken = await createVerificationTokenAction(email);
        console.log(verificationToken);
        return {
          success: false,
          message: "Verification email sent. Please check your inbox.",
          statusCode: 400,
        };
      }
    }

    if (existingUser) {
      return {
        success: false,
        message: "Email already taken.",
        statusCode: 400,
      };
    }

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isAdmin =
      process.env.ADMIN_EMAIL_ADDRESS?.toLocaleLowerCase() ===
      email.toLowerCase();

    const data = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? "ADMIN" : "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    const verificationToken = await createVerificationTokenAction(email);
    console.log(verificationToken);
    return { success: true, data, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Internal Server Error.",
      statusCode: 500,
    };
  }
}
