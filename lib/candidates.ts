import type { Candidate, WalkDistance, WalkTheme } from "./types";

const themeQueries: Record<WalkTheme, string[]> = {
  喫茶店巡り: ["喫茶店", "カフェ", "コーヒー", "純喫茶", "ベーカリーカフェ"],
  公園巡り: ["公園", "庭園", "緑地", "遊歩道", "水辺"],
  コンビニ巡り: [
    "コンビニ",
    "セブンイレブン",
    "ファミリーマート",
    "ローソン",
    "ミニストップ",
  ],
  スーパー巡り: [
    "スーパー",
    "食品スーパー",
    "商店街",
    "市場",
    "ディスカウントスーパー",
  ],
  パン屋巡り: ["パン屋", "ベーカリー", "焼きたてパン", "小さなパン屋", "ブーランジェリー"],
  "神社・お寺巡り": ["神社", "お寺", "寺院", "史跡", "参道"],
  "川沿い・水辺巡り": ["川沿い", "水辺", "橋", "遊歩道", "河川敷"],
  商店街巡り: ["商店街", "市場", "路地", "昔ながらの商店街", "アーケード"],
  銭湯巡り: ["銭湯", "公衆浴場", "昔ながらの銭湯", "サウナ 銭湯", "温泉 銭湯"],
  スーパー銭湯巡り: [
    "スーパー銭湯",
    "日帰り温泉",
    "温浴施設",
    "岩盤浴",
    "サウナ 温浴施設",
  ],
};

const themeDescriptions: Record<WalkTheme, string[]> = {
  喫茶店巡り: [
    "しっかり歩いた先でひと休みできる喫茶店を探すコースです。",
    "歩くことを主役にして、休憩先にカフェを置く散歩です。",
    "目的地まで足を伸ばし、帰りに甘いものも楽しめる候補です。",
    "少し渋めの喫茶店を探しながら、知らない道を歩けます。",
    "パンや軽食で休める場所を目印にした散歩候補です。",
  ],
  公園巡り: [
    "距離を歩いた先で緑に触れられる、気分転換向きの候補です。",
    "長めに歩いてから木陰やベンチで休める散歩です。",
    "少し遠くの公園を目指して、街の景色も楽しむコースです。",
    "大通りから外れて、静かな道を見つけやすい候補です。",
    "水辺や遊歩道を絡めて、歩く時間そのものを楽しめます。",
  ],
  コンビニ巡り: [
    "歩いた先で飲み物を買いやすい、実用的な散歩候補です。",
    "補給しやすい目的地を置いて、安心して距離を伸ばせます。",
    "遠めのコンビニを目印にして、普段と違う道を試せます。",
    "途中で軽く休みやすい場所を探しながら歩けます。",
    "帰り道の補給も考えやすい、気楽なロング散歩です。",
  ],
  スーパー巡り: [
    "歩いた先で買い物もできる、生活に馴染む散歩候補です。",
    "少し遠くのスーパーを目指して、帰り道の楽しみも作れます。",
    "普段と違う店を目的地にして、歩く理由を作りやすいコースです。",
    "市場や商店街を絡めて、街の生活感も楽しめます。",
    "帰りに食材を選べる、実用と散歩を兼ねた候補です。",
  ],
  パン屋巡り: [
    "朝や昼前の散歩に合う、焼きたての香りを目指す候補です。",
    "小さなベーカリーを探しながら、寄り道したくなる道を歩きます。",
    "目的地でパンを買って、近くの公園で休むのも楽しい散歩です。",
    "街角のパン屋をきっかけに、知らない通りへ足を伸ばします。",
    "帰り道のおみやげも楽しめる、軽やかな散歩候補です。",
  ],
  "神社・お寺巡り": [
    "静かな境内や参道を目指して、気持ちを整えながら歩けます。",
    "街の歴史に触れながら、落ち着いた道を選びやすい候補です。",
    "少し寄り道して手を合わせる、ゆっくりした散歩に向いています。",
    "古い道や石碑を探しながら、街の記憶をたどるコースです。",
    "人通りの少ない場所も見つけやすい、穏やかな散歩候補です。",
  ],
  "川沿い・水辺巡り": [
    "水辺の景色を目指して、長めに歩きやすい散歩候補です。",
    "川沿いや橋をつなげて、道そのものを楽しめます。",
    "風の抜ける場所を探しながら、気分転換しやすいコースです。",
    "河川敷や遊歩道を絡めて、歩くリズムを作りやすい候補です。",
    "水辺でひと息つける場所を目印に、ゆったり歩けます。",
  ],
  商店街巡り: [
    "昔ながらの店や路地を見つけながら、街歩きを楽しめます。",
    "アーケードや市場を目指して、天気を気にせず歩きやすい候補です。",
    "小さなお店をのぞきながら、生活感のある道を歩きます。",
    "マイナーな商店街も目的地にしやすい、発見のある散歩です。",
    "買い物や食べ歩きの寄り道も楽しめる候補です。",
  ],
  銭湯巡り: [
    "歩いた後に汗を流せる、散歩の締めくくりに向いた候補です。",
    "昔ながらの銭湯を目指して、街の生活感も楽しめます。",
    "帰りに湯冷めしにくい距離感で、気持ちよく歩ける候補です。",
    "サウナや湯船を楽しみに、少し遠くまで足を伸ばします。",
    "商店街や住宅街の銭湯を探しながら、ゆっくり歩けます。",
  ],
  スーパー銭湯巡り: [
    "広めの温浴施設をゴールにして、達成感のある散歩にできます。",
    "岩盤浴や休憩スペースも楽しみに、長めの道を歩けます。",
    "歩いた後にしっかり休める、休日向きの散歩候補です。",
    "サウナや食事処も含めて、散歩後の時間まで楽しめます。",
    "少し遠い温浴施設を目指して、目的のあるロング散歩にできます。",
  ],
};

