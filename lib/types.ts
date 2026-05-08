export type WalkDistance = 5 | 10 | 15;

export type WalkTheme =
  | "喫茶店巡り"
  | "公園巡り"
  | "コンビニ巡り"
  | "スーパー巡り";

export type Candidate = {
  id: string;
  title: string;
  description: string;
  recommendedDistance: WalkDistance;
  mapUrl: string;
};

export type WalkRecord = {
  id: string;
  date: string;
  distance: number;
  theme: WalkTheme;
  memo: string;
  createdAt: string;
};
