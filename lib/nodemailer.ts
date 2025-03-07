import nodemailer from "nodemailer";

// Create a Nodemailer transporter for Brevo
export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo's SMTP server
  port: 587, // Brevo's SMTP port
  secure: false, // Use TLS
  auth: {
    user: process.env.BREVO_USER, // Your Brevo email address or SMTP username
    pass: process.env.BREVO_PASSWORD, // Your Brevo SMTP password or API key
  },
});