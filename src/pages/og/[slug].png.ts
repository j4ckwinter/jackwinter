import type { APIRoute, GetStaticPaths } from "astro";
import { caseStudyCard } from "../../social/card";
import { cardResponse } from "../../social/render";
import { caseStudies, caseStudyPath } from "../../content/case-studies";
import type { CaseStudy } from "../../content/case-studies/types";
import { displayHost } from "../../format";

export const getStaticPaths = (() => caseStudies.map((study) => ({ params: { slug: study.slug }, props: { study } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ study: CaseStudy }> = ({ props: { study }, site }) =>
  cardResponse(caseStudyCard({ company: study.company, title: study.title, metrics: study.metrics, address: `${displayHost(site!)}${caseStudyPath(study)}` }));
