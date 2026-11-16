import { describe, expect, it } from "vitest";
import { socialCard } from "../src/social/card";
import { buildContributionGrid } from "../src/github/activity";
import { day } from "./fixtures";

const texts = (node: unknown): string[] => {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(texts);
  if (node && typeof node === "object" && "props" in node) return texts((node as { props: { children?: unknown } }).props.children);
  return [];
};

describe("socialCard", () => {
  it("shows the name, title and site", () => {
    expect(texts(socialCard({ name: "Jack", title: "Engineer", host: "example.com" }))).toEqual(["Jack", "Engineer", "example.com"]);
  });

  it("draws seven tiles per week of contributions when there are some", () => {
    const grid = buildContributionGrid({ total: 1, weeks: [[day("2026-11-01", 1, 1)], [day("2026-11-08", 0, 0)]] });
    const card = JSON.stringify(socialCard({ name: "Jack", title: "Engineer", host: "example.com", grid }));
    expect(card.match(/"width":16/g)).toHaveLength(14);
  });
});
