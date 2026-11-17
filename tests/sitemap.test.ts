import { describe, expect, it } from "vitest";
import { sitemapXml } from "../src/agents/sitemap";

describe("sitemapXml", () => {
  it("lists each page with the date it last changed", () => {
    const xml = sitemapXml([{ path: "/", updated: "2026-11-17" }, { path: "/work/kto", updated: "2026-11-05" }], new URL("https://example.com"));
    expect(xml).toContain("<url><loc>https://example.com/</loc><lastmod>2026-11-17</lastmod></url>");
    expect(xml).toContain("<url><loc>https://example.com/work/kto</loc><lastmod>2026-11-05</lastmod></url>");
  });
});
