"use client";

import { themeDisplay, walkThemes } from "@/lib/themeDisplay";
import type { WalkRecordFilter as WalkRecordFilterState } from "@/lib/types";

type MonthOption = {
  value: string;
  label: string;
};

type WalkRecordFilterProps = {
  filter: WalkRecordFilterState;
  monthOptions: MonthOption[];
  totalCount: number;
  filteredCount: number;
  errorMessage: string;
  onFilterChange: (filter: WalkRecordFilterState) => void;
  onReset: () => void;
};

export function WalkRecordFilter({
  filter,
  monthOptions,
  totalCount,
  filteredCount,
  errorMessage,
  onFilterChange,
  onReset,
}: WalkRecordFilterProps) {
  function updateFilter(nextFilter: Partial<WalkRecordFilterState>) {
    onFilterChange({
      ...filter,
      ...nextFilter,
    });
  }

  return (
    <section className="px-4">
      <div className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">
            履歴検索・絞り込み
          </h2>
          <p className="text-sm leading-6 text-stone-600">
            メモ、テーマ、月、距離を組み合わせて散歩記録を探せます。
          </p>
        </div>

        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          検索結果：{filteredCount}件 / 全{totalCount}件
        </p>

        {errorMessage ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {errorMessage}
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label
              htmlFor="record-filter-keyword"
              className="text-sm font-semibold text-stone-900"
            >
              キーワード
            </label>
            <input
              id="record-filter-keyword"
              type="search"
              value={filter.keyword}
              onChange={(event) =>
                updateFilter({ keyword: event.target.value })
              }
              placeholder="メモやテーマ名で検索"
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="record-filter-theme"
              className="text-sm font-semibold text-stone-900"
            >
              テーマ
            </label>
            <select
              id="record-filter-theme"
              value={filter.themeId}
              onChange={(event) =>
                updateFilter({ themeId: event.target.value })
              }
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            >
              <option value="">すべて</option>
              {walkThemes.map((theme) => {
                const display = themeDisplay[theme];

                return (
                  <option key={theme} value={theme}>
                    {display.icon} {display.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="record-filter-month"
              className="text-sm font-semibold text-stone-900"
            >
              月
            </label>
            <select
              id="record-filter-month"
              value={filter.monthKey}
              onChange={(event) =>
                updateFilter({ monthKey: event.target.value })
              }
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            >
              <option value="">すべて</option>
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="record-filter-min-distance"
              className="text-sm font-semibold text-stone-900"
            >
              最小距離（km）
            </label>
            <input
              id="record-filter-min-distance"
              type="text"
              inputMode="decimal"
              value={filter.minDistanceKm}
              onChange={(event) =>
                updateFilter({ minDistanceKm: event.target.value })
              }
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="record-filter-max-distance"
              className="text-sm font-semibold text-stone-900"
            >
              最大距離（km）
            </label>
            <input
              id="record-filter-max-distance"
              type="text"
              inputMode="decimal"
              value={filter.maxDistanceKm}
              onChange={(event) =>
                updateFilter({ maxDistanceKm: event.target.value })
              }
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-sm font-bold text-stone-600 transition hover:bg-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-100"
        >
          条件をリセット
        </button>
      </div>
    </section>
  );
}
