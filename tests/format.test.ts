import { describe, expect, it } from "vitest";
import { describeContributionDay, formatRoleDates } from "../src/format";
import { day } from "./fixtures";

describe("describeContributionDay", () => {
  it("says so when there were no contributions", () => {
    expect(describeContributionDay(day("2025-11-16"))).toBe("No contributions on 16 November 2025");
  });

  it("uses the singular for one contribution", () => {
    expect(describeContributionDay(day("2026-01-01", 1, 1))).toBe("1 contribution on 1 January 2026");
  });

  it("formats larger counts with separators", () => {
    expect(describeContributionDay(day("2026-02-28", 1076, 4))).toBe("1,076 contributions on 28 February 2026");
  });
});

describe("formatRoleDates", () => {
  it("ends a current role with now", () => {
    expect(formatRoleDates({ start: "Jun 2025" })).toBe("Jun 2025 – now");
  });

  it("shows both ends of a past role", () => {
    expect(formatRoleDates({ start: "Jun 2023", end: "Jun 2025" })).toBe("Jun 2023 – Jun 2025");
  });
});
