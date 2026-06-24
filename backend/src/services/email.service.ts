import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = env.EMAIL_ENABLED
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
    })
  : null;

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail(input: SendEmailInput) {
  if (!env.EMAIL_ENABLED || !transporter) {
    console.info("[email disabled]", { to: input.to, subject: input.subject });
    return;
  }

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.html.replace(/<[^>]+>/g, " "),
    replyTo: input.replyTo
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

