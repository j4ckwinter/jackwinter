import { execFileSync } from "node:child_process";

export const SITE_SOURCES = ["src", "public"];

type Git = (args: string[]) => string;
const git: Git = (args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

export type SourceChange = { date: string; commit: string };

export function lastSourceChange(run: Git = git): SourceChange | undefined {
  try {
    const [date, commit] = run(["log", "-1", "--format=%cs %H", "--", ...SITE_SOURCES]).trim().split(" ");
    return /^\d{4}-\d{2}-\d{2}$/.test(date ?? "") && /^[0-9a-f]{40}$/.test(commit ?? "") ? { date, commit } : undefined;
  } catch {
    return undefined;
  }
}
