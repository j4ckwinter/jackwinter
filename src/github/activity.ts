export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = { date: string; count: number; level: ContributionLevel; weekday: number };

export type ContributionCalendar = { total: number; weeks: ContributionDay[][] };

export type ContributionGrid = ContributionCalendar & { monthLabels: string[] };

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthStartingIn(week: ContributionDay[]): string {
  const firstOfMonth = week.find((day) => day.date.endsWith("-01"));
  return firstOfMonth ? MONTH_LABELS[Number(firstOfMonth.date.slice(5, 7)) - 1] : "";
}

export function buildContributionGrid(calendar: ContributionCalendar): ContributionGrid {
  return { ...calendar, monthLabels: calendar.weeks.map(monthStartingIn) };
}
