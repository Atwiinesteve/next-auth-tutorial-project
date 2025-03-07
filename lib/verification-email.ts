import nodemailer from "nodemailer";

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

// Function to send a notification email
export async function sendNotificationEmail({
  email,
  name,
  verified,
}: {
  email: string;
  name: string;
  verified: boolean;
}) {
  const subject = verified
    ? "Your Email Has Been Verified"
    : "Your Email Has Been Unverified";

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
            <h1>${subject}</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>
              ${
                verified
                  ? "Your email has been successfully verified. You can now enjoy full access to your account."
                  : "Your email has been unverified. Please contact support if this was a mistake."
              }
            </p>
            <p>If you have any questions, feel free to <a href="stephenkiiza123@gmail.com">contact support</a>.</p>
          </div>
          <div class="footer">
            <p>Securely powered by YourApp.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient address
    subject: subject, // Email subject
    html: emailHtml, // Email content (HTML string)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully!");
  } catch (error) {
    console.error("Error sending notification email:", error);
    throw new Error("Failed to send notification email.");
  }
}