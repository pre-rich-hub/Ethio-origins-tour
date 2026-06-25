import { describe, it, expect } from "vitest";
import { parseAssistantPayload } from "./leadExtractor.js";
import { LeadField } from "../config/types.js";

const leadFields: LeadField[] = [
  { key: "name", label: "Full name", required: true },
  { key: "email", label: "Email", required: true },
  { key: "tripDate", label: "Trip date", required: false },
];

describe("parseAssistantPayload", () => {
  it("parses valid JSON with lead", () => {
    const raw = JSON.stringify({
      reply: "Here is your summary.",
      lead: { name: "Jordan", email: "jordan@example.com" },
      shouldHandoff: false,
    });
    const result = parseAssistantPayload(raw, leadFields);
    expect(result).toEqual({
      reply: "Here is your summary.",
      lead: { name: "Jordan", email: "jordan@example.com" },
      shouldHandoff: false,
    });
  });

  it("parses valid JSON with null lead", () => {
    const raw = JSON.stringify({
      reply: "Got it.",
      lead: null,
      shouldHandoff: false,
    });
    const result = parseAssistantPayload(raw, leadFields);
    expect(result).toEqual({
      reply: "Got it.",
      lead: null,
      shouldHandoff: false,
    });
  });

  it("returns null on malformed JSON", () => {
    expect(parseAssistantPayload("not json", leadFields)).toBeNull();
  });

  it("returns null when required lead field is missing", () => {
    const raw = JSON.stringify({
      reply: "Updated.",
      lead: { name: "Jordan" },
      shouldHandoff: false,
    });
    expect(parseAssistantPayload(raw, leadFields)).toBeNull();
  });

  it("returns null when lead contains unknown keys", () => {
    const raw = JSON.stringify({
      reply: "Updated.",
      lead: { name: "Jordan", email: "j@example.com", phone: "555-1234" },
      shouldHandoff: false,
    });
    expect(parseAssistantPayload(raw, leadFields)).toBeNull();
  });

  it("returns null when payload has extra top-level keys", () => {
    const raw = JSON.stringify({
      reply: "Hi",
      lead: null,
      shouldHandoff: false,
      extra: "bad",
    });
    expect(parseAssistantPayload(raw, leadFields)).toBeNull();
  });

  it("defaults shouldHandoff to false when omitted", () => {
    const raw = JSON.stringify({ reply: "Hello", lead: null });
    const result = parseAssistantPayload(raw, leadFields);
    expect(result?.shouldHandoff).toBe(false);
  });
});
