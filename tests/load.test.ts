import { describe, expect, it } from "vitest";
import { loadGitHubData } from "../src/github/load";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

const calendar = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 4,
          weeks: [{ contributionDays: [{ date: "2026-11-02", contributionCount: 4, contributionLevel: "THIRD_QUARTILE", weekday: 1 }] }],
        },
      },
    },
  },
};

const commit = (message: string, parents = 1) => ({
  html_url: `https://github.com/me/a/commit/${message.length}`,
  parents: Array.from({ length: parents }, () => ({})),
  commit: { message, author: { date: "2026-11-14T15:11:16Z" } },
});

function gitHub(routes: { commits?: unknown[]; stars?: number; failRepo?: string; failCalendar?: boolean }): typeof fetch {
  return async (input) => {
    const url = String(input);
    if (url.endsWith("/graphql")) {
      if (routes.failCalendar) throw new Error("socket closed");
      return json(calendar);
    }
    if (routes.failRepo && url.includes(routes.failRepo)) return json({}, 404);
    if (url.includes("/commits")) return json(routes.commits ?? [commit("feat: something")]);
    return json({ stargazers_count: routes.stars ?? 7 });
  };
}

describe("loadGitHubData", () => {
  it("returns star counts, latest commits and the contribution grid when GitHub answers", async () => {
    const data = await loadGitHubData({ repos: ["me/a"], login: "me", token: "t", fetcher: gitHub({}) });
    expect(data.stars.get("me/a")).toBe(7);
    expect(data.commits).toEqual([{ repo: "me/a", subject: "feat: something", date: "2026-11-14T15:11:16Z", url: "https://github.com/me/a/commit/15" }]);
    expect(data.activity?.total).toBe(4);
    expect(data.activity?.weeks).toEqual([[{ date: "2026-11-02", count: 4, level: 3, weekday: 1 }]]);
    expect(data.problems).toEqual([]);
  });

  it("skips merge commits and keeps only a commit's first line", async () => {
    const fetcher = gitHub({ commits: [commit("Merge pull request #8", 2), commit("fix: keep embeddings\n\nLonger explanation.")] });
    const data = await loadGitHubData({ repos: ["me/a"], login: "me", token: "t", fetcher });
    expect(data.commits.map((latest) => latest.subject)).toEqual(["fix: keep embeddings"]);
  });

  it("leaves out what failed and reports why", async () => {
    const data = await loadGitHubData({ repos: ["me/ok", "me/broken"], login: "me", token: "t", fetcher: gitHub({ stars: 2, failRepo: "/broken", failCalendar: true }) });
    expect([...data.stars]).toEqual([["me/ok", 2]]);
    expect(data.commits.map((latest) => latest.repo)).toEqual(["me/ok"]);
    expect(data.activity).toBeUndefined();
    expect(data.problems).toEqual([
      "stars for me/broken: GitHub returned 404 for me/broken",
      "latest commit for me/broken: GitHub returned 404 for me/broken's commits",
      "activity: socket closed",
    ]);
  });

  it("skips activity without a token", async () => {
    const data = await loadGitHubData({ repos: [], login: "me", token: undefined, fetcher: gitHub({}) });
    expect(data.activity).toBeUndefined();
    expect(data.problems).toEqual(["activity: GITHUB_TOKEN is not set"]);
  });
});
