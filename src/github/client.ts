import type { ContributionCalendar } from "./activity";

type Fetch = typeof fetch;

const API = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 10_000;

const CONTRIBUTIONS_QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

type ContributionsResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
};

function headers(token: string | undefined): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "jackwinter-site",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchStarCount(repo: string, token: string | undefined, fetcher: Fetch = fetch): Promise<number> {
  const response = await fetcher(`${API}/repos/${repo}`, { headers: headers(token), signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!response.ok) throw new Error(`GitHub returned ${response.status} for ${repo}`);
  const body = (await response.json()) as { stargazers_count: number };
  return body.stargazers_count;
}

export async function fetchContributionCalendar(login: string, token: string, fetcher: Fetch = fetch): Promise<ContributionCalendar> {
  const response = await fetcher(`${API}/graphql`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login } }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`GitHub returned ${response.status} for ${login}'s contributions`);
  const body = (await response.json()) as ContributionsResponse;
  const user = body.data?.user;
  if (!user) throw new Error(`GitHub returned no contributions for ${login}: ${body.errors?.map((e) => e.message).join("; ") ?? "unknown user"}`);
  const calendar = user.contributionsCollection.contributionCalendar;
  return {
    total: calendar.totalContributions,
    days: calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
    ),
  };
}
