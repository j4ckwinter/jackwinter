import { describe, expect, it } from "vitest";
import Header from "../src/components/Header.astro";
import Projects from "../src/components/Projects.astro";
import Experience from "../src/components/Experience.astro";
import Skills from "../src/components/Skills.astro";
import Education from "../src/components/Education.astro";
import Bio from "../src/components/Bio.astro";
import Footer from "../src/components/Footer.astro";
import { qrSvg } from "../src/print/qr";
import CaseStudyBody from "../src/components/CaseStudyBody.astro";
import { kto } from "../src/content/case-studies/kto";
import Activity from "../src/components/Activity.astro";
import { buildContributionGrid } from "../src/github/activity";
import { day } from "./fixtures";
import { render } from "./render";

describe("header", () => {
  const props = {
    name: "Jack",
    title: "Engineer",
    links: [
      { label: "GitHub", href: "https://github.com/me", icon: "github" },
      { label: "Email", href: "mailto:me@example.com", icon: "mail" },
      { label: "CV", href: "/cv.pdf", icon: "cv" },
    ],
    email: "me@example.com",
    hello: "mailto:me@example.com?subject=hi",
  };

  it("opens the email icon with a subject and copies the address, like say hello", async () => {
    const page = await render(Header, props);
    const email = page.querySelector('a[aria-label="Email"]');
    expect(email?.getAttribute("href")).toBe("mailto:me@example.com?subject=hi");
    expect(email?.getAttribute("data-copy")).toBe("me@example.com");
    expect(page.querySelector('a[aria-label="GitHub"]')?.hasAttribute("data-copy")).toBe(false);
    expect(page.querySelector("nav [data-copy-status]")).not.toBeNull();
  });

  it("adds a QR code to the site for print only", async () => {
    const page = await render(Header, { ...props, qr: await qrSvg("https://example.com/") });
    const code = page.querySelector('[role="img"][aria-label^="QR code"]');
    expect(code?.classList.contains("hidden")).toBe(true);
    expect(code?.classList.contains("print:block")).toBe(true);
    expect(code?.querySelector("svg")).not.toBeNull();
  });

  it("shows the title under the name", async () => {
    const page = await render(Header, props);
    expect(page.querySelector("h1 + p")?.textContent?.trim()).toBe("Engineer");
  });

  it("spells out the contact links for print, leaving out on-site files", async () => {
    const page = await render(Header, props);
    const printed = [...page.querySelectorAll("p")].map((line) => line.textContent ?? "").find((text) => text.includes("github.com"));
    expect(printed).toBe("github.com/me · me@example.com · example.com");
  });

  it("shows each link as a labelled icon", async () => {
    const page = await render(Header, props);
    const link = page.querySelector('a[aria-label="GitHub"]');
    expect(link?.getAttribute("href")).toBe("https://github.com/me");
    expect(link?.querySelector("svg")).not.toBeNull();
  });
});

describe("bio", () => {
  it("links the words written as links and offers to copy the email", async () => {
    const page = await render(Bio, { paragraphs: [["i build ", { text: "tools", href: "https://example.com/tools" }, "."]], email: "me@example.com", hello: "mailto:me@example.com?subject=hi", cv: { href: "/cv.pdf", size: "91 KB" } });
    expect(page.querySelector('a[href="https://example.com/tools"]')?.textContent?.trim()).toBe("tools");
    expect(page.querySelector('a[href="mailto:me@example.com?subject=hi"]')?.getAttribute("data-copy")).toBe("me@example.com");
  });

  it("offers the CV as a download and says how big it is", async () => {
    const page = await render(Bio, { paragraphs: [], email: "me@example.com", hello: "mailto:me@example.com", cv: { href: "/cv.pdf", size: "91 KB" } });
    const cv = page.querySelector('a[href="/cv.pdf"]');
    expect(cv?.hasAttribute("download")).toBe(true);
    expect(cv?.textContent?.trim()).toBe("download cvPDF · 91 KB");
  });
});

