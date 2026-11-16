export function hiddenLabelIndexes(labelLefts: (number | undefined)[], scrollLeft: number): number[] {
  return labelLefts.flatMap((left, index) => (left !== undefined && left < scrollLeft ? [index] : []));
}

export function enhanceContributionScroll(scroller: HTMLElement): void {
  const labels = [...scroller.querySelectorAll<HTMLElement>("[data-month-label]")];
  const hideClippedLabels = () => {
    const hidden = new Set(hiddenLabelIndexes(labels.map((label) => (label.textContent ? label.offsetLeft : undefined)), scroller.scrollLeft));
    labels.forEach((label, index) => (label.style.visibility = hidden.has(index) ? "hidden" : ""));
  };
  scroller.scrollLeft = scroller.scrollWidth;
  hideClippedLabels();
  scroller.addEventListener("scroll", hideClippedLabels, { passive: true });
}
