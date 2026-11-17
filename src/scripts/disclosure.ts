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

function highlight(target: HTMLElement): void {
  target.focus({ preventScroll: true });
  target.dataset.highlight = "";
  setTimeout(() => delete target.dataset.highlight, HIGHLIGHT_MS);
}

function revealAfterwards(target: HTMLElement, reducedMotion: boolean): void {
  target.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  highlight(target);
}

function setOpen(doc: Document, panelId: string, expanded: boolean): void {
  for (const control of doc.querySelectorAll(`[aria-controls="${panelId}"]`)) control.setAttribute("aria-expanded", String(expanded));
  doc.getElementById(panelId)?.toggleAttribute("data-open", expanded);
}

const isDisclosurePanel = (doc: Document, element: Element) => element.id !== "" && doc.querySelector(`[${MARKER}][aria-controls="${element.id}"]`) !== null;

export function openToTarget(doc: Document, id: string): void {
  const target = id ? doc.getElementById(id) : null;
  if (!target) return;
  const enclosing: string[] = [];
  for (let element: Element | null = target; element; element = element.parentElement) if (isDisclosurePanel(doc, element)) enclosing.push(element.id);
  if (enclosing.length === 0) return;
  const own = [...target.querySelectorAll(`[${MARKER}]`)].map((button) => button.getAttribute("aria-controls") ?? "");
  for (const panelId of [...enclosing, ...own]) setOpen(doc, panelId, true);
  target.scrollIntoView({ block: "start" });
  highlight(target);
}

function toggleDisclosure(button: Element, doc: ViewTransitionDocument, reducedMotion: boolean): void {
  const panelId = button.getAttribute("aria-controls") ?? "";
  const expanded = button.getAttribute("aria-expanded") !== "true";
  const reveal = doc.getElementById(button.getAttribute("data-reveal") ?? "");

  const update = () => setOpen(doc, panelId, expanded);

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
