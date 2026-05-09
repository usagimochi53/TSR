import { themeDisplay } from "./themeDisplay";
import type { WalkRecommendation, WalkTheme } from "./types";

const distances = [5, 10, 15];

const distanceMessages: Record<number, string[]> = {
  5: [
    "軽めに歩きたい日にちょうどいい距離です。",
    "気分転換に、無理なく歩けるコースを探してみましょう。",
  ],
  10: [
    "しっかり歩きたい日におすすめの距離です。",
    "少し長めに歩いて、知らない道を楽しんでみましょう。",
  ],
  15: [
    "今日はたっぷり歩く日にしてみましょう。",
    "長めの散歩で、達成感のある一日にしましょう。",
  ],
};

const themeMessages: Record<WalkTheme, string> = {
  喫茶店巡り: "途中で休憩できる喫茶店を探しながら歩いてみましょう。",
  公園巡り: "緑の多い場所を目指して、気持ちよく歩いてみましょう。",
  コンビニ巡り: "気軽に立ち寄れる場所をつなげて、ゆるく歩いてみましょう。",
  スーパー巡り: "買い物ついでに、少し遠回りして歩いてみましょう。",
};

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function getDistanceMessage(distanceKm: number) {
  return pickRandom(distanceMessages[distanceKm] ?? distanceMessages[5]);
}

export function getThemeMessage(themeId: WalkTheme) {
  return themeMessages[themeId];
}

export function generateWalkRecommendation(
  themes: WalkTheme[],
): WalkRecommendation {
  const distanceKm = pickRandom(distances);
  const themeId = pickRandom(themes);
  const theme = themeDisplay[themeId];

  // 距離とテーマを組み合わせて、今日の散歩のきっかけになる文章を作ります。
  return {
    distanceKm,
    themeId,
    themeLabel: theme.label,
    themeIcon: theme.icon,
    message: `${getDistanceMessage(distanceKm)} ${getThemeMessage(themeId)}`,
  };
}
