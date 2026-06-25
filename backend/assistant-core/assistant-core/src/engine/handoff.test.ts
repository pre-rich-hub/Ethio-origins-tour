import { describe, it, expect } from "vitest";
import { containsHandoffPhrase } from "./handoff.js";

describe("containsHandoffPhrase", () => {
  it("detects phrase in reply", () => {
    expect(
      containsHandoffPhrase(
        "let me connect you with our team right away",
        "let me connect you with our team"
      )
    ).toBe(true);
  });

  it("returns false when phrase absent", () => {
    expect(
      containsHandoffPhrase("Here are our beach packages.", "let me connect you with our team")
    ).toBe(false);
  });

  it("is case insensitive", () => {
    expect(
      containsHandoffPhrase(
        "LET ME CONNECT YOU WITH OUR TEAM",
        "let me connect you with our team"
      )
    ).toBe(true);
  });

  it("returns false for empty phrase", () => {
    expect(containsHandoffPhrase("hello", "")).toBe(false);
  });
});
