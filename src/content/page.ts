import type { PageContent } from "../agents/markdown";
import { profile } from "./profile";
import { experience } from "./experience";
import { education } from "./education";
import { skills } from "./skills";
import { projects } from "./projects";

export const page: PageContent = { profile, experience, education, skills, projects };
