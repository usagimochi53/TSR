import type { Candidate, WalkDistance, WalkTheme } from "./types";

const themeQueries: Record<WalkTheme, string[]> = {
  喫茶店巡り: ["喫茶店", "カフェ", "コーヒー"],
  公園巡り: ["公園", "庭園", "緑地"],
  コンビニ巡り: ["コンビニ", "セブンイレブン", "ファミリーマート"],
  スーパー巡り: ["スーパー", "食品スーパー", "商店街"],
};

const themeDescriptions: Record<WalkTheme, string[]> = {
  喫茶店巡り: [
    "ひと休みしやすい喫茶店を目指す、気軽な寄り道コースです。",
    "コーヒーの香りを楽しみに歩ける、ゆったりした散歩です。",
    "帰り道に甘いものを探したくなる、街歩き向きの候補です。",
  ],
  公園巡り: [
    "木陰やベンチを見つけながら歩ける、気分転換向きの候補です。",
    "緑の多い場所を目的地にして、歩くリズムを整えられます。",
    "少し遠回りしても景色を楽しみやすい、休日向きの散歩です。",
  ],
  コンビニ巡り: [
    "飲み物を買いやすく、短時間でも歩きやすい実用的な候補です。",
    "道中で補給しやすいので、はじめての距離にも向いています。",
    "近所の知らない道を試しやすい、身軽な散歩コースです。",
  ],
  スーパー巡り: [
    "買い物ついでに歩数を伸ばせる、生活に馴染む候補です。",
    "帰りに食材を選ぶ楽しみもある、目的を作りやすい散歩です。",
    "普段と違うスーパーを目指して、街の雰囲気を見比べられます。",
  ],
};

function createGoogleMapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query,
  )}`;
}

export function generateCandidates(
  startLocation: string,
  distance: WalkDistance,
  theme: WalkTheme,
): Candidate[] {
  const trimmedLocation = startLocation.trim();

  // 外部APIは使わず、テーマに合う検索語を組み合わせて3件の候補を作ります。
  return themeQueries[theme].map((keyword, index) => {
    const mapQuery = `${trimmedLocation} 周辺 ${keyword}`;

    return {
      id: `${theme}-${distance}-${index}`,
      title: `${trimmedLocation}周辺の${keyword}`,
      description: themeDescriptions[theme][index],
      recommendedDistance: distance,
      mapUrl: createGoogleMapsUrl(mapQuery),
    };
  });
}
