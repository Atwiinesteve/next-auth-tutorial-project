// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailOptions) {
  try {
    await resend.emails.send({
      from: "stephenkiiza123@gmail.com", // Replace with your verified email in Resend
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
