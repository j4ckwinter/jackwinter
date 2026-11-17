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

export function formatTenure(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [years > 0 && `${years} ${years === 1 ? "yr" : "yrs"}`, rest > 0 && `${rest} ${rest === 1 ? "mo" : "mos"}`];
  return parts.filter(Boolean).join(" ");
}

export const RANGE_SEPARATOR = " – ";
export const ONGOING = "now";

export function formatDateRange({ start, end }: { start: string; end?: string }): string {
  return `${start}${RANGE_SEPARATOR}${end ?? ONGOING}`;
}

export const displayHost = (site: URL) => site.host.replace(/^www\./, "");

export function formatFileSize(bytes: number): string {
  const kilobytes = bytes / 1000;
  return kilobytes < 1000 ? `${Math.max(1, Math.round(kilobytes))} KB` : `${(kilobytes / 1000).toFixed(1)} MB`;
}

export const canonicalUrl = (pathname: string, site: URL) => new URL(pathname.replace(/(.)\/$/, "$1"), site);
