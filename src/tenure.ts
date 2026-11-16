const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Span = { start: string; end?: string };

function monthNumber(label: string): number {
  const [month, year] = label.split(" ");
  const index = MONTHS.indexOf(month);
  if (index === -1 || !/^\d{4}$/.test(year ?? "")) throw new Error(`expected a month like "Jun 2025", got "${label}"`);
  return Number(year) * 12 + index;
}

function monthOf(isoDate: string): number {
  const [year, month] = isoDate.split("-").map(Number);
  return year * 12 + month - 1;
}

export function monthsSpanned({ start, end }: Span, today: string): number {
  return (end ? monthNumber(end) : monthOf(today)) - monthNumber(start) + 1;
}

export function wholeYearsAcross(spans: Span[], today: string): number {
  return Math.floor(spans.reduce((total, span) => total + monthsSpanned(span, today), 0) / 12);
}
