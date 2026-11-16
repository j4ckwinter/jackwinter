import { describe, expect, it } from "vitest";
import { buildContributionGrid } from "../src/github/activity";
import { week } from "./fixtures";

describe("buildContributionGrid", () => {
  it("labels the week in which each month begins", () => {
    const grid = buildContributionGrid({
      total: 0,
      weeks: [week("2025-11-16"), week("2025-11-23"), week("2025-11-30"), week("2025-12-07")],
    });
    expect(grid.monthLabels).toEqual(["", "", "Dec", ""]);
  });

  it("leaves a week unlabelled when its month began the week before", () => {
    const grid = buildContributionGrid({ total: 0, weeks: [week("2025-12-02", 6)] });
    expect(grid.monthLabels).toEqual([""]);
  });

  it("labels a new year's January", () => {
    const grid = buildContributionGrid({ total: 0, weeks: [week("2025-12-28")] });
    expect(grid.monthLabels).toEqual(["Jan"]);
  });

  it("keeps GitHub's total and weeks as they are", () => {
    const weeks = [week("2026-11-15", 2)];
    expect(buildContributionGrid({ total: 2115, weeks })).toMatchObject({ total: 2115, weeks });
  });
});
