import type { Block, CaseStudy } from "./types";

export const WORDS_PER_MINUTE = 200;

function blockText(block: Block): string[] {
  switch (block.kind) {
    case "paragraph":
    case "subheading":
      return [block.text];
    case "list":
      return block.items;
    case "flow":
      return [block.title, ...block.steps.flatMap((step) => [step.title, step.detail]), block.caption];
  }
}

export function readingMinutes(study: Pick<CaseStudy, "title" | "summary" | "overview" | "qualification" | "metrics" | "sections">): number {
  const text = [
    study.title,
    study.summary,
    ...study.overview.map((item) => item.text),
    study.qualification,
    ...study.metrics.map((metric) => `${metric.value} ${metric.label}`),
    ...study.sections.flatMap((section) => [section.heading, ...section.blocks.flatMap(blockText)]),
  ];
  const words = text.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
