import type { IconName } from "../icons";

export type Project = {
  name: string;
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
    href: "https://www.npmjs.com/package/brain-cache",
  },
  {
    name: "pancake stack",
    icon: "stack",
    description: "skills that help ai coding agents write code worth keeping",
    repo: "j4ckwinter/pancake-stack",
    href: "https://github.com/j4ckwinter/pancake-stack",
  },
  {
    name: "pancake ui",
    icon: "components",
    description: "my React component library, on npm",
    repo: "j4ckwinter/pancake-ui",
    href: "https://www.npmjs.com/package/@jack.winter/pancake-ui",
  },
  {
    name: "elvis",
    icon: "dog",
    description: "a small black sprocker who lives on your mac and reacts to claude",
    repo: "j4ckwinter/elvis",
    href: "https://github.com/j4ckwinter/elvis",
  },
  {
    name: "winter town",
    icon: "snowflake",
    description: "my old portfolio, a small town you can walk around",
    repo: "j4ckwinter/winterbot",
    href: "https://winterbyte.vercel.app",
  },
];
