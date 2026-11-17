import type { Role } from "../content/experience";
import type { Qualification } from "../content/education";
import type { SkillGroup } from "../content/skills";
import type { Project } from "../content/projects";
import type { Inline, Profile } from "../content/profile";
import { formatDateRange, formatTenure } from "../format";
import { monthsSpanned, wholeYearsAcross } from "../tenure";
import { caseStudies, caseStudyFor, caseStudyPath } from "../content/case-studies";

export const PAGE_MARKDOWN_PATH = "/index.md";
export const LLMS_PATH = "/llms.txt";

export type PageContent = {
  profile: Profile;
  experience: Role[];
  education: Qualification[];
  skills: SkillGroup[];
  projects: Project[];
};

const inline = (parts: Inline[]) => parts.map((part) => (typeof part === "string" ? part : `[${part.text}](${part.href})`)).join("");
const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
const blocks = (parts: string[]) => parts.join("\n\n");
const absolute = (href: string, site: URL) => new URL(href, site).href;

function roleMarkdown(role: Role, today: string, site: URL): string {
  const study = caseStudyFor(role.company);
  return blocks([
    `### ${role.company}`,
    `**${role.title}** · ${formatDateRange(role)} (${formatTenure(monthsSpanned(role, today))}) · ${role.location}`,
    role.context,
    list(role.highlights),
    ...(study ? [`Case study: [${study.title}](${absolute(caseStudyPath(study), site)})`] : []),
  ]);
}

export function pageMarkdown({ profile, experience, education, skills, projects }: PageContent, site: URL, today: string): string {
  return `${blocks([
    `# ${profile.name}`,
    `> ${profile.description}`,
    ...profile.bio(wholeYearsAcross(experience, today)).map(inline),
    list(profile.links.map((link) => `[${link.label}](${absolute(link.href, site)})`)),
    "## Experience",
    ...experience.map((role) => roleMarkdown(role, today, site)),
    "## Projects",
    list(projects.map((project) => `[${project.name}](${project.href}): ${project.description}`)),
    "## Skills",
    list(skills.map((group) => `**${group.name}:** ${group.tools.map((tool) => tool.name).join(", ")}`)),
    "## Education",
    list(education.map((item) => `**${item.qualification}**, ${item.institution}, ${formatDateRange(item)}`)),
  ])}\n`;
}

export function llmsText({ profile }: Pick<PageContent, "profile">, site: URL): string {
  return `${blocks([
    `# ${profile.name}`,
    `> ${profile.description}`,
    "The home page is also available as markdown, generated from the data that builds the HTML.",
    "## Pages",
    list([
      `[${profile.name}, as markdown](${absolute(PAGE_MARKDOWN_PATH, site)}): bio, experience, projects, skills and education`,
      `[${profile.name}](${absolute("/", site)}): the HTML page`,
      ...caseStudies.map((study) => `[${study.title}](${absolute(caseStudyPath(study), site)}): case study`),
    ]),
  ])}\n`;
}
