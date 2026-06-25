import { describe, it, expect, vi, beforeEach } from "vitest";

const mockEnv: Record<string, any> = {
  EMAIL_ENABLED: false,
  SENDGRID_API_KEY: "",
  SENDGRID_FROM_EMAIL: "",
  SMTP_HOST: "",
  SMTP_PORT: 587,
  SMTP_USER: "",
  SMTP_PASS: "",
  SMTP_FROM: "",
  ADMIN_EMAIL: "admin@test.com",
};

vi.mock("../../src/config/env.js", () => ({
  get env() {
    return mockEnv;
  },
}));

vi.mock("../../src/config/pino.js", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../src/services/queue.service.js", () => ({
  addEmailJob: vi.fn(),
}));

import { sendMail, sendBookingAdminEmail } from "../../src/services/email.service.js";
import { addEmailJob } from "../../src/services/queue.service.js";

describe("sendMail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs and returns early when email is disabled", async () => {
    mockEnv.EMAIL_ENABLED = false;
    await sendMail({ to: "test@test.com", subject: "Test", html: "<p>Hi</p>" });
    expect(addEmailJob).not.toHaveBeenCalled();
  });
});

describe("sendBookingAdminEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEnv.ADMIN_EMAIL = "admin@test.com";
    mockEnv.EMAIL_ENABLED = true;
  });

  it("queues admin notification email", async () => {
    await sendBookingAdminEmail({
      bookingId: 1,
      fullName: "John",
      email: "john@test.com",
      phone: "123",
      country: "Ethiopia",
      tourName: "Historic Tour",
      chosenDate: "2024-06-01",
      adults: 2,
      children: 1,
    });
    expect(addEmailJob).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "admin@test.com",
        subject: expect.stringContaining("New Booking Inquiry"),
      })
    );
  });

  it("does nothing when ADMIN_EMAIL is not set", async () => {
    mockEnv.ADMIN_EMAIL = "";
    await sendBookingAdminEmail({
      bookingId: 1,
      fullName: "John",
      email: "john@test.com",
      phone: "123",
      country: "Ethiopia",
      tourName: "Historic Tour",
      chosenDate: "2024-06-01",
      adults: 2,
      children: 1,
    });
    expect(addEmailJob).not.toHaveBeenCalled();
  });
});
