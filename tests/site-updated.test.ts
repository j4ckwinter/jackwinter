import { describe, expect, it } from "vitest";
import { lastSourceChange, SITE_SOURCES } from "../src/site-updated";

describe("lastSourceChange", () => {
  it("asks git for the date of the last commit that touched the site", () => {
    let asked: string[] = [];
    const date = lastSourceChange((args) => ((asked = args), "2026-11-12\n"));
    expect(date).toBe("2026-11-12");
    expect(asked.slice(-SITE_SOURCES.length - 1)).toEqual(["--", ...SITE_SOURCES]);
  });

  it("gives nothing when git is missing or has no history", () => {
    expect(lastSourceChange(() => { throw new Error("not a git repository"); })).toBeUndefined();
    expect(lastSourceChange(() => "")).toBeUndefined();
  });
});
