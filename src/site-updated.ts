import { execFileSync } from "node:child_process";

export const SITE_SOURCES = ["src", "public"];

type Git = (args: string[]) => string;
const git: Git = (args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });

export function lastSourceChange(run: Git = git): string | undefined {
  try {
    const date = run(["log", "-1", "--format=%cs", "--", ...SITE_SOURCES]).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
  } catch {
    return undefined;
  }
}
