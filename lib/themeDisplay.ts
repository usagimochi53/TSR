import type { WalkTheme } from "./types";

export const themeDisplay: Record<WalkTheme, { icon: string; label: WalkTheme }> =
  {
    喫茶店巡り: { icon: "☕", label: "喫茶店巡り" },
    公園巡り: { icon: "🌳", label: "公園巡り" },
    コンビニ巡り: { icon: "🏪", label: "コンビニ巡り" },
    スーパー巡り: { icon: "🛒", label: "スーパー巡り" },
  };

export const walkThemes = Object.keys(themeDisplay) as WalkTheme[];
