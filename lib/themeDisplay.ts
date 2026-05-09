import type { WalkTheme } from "./types";

export const themeDisplay: Record<WalkTheme, { icon: string; label: WalkTheme }> =
  {
    喫茶店巡り: { icon: "☕", label: "喫茶店巡り" },
    公園巡り: { icon: "🌳", label: "公園巡り" },
    コンビニ巡り: { icon: "🏪", label: "コンビニ巡り" },
    スーパー巡り: { icon: "🛒", label: "スーパー巡り" },
    パン屋巡り: { icon: "🥐", label: "パン屋巡り" },
    "神社・お寺巡り": { icon: "⛩️", label: "神社・お寺巡り" },
    "川沿い・水辺巡り": { icon: "🌊", label: "川沿い・水辺巡り" },
    商店街巡り: { icon: "🏮", label: "商店街巡り" },
  };

export const walkThemes = Object.keys(themeDisplay) as WalkTheme[];
