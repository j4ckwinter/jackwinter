import { describe, expect, it } from "vitest";
import { describeContributionDay, formatShortDate, formatDateRange } from "../src/format";
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

describe("formatShortDate", () => {
  it("leaves out the year for this year's commits", () => {
    expect(formatShortDate("2026-11-14T15:11:16Z", "2026-11-16")).toBe("14 Nov");
  });

  it("includes the year for older commits", () => {
    expect(formatShortDate("2025-12-31T23:59:00Z", "2026-01-02")).toBe("31 Dec 2025");
  });
});

describe("formatDateRange", () => {
  it("ends an open range with now", () => {
    expect(formatDateRange({ start: "Jun 2025" })).toBe("Jun 2025 – now");
  });

  it("shows both ends of a closed range", () => {
    expect(formatDateRange({ start: "Jun 2023", end: "Jun 2025" })).toBe("Jun 2023 – Jun 2025");
  });
});
