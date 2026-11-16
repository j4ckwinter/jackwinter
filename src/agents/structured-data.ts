import type { PageContent } from "./markdown";
import { CARD_PATH } from "../social/card";

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
