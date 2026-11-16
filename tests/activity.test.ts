import { describe, expect, it } from "vitest";
import { buildContributionGrid, contributionHighlights } from "../src/github/activity";
import { day, week } from "./fixtures";

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

describe("contributionHighlights", () => {
  it("finds the longest run of days with contributions, across weeks", () => {
    const weeks = [
      [day("2026-11-01", 1, 1), day("2026-11-02", 0, 0), day("2026-11-03", 2, 1)],
      [day("2026-11-04", 5, 2), day("2026-11-05", 1, 1), day("2026-11-06", 0, 0)],
    ];
    expect(contributionHighlights({ total: 9, weeks }).longestStreak).toBe(3);
  });

  it("picks the earliest of the busiest days", () => {
    const weeks = [[day("2026-04-14", 106, 4), day("2026-04-15", 106, 4), day("2026-04-16", 3, 1)]];
    expect(contributionHighlights({ total: 215, weeks }).busiestDay?.date).toBe("2026-04-14");
  });

  it("has no busiest day in a quiet year", () => {
    expect(contributionHighlights({ total: 0, weeks: [[day("2026-04-14")]] })).toEqual({ longestStreak: 0, busiestDay: undefined });
  });
});
