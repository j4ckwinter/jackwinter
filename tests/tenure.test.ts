import { describe, expect, it } from "vitest";
import { machineDate, monthsSpanned, wholeYearsAcross } from "../src/tenure";
import { formatTenure } from "../src/format";

describe("monthsSpanned", () => {
  it("counts both the first and last month, as CVs and LinkedIn do", () => {
    expect(monthsSpanned({ start: "Jun 2023", end: "Jun 2025" }, "2026-11-16")).toBe(25);
  });

  it("runs a current role up to the build month", () => {
    expect(monthsSpanned({ start: "Jun 2025" }, "2026-11-16")).toBe(18);
  });

  it("refuses a month it can't read rather than guessing", () => {
    expect(() => monthsSpanned({ start: "June 2025" }, "2026-11-16")).toThrow('expected a month like "Jun 2025", got "June 2025"');
  });
});

describe("wholeYearsAcross", () => {
  it("adds up the roles and rounds down, so gaps between jobs don't count", () => {
    const roles = [{ start: "Jun 2025" }, { start: "Jun 2023", end: "Jun 2025" }, { start: "Jul 2017", end: "Aug 2022" }];
    expect(wholeYearsAcross(roles, "2026-11-16")).toBe(8);
  });
});

describe("formatTenure", () => {
  it("writes years and months the short way", () => {
    expect([1, 11, 12, 18, 25, 24].map(formatTenure)).toEqual(["1 mo", "11 mos", "1 yr", "1 yr 6 mos", "2 yrs 1 mo", "2 yrs"]);
  });
});

describe("machineDate", () => {
  it("writes a month label or a year the way a time element expects", () => {
    expect(["Jan 2024", "Dec 2019", "2013"].map(machineDate)).toEqual(["2024-01", "2019-12", "2013"]);
  });

  it("refuses a label it can't read", () => {
    expect(() => machineDate("June 2025")).toThrow('expected a month like "Jun 2025"');
  });
});
