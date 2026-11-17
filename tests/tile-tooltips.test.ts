// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { enhanceTileTooltips } from "../src/scripts/tile-tooltips";

function render() {
  document.body.innerHTML = `
    <div data-tile-tooltips>
      <div data-scroll-end><div role="img"><div data-day="2026-11-01" data-count="3"></div><div data-day="2026-11-02" data-count="0"></div></div></div>
      <div data-tooltip></div>
    </div>`;
  const graph = document.querySelector<HTMLElement>("[data-tile-tooltips]")!;
  enhanceTileTooltips(graph);
  return { graph, tiles: [...graph.querySelectorAll("[data-day]")], tooltip: graph.querySelector<HTMLElement>("[data-tooltip]")! };
}

const hover = (element: Element, pointerType = "mouse") => element.dispatchEvent(new PointerEvent("pointerover", { bubbles: true, pointerType }));

describe("tile tooltips", () => {
  it("describes the day under the pointer straight away", () => {
    const { tiles, tooltip } = render();
    hover(tiles[0]);
    expect(tooltip.textContent).toBe("3 contributions on 1 November 2026");
    expect(tooltip.hasAttribute("data-shown")).toBe(true);
    hover(tiles[1]);
    expect(tooltip.textContent).toBe("No contributions on 2 November 2026");
  });

  it("hides when the pointer leaves the graph", () => {
    const { graph, tiles, tooltip } = render();
    hover(tiles[0]);
    graph.dispatchEvent(new PointerEvent("pointerleave", { pointerType: "mouse" }));
    expect(tooltip.hasAttribute("data-shown")).toBe(false);
  });

  it("keeps a tapped day's tooltip after the finger lifts, until a tap elsewhere", () => {
    const { graph, tiles, tooltip } = render();
    hover(tiles[0], "touch");
    graph.dispatchEvent(new PointerEvent("pointerleave", { pointerType: "touch" }));
    expect(tooltip.textContent).toBe("3 contributions on 1 November 2026");
    expect(tooltip.hasAttribute("data-shown")).toBe(true);
    tiles[1].dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerType: "touch" }));
    expect(tooltip.hasAttribute("data-shown")).toBe(true);
    document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerType: "touch" }));
    expect(tooltip.hasAttribute("data-shown")).toBe(false);
  });
});