const osakaStationNames = [
  "大阪",
  "梅田",
  "弁天町",
  "難波",
  "なんば",
  "天王寺",
  "京橋",
  "新大阪",
  "本町",
  "心斎橋",
  "森ノ宮",
  "西九条",
  "大正",
];

type RoutePlan = {
  destination: string;
  waypoints: string[];
  roundTripWaypoints?: string[];
  oneWayDistanceKm?: number;
  roundTripDistanceKm?: number;
};

type DistancePreset = 5 | 10 | 15 | 30;

const osakaRoutes: Record<DistancePreset, RoutePlan[]> = {
  5: [
    {
      destination: "八幡屋公園",
      waypoints: [],
      roundTripWaypoints: ["八幡屋公園", "波除公園"],
      oneWayDistanceKm: 4.8,
      roundTripDistanceKm: 5.6,
    },
    {
      destination: "靱公園",
      waypoints: [],
      roundTripWaypoints: ["靱公園", "中之島公園"],
      oneWayDistanceKm: 4.6,
      roundTripDistanceKm: 5.4,
    },
    {
      destination: "中之島公園",
      waypoints: [],
      roundTripWaypoints: ["中之島公園", "靱公園"],
      oneWayDistanceKm: 4.4,
      roundTripDistanceKm: 5.2,
    },
    {
      destination: "天保山公園",
      waypoints: [],
      roundTripWaypoints: ["天保山公園", "八幡屋公園"],
      oneWayDistanceKm: 5.1,
      roundTripDistanceKm: 5.9,
    },
    {
      destination: "波除公園",
      waypoints: [],
      roundTripWaypoints: ["波除公園", "市岡元町公園"],
      oneWayDistanceKm: 4.9,
      roundTripDistanceKm: 5.5,
    },
  ],
  10: [
    {
      destination: "長居公園",
      waypoints: [],
      roundTripWaypoints: ["長居公園", "桃ヶ池公園"],
      oneWayDistanceKm: 9.8,
      roundTripDistanceKm: 11.2,
    },
    {
      destination: "大阪城公園",
      waypoints: [],
      roundTripWaypoints: ["大阪城公園", "中之島公園"],
      oneWayDistanceKm: 10.4,
      roundTripDistanceKm: 11.5,
    },
    {
      destination: "住吉大社",
      waypoints: [],
      roundTripWaypoints: ["住吉大社", "長居公園"],
      oneWayDistanceKm: 9.7,
      roundTripDistanceKm: 10.9,
    },
    {
      destination: "千島公園",
      waypoints: [],
      roundTripWaypoints: ["千島公園", "木津川飛行場跡"],
      oneWayDistanceKm: 10.1,
      roundTripDistanceKm: 11.3,
    },
    {
      destination: "桃ヶ池公園",
      waypoints: [],
      roundTripWaypoints: ["桃ヶ池公園", "長居公園"],
      oneWayDistanceKm: 9.3,
      roundTripDistanceKm: 10.6,
    },
  ],
  15: [
    {
      destination: "服部緑地",
      waypoints: [],
      roundTripWaypoints: ["服部緑地", "中之島公園"],
      oneWayDistanceKm: 15.2,
      roundTripDistanceKm: 16.8,
    },
    {
      destination: "万博記念公園",
      waypoints: [],
      roundTripWaypoints: ["万博記念公園", "服部緑地"],
      oneWayDistanceKm: 15.6,
      roundTripDistanceKm: 17.4,
    },
    {
      destination: "浜寺公園",
      waypoints: [],
      roundTripWaypoints: ["浜寺公園", "住吉大社"],
      oneWayDistanceKm: 15.1,
      roundTripDistanceKm: 16.7,
    },
    {
      destination: "大泉緑地",
      waypoints: [],
      roundTripWaypoints: ["大泉緑地", "長居公園"],
      oneWayDistanceKm: 14.8,
      roundTripDistanceKm: 16.3,
    },
    {
      destination: "鶴見緑地",
      waypoints: [],
      roundTripWaypoints: ["鶴見緑地", "大阪城公園"],
      oneWayDistanceKm: 14.9,
      roundTripDistanceKm: 16.5,
    },
  ],
  30: [
    {
      destination: "服部緑地",
      waypoints: ["大阪城公園"],
      roundTripWaypoints: ["大阪城公園", "服部緑地", "中之島公園"],
      oneWayDistanceKm: 20.6,
      roundTripDistanceKm: 34.8,
    },
    {
      destination: "弁天町駅",
      waypoints: ["天保山公園", "住吉大社"],
      roundTripWaypoints: ["天保山公園", "住吉大社", "靱公園", "弁天町駅"],
      oneWayDistanceKm: 30.2,
      roundTripDistanceKm: 33.6,
    },
    {
      destination: "大阪駅",
      waypoints: ["服部緑地", "大阪城公園"],
      roundTripWaypoints: ["服部緑地", "大阪城公園", "中之島公園", "大阪駅"],
      oneWayDistanceKm: 30.8,
      roundTripDistanceKm: 34.1,
    },
    {
      destination: "大正駅",
      waypoints: ["千島公園", "住吉大社"],
      roundTripWaypoints: ["千島公園", "住吉大社", "靱公園", "大正駅"],
      oneWayDistanceKm: 29.7,
      roundTripDistanceKm: 32.9,
    },
    {
      destination: "森ノ宮駅",
      waypoints: ["桃ヶ池公園", "長居公園"],
      roundTripWaypoints: ["桃ヶ池公園", "長居公園", "大阪城公園", "森ノ宮駅"],
      oneWayDistanceKm: 30.5,
      roundTripDistanceKm: 33.4,
    },
  ],
};

