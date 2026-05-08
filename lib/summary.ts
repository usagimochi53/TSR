import type { WalkRecord, WalkSummaryData, WalkTheme } from "./types";

const themes: WalkTheme[] = [
  "喫茶店巡り",
  "公園巡り",
  "コンビニ巡り",
  "スーパー巡り",
];

function getRecordMonthKey(date: string) {
  return date.slice(0, 7);
}

function getCurrentMonthKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${now.getFullYear()}-${month}`;
}

export function summarizeWalkRecords(records: WalkRecord[]): WalkSummaryData {
  const currentMonthKey = getCurrentMonthKey();

  // localStorageに保存済みの散歩距離を合計して、画面表示用の数値へまとめます。
  const totalDistance = records.reduce(
    (sum, record) => sum + record.distance,
    0,
  );
  const currentMonthRecords = records.filter(
    (record) => getRecordMonthKey(record.date) === currentMonthKey,
  );
  const currentMonthDistance = currentMonthRecords.reduce(
    (sum, record) => sum + record.distance,
    0,
  );

  const totalCount = records.length;

  return {
    totalDistance,
    currentMonthDistance,
    currentMonthCount: currentMonthRecords.length,
    totalCount,
    averageDistance: totalCount > 0 ? totalDistance / totalCount : 0,
    themeSummaries: themes.map((theme) => {
      const themeRecords = records.filter((record) => record.theme === theme);
      const themeDistance = themeRecords.reduce(
        (sum, record) => sum + record.distance,
        0,
      );

      return {
        theme,
        count: themeRecords.length,
        totalDistance: themeDistance,
      };
    }),
  };
}
