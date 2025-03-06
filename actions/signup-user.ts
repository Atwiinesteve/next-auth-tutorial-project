"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { emailClient } from "@/app/mails/send-mails";
import { USER_ROLES } from "@/lib/constants";
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
        const verificationToken = createVerificationTokenAction(email);
        const sender = {
          email: "hello@demomailtrap.com",
          name: "Stephen Kiiza",
        };

        const recipients = [
          {
            email: existingUser.email,
          },
        ];

        emailClient
          .send({
            from: sender,
            to: recipients,
            template_uuid: "74964250-dbe0-4987-9f38-86b64f657003",
            template_variables: {
              name: existingUser.name,
              verificationCode: (await verificationToken).token,
              email: existingUser.email,
            },
          })
          .then(console.log)
          .catch((error) => console.log(error));
        return {
          success: false,
          message:
            "Email exists but not Verified. Verification token sent to email.",
          statusCode: 409,
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
        role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.USER,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
    });

    const verificationToken = createVerificationTokenAction(email);
    const sender = {
      email: "hello@demomailtrap.com",
      name: "Stephen Kiiza",
    };

    const recipients = [
      {
        email: data.email,
      },
    ];

    emailClient
      .send({
        from: sender,
        to: recipients,
        template_uuid: "74964250-dbe0-4987-9f38-86b64f657003",
        template_variables: {
          name: data.name,
          verificationCode: (await verificationToken).token,
          email: data.email,
        },
      })
      .then(console.log)
      .catch((error) => console.log(error));
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
