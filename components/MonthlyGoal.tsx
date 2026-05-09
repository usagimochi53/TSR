"use client";

import { useEffect, useState } from "react";
import { calculateWalkGoalSummary } from "@/lib/goal";

type MonthlyGoalProps = {
  goalKm: number | null;
  currentMonthDistanceKm: number;
  onSaveGoal: (goalKm: number) => void;
  onDeleteGoal: () => void;
};

function formatNumber(value: number) {
  return value.toFixed(1);
}

export function MonthlyGoal({
  goalKm,
  currentMonthDistanceKm,
  onSaveGoal,
  onDeleteGoal,
}: MonthlyGoalProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setInputValue(goalKm ? String(goalKm) : "");
  }, [goalKm]);

  function handleSaveGoal() {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError("目標距離を入力してください。");
      return;
    }

    const numericGoal = Number(trimmedValue);

    if (!Number.isFinite(numericGoal)) {
      setError("目標距離は数値で入力してください。");
      return;
    }

    if (numericGoal <= 0) {
      setError("目標距離は1km以上で入力してください。");
      return;
    }

    setError("");
    onSaveGoal(numericGoal);
  }

  function handleDeleteGoal() {
    if (window.confirm("今月の目標距離を削除しますか？")) {
      setError("");
      onDeleteGoal();
    }
  }

  const summary = goalKm
    ? calculateWalkGoalSummary(goalKm, currentMonthDistanceKm)
    : null;

  return (
    <section className="space-y-4 px-4">
      <div className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">
            今月の目標距離 🎯
          </h2>
          <p className="text-sm leading-6 text-stone-600">
            今月どれくらい歩きたいかを決めて、進み具合を見てみましょう。
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="space-y-2 text-sm font-semibold text-stone-900">
            <span>目標距離（km）</span>
            <input
              type="text"
              inputMode="decimal"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                setError("");
              }}
              placeholder="例：80"
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
          </label>
          <button
            type="button"
            onClick={handleSaveGoal}
            className="min-h-12 self-end rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            目標を保存
          </button>
        </div>

        {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

        {summary ? (
          <div className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs font-semibold text-stone-500">目標距離</p>
                <p className="mt-1 text-2xl font-bold text-stone-900">
                  {formatNumber(summary.goalKm)}km
                </p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs font-semibold text-stone-500">
                  今月の歩行距離
                </p>
                <p className="mt-1 text-2xl font-bold text-stone-900">
                  {formatNumber(summary.currentMonthDistanceKm)}km
                </p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs font-semibold text-stone-500">達成率</p>
                <p className="mt-1 text-2xl font-bold text-stone-900">
                  {formatNumber(summary.achievementRate)}%
                </p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs font-semibold text-stone-500">残り距離</p>
                <p className="mt-1 text-2xl font-bold text-stone-900">
                  {formatNumber(summary.remainingKm)}km
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{ width: `${summary.displayAchievementRate}%` }}
                />
              </div>
              <p className="rounded-xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-emerald-700">
                {summary.isAchieved
                  ? "目標達成です！今月もたくさん歩けました 🎉"
                  : `あと${formatNumber(summary.remainingKm)}kmで達成です 🌿`}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDeleteGoal}
              className="min-h-11 rounded-xl border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
            >
              目標を削除
            </button>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-stone-600">
            目標を設定すると、達成率が表示されます。
          </p>
        )}
      </div>
    </section>
  );
}
