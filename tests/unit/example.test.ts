import { describe, expect, it } from "vitest";

import { clampScore } from "@/lib/example";

describe("clampScore", () => {
  it("returns the value when it is within range", () => {
    expect(clampScore(15, 0, 30)).toBe(15);
  });

  it("clamps values below min and above max", () => {
    expect(clampScore(-5, 0, 30)).toBe(0);
    expect(clampScore(42, 0, 30)).toBe(30);
  });

  it("throws when min exceeds max", () => {
    expect(() => clampScore(1, 10, 0)).toThrow(RangeError);
  });
});
