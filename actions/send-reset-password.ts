"use server";

import prisma from "@/lib/prisma.db";
import { generatePasswordResetToken } from "@/lib/tokens"; // Helper function to generate a token
import nodemailer from "nodemailer";

export async function sendResetPasswordEmail(email: string) {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
        statusCode: 400
      };
    }

    // Generate a password reset token
    const resetToken = await generatePasswordResetToken(user.id);

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP server host
      port: 587, // Replace with your SMTP server port
      secure: false, // Use TLS
      auth: {
        user: process.env.SMTP_USER, // Your email address
        pass: process.env.SMTP_PASSWORD, // Your email password
      },
    });
    

    // Create the reset password link
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken.token}`;

    // Email content
    const emailHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
              border-bottom: 1px solid #e0e0e0;
            }
            .header h1 {
              color: #333333;
              font-size: 24px;
              margin: 0;
            }
            .content {
              padding: 20px 0;
            }
            .content p {
              color: #555555;
              font-size: 16px;
              line-height: 1.6;
              margin: 0 0 20px 0;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #777777;
              font-size: 14px;
            }
            .footer a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="content">
              <p>Hello ${user.name},</p>
              <p>We received a request to reset your password. Click the link below to reset it:</p>
              <p><a href="${resetLink}">Reset Password</a></p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>Securely powered by YourApp.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send the email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Recipient address
      subject: "Reset Your Password", // Email subject
      html: emailHtml, // Email content (HTML string)
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Reset password email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return {
      success: false,
      message: "Failed to send reset password email.",
    };
  }
}
