import type { IconName } from "../icons";

type Tool = { name: string; icon: IconName };

export type SkillGroup = { name: string; tools: Tool[]; shownBeforeExpanding: number };

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    shownBeforeExpanding: 2,
    tools: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    name: "Frontend",
    shownBeforeExpanding: 4,
    tools: [
      { name: "React", icon: "react" },
      { name: "Angular", icon: "angular" },
      { name: "Astro", icon: "astro" },
      { name: "TanStack", icon: "tanstack" },
      { name: "Zustand", icon: "zustand" },
      { name: "RxJS", icon: "rxjs" },
    ],
  },
  {
    name: "Real-time",
    shownBeforeExpanding: 3,
    tools: [
      { name: "WebSockets", icon: "websockets" },
      { name: "Socket.IO", icon: "socketio" },
      { name: "Web Workers", icon: "webWorkers" },
    ],
  },
  {
    name: "Backend",
    shownBeforeExpanding: 3,
    tools: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "REST APIs", icon: "restApis" },
    ],
  },
  {
    name: "AI tooling",
    shownBeforeExpanding: 3,
    tools: [
      { name: "Claude Code", icon: "claude" },
      { name: "Codex", icon: "codex" },
      { name: "MCP", icon: "mcp" },
      { name: "Ollama", icon: "ollama" },
      { name: "LanceDB", icon: "lancedb" },
      { name: "Embeddings", icon: "embeddings" },
    ],
  },
  {
    name: "Testing",
    shownBeforeExpanding: 2,
    tools: [
      { name: "Vitest", icon: "vitest" },
      { name: "Jest", icon: "jest" },
      { name: "Cypress", icon: "cypress" },
    ],
  },
  {
    name: "Workflow",
    shownBeforeExpanding: 3,
    tools: [
      { name: "pnpm", icon: "pnpm" },
      { name: "Turborepo", icon: "turborepo" },
      { name: "GitHub Actions", icon: "githubActions" },
      { name: "Storybook", icon: "storybook" },
    ],
  },
];

export const education = {
  qualification: "BSc Computer Science, 2:1",
  institution: "University of the West of England",
  dates: "2013 – 2017",
};
