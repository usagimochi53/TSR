import type { WalkSummaryData } from "@/lib/types";
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
      <section className="space-y-3 px-5 sm:px-8">
        <h2 className="text-xl font-bold text-ink">散歩サマリー</h2>
        <p className="rounded-lg border border-dashed border-stone-300 bg-white p-5 text-sm leading-6 text-stone-600">
          まだ散歩記録がありません。散歩したら、距離とメモを記録してみましょう。
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4 px-5 sm:px-8">
      <h2 className="text-xl font-bold text-ink">散歩サマリー</h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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

      <div className="rounded-lg border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-bold text-ink">テーマ別集計</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {summary.themeSummaries.map((themeSummary) => (
            <div
              key={themeSummary.theme}
              className="rounded-md border border-stone-200 bg-stone-50 p-4"
            >
              <p className="text-sm font-bold text-ink">
                {themeSummary.theme}
              </p>
              <p className="mt-2 text-sm text-stone-600">
                散歩回数：{themeSummary.count}回
              </p>
              <p className="text-sm text-stone-600">
                合計距離：{formatDistance(themeSummary.totalDistance)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
