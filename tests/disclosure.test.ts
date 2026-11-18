// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enhanceDisclosures, openToTarget } from "../src/scripts/disclosure";

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

describe("closing from below", () => {
  function renderWithReturn() {
    const root = document.createElement("div");
    document.body.replaceChildren(root);
    root.innerHTML = `
      <h2 id="heading">Skills</h2>
      <div id="panel"><button data-disclosure aria-controls="panel" aria-expanded="true" data-return="heading">See less</button></div>`;
    root.querySelector("#panel")!.setAttribute("data-open", "");
    const heading = root.querySelector<HTMLElement>("#heading")!;
    heading.scrollIntoView = vi.fn();
    return { root, heading, button: root.querySelector("button")! };
  }

  it("brings the heading back into view when it closes the panel", () => {
    const { root, heading, button } = renderWithReturn();
    enhanceDisclosures(root, () => true);
    button.click();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(heading.scrollIntoView).toHaveBeenCalledWith({ block: "nearest", behavior: "auto" });
  });

  it("stays put when it opens the panel", () => {
    const { root, heading, button } = renderWithReturn();
    button.setAttribute("aria-expanded", "false");
    enhanceDisclosures(root, () => true);
    button.click();
    expect(heading.scrollIntoView).not.toHaveBeenCalled();
  });
});

describe("opening to a linked item", () => {
  function renderNested() {
    document.body.innerHTML = `
      <button data-disclosure aria-controls="list" aria-expanded="false">See more</button>
      <h2 id="heading">Experience</h2>
      <ol id="list">
        <li id="row" tabindex="-1">
          <button data-disclosure aria-controls="details" aria-expanded="false"></button>
          <div id="details"></div>
        </li>
      </ol>`;
    Element.prototype.scrollIntoView = vi.fn();
  }

  it("opens the list holding the item and the item's own details, then scrolls to it", () => {
    renderNested();
    openToTarget(document, "row");
    expect(document.getElementById("list")!.hasAttribute("data-open")).toBe(true);
    expect(document.getElementById("details")!.hasAttribute("data-open")).toBe(true);
    expect(document.activeElement?.id).toBe("row");
    expect(document.getElementById("row")!.scrollIntoView).toHaveBeenCalled();
  });

  it("leaves ordinary anchors to the browser", () => {
    renderNested();
    openToTarget(document, "heading");
    expect(document.getElementById("list")!.hasAttribute("data-open")).toBe(false);
    expect(document.activeElement?.id).not.toBe("heading");
  });

  it("does nothing for a missing or empty target", () => {
    renderNested();
    openToTarget(document, "");
    openToTarget(document, "nowhere");
    expect(document.querySelectorAll("[data-open]")).toHaveLength(0);
  });
});
