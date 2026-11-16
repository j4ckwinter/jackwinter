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
          weeks: [{ contributionDays: [{ date: "2026-11-02", contributionCount: 4 }] }],
        },
      },
    },
  },
};

describe("loadGitHubData", () => {
  it("returns star counts and activity when GitHub answers", async () => {
    const fetcher: typeof fetch = async (input) =>
      String(input).endsWith("/graphql") ? json(calendar) : json({ stargazers_count: 7 });
    const data = await loadGitHubData({ repos: ["me/a"], login: "me", token: "t", today: "2026-11-16", fetcher });
    expect(data.stars.get("me/a")).toBe(7);
    expect(data.activity?.total).toBe(4);
    expect(data.problems).toEqual([]);
  });

  it("leaves out what failed and reports why", async () => {
    const fetcher: typeof fetch = async (input) => {
      const url = String(input);
      if (url.endsWith("/graphql")) throw new Error("socket closed");
      return url.endsWith("/broken") ? json({}, 404) : json({ stargazers_count: 2 });
    };
    const data = await loadGitHubData({ repos: ["me/ok", "me/broken"], login: "me", token: "t", today: "2026-11-16", fetcher });
    expect([...data.stars]).toEqual([["me/ok", 2]]);
    expect(data.activity).toBeUndefined();
    expect(data.problems).toEqual(["stars for me/broken: GitHub returned 404 for me/broken", "activity: socket closed"]);
  });

  it("skips activity without a token", async () => {
    const fetcher: typeof fetch = async () => json({ stargazers_count: 0 });
    const data = await loadGitHubData({ repos: [], login: "me", token: undefined, today: "2026-11-16", fetcher });
    expect(data.activity).toBeUndefined();
    expect(data.problems).toEqual(["activity: GITHUB_TOKEN is not set"]);
  });
});
