import { describe, expect, it } from "vitest";
import NotFound from "../src/pages/404.astro";
import { render } from "./render";

describe("not found page", () => {
  it("points old portfolio links at the case study and the start", async () => {
    const page = await render(NotFound, {});
    expect(page.querySelector('a[href="/work/kto"]')?.textContent).toBe("here now");
    expect(page.querySelector('a[href="/"]')?.textContent).toBe("back to the start");
  });
});
