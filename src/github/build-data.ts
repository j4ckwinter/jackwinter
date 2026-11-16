import { loadGitHubData, type GitHubData } from "./load";
import { page } from "../content/page";

let pending: Promise<GitHubData> | undefined;

export function githubDataForBuild(): Promise<GitHubData> {
  pending ??= loadGitHubData({
    projects: page.projects,
    login: page.profile.githubLogin,
    token: import.meta.env.GITHUB_TOKEN,
  }).then((data) => {
    for (const problem of data.problems) console.warn(`Leaving out GitHub ${problem}`);
    return data;
  });
  return pending;
}
