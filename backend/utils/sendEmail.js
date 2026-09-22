import nodemailer from "nodemailer";

/**
 * Sends an email if SMTP is configured via env vars (SMTP_HOST, SMTP_PORT,
 * SMTP_USER, SMTP_PASS). If not configured, this silently does nothing and
 * returns { sent: false } — the caller (forgotPassword) falls back to
 * showing the reset link directly in the API response instead, so the
 * feature still works end-to-end without an email service set up.
 */
const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return { sent: false, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });

  return { sent: true };
};

export default sendEmail;
