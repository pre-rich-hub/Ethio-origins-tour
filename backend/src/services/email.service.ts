import { env } from "../config/env.js";
import { logger } from "../config/pino.js";
import { addEmailJob } from "./queue.service.js";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function sendMail(input: SendEmailInput) {
  if (!env.EMAIL_ENABLED) {
    logger.info({ to: input.to, subject: input.subject }, "[email disabled]");
    return;
  }

  // Deliver internal notifications locally when the admin mailbox lives on the
  // same cPanel mail server. This avoids unnecessary SendGrid filtering and
  // keeps customer-facing transactional mail on SendGrid.
  const isAdminNotification =
    Boolean(env.ADMIN_EMAIL) &&
    input.to.trim().toLowerCase() === env.ADMIN_EMAIL.trim().toLowerCase();
  const useSendGrid = Boolean(env.SENDGRID_API_KEY) && !isAdminNotification;
  const useSmtp = Boolean(env.SMTP_HOST);

  if (useSmtp) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
    });

    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.html.replace(/<[^>]+>/g, " "),
      replyTo: input.replyTo
    });
    return;
  }

  if (useSendGrid) {
    const sgMail = await import("@sendgrid/mail");
    sgMail.default.setApiKey(env.SENDGRID_API_KEY);
    await sgMail.default.send({
      to: input.to,
      from: env.SENDGRID_FROM_EMAIL || env.SMTP_FROM,
      subject: input.subject,
      html: input.html,
      text: input.html.replace(/<[^>]+>/g, " "),
      replyTo: input.replyTo
    });
    return;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000
  });

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.html.replace(/<[^>]+>/g, " "),
    replyTo: input.replyTo
  });
}

const isVercel = Boolean(process.env.VERCEL);

export async function sendEmail(input: SendEmailInput) {
  if (isVercel) {
    await sendMail(input);
    return;
  }

  try {
    await addEmailJob(input);
    logger.info({ to: input.to, subject: input.subject }, "Email queued");
  } catch {
    logger.warn({ to: input.to, subject: input.subject }, "Queue unavailable — sending inline");
    await sendMail(input);
  }
}

export async function sendContactAdminEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!env.ADMIN_EMAIL) return;

  await sendEmail({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Contact Inquiry - ${data.name}`,
    html: `
      <h1>New Contact Inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Message and itinerary details:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `,
  });
}

export async function sendSubscriberAdminEmail(data: {
  email: string;
  subscribedAt: Date;
}) {
  if (!env.ADMIN_EMAIL) return;

  const subscribersUrl = `${env.FRONTEND_ORIGIN.replace(/\/$/, "")}/admin/subscribers`;

  await sendEmail({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Newsletter Subscriber - ${data.email}`,
    html: `
      <h1>New Newsletter Subscriber</h1>
      <p>A new visitor subscribed to the Ethio Origins Tours newsletter.</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subscribed:</strong> ${escapeHtml(data.subscribedAt.toISOString())}</p>
      <p><a href="${escapeHtml(subscribersUrl)}">View all subscribers</a></p>
    `,
  });
}

export async function sendBookingAdminEmail(data: {
  bookingId: number;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tourName: string;
  chosenDate: string;
  adults: number;
  children: number;
}) {
  if (!env.ADMIN_EMAIL) return;
  await sendEmail({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Booking Inquiry (#${data.bookingId}) - ${data.fullName}`,
    html: `
      <h1>New Booking Inquiry</h1>
      <p><strong>Booking ID:</strong> #${data.bookingId}</p>
      <p><strong>Tour:</strong> ${data.tourName}</p>
      <p><strong>Date:</strong> ${data.chosenDate}</p>
      <p><strong>Travelers:</strong> ${data.adults} adults, ${data.children} children</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
    `
  });
}

export async function sendBookingCustomerEmail(data: {
  email: string;
  fullName: string;
  tourName: string;
  bookingId: number;
  chosenDate: string;
  adults: number;
  children: number;
}) {
  await sendEmail({
    to: data.email,
    subject: "We received your booking inquiry - Ethio Origins Tour",
    html: `
      <h1>Booking Request Received</h1>
      <p>Dear ${data.fullName},</p>
      <p>Thank you for choosing Ethio Origins Tour. We received your booking inquiry for <strong>${data.tourName}</strong>.</p>
      <p><strong>Booking ID:</strong> #${data.bookingId}</p>
      <p><strong>Travel Date:</strong> ${data.chosenDate}</p>
      <p><strong>Travelers:</strong> ${data.adults} adults, ${data.children} children</p>
      <p>Our team will contact you shortly.</p>
    `
  });
}

export async function sendBookingStatusEmail(data: {
  email: string;
  fullName: string;
  tourName: string;
  bookingId: number;
  chosenDate: string;
  status: string;
}) {
  await sendEmail({
    to: data.email,
    subject: `Your Booking Status is now ${data.status} - Ethio Origins Tour`,
    html: `
      <h1>Booking Update</h1>
      <p>Dear ${data.fullName},</p>
      <p>Your booking for <strong>${data.tourName}</strong> has been updated.</p>
      <p><strong>Booking ID:</strong> #${data.bookingId}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Travel Date:</strong> ${data.chosenDate}</p>
    `
  });
}
