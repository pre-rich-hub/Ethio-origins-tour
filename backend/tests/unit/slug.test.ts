import { describe, it, expect } from "vitest";
import { slugify } from "../../src/utils/slug.js";

describe("slugify", () => {
  it("converts to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("replaces & with and", () => {
    expect(slugify("Rock & Roll Tour")).toBe("rock-and-roll-tour");
  });

  it("replaces spaces and special chars with hyphens", () => {
    expect(slugify("Ethiopia: The Land of Origins!")).toBe("ethiopia-the-land-of-origins");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --hello--  ")).toBe("hello");
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("foo   bar   baz")).toBe("foo-bar-baz");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles single word", () => {
    expect(slugify("Ethiopia")).toBe("ethiopia");
  });
});
