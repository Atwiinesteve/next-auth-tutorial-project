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

// Function to send a verification email
export async function sendVerificationEmail(email: string, token: string) {
  // Create the email content as an HTML string
  const emailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-7csr9hg71-resend.vercel.app/static/plaid-logo.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body
    style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:360px;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px">
      <tbody>
        <tr style="width:100%">
          <td>
            <img
              alt="Plaid"
              height="88"
              src="https://react-email-demo-7csr9hg71-resend.vercel.app/static/plaid-logo.png"
              style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
              width="212" />
            <p
              style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">
              Verify Your Identity
            </p>
            <h1
              style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">
              Enter the following code to finish linking AuthFlow.
            </h1>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px">
              <tbody>
                <tr>
                  <td>
                    <p
                      style="font-size:32px;line-height:40px;margin:0 auto;color:#000;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;display:block;text-align:center">
                      ${token}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Expiration Warning -->
            <p
              style="font-size:14px;line-height:20px;margin:16px 0;color:#d32f2f;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;background-color:#ffebee;padding:12px;border-radius:4px;">
              ⚠️ This token will expire in <strong>15 minutes</strong>. Please verify your email before it expires.
            </p>
            <p
              style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">
              Not expecting this email?
            </p>
            <p
              style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">
              Contact<!-- -->
              <a
                href="#"
                style="color:#444;text-decoration-line:none;text-decoration:underline"
                target="_blank"
                >authflow@gmail.com</a
              >
              <!-- -->if you did not request this code.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p
      style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">
      Securely powered by AuthFlow.
    </p>
    <!--/$-->
  </body>
</html>`;


  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient address
    subject: "Verify Your Email Address", // Email subject
    html: emailHtml, // Email content (HTML string)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }
}
