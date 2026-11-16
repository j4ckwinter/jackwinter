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
});