describe("footer", () => {
  it("says when the site last changed", async () => {
    const page = await render(Footer, { updated: "2026-11-12", today: "2026-11-17" });
    expect(page.querySelector("time")?.textContent).toBe("12 Nov");
    expect(page.querySelector("time")?.getAttribute("datetime")).toBe("2026-11-12");
  });

  it("links the date to the change behind it when it is known", async () => {
    const linked = await render(Footer, { updated: "2026-11-12", today: "2026-11-17", change: "https://github.com/me/site/commit/abc" });
    expect(linked.querySelector("time")?.closest("a")?.getAttribute("href")).toBe("https://github.com/me/site/commit/abc");
    const plain = await render(Footer, { updated: "2026-11-12", today: "2026-11-17" });
    expect(plain.querySelector("time")?.closest("a")).toBeNull();
  });

  it("keeps the comma on the same line as the markdown link", async () => {
    const page = await render(Footer, { updated: "2026-11-12", today: "2026-11-17" });
    const markdown = [...page.querySelectorAll("a")].find((a) => a.textContent === "plain markdown");
    expect(markdown?.closest(".whitespace-nowrap")?.textContent).toBe("plain markdown,");
  });
});

describe("projects", () => {
  const projects = [
    { name: "starred", icon: "stack", description: "has stars", repo: "me/starred", href: "https://example.com/starred" },
    { name: "quiet", icon: "brain", description: "has none", repo: "me/quiet", href: "https://example.com/quiet" },
  ];

  it("marks each project as a link that leaves the site, revealed on hover", async () => {
    const page = await render(Projects, { projects, stars: new Map(), versions: new Map() });
    for (const row of page.querySelectorAll("li a")) {
      const arrow = row.querySelector(".min-w-0 svg");
      expect(arrow?.getAttribute("aria-hidden")).toBe("true");
      expect(arrow?.className).toContain("group-hover/project:opacity-100");
    }
  });

  it("shows star counts only for projects that have some", async () => {
    const page = await render(Projects, { projects, stars: new Map([["me/starred", 1076], ["me/quiet", 0]]), versions: new Map() });
    const [starred, quiet] = [...page.querySelectorAll("li a")];
    expect(starred.textContent).toContain("GitHub stars: 1,076");
    expect(quiet.textContent).not.toContain("GitHub stars");
    expect(quiet.getAttribute("href")).toBe("https://example.com/quiet");
  });

  it("lists the most starred projects first and keeps the given order otherwise", async () => {
    const more = [...projects, { name: "also quiet", icon: "dog", description: "none either", repo: "me/also-quiet", href: "https://example.com/also" }];
    const page = await render(Projects, { projects: [more[1], more[0], more[2]], stars: new Map([["me/starred", 5]]), versions: new Map() });
    const names = [...page.querySelectorAll("li a")].map((link) => link.querySelector("span span")?.textContent?.trim());
    expect(names).toEqual(["starred", "quiet", "also quiet"]);
  });

  it("shows the latest released version for projects that have one", async () => {
    const page = await render(Projects, { projects, stars: new Map(), versions: new Map([["me/quiet", "0.4.0"]]) });
    const [starred, quiet] = [...page.querySelectorAll("li a")];
    expect(quiet.textContent).toContain("Latest release: v0.4.0");
    expect(starred.textContent).not.toContain("Latest release");
  });
});

describe("section headings", () => {
  it("copy their full link when clicked, and say so beside the heading", async () => {
    const page = await render(Education, { qualifications: [] });
    const anchor = page.querySelector("h2 a");
    expect(anchor?.getAttribute("data-copy")).toBe("https://example.com/#education");
    expect(anchor?.getAttribute("data-copy-message")).toBe("link copied");
    expect(page.querySelector("h2")?.parentElement?.querySelector("[data-copy-status]")).not.toBeNull();
  });

  it("link to themselves so a section can be shared", async () => {
    const page = await render(Education, { qualifications: [] });
    expect(page.querySelector("h2")?.id).toBe("education");
    expect(page.querySelector("h2 a")?.getAttribute("href")).toBe("#education");
  });
});

