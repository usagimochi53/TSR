export type WalkDistance = number;

export type WalkTheme =
  | "喫茶店巡り"
  | "公園巡り"
  | "コンビニ巡り"
  | "スーパー巡り";

export type Candidate = {
  id: string;
  theme: WalkTheme;
  title: string;
  description: string;
  recommendedDistance: WalkDistance;
  routeDistanceLabel: string;
  destinationKeyword: string;
  routeWaypoints: string[];
  mapUrl: string;
  walkingRouteUrl: string;
};

export type CurrentLocation = {
  latitude: number;
  longitude: number;
};

export type WalkRecord = {
  id: string;
  date: string;
  distance: number;
  theme: WalkTheme;
  memo: string;
  createdAt: string;
};

export type ThemeSummary = {
  theme: WalkTheme;
  count: number;
  totalDistance: number;
};

export type WalkSummaryData = {
  totalDistance: number;
  currentMonthDistance: number;
  currentMonthCount: number;
  totalCount: number;
  averageDistance: number;
  themeSummaries: ThemeSummary[];
};
