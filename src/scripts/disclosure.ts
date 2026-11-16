type ViewTransition = { finished: Promise<void> };
type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => ViewTransition };

const MARKER = "data-disclosure";
const HIGHLIGHT_MS = 1600;

type DisclosureButton = { "data-disclosure": ""; "aria-controls": string; "aria-expanded": "false"; "data-reveal"?: string };

export function disclosureButton(controls: string, reveal?: string): DisclosureButton {
  const button: DisclosureButton = { [MARKER]: "", "aria-controls": controls, "aria-expanded": "false" };
  if (reveal) button["data-reveal"] = reveal;
  return button;
}

function revealAfterwards(target: HTMLElement, reducedMotion: boolean): void {
  target.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  target.focus({ preventScroll: true });
  target.dataset.highlight = "";
  setTimeout(() => delete target.dataset.highlight, HIGHLIGHT_MS);
}

function toggleDisclosure(button: Element, doc: ViewTransitionDocument, reducedMotion: boolean): void {
  const panelId = button.getAttribute("aria-controls") ?? "";
  const expanded = button.getAttribute("aria-expanded") !== "true";
  const reveal = doc.getElementById(button.getAttribute("data-reveal") ?? "");

  const update = () => {
    for (const control of doc.querySelectorAll(`[aria-controls="${panelId}"]`)) control.setAttribute("aria-expanded", String(expanded));
    doc.getElementById(panelId)?.toggleAttribute("data-open", expanded);
  };

  if (doc.startViewTransition && !reducedMotion) {
    const transition = doc.startViewTransition(update);
    if (reveal) transition.finished.then(() => revealAfterwards(reveal, reducedMotion));
  } else {
    update();
    if (reveal) revealAfterwards(reveal, reducedMotion);
  }
}

export function enhanceDisclosures(root: Node, prefersReducedMotion: () => boolean): void {
  const doc = root.ownerDocument ?? (root as Document);
  root.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(`button[${MARKER}]`) : null;
    if (button) toggleDisclosure(button, doc, prefersReducedMotion());
  });
}
