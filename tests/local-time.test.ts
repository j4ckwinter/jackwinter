// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { enhanceLocalTime, formatLocalTime } from "../src/scripts/local-time";

describe("formatLocalTime", () => {
  it("shows a 24-hour clock in the given time zone", () => {
    expect(formatLocalTime(new Date("2026-11-16T22:18:00Z"), "Europe/London")).toBe("22:18");
    expect(formatLocalTime(new Date("2026-07-01T08:05:00Z"), "Europe/London")).toBe("09:05");
  });
});

describe("enhanceLocalTime", () => {
  afterEach(() => vi.useRealTimers());

  it("fills in the clock and keeps it current", () => {
    vi.useFakeTimers();
    document.body.innerHTML = `<time data-local-time data-time-zone="Europe/London"></time>`;
    let now = new Date("2026-11-16T22:18:00Z");
    enhanceLocalTime(document, () => now);
    const clock = document.querySelector<HTMLElement>("time")!;
    expect(clock.textContent).toBe("22:18");
    expect(clock.hasAttribute("data-ready")).toBe(true);
    now = new Date("2026-11-16T22:19:00Z");
    vi.advanceTimersByTime(30_000);
    expect(clock.textContent).toBe("22:19");
  });
});
