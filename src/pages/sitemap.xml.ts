import type { APIRoute } from "astro";
import { sitemapXml } from "../agents/sitemap";
import { caseStudies, caseStudyPath } from "../content/case-studies";
import { lastSourceChange } from "../site-updated";

export const GET: APIRoute = ({ site }) => {
  const updated = lastSourceChange() ?? new Date().toISOString().slice(0, 10);
  const entries = [{ path: "/", updated }, ...caseStudies.map((study) => ({ path: caseStudyPath(study), updated: study.updated }))];
  return new Response(sitemapXml(entries, site!), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