describe("education", () => {
  it("shows each qualification with its institution and years", async () => {
    const page = await render(Education, {
      qualifications: [{ qualification: "BSc Computer Science", institution: "Uni", icon: "school", start: "2013", end: "2017" }],
    });
    expect(page.querySelector("h2")?.textContent).toContain("Education");
    expect(page.body.textContent).toContain("BSc Computer Science");
    expect(page.body.textContent).toContain("Uni");
    expect(page.body.textContent).toContain("2013 – 2017");
    expect([...page.querySelectorAll("time")].map((time) => time.getAttribute("datetime"))).toEqual(["2013", "2017"]);
  });
});

describe("experience", () => {
  const role = { company: "Acme Inc", icon: "kto", title: "Engineer", location: "Remote", start: "Jan 2024", context: "Widgets.", highlights: ["Shipped it."] };

  it("starts collapsed behind a see more button for the section", async () => {
    const page = await render(Experience, { roles: [role], today: "2026-11-16" });
    const button = page.querySelector('button[aria-controls="experience-content"]');
    expect(button?.getAttribute("aria-expanded")).toBe("false");
    expect(button?.textContent).toContain("experience");
    expect(page.getElementById("experience-content")).not.toBeNull();
  });

  it("gives each role a toggle that controls that role's details", async () => {
    const page = await render(Experience, { roles: [role], today: "2026-11-16" });
    const button = page.querySelector('button[aria-label="Details for Acme Inc"]');
    expect(button?.getAttribute("aria-expanded")).toBe("false");
    const details = page.getElementById(button?.getAttribute("aria-controls") ?? "");
    expect(details?.textContent).toContain("Shipped it.");
  });

  it("runs a line from each role's logo down beside its details", async () => {
    const page = await render(Experience, { roles: [role], today: "2026-11-16" });
    const button = page.querySelector('button[aria-label="Details for Acme Inc"]');
    const details = page.getElementById(button?.getAttribute("aria-controls") ?? "");
    expect(details?.querySelector('[data-thread][aria-hidden="true"]')).not.toBeNull();
  });

  it("keeps roles at the same company apart", async () => {
    const page = await render(Experience, { roles: [role, { ...role, start: "Jan 2022", end: "Jan 2024", highlights: ["Joined."] }], today: "2026-11-16" });
    const targets = [...page.querySelectorAll('button[aria-label="Details for Acme Inc"]')].map((button) => button.getAttribute("aria-controls"));
    expect(new Set(targets).size).toBe(2);
  });

  it("shows a current role as running until now, with how long that has been", async () => {
    const page = await render(Experience, { roles: [role], today: "2026-11-16" });
    expect(page.body.textContent).toContain("Jan 2024 – now");
    expect(page.body.textContent).toContain("2 yrs 11 mos");
  });

  it("marks role dates so machines can read them", async () => {
    const page = await render(Experience, { roles: [{ ...role, start: "Jun 2023", end: "Jun 2025" }], today: "2026-11-16" });
    const times = [...page.querySelectorAll("time")].map((time) => [time.getAttribute("datetime"), time.textContent]);
    expect(new Set(times.map(String))).toEqual(new Set([String(["2023-06", "Jun 2023"]), String(["2025-06", "Jun 2025"])]));
  });

  it("links a role to its case study when there is one", async () => {
    const page = await render(Experience, { roles: [{ ...role, company: "KTO Group" }], today: "2026-11-16" });
    const link = page.querySelector('a[href="/work/kto"]');
    expect(link?.textContent).toContain("read the case study");
    expect(link?.hasAttribute("data-astro-prefetch")).toBe(true);
    const without = await render(Experience, { roles: [role], today: "2026-11-16" });
    expect(without.querySelector('a[href^="/work/"]')).toBeNull();
  });

  it("lets each timeline entry open the list at that role", async () => {
    const page = await render(Experience, { roles: [role], today: "2026-11-16" });
    const stop = page.querySelector('button[aria-label="Open the details for Acme Inc"]');
    expect(stop?.getAttribute("aria-controls")).toBe("experience-content");
    const target = page.getElementById(stop?.getAttribute("data-reveal") ?? "");
    expect(target?.textContent).toContain("Engineer");
    expect(target?.getAttribute("tabindex")).toBe("-1");
  });
});

