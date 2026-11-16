export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = { date: string; count: number; level: ContributionLevel; weekday: number };

export type ContributionCalendar = { total: number; weeks: ContributionDay[][] };

export type ContributionGrid = ContributionCalendar & { monthLabels: string[] };

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthStartingIn(week: ContributionDay[]): string {
  const firstOfMonth = week.find((day) => day.date.endsWith("-01"));
  return firstOfMonth ? MONTH_LABELS[Number(firstOfMonth.date.slice(5, 7)) - 1] : "";
}

export type ContributionHighlights = { longestStreak: number; busiestDay: ContributionDay | undefined };

export function contributionHighlights(grid: ContributionCalendar): ContributionHighlights {
  let longestStreak = 0;
  let streak = 0;
  let busiestDay: ContributionDay | undefined;
  for (const day of grid.weeks.flat()) {
    streak = day.count > 0 ? streak + 1 : 0;
    longestStreak = Math.max(longestStreak, streak);
    if (day.count > (busiestDay?.count ?? 0)) busiestDay = day;
  }
  return { longestStreak, busiestDay };
}

export function buildContributionGrid(calendar: ContributionCalendar): ContributionGrid {
  return { ...calendar, monthLabels: calendar.weeks.map(monthStartingIn) };
}
