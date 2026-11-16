export type ContributionDay = { date: string; count: number };

export type ContributionCalendar = { total: number; days: ContributionDay[] };

export type MonthActivity = {
  month: string;
  label: string;
  total: number;
  share: number;
};

export type Activity = { total: number; months: MonthActivity[] };

const MONTHS_SHOWN = 12;
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthKey(year: number, monthIndex: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
}

function recentMonthKeys(today: string): string[] {
  const [year, month] = today.split("-").map(Number);
  return Array.from({ length: MONTHS_SHOWN }, (_, offset) => {
    const date = new Date(Date.UTC(year, month - 1 - (MONTHS_SHOWN - 1 - offset), 1));
    return monthKey(date.getUTCFullYear(), date.getUTCMonth());
  });
}

export function summariseActivity({ total, days }: ContributionCalendar, today: string): Activity {
  const keys = recentMonthKeys(today);
  const totals = new Map(keys.map((key) => [key, 0]));
  for (const day of days) {
    const key = day.date.slice(0, 7);
    const current = totals.get(key);
    if (current !== undefined) totals.set(key, current + day.count);
  }
  const busiest = Math.max(0, ...totals.values());
  const months = keys.map((key) => {
    const total = totals.get(key) ?? 0;
    return {
      month: key,
      label: MONTH_LABELS[Number(key.slice(5)) - 1],
      total,
      share: busiest === 0 ? 0 : total / busiest,
    };
  });
  return { total, months };
}