describe("skills", () => {
  it("holds back tools beyond the first few until expanded", async () => {
    const page = await render(Skills, {
      groups: [{ name: "Languages", shownBeforeExpanding: 1, tools: [{ name: "TypeScript", icon: "typescript" }, { name: "Python", icon: "python" }] }],
    });
    const [shown, held] = [...page.querySelectorAll("li")];
    expect(shown.textContent).toContain("TypeScript");
    expect(shown.classList.contains("hidden")).toBe(false);
    expect(held.textContent).toContain("Python");
    expect(held.classList.contains("hidden")).toBe(true);
    expect(page.querySelector('button[aria-controls="skills-content"]')).not.toBeNull();
  });

  const groups = [
    { name: "Languages", shownBeforeExpanding: 1, tools: [{ name: "TypeScript", icon: "typescript" }, { name: "Python", icon: "python" }, { name: "Swift", icon: "swift" }] },
    { name: "Testing", shownBeforeExpanding: 1, tools: [{ name: "Vitest", icon: "vitest" }, { name: "Jest", icon: "jest" }] },
  ];

  it("says how many tools see more will show", async () => {
    const page = await render(Skills, { groups });
    const button = page.querySelector('button[aria-controls="skills-content"]');
    expect(button?.textContent).toContain("See 3 more");
    expect(button?.querySelector(".xp\\:hidden")?.textContent).toBe("3 ");
  });

  it("offers see less at the end of the open list, returning to the heading", async () => {
    const page = await render(Skills, { groups });
    const closer = page.querySelector('#skills-content button[aria-controls="skills-content"]');
    expect(closer?.textContent).toContain("See less");
    expect(closer?.getAttribute("data-return")).toBe("skills");
    expect(page.getElementById("skills")?.tagName).toBe("H2");
  });
});

describe("activity", () => {
  const grid = buildContributionGrid({ total: 5447, weeks: [[day("2026-11-01", 3, 2), day("2026-11-02", 0, 0)]] });
  const base = { contributions: grid, commits: [], projects: [], profileUrl: "https://github.com/me", today: "2026-11-16" };

  it("draws a tile per day, placed by week and weekday, with its count", async () => {
    const page = await render(Activity, base);
    const tiles = [...page.querySelectorAll('[role="img"][aria-label$="contributions in the last year"] [data-day]')];
    expect(tiles.map((tile) => [tile.getAttribute("data-day"), tile.getAttribute("data-count")])).toEqual([["2026-11-01", "3"], ["2026-11-02", "0"]]);
    expect(tiles.map((tile) => tile.getAttribute("style"))).toEqual(["grid-column: 1; grid-row: 1", "grid-column: 1; grid-row: 2"]);
  });

  it("labels months and links the yearly total to the GitHub profile", async () => {
    const page = await render(Activity, base);
    expect(page.body.textContent).toContain("Nov");
    expect(page.querySelector('[role="img"]')?.getAttribute("aria-label")).toBe("5,447 GitHub contributions in the last year");
    const total = page.querySelector('a[href="https://github.com/me"]');
    expect(total?.textContent?.trim()).toBe("5,447 contributions in the last year");
  });

  it("lists the newest commit first under its project's name, linking to the commit", async () => {
    const page = await render(Activity, {
      ...base,
      contributions: undefined,
      commits: [
        { repo: "me/old", subject: "chore: tidy", date: "2026-11-01T10:00:00Z", url: "https://github.com/me/old/commit/1" },
        { repo: "me/new", subject: "feat: ship it", date: "2026-11-14T10:00:00Z", url: "https://github.com/me/new/commit/2" },
      ],
      projects: [{ name: "new thing", icon: "stack", description: "", repo: "me/new", href: "" }],
    });
    const links = [...page.querySelectorAll('ul[aria-label="Latest commits"] a')];
    expect(links.map((link) => [...link.children].map((part) => part.textContent))).toEqual([
      ["new thing", "feat: ship it", "14 Nov"],
      ["me/old", "chore: tidy", "1 Nov"],
    ]);
    expect(links[0].getAttribute("href")).toBe("https://github.com/me/new/commit/2");
  });

  it("sums up the year with the longest streak and the busiest day", async () => {
    const busy = buildContributionGrid({ total: 120, weeks: [[day("2026-04-13", 4, 1), day("2026-04-14", 106, 4), day("2026-04-15", 10, 2)]] });
    const page = await render(Activity, { ...base, contributions: busy });
    expect(page.body.textContent).toContain("longest streak 3 days");
    expect(page.body.textContent).toContain("busiest day 14 Apr, with 106");
  });

  it("leaves the section out when GitHub gave nothing", async () => {
    const page = await render(Activity, { ...base, contributions: undefined });
    expect(page.querySelector("section")).toBeNull();
  });
});

