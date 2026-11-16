import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Projects from "../src/components/Projects.astro";
import Experience from "../src/components/Experience.astro";
import Activity from "../src/components/Activity.astro";
import { summariseActivity } from "../src/github/activity";

const container = await AstroContainer.create();

describe("projects", () => {
  const projects = [
    { name: "starred", description: "has stars", repo: "me/starred", href: "https://example.com/starred" },
    { name: "quiet", description: "has none", repo: "me/quiet", href: "https://example.com/quiet" },
  ];

  it("shows star counts only for projects that have some", async () => {
    const html = await container.renderToString(Projects, {
      props: { projects, stars: new Map([["me/starred", 1076], ["me/quiet", 0]]) },
    });
    expect(html).toContain("★ 1,076");
    expect(html.match(/★/g)).toHaveLength(1);
    expect(html).toContain('href="https://example.com/quiet"');
  });
});

describe("experience", () => {
  it("keeps each role's highlights behind see more", async () => {
    const html = await container.renderToString(Experience, {
      props: {
        roles: [{ company: "Acme", title: "Engineer", location: "Remote", dates: "2024 – now", context: "Widgets.", highlights: ["Shipped it."] }],
      },
    });
    expect(html).toMatch(/<details[^>]*>[\s\S]*see more[\s\S]*Shipped it\.[\s\S]*<\/details>/);
  });
});

describe("activity", () => {
  it("states the yearly total in words", async () => {
    const activity = summariseActivity({ total: 5447, days: [{ date: "2026-10-01", count: 12 }] }, "2026-11-16");
    const html = await container.renderToString(Activity, { props: { activity, profileUrl: "https://github.com/me" } });
    expect(html).toContain("5,447 contributions in the last year");
    expect(html).toContain('href="https://github.com/me"');
  });

  it("lists each month's count for screen readers", async () => {
    const activity = summariseActivity({ total: 12, days: [{ date: "2026-10-01", count: 12 }] }, "2026-11-16");
    const html = await container.renderToString(Activity, { props: { activity, profileUrl: "https://github.com/me" } });
    expect(html).toMatch(/<ul class="sr-only">[\s\S]*<time datetime="2026-10">Oct<\/time>: 12/);
  });
});
