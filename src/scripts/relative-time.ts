const DAY_MS = 86_400_000;
const WEEK_DAYS = 7;
const MONTH_DAYS = 30;

export function describeAge(isoDateTime: string, now: Date): string {
  const days = Math.max(0, Math.floor((now.getTime() - new Date(isoDateTime).getTime()) / DAY_MS));
  const format = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
  if (days < WEEK_DAYS) return format.format(-days, "day");
  if (days < MONTH_DAYS) return format.format(-Math.floor(days / WEEK_DAYS), "week");
  return format.format(-Math.floor(days / MONTH_DAYS), "month");
}

export function enhanceRelativeTimes(root: ParentNode, now: () => Date): void {
  for (const time of root.querySelectorAll<HTMLTimeElement>("time[data-relative]")) {
    time.title = time.textContent?.trim() ?? "";
    time.textContent = describeAge(time.dateTime, now());
  }
}