describe("case study", () => {
  it("shows the summary, every metric and every section", async () => {
    const page = await render(CaseStudyBody, { study: kto, today: "2026-11-17" }, { eyebrow: "<p>KTO Group</p>" });
    expect(page.querySelector("header p")?.textContent).toBe("KTO Group");
    expect(page.querySelector("h1")?.textContent).toBe(kto.title);
    expect([...page.querySelectorAll("dd.text-xl a")].map((value) => value.firstChild?.textContent)).toEqual(kto.metrics.map((metric) => metric.value));
    expect([...page.querySelectorAll("h2")].map((heading) => heading.textContent?.replace("#", "").trim())).toEqual(["Results", ...kto.sections.map((section) => section.heading)]);
  });

  it("links to every section from the top of the page", async () => {
    const page = await render(CaseStudyBody, { study: kto, today: "2026-11-17" });
    const links = [...page.querySelectorAll('nav a')];
    expect(links.map((link) => link.textContent)).toEqual(["Results", ...kto.sections.map((section) => section.label)]);
    for (const link of links) expect(page.getElementById(link.getAttribute("href")!.slice(1))?.tagName).toBe("H2");
  });

  it("links each metric to the section that explains it", async () => {
    const page = await render(CaseStudyBody, { study: kto, today: "2026-11-17" });
    const targets = [...page.querySelectorAll("dd.text-xl a")].map((link) => page.getElementById(link.getAttribute("href")!.slice(1))?.textContent?.replace("#", "").trim());
    expect(targets).toEqual(["Getting the first view on screen", "Getting the first view on screen", "Getting the first view on screen", "Getting the first view on screen", "Avoiding repeated setup on return visits"]);
    expect(page.querySelector("dd.text-xl a")?.textContent).toBe("40%, explained under Loading");
  });

  it("refuses a metric that points at a section the study doesn't have", async () => {
    const study = { ...kto, metrics: [{ value: "1×", label: "nothing", explainedIn: "Missing" }] };
    await expect(render(CaseStudyBody, { study, today: "2026-11-17" })).rejects.toThrow('no case study section is labelled "Missing"');
  });

  it("ends with when it was published and last updated", async () => {
    const page = await render(CaseStudyBody, { study: { ...kto, published: "2026-11-05", updated: "2026-11-17" }, today: "2026-11-17" });
    const dates = [...page.querySelectorAll("p")].at(-1);
    expect(dates?.textContent?.replace(/\s+/g, " ").trim()).toBe("published 5 Nov · updated 17 Nov");
    expect([...(dates?.querySelectorAll("time") ?? [])].map((time) => time.getAttribute("datetime"))).toEqual(["2026-11-05", "2026-11-17"]);
  });

  it("leaves out the update when there hasn't been one", async () => {
    const page = await render(CaseStudyBody, { study: { ...kto, published: "2026-11-05", updated: "2026-11-05" }, today: "2026-11-17" });
    expect([...page.querySelectorAll("p")].at(-1)?.textContent?.replace(/\s+/g, " ").trim()).toBe("published 5 Nov");
  });

  it("draws each flow as ordered steps", async () => {
    const page = await render(CaseStudyBody, { study: kto, today: "2026-11-17" });
    const flows = [...page.querySelectorAll("figure")];
    expect(flows.map((flow) => flow.querySelector("figcaption")?.textContent)).toEqual(["Loading sequence", "From live data to the interface"]);
    expect([...flows[0].querySelectorAll("li strong")].map((step) => step.textContent)).toEqual(["Initial snapshot", "First view", "Live updates"]);
  });
});
