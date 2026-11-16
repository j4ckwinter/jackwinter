// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { enhanceThemeToggle, resolveTheme, storedTheme, themeBootScript } from "../src/scripts/theme";

describe("resolveTheme", () => {
  it("prefers the visitor's saved choice over the system", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme(undefined, true)).toBe("dark");
    expect(resolveTheme(undefined, false)).toBe("light");
  });

  it("ignores anything saved that isn't a theme", () => {
    expect(storedTheme("sepia")).toBeUndefined();
    expect(storedTheme("dark")).toBe("dark");
  });
});

describe("theme toggle", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.dataset.resolvedTheme = "light";
    document.head.innerHTML = `
      <meta name="theme-color" data-theme-for="light" data-surface="#ffffff" content="#ffffff">
      <meta name="theme-color" data-theme-for="dark" data-surface="#0a0a0a" content="#0a0a0a">`;
    document.body.replaceWith(document.createElement("body"));
    document.body.innerHTML = `<button data-theme-toggle><svg></svg></button>`;
  });

  it("flips to the other theme, remembers it, and matches the browser bar", () => {
    const storage = { getItem: vi.fn(), setItem: vi.fn() };
    enhanceThemeToggle(document.body, storage, () => true);
    document.querySelector("svg")!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.resolvedTheme).toBe("dark");
    expect(storage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect([...document.querySelectorAll("meta")].map((meta) => meta.content)).toEqual(["#0a0a0a", "#0a0a0a"]);
  });

  it("still switches when the browser won't store anything", () => {
    const storage = { getItem: vi.fn(), setItem: vi.fn(() => { throw new Error("private mode"); }) };
    enhanceThemeToggle(document.body, storage, () => true);
    document.querySelector("button")!.click();
    expect(document.documentElement.dataset.resolvedTheme).toBe("dark");
  });
});

describe("themeBootScript", () => {
  it("applies a saved theme before the page paints", () => {
    document.documentElement.removeAttribute("data-theme");
    vi.stubGlobal("localStorage", { getItem: (key: string) => (key === "theme" ? "dark" : null) });
    new Function(themeBootScript)();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.resolvedTheme).toBe("dark");
    vi.unstubAllGlobals();
  });
});
