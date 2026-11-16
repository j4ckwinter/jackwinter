import type { IconName } from "../icons";

type Tool = { name: string; icon: IconName };

export type SkillGroup = { name: string; tools: Tool[]; shownBeforeExpanding: number };

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    shownBeforeExpanding: 3,
    tools: [
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Swift", icon: "swift" },
      { name: "Java", icon: "java" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    name: "Frontend",
    shownBeforeExpanding: 4,
    tools: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Astro", icon: "astro" },
      { name: "Angular", icon: "angular" },
      { name: "Vite", icon: "vite" },
      { name: "Preact", icon: "preact" },
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
    name: "Apps",
    shownBeforeExpanding: 3,
    tools: [
      { name: "React Native", icon: "reactNative" },
      { name: "Expo", icon: "expo" },
      { name: "AppKit", icon: "appkit" },
    ],
  },
  {
    name: "Backend",
    shownBeforeExpanding: 3,
    tools: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "Supabase", icon: "supabase" },
      { name: "Zod", icon: "zod" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws" },
      { name: "REST APIs", icon: "restApis" },
    ],
  },
  {
    name: "AI",
    shownBeforeExpanding: 3,
    tools: [
      { name: "Claude Code", icon: "claude" },
      { name: "Codex", icon: "codex" },
      { name: "MCP", icon: "mcp" },
      { name: "Claude API", icon: "anthropic" },
      { name: "OpenAI API", icon: "codex" },
      { name: "Ollama", icon: "ollama" },
      { name: "LanceDB", icon: "lancedb" },
      { name: "Transformers.js", icon: "huggingface" },
      { name: "ONNX Runtime", icon: "onnx" },
      { name: "tree-sitter", icon: "treeSitter" },
      { name: "Embeddings", icon: "embeddings" },
    ],
  },
  {
    name: "Testing",
    shownBeforeExpanding: 3,
    tools: [
      { name: "Vitest", icon: "vitest" },
      { name: "Playwright", icon: "playwright" },
      { name: "Testing Library", icon: "testingLibrary" },
      { name: "Jest", icon: "jest" },
      { name: "Cypress", icon: "cypress" },
      { name: "axe", icon: "axe" },
    ],
  },
  {
    name: "Workflow",
    shownBeforeExpanding: 3,
    tools: [
      { name: "pnpm", icon: "pnpm" },
      { name: "Turborepo", icon: "turborepo" },
      { name: "GitHub Actions", icon: "githubActions" },
      { name: "Vercel", icon: "vercel" },
      { name: "Storybook", icon: "storybook" },
      { name: "Biome", icon: "biome" },
      { name: "ESLint", icon: "eslint" },
      { name: "Prettier", icon: "prettier" },
    ],
  },
];
