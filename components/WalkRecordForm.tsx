"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { WalkRecord, WalkTheme } from "@/lib/types";

type WalkRecordFormProps = {
  onAddRecord: (record: WalkRecord) => void;
};

const themes: WalkTheme[] = [
  "喫茶店巡り",
  "公園巡り",
  "コンビニ巡り",
  "スーパー巡り",
];

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function WalkRecordForm({ onAddRecord }: WalkRecordFormProps) {
  const [date, setDate] = useState(getToday());
  const [distance, setDistance] = useState("");
  const [theme, setTheme] = useState<WalkTheme>("喫茶店巡り");
  const [memo, setMemo] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericDistance = Number(distance);
    if (!date || numericDistance <= 0) {
      return;
    }

    // idとcreatedAtは保存順と削除処理に使います。
    onAddRecord({
      id: crypto.randomUUID(),
      date,
      distance: numericDistance,
      theme,
      memo,
      createdAt: new Date().toISOString(),
    });

    setDate(getToday());
    setDistance("");
    setTheme("喫茶店巡り");
    setMemo("");
  }

  return (
    <section className="px-5 sm:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-stone-200 bg-white p-5 shadow-soft"
      >
        <h2 className="text-xl font-bold text-ink">散歩記録</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="record-date" className="text-sm font-semibold">
              日付
            </label>
            <input
              id="record-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none focus:border-moss focus:ring-2 focus:ring-leaf/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="record-distance" className="text-sm font-semibold">
              距離（km）
            </label>
            <input
              id="record-distance"
              type="number"
              min="0.1"
              step="0.1"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
              placeholder="例：4.5"
              className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none focus:border-moss focus:ring-2 focus:ring-leaf/30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="record-theme" className="text-sm font-semibold">
            テーマ
          </label>
          <select
            id="record-theme"
            value={theme}
            onChange={(event) => setTheme(event.target.value as WalkTheme)}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-3 outline-none focus:border-moss focus:ring-2 focus:ring-leaf/30"
          >
            {themes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="record-memo" className="text-sm font-semibold">
            メモ
          </label>
          <textarea
            id="record-memo"
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            placeholder="見つけたお店、天気、気分など"
            rows={3}
            className="w-full resize-none rounded-md border border-stone-300 px-3 py-3 outline-none focus:border-moss focus:ring-2 focus:ring-leaf/30"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-moss px-4 py-3 font-bold text-white transition hover:bg-ink"
        >
          記録を保存
        </button>
      </form>
    </section>
  );
}
