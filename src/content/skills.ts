export type SkillGroup = { name: string; tools: string[] };

export const skills: SkillGroup[] = [
  { name: "Languages", tools: ["TypeScript", "JavaScript", "Python", "Java", "SQL"] },
  { name: "Frontend", tools: ["React", "Angular", "Astro", "Zustand", "TanStack", "RxJS"] },
  { name: "Real-time", tools: ["WebSockets", "Socket.IO", "Web Workers"] },
  { name: "Backend", tools: ["Node.js", "REST APIs", "Docker", "AWS"] },
  { name: "AI tooling", tools: ["MCP", "Embeddings", "LanceDB", "Ollama", "Claude Code", "Codex"] },
  { name: "Testing", tools: ["Vitest", "Jest", "Playwright", "Cypress"] },
  { name: "Workflow", tools: ["pnpm", "Turborepo", "Storybook", "GitHub Actions"] },
];

export const education = {
  qualification: "BSc Computer Science, 2:1",
  institution: "University of the West of England",
  dates: "2013 – 2017",
};
