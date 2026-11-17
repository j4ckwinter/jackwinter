const CONFIRMATION_MS = 2000;

type Clipboard = Pick<globalThis.Clipboard, "writeText">;

function nearestStatus(link: Element): HTMLElement | null {
  for (let scope = link.parentElement; scope; scope = scope.parentElement) {
    const status = scope.querySelector<HTMLElement>("[data-copy-status]");
    if (status) return status;
  }
  return null;
}

export function enhanceCopy(root: ParentNode & EventTarget, clipboard: Clipboard | undefined): void {
  if (!clipboard) return;
  const hideTimers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();
  root.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-copy]") : null;
    if (!link) return;
    const status = nearestStatus(link);
    clipboard.writeText(link.dataset.copy ?? "").then(() => {
      if (!status) return;
      status.textContent = link.dataset.copyMessage ?? "copied";
      status.dataset.shown = "";
      clearTimeout(hideTimers.get(status));
      hideTimers.set(status, setTimeout(() => delete status.dataset.shown, CONFIRMATION_MS));
    });
  });
}
