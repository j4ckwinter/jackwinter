export type Project = {
  name: string;
  description: string;
  repo: string;
  href: string;
};

export const projects: Project[] = [
  {
    name: "pancake stack",
    description: "skills that help ai coding agents write code worth keeping",
    repo: "j4ckwinter/pancake-stack",
    href: "https://github.com/j4ckwinter/pancake-stack",
  },
  {
    name: "brain-cache",
    description: "local code index that finds relevant functions for coding agents over MCP",
    repo: "j4ckwinter/brain-cache",
    href: "https://www.npmjs.com/package/brain-cache",
  },
  {
    name: "pancake ui",
    description: "my React component library, on npm",
    repo: "j4ckwinter/pancake-ui",
    href: "https://www.npmjs.com/package/@jack.winter/pancake-ui",
  },
  {
    name: "elvis",
    description: "a small black sprocker who lives on your mac and reacts to claude",
    repo: "j4ckwinter/elvis",
    href: "https://github.com/j4ckwinter/elvis",
  },
  {
    name: "winter town",
    description: "my old portfolio, a small town you can walk around",
    repo: "j4ckwinter/winterbot",
    href: "https://winterbyte.vercel.app",
  },
];
