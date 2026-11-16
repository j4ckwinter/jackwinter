import { describe, expect, it } from "vitest";
import { hiddenLabelIndexes } from "../src/scripts/contribution-scroll";

describe("hiddenLabelIndexes", () => {
  it("hides month labels whose start has scrolled out of view", () => {
    expect(hiddenLabelIndexes([24, undefined, 72, 120], 60)).toEqual([0]);
  });

  it("hides nothing at the start", () => {
    expect(hiddenLabelIndexes([24, 72], 0)).toEqual([]);
  });

  it("ignores empty label slots", () => {
    expect(hiddenLabelIndexes([undefined, undefined], 500)).toEqual([]);
  });
});
