// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enhanceDisclosures } from "../src/scripts/disclosure";

function render() {
  const root = document.createElement("div");
  document.body.replaceChildren(root);
  root.innerHTML = `
    <button data-disclosure aria-controls="panel" aria-expanded="false"><span>See more</span></button>
    <div id="panel"></div>`;
  return { root, button: root.querySelector("button")!, panel: root.querySelector<HTMLElement>("#panel")! };
}

describe("disclosures", () => {
  beforeEach(() => {
    Reflect.deleteProperty(document, "startViewTransition");
  });

  it("opens and closes the panel it controls", () => {
    const { root, button, panel } = render();
    enhanceDisclosures(root, () => false);
    button.querySelector("span")!.click();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(panel.hasAttribute("data-open")).toBe(true);
    button.click();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(panel.hasAttribute("data-open")).toBe(false);
  });

  it("animates the change with a view transition when the browser has one", () => {
    const { root, button, panel } = render();
    const startViewTransition = vi.fn((update: () => void) => update());
    Object.assign(document, { startViewTransition });
    enhanceDisclosures(root, () => false);
    button.click();
    expect(startViewTransition).toHaveBeenCalledOnce();
    expect(panel.hasAttribute("data-open")).toBe(true);
  });

  it("skips the animation for people who prefer reduced motion", () => {
    const { root, button, panel } = render();
    const startViewTransition = vi.fn();
    Object.assign(document, { startViewTransition });
    enhanceDisclosures(root, () => true);
    button.click();
    expect(startViewTransition).not.toHaveBeenCalled();
    expect(panel.hasAttribute("data-open")).toBe(true);
  });

  it("keeps every button for the same panel in step", () => {
    const root = document.createElement("div");
    document.body.replaceChildren(root);
    root.innerHTML = `
      <button data-disclosure aria-controls="panel" aria-expanded="false">See more</button>
      <button data-disclosure aria-controls="panel" aria-expanded="false">Acme</button>
      <div id="panel"></div>`;
    enhanceDisclosures(root, () => true);
    root.querySelectorAll("button")[1].click();
    expect([...root.querySelectorAll("button")].map((button) => button.getAttribute("aria-expanded"))).toEqual(["true", "true"]);
  });

  it("brings the role it was asked to reveal into view and focus", () => {
    const root = document.createElement("div");
    document.body.replaceChildren(root);
    root.innerHTML = `
      <button data-disclosure aria-controls="panel" aria-expanded="false" data-reveal="role">Acme</button>
      <div id="panel"><li id="role" tabindex="-1">Acme</li></div>`;
    const role = root.querySelector<HTMLElement>("#role")!;
    const scrollIntoView = vi.fn();
    role.scrollIntoView = scrollIntoView;
    enhanceDisclosures(root, () => true);
    root.querySelector("button")!.click();
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest", behavior: "auto" });
    expect(document.activeElement).toBe(role);
    expect(role.hasAttribute("data-highlight")).toBe(true);
  });
});
