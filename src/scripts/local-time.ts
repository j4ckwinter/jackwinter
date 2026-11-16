const REFRESH_MS = 30_000;

export function formatLocalTime(now: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).format(now);
}

export function enhanceLocalTime(root: ParentNode, now: () => Date): void {
  const clocks = [...root.querySelectorAll<HTMLElement>("[data-local-time]")];
  const tick = () => {
    for (const clock of clocks) {
      clock.textContent = formatLocalTime(now(), clock.dataset.timeZone ?? "UTC");
      clock.dataset.ready = "";
    }
  };
  tick();
  if (clocks.length > 0) setInterval(tick, REFRESH_MS);
}
