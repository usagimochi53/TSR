"use client";

import type { FormEvent } from "react";
import type { WalkDistance, WalkTheme } from "@/lib/types";

type SearchFormProps = {
  startLocation: string;
  distance: WalkDistance;
  returnToStart: boolean;
  theme: WalkTheme;
  error: string;
  onStartLocationChange: (value: string) => void;
  onDistanceChange: (value: WalkDistance) => void;
  onReturnToStartChange: (value: boolean) => void;
  onThemeChange: (value: WalkTheme) => void;
  onSubmit: () => void;
};

const distances: WalkDistance[] = [5, 10, 15];
const themes: WalkTheme[] = [
  "喫茶店巡り",
  "公園巡り",
  "コンビニ巡り",
  "スーパー巡り",
];

export function SearchForm({
  startLocation,
  distance,
  returnToStart,
  theme,
  error,
  onStartLocationChange,
  onDistanceChange,
  onReturnToStartChange,
  onThemeChange,
  onSubmit,
}: SearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section className="px-5 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg border border-stone-200 bg-white p-5 shadow-soft"
      >
        <div className="space-y-2">
          <label
            htmlFor="start-location"
            className="text-sm font-semibold text-ink"
          >
            出発地
          </label>
          <input
            id="start-location"
            value={startLocation}
            onChange={(event) => onStartLocationChange(event.target.value)}
            placeholder="例：渋谷駅、自宅の最寄り駅"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-3 text-base outline-none transition focus:border-moss focus:ring-2 focus:ring-leaf/30"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-ink">距離</legend>
          <div className="grid grid-cols-3 gap-2">
            {distances.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onDistanceChange(item)}
                className={`rounded-md border px-3 py-3 text-sm font-semibold transition ${
                  distance === item
                    ? "border-moss bg-moss text-white"
                    : "border-stone-300 bg-white text-stone-700"
                }`}
              >
                {item}km
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="walk-distance"
              className="text-sm font-semibold text-stone-700"
            >
              歩きたい距離を入力
            </label>
            <div className="flex items-center gap-2">
              <input
                id="walk-distance"
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                value={distance}
                onChange={(event) =>
                  onDistanceChange(Number(event.target.value))
                }
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-3 text-base outline-none transition focus:border-moss focus:ring-2 focus:ring-leaf/30"
              />
              <span className="text-sm font-semibold text-stone-700">km</span>
            </div>
            <p className="text-xs leading-5 text-stone-500">
              目的地候補は入力距離に近い距離帯から選びます。
            </p>
          </div>
        </fieldset>

        <label className="flex items-start gap-3 rounded-md border border-stone-200 bg-stone-50 p-4">
          <input
            type="checkbox"
            checked={returnToStart}
            onChange={(event) => onReturnToStartChange(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-stone-300 text-moss focus:ring-leaf/40"
          />
          <span className="space-y-1">
            <span className="block text-sm font-semibold text-ink">
              出発地に戻るルートにする
            </span>
            <span className="block text-xs leading-5 text-stone-600">
              チェックありなら周遊、なしなら出発地から目的地までの片道ルートで開きます。
            </span>
          </span>
        </label>

        <div className="space-y-2">
          <label htmlFor="theme" className="text-sm font-semibold text-ink">
            テーマ
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(event) => onThemeChange(event.target.value as WalkTheme)}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-3 text-base outline-none transition focus:border-moss focus:ring-2 focus:ring-leaf/30"
          >
            {themes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-ink px-4 py-3 text-base font-bold text-white transition hover:bg-moss"
        >
          散歩先を探す
        </button>
      </form>
    </section>
  );
}
