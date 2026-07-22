export type RoundId = "names" | "breeds" | "ownership";
export type Metric = "rank" | "percent";
export type CardKind = "dog" | "cat" | "species" | "country";

export interface Choice {
  label: string;
  value: number;
  image: string;
  kind: CardKind;
  detail?: string;
}

export interface Question {
  id: string;
  round: RoundId;
  roundTitle: string;
  eyebrow: string;
  prompt: string;
  metric: Metric;
  left: Choice;
  right: Choice;
  sourceName: string;
  sourceUrl: string;
  sourceYear: string;
  scope: string;
  fact: string;
  difficulty: "Easy" | "Medium" | "Hard";
}
