import { walkThemes } from "./themeDisplay";
import type { MonthComparison, MonthSummary, WalkRecord } from "./types";

export function getMonthKey(dateString: string) {
  return dateString.slice(0, 7);
}

export function getCurrentMonthKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return `${now.getFullYear()}-${month}`;
}

function getPreviousMonthKey(monthKey: string) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 2, 1);
  const previousMonth = String(date.getMonth() + 1).padStart(2, "0");

  return `${date.getFullYear()}-${previousMonth}`;
}

export function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");

  return `${year}年${Number(month)}月`;
}

export function getAvailableMonthKeys(records: WalkRecord[]) {
  const monthKeys = new Set(records.map((record) => getMonthKey(record.date)));

  return Array.from(monthKeys).sort((a, b) => b.localeCompare(a));
}

function sumDistance(records: WalkRecord[]) {
  return records.reduce((sum, record) => sum + record.distance, 0);
}

export function calculateMonthSummary(
  records: WalkRecord[],
  monthKey: string,
): MonthSummary {
  const monthRecords = records.filter(
    (record) => getMonthKey(record.date) === monthKey,
  );
  const totalDistance = sumDistance(monthRecords);
  const count = monthRecords.length;
  const themeSummaries = walkThemes.map((theme) => {
    const themeRecords = monthRecords.filter((record) => record.theme === theme);

    return {
      theme,
      count: themeRecords.length,
      totalDistance: sumDistance(themeRecords),
    };
  });
  const topTheme =
    themeSummaries
      .filter((summary) => summary.count > 0)
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }

        return b.totalDistance - a.totalDistance;
      })[0]?.theme ?? null;

  // 記録数が0の月でも画面が安全に描画できるよう、平均は0にします。
  return {
    monthKey,
    totalDistance,
    count,
    averageDistance: count > 0 ? totalDistance / count : 0,
    topTheme,
    themeSummaries,
  };
}

export function calculateCurrentMonthComparison(
  records: WalkRecord[],
): MonthComparison {
  const currentMonthKey = getCurrentMonthKey();
  const previousMonthKey = getPreviousMonthKey(currentMonthKey);
  const currentMonthRecords = records.filter(
    (record) => getMonthKey(record.date) === currentMonthKey,
  );
  const previousMonthRecords = records.filter(
    (record) => getMonthKey(record.date) === previousMonthKey,
  );
  const currentMonthDistance = sumDistance(currentMonthRecords);
  const previousMonthDistance = sumDistance(previousMonthRecords);

  if (currentMonthRecords.length === 0 || previousMonthRecords.length === 0) {
    return {
      message:
        "今月または先月の記録がないため、比較はまだできません。",
      currentMonthDistance,
      previousMonthDistance,
    };
  }

  const difference = currentMonthDistance - previousMonthDistance;

  if (difference > 0) {
    return {
      message: `今月は先月より ${difference.toFixed(1)}km 多く歩いています。`,
      currentMonthDistance,
      previousMonthDistance,
    };
  }

  if (difference < 0) {
    return {
      message: `今月は先月より ${Math.abs(difference).toFixed(1)}km 少なめです。`,
      currentMonthDistance,
      previousMonthDistance,
    };
  }

  return {
    message: "今月と先月の歩行距離は同じです。",
    currentMonthDistance,
    previousMonthDistance,
  };
}
