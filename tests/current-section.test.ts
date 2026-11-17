// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { currentSection, enhanceCurrentSection } from "../src/scripts/current-section";

const headings = [
  { id: "results", top: -900 },
  { id: "loading", top: -200 },
  { id: "measurement", top: 400 },
];

describe("currentSection", () => {
  it("picks the last heading that has scrolled above the reading line", () => {
    expect(currentSection(headings, 300, false)).toBe("loading");
  });

  it("picks nothing before the first heading reaches the line", () => {
    expect(currentSection([{ id: "results", top: 500 }], 300, false)).toBeUndefined();
  });

  it("picks the last section at the bottom of the page, even if its heading never reaches the line", () => {
    expect(currentSection(headings, 300, true)).toBe("measurement");
  });
});

describe("enhanceCurrentSection", () => {
  it("marks the pill for the section being read, and moves the mark as the page scrolls", () => {
    document.body.innerHTML = `
      <nav><a href="#results">Results</a><a href="#loading">Loading</a></nav>
      <h2 id="results"></h2><h2 id="loading"></h2>`;
    const tops: Record<string, number> = { results: -100, loading: 600 };
    for (const heading of document.querySelectorAll("h2")) heading.getBoundingClientRect = () => ({ top: tops[heading.id] }) as DOMRect;
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 5000, configurable: true });
    const listeners: Record<string, () => void> = {};
    const view = { document, innerHeight: 1000, scrollY: 100, addEventListener: (type: string, listener: () => void) => (listeners[type] = listener), requestAnimationFrame: (callback: FrameRequestCallback) => (callback(0), 0) };
    enhanceCurrentSection(document.querySelector("nav")!, view as never);
    const marked = () => [...document.querySelectorAll('[aria-current="location"]')].map((link) => link.textContent);
    expect(marked()).toEqual(["Results"]);
    tops.loading = 200;
    listeners.scroll();
    expect(marked()).toEqual(["Loading"]);
  });
});
