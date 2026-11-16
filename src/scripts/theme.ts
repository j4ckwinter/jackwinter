export type Theme = "light" | "dark";

type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => ViewTransition };
type Storage = Pick<globalThis.Storage, "getItem" | "setItem">;

export const THEME_KEY = "theme";
const REVEAL_MS = 500;
const REVEAL_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export function storedTheme(value: string | null): Theme | undefined {
  return value === "light" || value === "dark" ? value : undefined;
}

export function resolveTheme(stored: Theme | undefined, prefersDark: boolean): Theme {
  return stored ?? (prefersDark ? "dark" : "light");
}

function surfaceFor(doc: Document, theme: Theme): string | undefined {
  return doc.querySelector<HTMLMetaElement>(`meta[name="theme-color"][data-theme-for="${theme}"]`)?.dataset.surface;
}

function applyTheme(doc: Document, theme: Theme): void {
  const root = doc.documentElement;
  root.dataset.theme = theme;
  root.dataset.resolvedTheme = theme;
  const surface = surfaceFor(doc, theme);
  if (surface) for (const meta of doc.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) meta.content = surface;
}

function remember(storage: Storage | undefined, theme: Theme): void {
  try {
    storage?.setItem(THEME_KEY, theme);
  } catch {}
}

export const themeBootScript = `(() => {
  const root = document.documentElement;
  let stored = null;
  try { stored = window.localStorage.getItem("${THEME_KEY}"); } catch {}
  if (stored === "light" || stored === "dark") root.dataset.theme = stored;
  root.dataset.resolvedTheme = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
})();`;

function revealFrom(doc: Document, button: Element): void {
  const { left, top, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const view = doc.defaultView;
  const radius = Math.hypot(Math.max(x, (view?.innerWidth ?? 0) - x), Math.max(y, (view?.innerHeight ?? 0) - y));
  doc.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
    { duration: REVEAL_MS, easing: REVEAL_EASING, pseudoElement: "::view-transition-new(root)" },
  );
}

export function enhanceThemeToggle(root: Node, storage: Storage | undefined, reducedMotion: () => boolean): void {
  const doc: ViewTransitionDocument = root.ownerDocument ?? (root as Document);
  root.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-theme-toggle]") : null;
    if (!button) return;
    const next: Theme = doc.documentElement.dataset.resolvedTheme === "dark" ? "light" : "dark";
    const update = () => {
      applyTheme(doc, next);
      remember(storage, next);
    };
    if (!doc.startViewTransition || reducedMotion()) return update();
    doc.documentElement.classList.add("theme-switching");
    const transition = doc.startViewTransition(update);
    transition.ready.then(() => revealFrom(doc, button));
    transition.finished.finally(() => doc.documentElement.classList.remove("theme-switching"));
  });
}

export function followSystemTheme(doc: Document, prefersDark: MediaQueryList): void {
  prefersDark.addEventListener("change", (event) => {
    if (!doc.documentElement.dataset.theme) doc.documentElement.dataset.resolvedTheme = event.matches ? "dark" : "light";
  });
}
