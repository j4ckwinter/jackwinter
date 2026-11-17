import { describe, expect, it } from "vitest";
import { helloHref } from "../src/contact";

describe("helloHref", () => {
  it("opens an email with a subject naming the site", () => {
    expect(helloHref("me@example.com", new URL("https://www.example.com"))).toBe("mailto:me@example.com?subject=hello%20from%20example.com");
  });
});
