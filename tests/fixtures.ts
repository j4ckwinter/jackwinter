import type { ContributionDay, ContributionLevel } from "../src/github/activity";

export function day(date: string, count = 0, level: ContributionLevel = 0): ContributionDay {
  return { date, count, level, weekday: new Date(`${date}T00:00:00Z`).getUTCDay() };
}

export function week(firstDate: string, length = 7): ContributionDay[] {
  const start = new Date(`${firstDate}T00:00:00Z`);
  return Array.from({ length }, (_, offset) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + offset);
    return day(date.toISOString().slice(0, 10));
  });
}
