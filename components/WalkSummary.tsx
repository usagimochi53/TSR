import type { WalkSummaryData } from "@/lib/types";
import { themeDisplay } from "@/lib/themeDisplay";
import { SummaryCard } from "./SummaryCard";

type WalkSummaryProps = {
  summary: WalkSummaryData;
};

function formatDistance(distance: number) {
  return `${distance.toFixed(1)}km`;
}

export function WalkSummary({ summary }: WalkSummaryProps) {
  if (summary.totalCount === 0) {
    return (
      <section className="space-y-3 px-4">
        <h2 className="text-xl font-bold text-stone-900">散歩サマリー</h2>
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          まだ散歩記録がありません。散歩したら、距離とメモを記録してみましょう。
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 px-4">
      <h2 className="text-xl font-bold text-stone-900">散歩サマリー</h2>

      <div className="grid grid-cols-2 gap-3">
        <SummaryCard
          label="合計歩行距離"
          value={formatDistance(summary.totalDistance)}
        />
        <SummaryCard
          label="今月の歩行距離"
          value={formatDistance(summary.currentMonthDistance)}
        />
        <SummaryCard
          label="今月の散歩回数"
          value={`${summary.currentMonthCount}回`}
        />
        <SummaryCard
          label="全期間の散歩回数"
          value={`${summary.totalCount}回`}
        />
        <SummaryCard
          label="平均歩行距離"
          value={formatDistance(summary.averageDistance)}
        />
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-bold text-stone-900">テーマ別集計</h3>
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
    </section>
  );
}
