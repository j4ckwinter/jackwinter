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
    title: "Senior front-end developer",
    location: "Remote",
    start: "Jun 2025",
    context: "Sportsbook and online casino operator serving the Brazilian market.",
    highlights: [
      "Led the move from a third-party hosted sportsbook to a custom React and TypeScript platform, owning architecture and core customer journeys for 1.4M active users.",
      "Delivered 40% faster FCP, 25% faster LCP and 11× faster return navigation in performance testing.",
      "Designed a modular pnpm and Turborepo monorepo spanning 27 packages and 22 modules.",
      "Built a real-time sports data pipeline with Web Workers, Socket.IO and Zustand, moving odds processing off the main thread.",
    ],
  },
  {
    company: "GeoGaming Group",
    icon: "geoGaming",
    title: "Senior front-end developer",
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
    title: "Senior software engineer",
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
