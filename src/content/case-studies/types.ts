export type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "flow"; title: string; steps: { title: string; detail: string }[]; caption: string };

export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  summary: string;
  overview: { term: string; text: string }[];
  qualification: string;
  metrics: { value: string; label: string }[];
  sections: { heading: string; blocks: Block[] }[];
};
