const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com" or your provider
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * sendEmail({to, subject, html, text})
 */
async function sendEmail({ to, subject, html, text }) {
  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html
  });
  return info;
}

function confirmationEmailTemplate({ username, confirmUrl }) {
  return `
    <p>Hi ${username || 'User'},</p>
    <p>Thanks for registering. Please confirm your email by clicking the link below:</p>
    <p><a href="${confirmUrl}">Confirm your email</a></p>
    <p>If you didn't request this, ignore this email.</p>
  `;
}

function resetPasswordTemplate({ username, resetUrl }) {
  return `
    <p>Hi ${username || 'User'},</p>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <p><a href="${resetUrl}">Reset your password</a></p>
    <p>This link will expire in a short time. If you didn't request this, ignore this email.</p>
  `;
}

module.exports = { sendEmail, confirmationEmailTemplate, resetPasswordTemplate };
