import { buildContributionGrid, type ContributionGrid } from "./activity";
import { fetchContributionCalendar, fetchLatestCommit, fetchStarCount, type Commit } from "./client";

export type GitHubData = {
  stars: Map<string, number>;
  commits: Commit[];
  activity: ContributionGrid | undefined;
  problems: string[];
};

type Request = {
  repos: string[];
  login: string;
  token: string | undefined;
  fetcher?: typeof fetch;
};

function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function loadGitHubData({ repos, login, token, fetcher = fetch }: Request): Promise<GitHubData> {
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

  return { stars, commits, activity, problems };
}
