import { describe, it, expect } from "vitest";
import {
  parseJsonArray,
  parseOptionalJsonArrayString,
  toNumber,
  toBoolean,
} from "../../src/utils/parsers.js";

describe("parseJsonArray", () => {
  it("parses valid JSON array string", () => {
    expect(parseJsonArray('[{"day":1}]')).toEqual([{ day: 1 }]);
  });

  it("returns [] for non-array JSON", () => {
    expect(parseJsonArray('{"key":"val"}')).toEqual([]);
  });

  it("returns [] for invalid JSON", () => {
    expect(parseJsonArray("not-json")).toEqual([]);
  });

  it("returns [] for null", () => {
    expect(parseJsonArray(null)).toEqual([]);
  });

  it("returns [] for non-string", () => {
    expect(parseJsonArray(123)).toEqual([]);
  });
});

describe("parseOptionalJsonArrayString", () => {
  it("returns valid JSON array as-is", () => {
    const result = parseOptionalJsonArrayString('[{"day":1}]');
    expect(JSON.parse(result)).toEqual([{ day: 1 }]);
  });

  it("converts comma-separated string to JSON array", () => {
    const result = parseOptionalJsonArrayString("a, b, c");
    expect(JSON.parse(result)).toEqual(["a", "b", "c"]);
  });

  it("converts newline-separated string to JSON array", () => {
    const result = parseOptionalJsonArrayString("a\nb\nc");
    expect(JSON.parse(result)).toEqual(["a", "b", "c"]);
  });

  it("returns [] for empty string", () => {
    expect(parseOptionalJsonArrayString("")).toBe("[]");
  });

  it("returns [] for non-string", () => {
    expect(parseOptionalJsonArrayString(null)).toBe("[]");
  });
});

describe("toNumber", () => {
  it("converts string to number", () => {
    expect(toNumber("42")).toBe(42);
  });

  it("returns null for null", () => {
    expect(toNumber(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(toNumber(undefined)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(toNumber("")).toBeNull();
  });

  it("returns null for non-numeric string", () => {
    expect(toNumber("abc")).toBeNull();
  });

  it("returns number as-is", () => {
    expect(toNumber(42)).toBe(42);
  });

  it("handles decimal input", () => {
    expect(toNumber("3.14")).toBe(3.14);
  });
});

describe("toBoolean", () => {
  it("returns true for boolean true", () => {
    expect(toBoolean(true)).toBe(true);
  });

  it("returns true for string 'true'", () => {
    expect(toBoolean("true")).toBe(true);
  });

  it("returns true for string '1'", () => {
    expect(toBoolean("1")).toBe(true);
  });

  it("returns true for number 1", () => {
    expect(toBoolean(1)).toBe(true);
  });

  it("returns false for other values", () => {
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean("")).toBe(false);
    expect(toBoolean(0)).toBe(false);
    expect(toBoolean(null)).toBe(false);
    expect(toBoolean(undefined)).toBe(false);
  });
});
