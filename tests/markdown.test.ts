import { describe, expect, it } from "vitest";
import { llmsText, pageMarkdown, type PageContent } from "../src/agents/markdown";

const site = new URL("https://example.com");

const content: PageContent = {
  profile: {
    name: "Jack",
    title: "Engineer",
    description: "Builds things.",
    bio: ["hey, i'm jack."],
    email: "me@example.com",
    githubLogin: "me",
    githubUrl: "https://github.com/me",
    links: [
      { label: "CV", href: "/cv.pdf", icon: "cv" },
      { label: "Email", href: "mailto:me@example.com", icon: "mail" },
    ],
  },
  experience: [{ company: "Acme", icon: "kto", title: "Engineer", location: "Remote", start: "Jan 2024", context: "Widgets.", highlights: ["Shipped it."] }],
  education: [{ qualification: "BSc", institution: "Uni", icon: "school", start: "2013", end: "2017" }],
  skills: [{ name: "Languages", shownBeforeExpanding: 1, tools: [{ name: "TypeScript", icon: "typescript" }, { name: "Python", icon: "python" }] }],
  projects: [{ name: "thing", icon: "stack", description: "a thing", repo: "me/thing", href: "https://example.com/thing" }],
};

describe("pageMarkdown", () => {
  const markdown = pageMarkdown(content, site);

  it("carries every section of the page", () => {
    for (const heading of ["# Jack", "## Experience", "## Education", "## Skills", "## Projects"]) expect(markdown).toContain(`${heading}\n`);
  });

  it("includes the tools a person only sees after expanding", () => {
    expect(markdown).toContain("**Languages:** TypeScript, Python");
  });

  it("writes each role with its dates and highlights", () => {
    expect(markdown).toContain("**Engineer** · Jan 2024 – now · Remote");
    expect(markdown).toContain("- Shipped it.");
  });

  it("makes site links absolute and leaves email links alone", () => {
    expect(markdown).toContain("[CV](https://example.com/cv.pdf)");
    expect(markdown).toContain("[Email](mailto:me@example.com)");
  });
});

describe("llmsText", () => {
  it("points agents at the markdown page", () => {
    expect(llmsText(content, site)).toContain("(https://example.com/index.md)");
  });
});
