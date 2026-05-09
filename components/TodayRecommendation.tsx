"use client";

import type { WalkRecommendation } from "@/lib/types";

type TodayRecommendationProps = {
  recommendation: WalkRecommendation | null;
  message: string;
  onGenerate: () => void;
  onApply: () => void;
};

export function TodayRecommendation({
  recommendation,
  message,
  onGenerate,
  onApply,
}: TodayRecommendationProps) {
  return (
    <section className="px-4">
      <div className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">
            今日のおすすめ散歩 🌿
          </h2>
          <p className="text-sm leading-6 text-stone-600">
            迷ったときは、今日の気分づくりから始めてみましょう。
          </p>
        </div>

        {recommendation ? (
          <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-700">
              おすすめ条件
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <p className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-stone-900">
                距離：{recommendation.distanceKm}km
              </p>
              <p className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-stone-900">
                テーマ：{recommendation.themeIcon} {recommendation.themeLabel}
              </p>
            </div>
            <p className="text-sm leading-6 text-stone-700">
              {recommendation.message}
            </p>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-stone-600">
            「今日のおすすめを出す」を押すと、距離とテーマをこちらで提案します。
          </p>
        )}

        {message ? (
          <p className="rounded-xl bg-lime-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">
            {message}
          </p>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onGenerate}
            className="min-h-12 rounded-xl border border-emerald-300 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            {recommendation ? "もう一度おすすめを出す" : "今日のおすすめを出す"}
          </button>
          <button
            type="button"
            onClick={onApply}
            disabled={!recommendation}
            className="min-h-12 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            この条件で散歩先を探す
          </button>
        </div>
      </div>
    </section>
  );
}
