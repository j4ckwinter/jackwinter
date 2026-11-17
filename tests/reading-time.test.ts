import { describe, expect, it } from "vitest";
import { readingMinutes, WORDS_PER_MINUTE } from "../src/content/case-studies/reading-time";

const words = (count: number) => Array.from({ length: count }, () => "word").join(" ");
const study = (body: string) => ({ title: "", summary: "", overview: [], qualification: "", metrics: [], sections: [{ heading: "", label: "", blocks: [{ kind: "paragraph" as const, text: body }] }] });

describe("readingMinutes", () => {
  it("rounds up to the next whole minute", () => {
    expect(readingMinutes(study(words(WORDS_PER_MINUTE)))).toBe(1);
    expect(readingMinutes(study(words(WORDS_PER_MINUTE + 1)))).toBe(2);
  });

  it("counts the words in lists and flows as well as paragraphs", () => {
    const flow = { kind: "flow" as const, title: words(WORDS_PER_MINUTE), steps: [{ title: "a", detail: "b" }], caption: "" };
    const list = { kind: "list" as const, items: [words(WORDS_PER_MINUTE)] };
    expect(readingMinutes({ ...study(""), sections: [{ heading: "", label: "", blocks: [flow, list] }] })).toBe(3);
  });

  it("never says zero minutes", () => {
    expect(readingMinutes(study(""))).toBe(1);
  });
});
