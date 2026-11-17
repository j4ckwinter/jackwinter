import type { PageContent } from "./markdown";
import { CARD_PATH, caseStudyCardPath } from "../social/card";
import { caseStudyPath } from "../content/case-studies";
import type { CaseStudy } from "../content/case-studies/types";

export function personSchema({ profile, experience, education }: PageContent, site: URL) {
  const current = experience.find((role) => role.end === undefined);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.description,
    url: site.href,
    image: new URL(CARD_PATH, site).href,
    email: profile.email,
    sameAs: profile.links.filter((link) => link.href.startsWith("https://")).map((link) => link.href),
    ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
    alumniOf: education.map((item) => ({ "@type": "CollegeOrUniversity", name: item.institution })),
  };
}

type Article = Pick<CaseStudy, "slug" | "title" | "summary" | "company" | "published" | "updated">;

export function caseStudySchema(study: Article, author: { name: string }, site: URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    url: new URL(caseStudyPath(study), site).href,
    image: new URL(caseStudyCardPath(study.slug), site).href,
    datePublished: study.published,
    dateModified: study.updated,
    author: { "@type": "Person", name: author.name, url: site.href },
    about: { "@type": "Organization", name: study.company },
  };
}
