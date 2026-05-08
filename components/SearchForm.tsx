"use client";

import type { FormEvent } from "react";
import type { WalkDistance, WalkTheme } from "@/lib/types";

type SearchFormProps = {
  startLocation: string;
  distance: WalkDistance;
  theme: WalkTheme;
  error: string;
  onStartLocationChange: (value: string) => void;
  onDistanceChange: (value: WalkDistance) => void;
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
  theme,
  error,
  onStartLocationChange,
  onDistanceChange,
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
        </fieldset>

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
