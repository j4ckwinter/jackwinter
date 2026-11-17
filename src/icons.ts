import brandGithub from "@tabler/icons/outline/brand-github.svg?raw";
import brandLinkedin from "@tabler/icons/outline/brand-linkedin.svg?raw";
import mail from "@tabler/icons/outline/mail.svg?raw";
import fileCv from "@tabler/icons/outline/file-cv.svg?raw";
import star from "@tabler/icons/outline/star.svg?raw";
import chevronDown from "@tabler/icons/outline/chevron-down.svg?raw";
import arrowUpRight from "@tabler/icons/outline/arrow-up-right.svg?raw";
import stack from "@tabler/icons/outline/stack-2.svg?raw";
import brain from "@tabler/icons/outline/brain.svg?raw";
import components from "@tabler/icons/outline/components.svg?raw";
import dog from "@tabler/icons/outline/dog.svg?raw";
import sun from "@tabler/icons/outline/sun.svg?raw";
import moon from "@tabler/icons/outline/moon.svg?raw";
import plugConnected from "@tabler/icons/outline/plug-connected.svg?raw";
import cpu from "@tabler/icons/outline/cpu.svg?raw";
import api from "@tabler/icons/outline/api.svg?raw";
import vector from "@tabler/icons/outline/vector.svg?raw";
import database from "@tabler/icons/outline/database.svg?raw";
import coffee from "@tabler/icons/outline/coffee.svg?raw";
import sql from "@tabler/icons/outline/sql.svg?raw";
import box from "@tabler/icons/outline/box.svg?raw";
import brandAws from "@tabler/icons/outline/brand-aws.svg?raw";
import brandOpenai from "@tabler/icons/outline/brand-openai.svg?raw";
import school from "@tabler/icons/outline/school.svg?raw";
import binaryTree from "@tabler/icons/outline/binary-tree.svg?raw";
import accessible from "@tabler/icons/outline/accessible.svg?raw";
import browserCheck from "@tabler/icons/outline/browser-check.svg?raw";
import brandApple from "@tabler/icons/outline/brand-apple.svg?raw";
import brandReactNative from "@tabler/icons/outline/brand-react-native.svg?raw";
import {
  siAngular,
  siAnthropic,
  siBiome,
  siEslint,
  siExpo,
  siExpress,
  siHuggingface,
  siNextdotjs,
  siOnnx,
  siPayloadcms,
  siPostgresql,
  siPreact,
  siPrettier,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTestinglibrary,
  siVercel,
  siVite,
  siZod,
  siAstro,
  siClaude,
  siCypress,
  siDocker,
  siGithubactions,
  siJavascript,
  siJest,
  siModelcontextprotocol,
  siNodedotjs,
  siOllama,
  siPnpm,
  siPython,
  siReact,
  siReactivex,
  siSocketdotio,
  siStorybook,
  siTanstack,
  siTurborepo,
  siTypescript,
  siVitest,
} from "simple-icons";

type IconArt =
  | { kind: "stroke"; body: string }
  | { kind: "fill"; body: string }
  | { kind: "mask"; src: string; box: string };

function tabler(svg: string): IconArt {
  const body = svg.slice(svg.indexOf(">") + 1, svg.lastIndexOf("</svg>")).replace(/<path stroke="none"[^>]*\/>/, "");
  return { kind: "stroke", body };
}

function logo(src: string, box: string): IconArt {
  return { kind: "mask", src, box };
}

const geoGamingMark: IconArt = {
  kind: "stroke",
  body: '<path d="M7.8 4.1 16 2.4l4.7 5.5.4 8.2-5.7 5.5-6.5-1.1-5.8-5 .3-6.8z"/><path d="m7.8 4.1 3.7 13.8M7.8 4.1l12.9 3.8M11.5 17.9l9.2-10M11.5 17.9l-8.4-2.4M11.5 17.9l3.9 3.7"/><circle cx="7.8" cy="4.1" r=".8" fill="currentColor"/><circle cx="11.5" cy="17.9" r=".8" fill="currentColor"/>',
};

function brand(icon: { path: string }): IconArt {
  return { kind: "fill", body: `<path d="${icon.path}"/>` };
}

export const icons = {
  github: tabler(brandGithub),
  linkedin: tabler(brandLinkedin),
  mail: tabler(mail),
  cv: tabler(fileCv),
  star: tabler(star),
  chevronDown: tabler(chevronDown),
  arrowUpRight: tabler(arrowUpRight),
  stack: tabler(stack),
  brain: tabler(brain),
  components: tabler(components),
  dog: tabler(dog),
  sun: tabler(sun),
  moon: tabler(moon),
  kto: logo("/logos/kto.png", "h-4 w-6"),
  geoGaming: geoGamingMark,
  smartStream: logo("/logos/smartstream.png", "size-4"),
  websockets: tabler(plugConnected),
  webWorkers: tabler(cpu),
  restApis: tabler(api),
  embeddings: tabler(vector),
  lancedb: tabler(database),
  java: tabler(coffee),
  sql: tabler(sql),
  zustand: tabler(box),
  aws: tabler(brandAws),
  codex: tabler(brandOpenai),
  school: tabler(school),
  treeSitter: tabler(binaryTree),
  axe: tabler(accessible),
  playwright: tabler(browserCheck),
  appkit: tabler(brandApple),
  reactNative: tabler(brandReactNative),
  anthropic: brand(siAnthropic),
  biome: brand(siBiome),
  eslint: brand(siEslint),
  expo: brand(siExpo),
  express: brand(siExpress),
  huggingface: brand(siHuggingface),
  nextjs: brand(siNextdotjs),
  onnx: brand(siOnnx),
  postgresql: brand(siPostgresql),
  payload: brand(siPayloadcms),
  preact: brand(siPreact),
  prettier: brand(siPrettier),
  supabase: brand(siSupabase),
  swift: brand(siSwift),
  tailwind: brand(siTailwindcss),
  testingLibrary: brand(siTestinglibrary),
  vercel: brand(siVercel),
  vite: brand(siVite),
  zod: brand(siZod),
  typescript: brand(siTypescript),
  javascript: brand(siJavascript),
  python: brand(siPython),
  react: brand(siReact),
  angular: brand(siAngular),
  astro: brand(siAstro),
  tanstack: brand(siTanstack),
  rxjs: brand(siReactivex),
  socketio: brand(siSocketdotio),
  nodejs: brand(siNodedotjs),
  docker: brand(siDocker),
  mcp: brand(siModelcontextprotocol),
  ollama: brand(siOllama),
  claude: brand(siClaude),
  vitest: brand(siVitest),
  jest: brand(siJest),
  cypress: brand(siCypress),
  pnpm: brand(siPnpm),
  turborepo: brand(siTurborepo),
  storybook: brand(siStorybook),
  githubActions: brand(siGithubactions),
} satisfies Record<string, IconArt>;

export type IconName = keyof typeof icons;
