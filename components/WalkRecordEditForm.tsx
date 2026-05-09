"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { themeDisplay, walkThemes } from "@/lib/themeDisplay";
import type { WalkRecord, WalkTheme } from "@/lib/types";

type WalkRecordEditFormProps = {
  record: WalkRecord;
  onCancel: () => void;
  onUpdate: (record: WalkRecord) => void;
};

export function WalkRecordEditForm({
  record,
  onCancel,
  onUpdate,
}: WalkRecordEditFormProps) {
  const [date, setDate] = useState(record.date);
  const [distance, setDistance] = useState(String(record.distance));
  const [theme, setTheme] = useState<WalkTheme>(record.theme);
  const [memo, setMemo] = useState(record.memo);
  const [error, setError] = useState("");

  function validateForm(nextDate: string, nextDistance: string) {
    if (!nextDate) {
      return "日付を入力してください。";
    }

    if (!nextDistance.trim()) {
      return "歩いた距離を入力してください。";
    }

    const numericDistance = Number(nextDistance);

    if (!Number.isFinite(numericDistance)) {
      return "距離は数値で入力してください。";
    }

    if (numericDistance <= 0) {
      return "距離は1km以上で入力してください。";
    }

    if (!theme) {
      return "テーマを選択してください。";
    }

    return "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 送信時点の入力値をフォームから読み、最新の内容でバリデーションします。
    const formData = new FormData(event.currentTarget);
    const nextDate = String(formData.get("date") ?? "");
    const nextDistance = String(formData.get("distance") ?? "");
    const nextMemo = String(formData.get("memo") ?? "");
    const validationError = validateForm(nextDate, nextDistance);

    if (validationError) {
      setError(validationError);
      return;
    }

    // 更新時もidとcreatedAtは維持し、変更日時だけupdatedAtに残します。
    onUpdate({
      ...record,
      date: nextDate,
      distance: Number(nextDistance),
      theme,
      memo: nextMemo,
      updatedAt: new Date().toISOString(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor={`edit-date-${record.id}`}
            className="text-sm font-semibold text-stone-900"
          >
            日付
          </label>
          <input
            id={`edit-date-${record.id}`}
            name="date"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setError("");
            }}
            className="min-h-12 w-full rounded-xl border border-stone-300 px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`edit-distance-${record.id}`}
            className="text-sm font-semibold text-stone-900"
          >
            距離（km）
          </label>
          <input
            id={`edit-distance-${record.id}`}
            name="distance"
            type="text"
            inputMode="decimal"
            value={distance}
            onChange={(event) => {
              setDistance(event.target.value);
              setError("");
            }}
            className="min-h-12 w-full rounded-xl border border-stone-300 px-4 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`edit-theme-${record.id}`}
          className="text-sm font-semibold text-stone-900"
        >
          テーマ
        </label>
        <select
          id={`edit-theme-${record.id}`}
          value={theme}
          onChange={(event) => {
            setTheme(event.target.value as WalkTheme);
            setError("");
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
          htmlFor={`edit-memo-${record.id}`}
          className="text-sm font-semibold text-stone-900"
        >
          メモ
        </label>
        <textarea
          id={`edit-memo-${record.id}`}
          name="memo"
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-stone-300 px-4 py-3 text-stone-900 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="submit"
          className="min-h-11 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          更新する
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 rounded-xl border border-stone-300 bg-white px-4 text-sm font-bold text-stone-600 transition hover:bg-stone-50 focus:outline-none focus:ring-4 focus:ring-stone-100"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
