"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { themeDisplay, walkThemes } from "@/lib/themeDisplay";
import type { WalkRecord, WalkTheme } from "@/lib/types";

type WalkRecordFormProps = {
  onAddRecord: (record: WalkRecord) => void;
};

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function WalkRecordForm({ onAddRecord }: WalkRecordFormProps) {
  const [date, setDate] = useState(getToday());
  const [distance, setDistance] = useState("");
  const [theme, setTheme] = useState<WalkTheme>("喫茶店巡り");
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");

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
    setMessage("散歩記録を保存しました。");
  }

  return (
    <section className="px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">
            歩いた記録を残す
          </h2>
          {message ? (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="record-date"
              className="text-sm font-semibold text-stone-900"
            >
              日付
            </label>
            <input
              id="record-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-stone-300 px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="record-distance"
              className="text-sm font-semibold text-stone-900"
            >
              距離（km）
            </label>
            <input
              id="record-distance"
              type="number"
              min="0.1"
              step="0.1"
              value={distance}
              onChange={(event) => {
                setDistance(event.target.value);
                setMessage("");
              }}
              placeholder="例：4.5"
              className="min-h-12 w-full rounded-xl border border-stone-300 px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="record-theme"
            className="text-sm font-semibold text-stone-900"
          >
            テーマ
          </label>
          <select
            id="record-theme"
            value={theme}
            onChange={(event) => {
              setTheme(event.target.value as WalkTheme);
              setMessage("");
            }}
            className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 text-base font-semibold text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
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
        </div>

        <div className="space-y-2">
          <label
            htmlFor="record-memo"
            className="text-sm font-semibold text-stone-900"
          >
            メモ
          </label>
          <textarea
            id="record-memo"
            value={memo}
            onChange={(event) => {
              setMemo(event.target.value);
              setMessage("");
            }}
            placeholder="見つけたお店、天気、気分など"
            rows={3}
            className="w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <button
          type="submit"
          className="min-h-12 w-full rounded-xl bg-emerald-600 px-4 font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          記録する
        </button>
      </form>
    </section>
  );
}
