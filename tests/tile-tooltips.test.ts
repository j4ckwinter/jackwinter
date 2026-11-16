// @vitest-environment happy-dom
import { describe, expect, it } from "vitest";
import { enhanceTileTooltips } from "../src/scripts/tile-tooltips";

function render() {
  document.body.innerHTML = `
    <div data-tile-tooltips>
      <div data-scroll-end><ol><li data-day="2026-11-01" data-count="3"></li><li data-day="2026-11-02" data-count="0"></li></ol></div>
      <div data-tooltip></div>
    </div>`;
  const graph = document.querySelector<HTMLElement>("[data-tile-tooltips]")!;
  enhanceTileTooltips(graph);
  return { graph, tiles: [...graph.querySelectorAll("li")], tooltip: graph.querySelector<HTMLElement>("[data-tooltip]")! };
}

const hover = (element: Element) => element.dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));

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
    graph.dispatchEvent(new PointerEvent("pointerleave"));
    expect(tooltip.hasAttribute("data-shown")).toBe(false);
  });
});
