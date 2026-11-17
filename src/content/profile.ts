import type { IconName } from "../icons";

export type Inline = string | { text: string; href: string };

export type Link = { label: string; href: string; icon: IconName };

const email = "jackwinter.10@outlook.com";
const githubLogin = "j4ckwinter";
const cv = "/Jack-Winter-CV.pdf";
export const sourceRepo = `https://github.com/${githubLogin}/jackwinter`;

export const profile = {
  name: "Jack Winter",
  title: "Senior Software Engineer",
  cv,
  description:
    "Jack Winter, senior software engineer in London. Real-time products with React and TypeScript, and tools for AI coding agents.",
  bio: (yearsOfExperience: number): Inline[][] => [
    [
      `hey, i'm jack. i've spent ${yearsOfExperience}+ years building fast, real-time products with react and typescript across sports betting, gaming and fintech.`,
    ],
    [
      "lately i build ",
      { text: "tools that help ai coding agents", href: "https://github.com/j4ckwinter/pancake-stack" },
      " write code i actually want to keep.",
    ],
  ],
  email,
  githubLogin,
  githubUrl: `https://github.com/${githubLogin}`,
  links: [
    { label: "GitHub", href: `https://github.com/${githubLogin}`, icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jack-winter-409a09a4", icon: "linkedin" },
    { label: "Email", href: `mailto:${email}`, icon: "mail" },
    { label: "CV", href: cv, icon: "cv" },
  ] satisfies Link[],
};

export type Profile = typeof profile;
