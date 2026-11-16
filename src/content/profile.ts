import type { IconName } from "../icons";

export type Inline = string | { text: string; href: string };

export type Link = { label: string; href: string; icon: IconName };

const email = "jackwinter.10@outlook.com";
const githubLogin = "j4ckwinter";

export const profile = {
  name: "Jack Winter",
  title: "Senior software engineer",
  description:
    "Jack Winter, senior software engineer in London. Real-time products with React and TypeScript, and tools for AI coding agents.",
  bio: [
    ["hey, i'm jack, a senior software engineer in london. i've spent 8+ years building fast, real-time products with react and typescript across sports betting, gaming and fintech."],
    [
      "lately i build ",
      { text: "tools that help ai coding agents", href: "https://github.com/j4ckwinter/pancake-stack" },
      " write code i actually want to keep.",
    ],
  ] satisfies Inline[][],
  email,
  githubLogin,
  githubUrl: `https://github.com/${githubLogin}`,
  links: [
    { label: "GitHub", href: `https://github.com/${githubLogin}`, icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jack-winter-409a09a4", icon: "linkedin" },
    { label: "Email", href: `mailto:${email}`, icon: "mail" },
    { label: "CV", href: "/Jack-Winter-CV.pdf", icon: "cv" },
  ] satisfies Link[],
};

export type Profile = typeof profile;
