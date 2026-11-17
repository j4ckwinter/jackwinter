const CONFIRMATION_MS = 2000;

type Clipboard = Pick<globalThis.Clipboard, "writeText">;

function nearestStatus(link: Element): HTMLElement | null {
  for (let scope = link.parentElement; scope; scope = scope.parentElement) {
    const status = scope.querySelector<HTMLElement>("[data-copy-status]");
    if (status) return status;
  }
  return null;
}

export function enhanceCopyEmail(root: ParentNode & EventTarget, clipboard: Clipboard | undefined): void {
  if (!clipboard) return;
  let hide: ReturnType<typeof setTimeout> | undefined;
  root.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-copy-email]") : null;
    if (!link) return;
    const status = nearestStatus(link);
    clipboard.writeText(link.dataset.copyEmail ?? "").then(() => {
      if (!status) return;
      status.textContent = "email copied";
      status.dataset.shown = "";
      clearTimeout(hide);
      hide = setTimeout(() => delete status.dataset.shown, CONFIRMATION_MS);
    });
  });
}
