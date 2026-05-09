export type WalkDistance = number;

export type WalkTheme =
  | "喫茶店巡り"
  | "公園巡り"
  | "コンビニ巡り"
  | "スーパー巡り"
  | "パン屋巡り"
  | "神社・お寺巡り"
  | "川沿い・水辺巡り"
  | "商店街巡り";

export type AppTab = "search" | "records" | "summary";

export type ImportMode = "append" | "replace";

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
  updatedAt?: string;
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

export type MonthSummary = {
  monthKey: string;
  totalDistance: number;
  count: number;
  averageDistance: number;
  topTheme: WalkTheme | null;
  themeSummaries: ThemeSummary[];
};

export type MonthComparison = {
  message: string;
  currentMonthDistance: number;
  previousMonthDistance: number;
};

export type WalkRecommendation = {
  distanceKm: number;
  themeId: WalkTheme;
  themeLabel: string;
  themeIcon: string;
  message: string;
};

export type WalkGoalSummary = {
  goalKm: number;
  currentMonthDistanceKm: number;
  achievementRate: number;
  displayAchievementRate: number;
  remainingKm: number;
  isAchieved: boolean;
};

export type FavoriteCourse = {
  id: string;
  title: string;
  description: string;
  distanceKm: number;
  theme: WalkTheme;
  themeLabel: string;
  themeIcon: string;
  mapUrl: string;
  routeUrl?: string;
  origin: string;
  destinationKeyword: string;
  createdAt: string;
};
