import { describe, expect, it } from "vitest";
import { caseStudyCard, caseStudyCardAlt, socialCard } from "../src/social/card";
import { buildContributionGrid } from "../src/github/activity";
import { day } from "./fixtures";

const texts = (node: unknown): string[] => {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(texts);
  if (node && typeof node === "object" && "props" in node) return texts((node as { props: { children?: unknown } }).props.children);
  return [];
};

const background = (card: { props: { style?: Record<string, unknown> } }) => card.props.style?.backgroundColor;

describe("share cards", () => {
  it("are dark, matching the site's dark theme", () => {
    expect(background(socialCard({ name: "Jack", title: "Engineer", host: "example.com" }))).toBe("#0a0a0a");
    expect(background(caseStudyCard({ company: "KTO Group", title: "A title", metrics: [], address: "example.com/work/kto" }))).toBe("#0a0a0a");
  });
});

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

describe("caseStudyCard", () => {
  const study = { company: "KTO Group", title: "Rebuilding a sportsbook", metrics: [{ value: "40%", label: "faster paint" }, { value: "11×", label: "faster return" }] };

  it("shows the company, title, every result and the address", () => {
    expect(texts(caseStudyCard({ ...study, address: "example.com/work/kto" }))).toEqual([
      "KTO Group · case study",
      "Rebuilding a sportsbook",
      "40%",
      "faster paint",
      "11×",
      "faster return",
      "example.com/work/kto",
    ]);
  });

  it("describes the card in words for people who cannot see it", () => {
    expect(caseStudyCardAlt(study)).toBe("Rebuilding a sportsbook: 40% faster paint, 11× faster return");
  });
});
