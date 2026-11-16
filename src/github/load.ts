import { summariseActivity, type Activity } from "./activity";
import { fetchContributionCalendar, fetchStarCount } from "./client";

export type GitHubData = {
  stars: Map<string, number>;
  activity: Activity | undefined;
  problems: string[];
};

type Request = {
  repos: string[];
  login: string;
  token: string | undefined;
  today: string;
  fetcher?: typeof fetch;
};

function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export async function loadGitHubData({ repos, login, token, today, fetcher = fetch }: Request): Promise<GitHubData> {
  const problems: string[] = [];
  const stars = new Map<string, number>();

  const starResults = await Promise.allSettled(repos.map((repo) => fetchStarCount(repo, token, fetcher)));
  starResults.forEach((result, index) => {
    if (result.status === "fulfilled") stars.set(repos[index], result.value);
    else problems.push(`stars for ${repos[index]}: ${reason(result.reason)}`);
  });

  let activity: Activity | undefined;
  if (!token) {
    problems.push("activity: GITHUB_TOKEN is not set");
  } else {
    try {
      activity = summariseActivity(await fetchContributionCalendar(login, token, fetcher), today);
    } catch (error) {
      problems.push(`activity: ${reason(error)}`);
    }
  }

  return { stars, activity, problems };
}
