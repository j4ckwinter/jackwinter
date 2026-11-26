import type { IconName } from "../icons";

export type Release = { from: "npm"; package: string } | { from: "github" };

export type Project = {
  name: string;
  release?: Release;
  icon: IconName;
  description: string;
  repo: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "brain-cache",
    icon: "brain",
    description: "local code index that finds relevant functions for coding agents over MCP",
    repo: "j4ckwinter/brain-cache",
    release: { from: "npm", package: "brain-cache" },
    href: "https://www.npmjs.com/package/brain-cache",
  },
  {
    name: "pancake-stack",
    icon: "stack",
    description: "skills that help ai coding agents write code worth keeping",
    repo: "j4ckwinter/pancake-stack",
    release: { from: "github" },
    href: "https://github.com/j4ckwinter/pancake-stack",
  },
  {
    name: "pancake-stack-evals",
    icon: "flask",
    description: "checks and trials that test whether pancake-stack actually helps",
    repo: "j4ckwinter/pancake-stack-evals",
    href: "https://github.com/j4ckwinter/pancake-stack-evals",
  },
  {
    name: "elvis",
    icon: "dog",
    description: "a small black sprocker who lives on your mac and reacts to claude",
    repo: "j4ckwinter/elvis",
    release: { from: "github" },
    href: "https://github.com/j4ckwinter/elvis",
  },
  {
    name: "mezzala",
    icon: "football",
    description: "an mcp server that reads my football manager save and does the scouting for me",
    repo: "j4ckwinter/mezzala",
    release: { from: "github" },
    href: "https://github.com/j4ckwinter/mezzala",
  },
  {
    name: "agentcanuse",
    icon: "worldSearch",
    description: "a nightly scoreboard of the browsers ai agents use, tested against 124 real sites",
    repo: "j4ckwinter/agentcanuse",
    release: { from: "npm", package: "agentcanuse" },
    href: "https://agentcanuse.com",
  },
];
