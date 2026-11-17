import type { APIRoute } from "astro";
import { sitemapXml } from "../agents/sitemap";
import { caseStudies, caseStudyPath } from "../content/case-studies";

export const GET: APIRoute = ({ site }) => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [{ path: "/", updated: today }, ...caseStudies.map((study) => ({ path: caseStudyPath(study), updated: study.updated }))];
  return new Response(sitemapXml(entries, site!), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
