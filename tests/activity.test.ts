import { describe, expect, it } from "vitest";
import { summariseActivity } from "../src/github/activity";

describe("summariseActivity", () => {
  it("covers the twelve months ending in the current month", () => {
    const { months } = summariseActivity({ total: 0, days: [] }, "2026-11-16");
    expect(months.map((month) => month.label)).toEqual(["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]);
    expect(months[0].month).toBe("2025-12");
  });

  it("adds up contributions per month and leaves days before the window out of the bars", () => {
    const activity = summariseActivity(
      {
        total: 60,
        days: [
          { date: "2025-11-30", count: 50 },
          { date: "2025-12-01", count: 2 },
          { date: "2026-11-01", count: 3 },
          { date: "2026-11-15", count: 5 },
        ],
      },
      "2026-11-16",
    );
    expect(activity.months.at(-1)).toMatchObject({ total: 8, share: 1 });
    expect(activity.months[0]).toMatchObject({ total: 2, share: 0.25 });
  });

  it("keeps GitHub's yearly total as the headline", () => {
    const activity = summariseActivity({ total: 60, days: [{ date: "2025-11-30", count: 50 }] }, "2026-11-16");
    expect(activity.total).toBe(60);
  });

  it("gives every month a share of zero when there is no activity", () => {
    const activity = summariseActivity({ total: 0, days: [] }, "2026-01-05");
    expect(activity.months.every((month) => month.share === 0)).toBe(true);
    expect(activity.months[0].month).toBe("2025-02");
  });
});
