const READING_LINE = 0.3;

type Heading = { id: string; top: number };

export function currentSection(headings: Heading[], line: number, atEnd: boolean): string | undefined {
  if (atEnd) return headings.at(-1)?.id;
  return headings.filter((heading) => heading.top <= line).at(-1)?.id;
}

type Viewport = Pick<Window, "document" | "innerHeight" | "scrollY" | "addEventListener" | "requestAnimationFrame">;

export function enhanceCurrentSection(nav: Element, view: Viewport): void {
  const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const targets = links.map((link) => view.document.getElementById(link.getAttribute("href")!.slice(1))).filter((target) => target !== null);
  let pending = false;

  const update = () => {
    pending = false;
    const atEnd = view.scrollY > 0 && view.scrollY + view.innerHeight >= view.document.documentElement.scrollHeight - 1;
    const headings = targets.map((target) => ({ id: target.id, top: target.getBoundingClientRect().top }));
    const current = currentSection(headings, view.innerHeight * READING_LINE, atEnd);
    for (const link of links) {
      if (link.getAttribute("href") === `#${current}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };
  const schedule = () => {
    if (pending) return;
    pending = true;
    view.requestAnimationFrame(update);
  };

  view.addEventListener("scroll", schedule, { passive: true });
  view.addEventListener("resize", schedule);
  update();
}
