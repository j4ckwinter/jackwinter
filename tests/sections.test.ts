import { describe, expect, it } from "vitest";
import Header from "../src/components/Header.astro";
import Projects from "../src/components/Projects.astro";
import Experience from "../src/components/Experience.astro";
import Skills from "../src/components/Skills.astro";
import Activity from "../src/components/Activity.astro";
import { buildContributionGrid } from "../src/github/activity";
import { day } from "./fixtures";
import { render } from "./render";

describe("header", () => {
  it("shows each link as a labelled icon", async () => {
    const page = await render(Header, { name: "Jack", title: "Engineer", links: [{ label: "GitHub", href: "https://github.com/me", icon: "github" }] });
    const link = page.querySelector('a[aria-label="GitHub"]');
    expect(link?.getAttribute("href")).toBe("https://github.com/me");
    expect(link?.querySelector("svg")).not.toBeNull();
  });
});

describe("projects", () => {
  const projects = [
    { name: "starred", icon: "stack", description: "has stars", repo: "me/starred", href: "https://example.com/starred" },
    { name: "quiet", icon: "brain", description: "has none", repo: "me/quiet", href: "https://example.com/quiet" },
  ];

  it("shows star counts only for projects that have some", async () => {
    const page = await render(Projects, { projects, stars: new Map([["me/starred", 1076], ["me/quiet", 0]]) });
    const [starred, quiet] = [...page.querySelectorAll("a")];
    expect(starred.textContent).toContain("GitHub stars: 1,076");
    expect(quiet.textContent).not.toContain("GitHub stars");
    expect(quiet.getAttribute("href")).toBe("https://example.com/quiet");
  });
});

describe("experience", () => {
  const role = { company: "Acme Inc", icon: "bank", title: "Engineer", location: "Remote", start: "Jan 2024", context: "Widgets.", highlights: ["Shipped it."] };

  it("starts collapsed behind a see more button for the section", async () => {
    const page = await render(Experience, { roles: [role] });
    const button = page.querySelector('button[aria-controls="experience-content"]');
    expect(button?.getAttribute("aria-expanded")).toBe("false");
    expect(button?.textContent).toContain("experience");
    expect(page.getElementById("experience-content")).not.toBeNull();
  });

  it("gives each role a toggle that controls that role's details", async () => {
    const page = await render(Experience, { roles: [role] });
    const button = page.querySelector('button[aria-label="Details for Acme Inc"]');
    expect(button?.getAttribute("aria-expanded")).toBe("false");
    const details = page.getElementById(button?.getAttribute("aria-controls") ?? "");
    expect(details?.textContent).toContain("Shipped it.");
  });

  it("keeps roles at the same company apart", async () => {
    const page = await render(Experience, { roles: [role, { ...role, start: "Jan 2022", end: "Jan 2024", highlights: ["Joined."] }] });
    const targets = [...page.querySelectorAll('button[aria-label="Details for Acme Inc"]')].map((button) => button.getAttribute("aria-controls"));
    expect(new Set(targets).size).toBe(2);
  });

  it("shows a current role as running until now", async () => {
    const page = await render(Experience, { roles: [role] });
    expect(page.body.textContent).toContain("Jan 2024 – now");
  });
});

describe("skills", () => {
  it("holds back tools beyond the first few until expanded", async () => {
    const page = await render(Skills, {
      groups: [{ name: "Languages", shownBeforeExpanding: 1, tools: [{ name: "TypeScript", icon: "typescript" }, { name: "Python", icon: "python" }] }],
      education: { qualification: "BSc", institution: "Uni", dates: "2013 – 2017" },
    });
    const [shown, held] = [...page.querySelectorAll("li")];
    expect(shown.textContent).toContain("TypeScript");
    expect(shown.classList.contains("hidden")).toBe(false);
    expect(held.textContent).toContain("Python");
    expect(held.classList.contains("hidden")).toBe(true);
    expect(page.querySelector('button[aria-controls="skills-content"]')).not.toBeNull();
  });
});

describe("activity", () => {
  const grid = buildContributionGrid({ total: 5447, weeks: [[day("2026-11-01", 3, 2), day("2026-11-02", 0, 0)]] });

  it("draws a tile per day, placed by week and weekday, with its count", async () => {
    const page = await render(Activity, { activity: grid, profileUrl: "https://github.com/me" });
    const tiles = [...page.querySelectorAll("ol li")];
    expect(tiles.map((tile) => tile.getAttribute("aria-label"))).toEqual(["3 contributions on 1 November 2026", "No contributions on 2 November 2026"]);
    expect(tiles.map((tile) => tile.getAttribute("style"))).toEqual(["grid-column: 1; grid-row: 1", "grid-column: 1; grid-row: 2"]);
  });

  it("labels months and links the yearly total to the GitHub profile", async () => {
    const page = await render(Activity, { activity: grid, profileUrl: "https://github.com/me" });
    expect(page.body.textContent).toContain("Nov");
    expect(page.querySelector("ol")?.getAttribute("aria-label")).toBe("5,447 GitHub contributions in the last year");
    const total = page.querySelector('a[href="https://github.com/me"]');
    expect(total?.textContent?.trim()).toBe("5,447 contributions in the last year");
  });
});
