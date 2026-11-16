import type { ContributionDay } from "./github/activity";

const LOCALE = "en-GB";

export function formatCount(count: number): string {
  return count.toLocaleString(LOCALE);
}

function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function describeContributionDay({ date, count }: Pick<ContributionDay, "date" | "count">): string {
  const amount = count === 0 ? "No contributions" : count === 1 ? "1 contribution" : `${formatCount(count)} contributions`;
  return `${amount} on ${formatDate(date)}`;
}

export function formatShortDate(isoDate: string, today: string): string {
  const date = new Date(isoDate);
  const sameYear = date.getUTCFullYear() === Number(today.slice(0, 4));
  return date.toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
    timeZone: "UTC",
  });
}

export function formatDateRange({ start, end }: { start: string; end?: string }): string {
  return `${start} – ${end ?? "now"}`;
}
