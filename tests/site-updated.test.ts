import { describe, expect, it } from "vitest";
import { lastSourceChange, SITE_SOURCES } from "../src/site-updated";

describe("lastSourceChange", () => {
  it("asks git for the date and commit of the last change to the site", () => {
    let asked: string[] = [];
    const sha = "a".repeat(40);
    const change = lastSourceChange((args) => ((asked = args), `2026-11-12 ${sha}\n`));
    expect(change).toEqual({ date: "2026-11-12", commit: sha });
    expect(asked.slice(-SITE_SOURCES.length - 1)).toEqual(["--", ...SITE_SOURCES]);
  });

  it("gives nothing when git is missing or has no history", () => {
    expect(lastSourceChange(() => { throw new Error("not a git repository"); })).toBeUndefined();
    expect(lastSourceChange(() => "")).toBeUndefined();
    expect(lastSourceChange(() => "2026-11-12")).toBeUndefined();
  });
});
