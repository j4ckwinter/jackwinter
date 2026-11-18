import type { IconName } from "../icons";

export type Role = {
  company: string;
  icon: IconName;
  title: string;
  location: string;
  start: string;
  end?: string;
  context: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    company: "KTO Group",
    icon: "kto",
    title: "Senior Front-End Developer",
    location: "Remote",
    start: "Jun 2025",
    context: "Sportsbook and online casino operator serving the Brazilian market.",
    highlights: [
      "Led the move from a third-party sportsbook to a custom React and TypeScript platform for 1.4M active users, architected as a 27-package Turborepo monorepo.",
      "Delivered 40% faster FCP, 25% faster LCP and 11× faster return navigation in performance testing.",
      "Moved real-time odds processing off the main thread with Web Workers, Socket.IO and Zustand.",
      "Built sportsbook content features with Next.js, Payload CMS and PostgreSQL, owning the data models, APIs and localisation migrations.",
    ],
  },
  {
    company: "GeoGaming Group",
    icon: "geoGaming",
    title: "Senior Front-End Developer",
    location: "London",
    start: "Jun 2023",
    end: "Jun 2025",
    context: "Sportsbook and casino games provider building a white-label platform.",
    highlights: [
      "Led performance work that cut application load times by 30%.",
      "Raised automated test coverage from 25% to 75% with Jest and Cypress.",
      "Built real-time betting interfaces with RxJS, WebSockets and REST APIs.",
      "Mentored junior engineers, led code reviews and set frontend standards.",
    ],
  },
  {
    company: "SmartStream Technologies",
    icon: "smartStream",
    title: "Senior Software Engineer",
    location: "Bristol",
    start: "Jul 2017",
    end: "Aug 2022",
    context: "Cash and liquidity management software for major banks.",
    highlights: [
      "Led a greenfield Angular frontend that replaced a legacy system and enabled two high-profile deals.",
      "Built internal tools with React and Node.js.",
      "Prototyped machine-learning transaction forecasting on historical banking data.",
      "Interviewed candidates and shared on-call support for 24/7 reliability.",
    ],
  },
];
