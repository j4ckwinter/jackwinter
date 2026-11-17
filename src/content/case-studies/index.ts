import type { CaseStudy } from "./types";
import { kto } from "./kto";

export const caseStudies: CaseStudy[] = [kto];

export const caseStudyPath = (study: Pick<CaseStudy, "slug">) => `/work/${study.slug}`;

export function caseStudyFor(company: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.company === company);
}
