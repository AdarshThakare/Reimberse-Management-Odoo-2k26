import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.AUTH_RESEND_KEY);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getAppUrl(): string {
  const vercelUrl = process.env.VERCEL_URL;
  if (!vercelUrl) return "http://localhost:3000";

  return vercelUrl.startsWith("http://") || vercelUrl.startsWith("https://")
    ? vercelUrl
    : `https://${vercelUrl}`;
}

function renderEmailTemplate({
  preview,
  eyebrow,
  title,
  subtitle,
  bodyHtml,
  ctaLabel,
  ctaUrl,
  footer,
}: {
  preview: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
  footer: string;
}): string {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />
      <title>ReimburseFlow</title>
    </head>
    <body style="margin:0;padding:0;background:#e5e7eb;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;color:#0f1f17;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;line-height:1px;color:transparent;">${escapeHtml(preview)}</div>

      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding:30px 16px 34px 16px;background:#e5e7eb;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;">
              <tr>
                <td align="center" style="padding:8px 0 20px 0;">
                  <span style="display:inline-block;font-size:50px;line-height:1;color:#0b1d12;font-weight:700;vertical-align:middle;margin-right:8px;">↗</span>
                  <span style="display:inline-block;font-size:52px;line-height:1;color:#0b1d12;font-weight:700;letter-spacing:-0.01em;vertical-align:middle;">ReimburseFlow</span>
                </td>
              </tr>

              <tr>
                <td style="padding:0 14px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#070d17;border-radius:22px;overflow:hidden;">
                    <tr>
                      <td align="center" style="padding:80px 30px 74px 30px;background:
                        radial-gradient(circle at 78% 12%, rgba(255,167,118,0.82), rgba(255,167,118,0) 30%),
                        radial-gradient(circle at 78% 78%, rgba(17,176,208,0.95), rgba(17,176,208,0.18) 52%, rgba(17,176,208,0) 74%),
                        radial-gradient(circle at 12% 88%, rgba(19,95,189,0.9), rgba(19,95,189,0) 46%),
                        linear-gradient(123deg,#04070d 36%, #081a36 61%, #1096b7 100%);
                      ">
                        <p style="margin:0;color:#ffffff;font-size:66px;line-height:1.12;font-weight:500;letter-spacing:-0.02em;">${escapeHtml(title)}</p>
                        <p style="margin:28px 0 0 0;color:#f8fafc;font-size:22px;line-height:1.45;font-weight:500;max-width:420px;">${escapeHtml(subtitle)}</p>
                      </td>
                    </tr>

                    <tr><td style="height:20px;"></td></tr>
                    <tr>
                      <td align="center" style="padding:0 24px;">
                        <p style="margin:0;font-size:22px;line-height:1.7;color:#0b1d12;">
                          <strong>Instant reimbursements</strong> anytime, anywhere.<br/>
                          <strong>Smart budgeting</strong> with real-time insights.<br/>
                          <strong>Bank-level security</strong> built in.
                        </p>
                      </td>
                    </tr>

                    <tr><td style="height:26px;"></td></tr>
                    <tr>
                      <td style="padding:0 14px;">
                        <hr style="margin:0;border:none;border-top:1px solid #c6cad1;" />
                      </td>
                    </tr>
                    <tr><td style="height:26px;"></td></tr>

                    <tr>
                      <td align="center" style="padding:0 28px;">
                        <h2 style="margin:0;color:#0b1d12;font-size:54px;line-height:1.14;font-weight:700;letter-spacing:-0.01em;">${escapeHtml(eyebrow)}</h2>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:18px 40px 0 40px;">
                        ${bodyHtml}
                      </td>
                    </tr>
                    <tr><td style="height:24px;"></td></tr>
                    <tr>
                      <td align="center" style="padding:0 20px;">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="background:#19bccb;border-radius:999px;">
                              <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:18px 64px;font-size:42px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${escapeHtml(ctaLabel)}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:22px 28px 0 28px;">
                        <p style="margin:0;font-size:12px;line-height:1.7;color:#64748b;">${escapeHtml(footer)}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:18px 28px 28px 28px;">
                        <p style="margin:0;font-size:11px;line-height:1.65;color:#7c8797;text-align:center;">If the button does not work, copy and paste this URL into your browser:<br/><span style="word-break:break-all;color:#485569;">${escapeHtml(ctaUrl)}</span></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

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
  const appUrl = getAppUrl();
  const loginUrl = `${appUrl}/auth/signin`;

  const roleLabels: Record<string, string> = {
    EMPLOYEE: "Employee",
    MANAGER: "Manager",
    ADMIN: "Administrator",
  };

  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(companyName);
  const safeAdmin = escapeHtml(adminName);
  const safeRole = escapeHtml(roleLabels[role] ?? role);
  const safeTo = escapeHtml(to);

  const html = renderEmailTemplate({
    preview: `${companyName} invited you to ReimburseFlow`,
    eyebrow: "Your account is ready",
    title: `Welcome to ${companyName}`,
    subtitle: "The modern way to manage your reimbursements",
    bodyHtml: `
      <p style="margin:0;font-size:21px;line-height:1.65;color:#1f2937;max-width:510px;">
        ${safeName}, your workspace invitation from <strong>${safeAdmin}</strong> is active.<br/>
        Join <strong>${safeCompany}</strong> as <strong>${safeRole}</strong> and start in seconds.
      </p>
      <p style="margin:14px 0 0 0;font-size:18px;line-height:1.6;color:#4b5563;max-width:510px;">
        Sign in using <strong style="color:#1f2937;">${safeTo}</strong>. We use secure magic links, so no password is required.
      </p>
    `,
    ctaLabel: "Login",
    ctaUrl: loginUrl,
    footer: "If you were not expecting this invitation, you can safely ignore this message.",
  });

  const text = [
    `Welcome to ${companyName}, ${name}!`,
    "",
    `${adminName} invited you to join ${companyName} on ReimburseFlow.`,
    `Role: ${roleLabels[role] ?? role}`,
    "",
    `Sign in: ${loginUrl}`,
    `Use this email address for sign-in: ${to}`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject: `You've been invited to join ${companyName} on ReimburseFlow`,
      html,
      text,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Non-blocking error for UI so we don't crash user creation if email fails
  }
}

export async function sendMagicLinkEmail({
  to,
  url,
}: {
  to: string;
  url: string;
}) {
  const safeTo = escapeHtml(to);

  const html = renderEmailTemplate({
    preview: "Your secure magic sign-in link for ReimburseFlow",
    eyebrow: "Your sign-in link is ready",
    title: "Welcome to ReimburseFlow",
    subtitle: "The modern way to manage your reimbursements",
    bodyHtml: `
      <p style="margin:0;font-size:21px;line-height:1.65;color:#1f2937;max-width:510px;">
        Use this secure link to sign in with <strong>${safeTo}</strong>. It is one-time use and will expire automatically.
      </p>
      <p style="margin:14px 0 0 0;font-size:18px;line-height:1.6;color:#4b5563;max-width:510px;">
        If it expires, request a fresh magic link from the sign-in page.
      </p>
    `,
    ctaLabel: "Login",
    ctaUrl: url,
    footer: "If you did not request this email, you can ignore it.",
  });

  const text = [
    "ReimburseFlow secure sign-in",
    "",
    `Sign in using this magic link: ${url}`,
    "This link can only be used once and expires automatically.",
    "If you did not request it, you can ignore this email.",
  ].join("\n");

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject: "Your secure sign-in link for ReimburseFlow",
    html,
    text,
  });
}
