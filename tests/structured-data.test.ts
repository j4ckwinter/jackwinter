import { describe, expect, it } from "vitest";
import { caseStudySchema, personSchema } from "../src/agents/structured-data";
import { kto } from "../src/content/case-studies/kto";
import { page } from "../src/content/page";

describe("personSchema", () => {
  const schema = personSchema(page, new URL("https://example.com"));

  it("describes the person and where they work now", () => {
    expect(schema).toMatchObject({ "@type": "Person", name: page.profile.name, worksFor: { name: "KTO Group" } });
  });

  it("lists profiles elsewhere but not the email or CV links", () => {
    expect(schema.sameAs).toEqual(["https://github.com/j4ckwinter", "https://linkedin.com/in/jack-winter-409a09a4"]);
  });

  it("points at the share card on this site", () => {
    expect(schema.image).toBe("https://example.com/og.png");
  });
});

describe("caseStudySchema", () => {
  const schema = caseStudySchema(kto, { name: "Jack" }, new URL("https://example.com"));

  it("describes the case study as an article by Jack", () => {
    expect(schema).toMatchObject({ "@type": "Article", headline: kto.title, author: { "@type": "Person", name: "Jack", url: "https://example.com/" } });
  });

  it("dates the article and points at its own page and share card", () => {
    expect(schema).toMatchObject({ datePublished: "2026-11-05", dateModified: kto.updated, url: "https://example.com/work/kto", image: "https://example.com/og/kto.png" });
  });
});
