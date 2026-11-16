type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => unknown };

const MARKER = "data-disclosure";

export function disclosureButton(controls: string) {
  return { [MARKER]: "", "aria-controls": controls, "aria-expanded": "false" } as const;
}

function setExpanded(button: Element, expanded: boolean, doc: Document): void {
  button.setAttribute("aria-expanded", String(expanded));
  doc.getElementById(button.getAttribute("aria-controls") ?? "")?.toggleAttribute("data-open", expanded);
}

function toggleDisclosure(button: Element, doc: ViewTransitionDocument, reducedMotion: boolean): void {
  const expanded = button.getAttribute("aria-expanded") !== "true";
  const update = () => setExpanded(button, expanded, doc);
  if (doc.startViewTransition && !reducedMotion) doc.startViewTransition(update);
  else update();
}

export function enhanceDisclosures(root: Node, prefersReducedMotion: () => boolean): void {
  const doc = root.ownerDocument ?? (root as Document);
  root.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(`button[${MARKER}]`) : null;
    if (button) toggleDisclosure(button, doc, prefersReducedMotion());
  });
}
