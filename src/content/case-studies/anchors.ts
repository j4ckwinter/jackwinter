import { toSlug } from "../../slug";
import type { CaseStudy } from "./types";

export const sectionHref = (heading: string) => `#${toSlug(heading)}`;

export function explanationHref(sections: CaseStudy["sections"], label: string): string {
  const section = sections.find((candidate) => candidate.label === label);
  if (!section) throw new Error(`no case study section is labelled "${label}"`);
  return sectionHref(section.heading);
}
