"use client";

import type { FormEvent } from "react";
import { themeDisplay, walkThemes } from "@/lib/themeDisplay";
import type { WalkDistance, WalkTheme } from "@/lib/types";

type SearchFormProps = {
  startLocation: string;
  distance: WalkDistance;
  returnToStart: boolean;
  isGettingLocation: boolean;
  theme: WalkTheme;
  error: string;
  locationError: string;
  onStartLocationChange: (value: string) => void;
  onDistanceChange: (value: WalkDistance) => void;
  onReturnToStartChange: (value: boolean) => void;
  onThemeChange: (value: WalkTheme) => void;
  onUseCurrentLocation: () => void;
  onSubmit: () => void;
};

const distances: WalkDistance[] = [5, 10, 15];

export function SearchForm({
  startLocation,
  distance,
  returnToStart,
  isGettingLocation,
  theme,
  error,
  locationError,
  onStartLocationChange,
  onDistanceChange,
  onReturnToStartChange,
  onThemeChange,
  onUseCurrentLocation,
  onSubmit,
}: SearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <section className="px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="start-location"
            className="text-sm font-semibold text-stone-900"
          >
            出発地
          </label>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input
              id="start-location"
              value={startLocation}
              onChange={(event) => onStartLocationChange(event.target.value)}
              placeholder="例：渋谷駅、自宅の最寄り駅"
              className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
            />
            <button
              type="button"
              onClick={onUseCurrentLocation}
              disabled={isGettingLocation}
              className="min-h-12 rounded-xl border border-emerald-600 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:hover:bg-white"
            >
              {isGettingLocation ? "取得中..." : "現在地を使う"}
            </button>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {locationError ? (
            <p className="text-sm text-red-600">{locationError}</p>
          ) : null}
          {isGettingLocation ? (
            <p className="text-sm text-emerald-700">現在地を取得中...</p>
          ) : null}
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-stone-900">距離</legend>
          <div className="grid grid-cols-3 gap-2">
            {distances.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onDistanceChange(item)}
                className={`min-h-12 rounded-xl border px-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
                  distance === item
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:bg-emerald-50"
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
                className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-base text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
              <span className="text-sm font-semibold text-stone-700">km</span>
            </div>
            <p className="text-xs leading-5 text-stone-500">
              目的地候補は入力距離に近い距離帯から選びます。
            </p>
          </div>
        </fieldset>

        <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
          <input
            type="checkbox"
            checked={returnToStart}
            onChange={(event) => onReturnToStartChange(event.target.checked)}
            className="mt-1 h-5 w-5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-200"
          />
          <span className="space-y-1">
            <span className="block text-sm font-semibold text-stone-900">
              出発地に戻るルートにする
            </span>
            <span className="block text-xs leading-5 text-stone-600">
              チェックありなら周遊、なしなら出発地から目的地までの片道ルートで開きます。
            </span>
          </span>
        </label>

        <div className="space-y-2">
          <label
            htmlFor="walk-theme"
            className="text-sm font-semibold text-stone-900"
          >
            テーマ
          </label>
          <select
            id="walk-theme"
            value={theme}
            onChange={(event) => onThemeChange(event.target.value as WalkTheme)}
            className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-base font-semibold text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          >
            {walkThemes.map((item) => {
              const display = themeDisplay[item];

              return (
                <option key={item} value={item}>
                  {display.icon} {display.label}
                </option>
              );
            })}
          </select>
          <p className="text-xs leading-5 text-stone-500">
            テーマが増えたので、一覧から選びやすいドロップダウンにしました。
          </p>
        </div>

        <button
          type="submit"
          className="min-h-12 w-full rounded-xl bg-emerald-600 px-4 text-base font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          散歩先を探す
        </button>
      </form>
    </section>
  );
}
