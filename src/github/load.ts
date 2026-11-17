import { buildContributionGrid, type ContributionGrid } from "./activity";
import { fetchContributionCalendar, fetchLatestCommit, fetchLatestReleaseVersion, fetchStarCount, type Commit } from "./client";
import { fetchNpmVersion } from "./npm";
import type { Project, Release } from "../content/projects";

export type GitHubData = {
  stars: Map<string, number>;
  versions: Map<string, string>;
  commits: Commit[];
  activity: ContributionGrid | undefined;
  problems: string[];
};

type Request = {
  projects: Pick<Project, "repo" | "release">[];
  login: string;
  token: string | undefined;
  fetcher?: typeof fetch;
};

function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function loadGitHubData({ projects, login, token, fetcher = fetch }: Request): Promise<GitHubData> {
  const repos = projects.map((project) => project.repo);
  const problems: string[] = [];
  const stars = new Map<string, number>();

  const starResults = await Promise.allSettled(repos.map((repo) => fetchStarCount(repo, token, fetcher)));
  starResults.forEach((result, index) => {
    if (result.status === "fulfilled") stars.set(repos[index], result.value);
    else problems.push(`stars for ${repos[index]}: ${reason(result.reason)}`);
  });

  const commits: Commit[] = [];
  const commitResults = await Promise.allSettled(repos.map((repo) => fetchLatestCommit(repo, token, fetcher)));
  commitResults.forEach((result, index) => {
    if (result.status === "fulfilled") commits.push(result.value);
    else problems.push(`latest commit for ${repos[index]}: ${reason(result.reason)}`);
  });

  const versions = new Map<string, string>();
  const released = projects.filter((project): project is { repo: string; release: Release } => project.release !== undefined);
  const versionResults = await Promise.allSettled(
    released.map(({ repo, release }) =>
      release.from === "npm" ? fetchNpmVersion(release.package, fetcher) : fetchLatestReleaseVersion(repo, token, fetcher),
    ),
  );
  versionResults.forEach((result, index) => {
    if (result.status === "fulfilled") versions.set(released[index].repo, result.value);
    else problems.push(`version for ${released[index].repo}: ${reason(result.reason)}`);
  });

  let activity: ContributionGrid | undefined;
  if (!token) {
    problems.push("activity: GITHUB_TOKEN is not set");
  } else {
    try {
      activity = buildContributionGrid(await fetchContributionCalendar(login, token, fetcher));
    } catch (error) {
      problems.push(`activity: ${reason(error)}`);
    }
  }

  return { stars, versions, commits, activity, problems };
}
