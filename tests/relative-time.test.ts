// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { describeAge, enhanceRelativeTimes } from "../src/scripts/relative-time";

const now = new Date("2026-11-16T22:00:00Z");

describe("describeAge", () => {
  it("speaks in days, then weeks, then months", () => {
    const ages = ["2026-11-16T09:00:00Z", "2026-11-15T09:00:00Z", "2026-11-12T09:00:00Z", "2026-10-30T09:00:00Z", "2026-08-01T09:00:00Z"];
    expect(ages.map((age) => describeAge(age, now))).toEqual(["today", "yesterday", "4 days ago", "2 weeks ago", "3 months ago"]);
  });

  it("treats a commit from slightly in the future as today", () => {
    expect(describeAge("2026-11-16T22:05:00Z", now)).toBe("today");
  });
});

describe("enhanceRelativeTimes", () => {
  it("shows the age and keeps the exact date on hover", () => {
    document.body.innerHTML = `<time data-relative datetime="2026-11-14T10:00:00Z">14 Nov</time>`;
    enhanceRelativeTimes(document, () => now);
    const time = document.querySelector("time")!;
    expect(time.textContent).toBe("2 days ago");
    expect(time.title).toBe("14 Nov");
  });
});
