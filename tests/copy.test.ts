// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { enhanceCopy } from "../src/scripts/copy";

function render() {
  const root = document.createElement("div");
  document.body.replaceChildren(root);
  root.innerHTML = `<a href="mailto:me@example.com" data-copy="me@example.com" data-copy-message="email copied">say hello</a><span data-copy-status></span>`;
  return { root, link: root.querySelector("a")!, status: root.querySelector<HTMLElement>("[data-copy-status]")! };
}

describe("copy", () => {
  afterEach(() => vi.useRealTimers());

  it("copies the address and confirms it briefly", async () => {
    vi.useFakeTimers();
    const { root, link, status } = render();
    const writeText = vi.fn(() => Promise.resolve());
    enhanceCopy(root, { writeText });
    link.click();
    await vi.waitFor(() => expect(status.hasAttribute("data-shown")).toBe(true));
    expect(writeText).toHaveBeenCalledWith("me@example.com");
    expect(status.textContent).toBe("email copied");
    vi.advanceTimersByTime(2000);
    expect(status.hasAttribute("data-shown")).toBe(false);
  });

  it("confirms beside the link that was clicked", async () => {
    const root = document.createElement("div");
    document.body.replaceChildren(root);
    root.innerHTML = `
      <p><a data-copy="me@example.com" data-copy-message="email copied"></a><span id="far" data-copy-status></span></p>
      <p><a id="clicked" data-copy="me@example.com" data-copy-message="email copied"></a><span id="near" data-copy-status></span></p>`;
    enhanceCopy(root, { writeText: () => Promise.resolve() });
    root.querySelector<HTMLElement>("#clicked")!.click();
    await vi.waitFor(() => expect(root.querySelector("#near")!.hasAttribute("data-shown")).toBe(true));
    expect(root.querySelector("#far")!.hasAttribute("data-shown")).toBe(false);
  });

  it("leaves the mail link to work alone when there is no clipboard", () => {
    const { root, link, status } = render();
    enhanceCopy(root, undefined);
    link.click();
    expect(status.hasAttribute("data-shown")).toBe(false);
  });
});
