import { themeDisplay } from "@/lib/themeDisplay";
import { formatMonthLabel } from "@/lib/monthlySummary";
import type { MonthComparison, MonthSummary } from "@/lib/types";
import { SummaryCard } from "./SummaryCard";

type MonthlySummaryProps = {
  availableMonthKeys: string[];
  selectedMonthKey: string;
  summary: MonthSummary;
  comparison: MonthComparison;
  showSelectedMonthOnly: boolean;
  onSelectedMonthChange: (monthKey: string) => void;
  onShowSelectedMonthOnlyChange: (value: boolean) => void;
};

function formatDistance(distance: number) {
  return `${distance.toFixed(1)}km`;
}

export function MonthlySummary({
  availableMonthKeys,
  selectedMonthKey,
  summary,
  comparison,
  showSelectedMonthOnly,
  onSelectedMonthChange,
  onShowSelectedMonthOnlyChange,
}: MonthlySummaryProps) {
  const hasRecords = availableMonthKeys.length > 0;
  const monthOptions = availableMonthKeys.includes(selectedMonthKey)
    ? availableMonthKeys
    : [selectedMonthKey, ...availableMonthKeys];

  if (!hasRecords) {
    return (
      <section className="space-y-3 px-4">
        <h2 className="text-xl font-bold text-stone-900">月別サマリー</h2>
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          散歩記録を追加すると、月別サマリーが表示されます。
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 px-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">月別サマリー</h2>
          <p className="text-sm leading-6 text-stone-600">
            月ごとの歩いた距離とテーマの偏りを確認できます。
          </p>
        </div>
        <label className="space-y-2 text-sm font-semibold text-stone-900">
          <span>月を選択</span>
          <select
            value={selectedMonthKey}
            onChange={(event) => onSelectedMonthChange(event.target.value)}
            className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 sm:w-48"
          >
            {monthOptions.map((monthKey) => (
              <option key={monthKey} value={monthKey}>
                {formatMonthLabel(monthKey)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
        <input
          type="checkbox"
          checked={showSelectedMonthOnly}
          onChange={(event) =>
            onShowSelectedMonthOnlyChange(event.target.checked)
          }
          className="mt-1 h-5 w-5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-200"
        />
        <span className="text-sm font-semibold text-stone-900">
          選択中の月の履歴だけ表示する
        </span>
      </label>

      <p className="rounded-2xl border border-emerald-100 bg-white p-4 text-sm font-semibold leading-6 text-emerald-700 shadow-sm">
        {comparison.message}
      </p>

      {summary.count === 0 ? (
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          この月の散歩記録はまだありません。
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard
              label={`${formatMonthLabel(summary.monthKey)}の合計距離`}
              value={formatDistance(summary.totalDistance)}
            />
            <SummaryCard
              label="散歩回数"
              value={`${summary.count}回`}
            />
            <SummaryCard
              label="平均距離"
              value={formatDistance(summary.averageDistance)}
            />
            <SummaryCard
              label="一番多いテーマ"
              value={
                summary.topTheme
                  ? `${themeDisplay[summary.topTheme].icon} ${summary.topTheme}`
                  : "-"
              }
            />
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-bold text-stone-900">
              選択月のテーマ別集計
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {summary.themeSummaries.map((themeSummary) => {
                const display = themeDisplay[themeSummary.theme];

                return (
                  <div
                    key={themeSummary.theme}
                    className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                  >
                    <p className="text-sm font-bold text-stone-900">
                      <span className="mr-2" aria-hidden="true">
                        {display.icon}
                      </span>
                      {themeSummary.theme}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">
                      散歩回数：{themeSummary.count}回
                    </p>
                    <p className="text-sm text-stone-600">
                      合計距離：{formatDistance(themeSummary.totalDistance)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
