import { describe, expect, it } from "vitest";
import { personSchema } from "../src/agents/structured-data";
import { page } from "../src/content/page";

describe("personSchema", () => {
  const schema = personSchema(page, new URL("https://example.com"));

  it("describes the person and where they work now", () => {
    expect(schema).toMatchObject({ "@type": "Person", name: page.profile.name, worksFor: { name: "KTO Group" } });
  });

  it("lists profiles elsewhere but not the email or CV links", () => {
    expect(schema.sameAs).toEqual(["https://github.com/j4ckwinter", "https://linkedin.com/in/jack-winter-409a09a4"]);
  });

  it("points at the share card on this site", () => {
    expect(schema.image).toBe("https://example.com/og.png");
  });
});
