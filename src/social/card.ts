import type { ContributionGrid, ContributionLevel } from "../github/activity";

export const CARD_WIDTH = 1200;
export const CARD_HEIGHT = 630;
export const CARD_PATH = "/og.png";
export const caseStudyCardPath = (slug: string) => `/og/${slug}.png`;

type Node = { type: string; props: { style?: Record<string, string | number>; children?: Node | Node[] | string } };

const INK = "#0a0a0a";
const MUTED = "#737373";
const PADDING = 80;
const TILE = 16;
const GAP = 3.6;
const LEVEL_OPACITY: Record<ContributionLevel, number> = { 0: 0.08, 1: 0.25, 2: 0.45, 3: 0.6, 4: 0.75 };

const box = (style: Record<string, string | number>, children?: Node | Node[] | string): Node => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});

function contributionStrip(grid: ContributionGrid): Node {
  return box(
    { gap: GAP, flexShrink: 0 },
    grid.weeks.map((week) =>
      box(
        { flexDirection: "column", gap: GAP, flexShrink: 0 },
        Array.from({ length: 7 }, (_, weekday) => {
          const day = week.find((entry) => entry.weekday === weekday);
          return box({ width: TILE, height: TILE, flexShrink: 0, borderRadius: 4, backgroundColor: INK, opacity: day ? LEVEL_OPACITY[day.level] : 0 });
        }),
      ),
    ),
  );
}

const frame = (children: Node[]): Node =>
  box({ width: CARD_WIDTH - 2 * PADDING, height: CARD_HEIGHT - 2 * PADDING, flexDirection: "column", padding: PADDING, backgroundColor: "#ffffff", fontFamily: "Geist" }, children);

export function socialCard({ name, title, host, grid }: { name: string; title: string; host: string; grid?: ContributionGrid }): Node {
  return frame(
    [
      box({ fontSize: 64, fontWeight: 500, color: INK, letterSpacing: -1.5 }, name),
      box({ marginTop: 12, fontSize: 36, color: MUTED }, title),
      box({ flexGrow: 1 }),
      ...(grid ? [box({ flexShrink: 0, marginBottom: 32 }, contributionStrip(grid))] : []),
      box({ fontSize: 26, color: MUTED }, host),
    ],
  );
}

type CaseStudyCard = { company: string; title: string; metrics: { value: string; label: string }[]; address: string };

export function caseStudyCard({ company, title, metrics, address }: CaseStudyCard): Node {
  return frame([
    box({ fontSize: 28, color: MUTED }, `${company} · case study`),
    box({ marginTop: 16, fontSize: 60, fontWeight: 500, color: INK, letterSpacing: -1.5, lineHeight: 1.1 }, title),
    box({ flexGrow: 1 }),
    box(
      { gap: 24 },
      metrics.map((metric) =>
        box({ flex: 1, flexDirection: "column", gap: 6 }, [
          box({ fontSize: 48, fontWeight: 500, color: INK, letterSpacing: -1 }, metric.value),
          box({ fontSize: 20, color: MUTED, lineHeight: 1.3 }, metric.label),
        ]),
      ),
    ),
    box({ marginTop: 40, fontSize: 26, color: MUTED }, address),
  ]);
}

export const caseStudyCardAlt = ({ title, metrics }: Pick<CaseStudyCard, "title" | "metrics">) =>
  `${title}: ${metrics.map((metric) => `${metric.value} ${metric.label}`).join(", ")}`;
