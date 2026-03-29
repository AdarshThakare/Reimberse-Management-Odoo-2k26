import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.AUTH_RESEND_KEY);

export async function sendWelcomeEmail({
  to,
  name,
  role,
  companyName,
  adminName,
}: {
  to: string;
  name: string;
  role: string;
  companyName: string;
  adminName: string;
}) {
  const loginUrl = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/auth/signin`;

  const roleLabels: Record<string, string> = {
    EMPLOYEE: "Employee",
    MANAGER: "Manager",
    ADMIN: "Administrator",
  };

  const html = `
    <html>
      <body style="font-family: sans-serif; padding: 20px; color: #334155;">
        <h2>Welcome to ${companyName}, ${name}!</h2>
        <p>You have been invited by <strong>${adminName}</strong> to join the <strong>${companyName}</strong> workspace on ReimburseFlow.</p>
        <p>Your role has been set to: <strong>${roleLabels[role] ?? role}</strong></p>
        
        <div style="margin: 30px 0;">
          <a href="${loginUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Sign in to your account
          </a>
        </div>
        
        <p style="font-size: 14px; color: #64748b;">
          <strong>How to login:</strong> Instead of a password, you will use a secure "Magic Link". 
          Click the button above, enter this email address (${to}), and we will send you a secure link to log in instantly.
        </p>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject: `You've been invited to join ${companyName} on ReimburseFlow`,
      html,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Non-blocking error for UI so we don't crash user creation if email fails
  }
}
