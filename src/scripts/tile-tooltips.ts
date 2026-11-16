import { describeContributionDay } from "../format";

const GAP_ABOVE_TILE = 6;

export function enhanceTileTooltips(graph: HTMLElement): void {
  const tooltip = graph.querySelector<HTMLElement>("[data-tooltip]");
  if (!tooltip) return;

  const hide = () => delete tooltip.dataset.shown;

  graph.addEventListener("pointerover", (event) => {
    const tile = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-day]") : null;
    if (!tile) return hide();
    tooltip.textContent = describeContributionDay({ date: tile.dataset.day ?? "", count: Number(tile.dataset.count) });
    const area = graph.getBoundingClientRect();
    const box = tile.getBoundingClientRect();
    const halfWidth = tooltip.offsetWidth / 2;
    const centre = box.left - area.left + box.width / 2;
    const left = Math.min(Math.max(centre, halfWidth), area.width - halfWidth);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${box.top - area.top - GAP_ABOVE_TILE}px`;
    tooltip.dataset.shown = "";
  });
  graph.addEventListener("pointerleave", hide);
  graph.querySelector("[data-scroll-end]")?.addEventListener("scroll", hide);
}