const fallbackRoutes: Record<DistancePreset, RoutePlan[]> = {
  5: [
    { destination: "中央公園", waypoints: [] },
    { destination: "市民公園", waypoints: [] },
    { destination: "駅前公園", waypoints: [] },
    { destination: "近隣公園", waypoints: [] },
    { destination: "親水公園", waypoints: [] },
  ],
  10: [
    { destination: "総合公園", waypoints: [] },
    { destination: "運動公園", waypoints: [] },
    { destination: "自然公園", waypoints: [] },
    { destination: "城址公園", waypoints: [] },
    { destination: "河川敷公園", waypoints: [] },
  ],
  15: [
    { destination: "広域公園", waypoints: [] },
    { destination: "森林公園", waypoints: [] },
    { destination: "大きな公園", waypoints: [] },
    { destination: "海浜公園", waypoints: [] },
    { destination: "緑地公園", waypoints: [] },
  ],
  30: [
    {
      destination: "中央公園",
      waypoints: ["総合公園", "駅前公園"],
      roundTripWaypoints: ["総合公園", "中央公園", "駅前公園"],
    },
    {
      destination: "市民公園",
      waypoints: ["運動公園", "自然公園"],
      roundTripWaypoints: ["運動公園", "市民公園", "自然公園"],
    },
    {
      destination: "駅前公園",
      waypoints: ["城址公園", "親水公園"],
      roundTripWaypoints: ["城址公園", "駅前公園", "親水公園"],
    },
    {
      destination: "近隣公園",
      waypoints: ["河川敷公園", "森林公園"],
      roundTripWaypoints: ["河川敷公園", "近隣公園", "森林公園"],
    },
    {
      destination: "親水公園",
      waypoints: ["広域公園", "中央公園"],
      roundTripWaypoints: ["広域公園", "親水公園", "中央公園"],
    },
  ],
};

function formatDistance(distanceKm: number) {
  return Number.isInteger(distanceKm)
    ? `${distanceKm}km`
    : `${distanceKm.toFixed(1)}km`;
}

function createGoogleMapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    query,
  )}`;
}

function createGoogleMapsWalkingRouteUrl(
  origin: string,
  destination: string,
  waypoints: string[],
) {
  // 経由地を入れることで、周遊時に行き帰りが同じ道になりにくいルートを作ります。
  const waypointQuery =
    waypoints.length > 0
      ? `&waypoints=${encodeURIComponent(waypoints.join("|"))}`
      : "";

  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    origin,
  )}&destination=${encodeURIComponent(
    destination,
  )}${waypointQuery}&travelmode=walking`;
}

function createThemeDestination(basePlace: string, keyword: string) {
  return `${basePlace} 周辺 ${keyword}`;
}

function createRouteStops(
  origin: string,
  routePlan: RoutePlan,
  returnToStart: boolean,
) {
  if (!returnToStart) {
    return {
      destination: routePlan.destination,
      waypoints: routePlan.waypoints,
    };
  }

  return {
    destination: origin,
    waypoints: routePlan.roundTripWaypoints ?? [
      ...routePlan.waypoints,
      routePlan.destination,
    ],
  };
}

function isOsakaArea(startLocation: string) {
  const normalizedLocation = startLocation.replace(/\s/g, "");
  return osakaStationNames.some((name) => normalizedLocation.includes(name));
}

function getDistancePreset(distance: WalkDistance): DistancePreset {
  if (distance >= 20) {
    return 30;
  }

  if (distance <= 7.5) {
    return 5;
  }

  if (distance <= 12.5) {
    return 10;
  }

  return 15;
}

function getRoutePlans(startLocation: string, distance: WalkDistance) {
  const distancePreset = getDistancePreset(distance);

  // 外部APIなしの固定ロジックなので、大阪エリアは実在スポットのプリセットを使います。
  if (isOsakaArea(startLocation)) {
    return osakaRoutes[distancePreset];
  }

  return fallbackRoutes[distancePreset];
}

function createRouteDistanceLabel(
  routePlan: RoutePlan,
  distance: WalkDistance,
  returnToStart: boolean,
) {
  const routeDistanceKm = returnToStart
    ? routePlan.roundTripDistanceKm
    : routePlan.oneWayDistanceKm;

  // 外部APIを使わないため、固定候補に持たせたGoogleマップ表示距離をカードに出します。
  return routeDistanceKm
    ? `ルート距離：${formatDistance(routeDistanceKm)}`
    : `ルート距離：Googleマップで確認（希望 ${distance}km）`;
}

export function generateCandidates(
  startLocation: string,
  distance: WalkDistance,
  theme: WalkTheme,
  returnToStart = false,
  routeOrigin = startLocation,
): Candidate[] {
  const trimmedLocation = startLocation.trim();
  const trimmedRouteOrigin = routeOrigin.trim();
  const routePlans = getRoutePlans(trimmedLocation, distance);

  return routePlans.map((routePlan, index) => {
    const keyword = themeQueries[theme][index];
    const themeDestination = createThemeDestination(
      routePlan.destination,
      keyword,
    );
    const searchKeyword = themeDestination;
    const routeStops = createRouteStops(
      trimmedLocation,
      routePlan,
      returnToStart,
    );
    const themedWaypoints = routeStops.waypoints.map((waypoint) =>
      createThemeDestination(waypoint, keyword),
    );
    const routeDestination = returnToStart
      ? trimmedRouteOrigin
      : themeDestination;
    const waypointText =
      themedWaypoints.length > 0
        ? `（経由：${themedWaypoints.join(" → ")}）`
        : "";
    const title = returnToStart
      ? `${routePlan.destination}周辺の${keyword}を経由して出発地に戻る散歩`
      : `${routePlan.destination}周辺の${keyword}まで歩く散歩`;

    return {
      id: `${theme}-${distance}-${index}`,
      theme,
      title,
      description: `${themeDescriptions[theme][index]}${waypointText}`,
      recommendedDistance: distance,
      routeDistanceLabel: createRouteDistanceLabel(
        routePlan,
        distance,
        returnToStart,
      ),
      destinationKeyword: themeDestination,
      routeWaypoints: themedWaypoints,
      mapUrl: createGoogleMapsSearchUrl(searchKeyword),
      walkingRouteUrl: createGoogleMapsWalkingRouteUrl(
        trimmedRouteOrigin,
        routeDestination,
        themedWaypoints,
      ),
    };
  });
}
