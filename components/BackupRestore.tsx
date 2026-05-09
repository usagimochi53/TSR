"use client";

import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import {
  createExportFilename,
  downloadCsv,
  exportWalkRecordsToCsv,
  parseWalkRecordsCsv,
} from "@/lib/csv";
import type { ImportMode, WalkRecord } from "@/lib/types";

type BackupRestoreProps = {
  records: WalkRecord[];
  onImportRecords: (records: WalkRecord[]) => void;
};

const allowedThemeIds = [
  "cafe",
  "park",
  "convenience_store",
  "supermarket",
  "bakery",
  "temple_shrine",
  "waterside",
  "shopping_street",
  "sento",
  "super_sento",
];

function readFileAsText(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, "utf-8");
  });
}

export function BackupRestore({ records, onImportRecords }: BackupRestoreProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>("append");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleExport() {
    setMessage("");
    setError("");

    if (records.length === 0) {
      setError("エクスポートできる散歩記録がありません。");
      return;
    }

    const csvText = exportWalkRecordsToCsv(records);
    downloadCsv(csvText, createExportFilename());
    setMessage("散歩記録をCSVでダウンロードしました。");
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files?.[0] ?? null);
    setMessage("");
    setError("");
  }

  async function handleImport() {
    setMessage("");
    setError("");

    if (!selectedFile) {
      setError("インポートするCSVファイルを選択してください。");
      return;
    }

    const confirmMessage =
      importMode === "append"
        ? "CSVの散歩記録を既存データに追加します。よろしいですか？"
        : "既存の散歩記録をすべて削除して、CSVの内容に置き換えます。よろしいですか？";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const csvText = await readFileAsText(selectedFile);
      const importedRecords = parseWalkRecordsCsv(csvText, allowedThemeIds);

      if (importMode === "replace") {
        onImportRecords(importedRecords);
        setMessage(
          `CSVインポートが完了しました。既存データを置き換えました。取り込み：${importedRecords.length}件`,
        );
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      const existingIds = new Set(records.map((record) => record.id));
      const recordsToAdd = importedRecords.filter(
        (record) => !existingIds.has(record.id),
      );
      const skippedCount = importedRecords.length - recordsToAdd.length;
      const nextRecords = [...recordsToAdd, ...records];

      onImportRecords(nextRecords);
      setMessage(
        `CSVインポートが完了しました。追加：${recordsToAdd.length}件、重複スキップ：${skippedCount}件`,
      );
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "CSVの形式が正しくありません。",
      );
    }
  }

  return (
    <section className="px-4">
      <div className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">
            バックアップ・復元
          </h2>
          <p className="text-sm leading-6 text-stone-600">
            散歩記録をCSVで保存して、端末変更やブラウザデータ削除に備えられます。
          </p>
        </div>

        {message ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        ) : null}

        <div className="space-y-3 rounded-xl bg-emerald-50 p-4">
          <h3 className="font-bold text-stone-900">CSVエクスポート</h3>
          <button
            type="button"
            onClick={handleExport}
            className="min-h-12 w-full rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            散歩記録をCSVでダウンロード
          </button>
        </div>

        <div className="space-y-4 rounded-xl border border-emerald-100 p-4">
          <h3 className="font-bold text-stone-900">CSVインポート</h3>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-stone-900">
              インポート方式
            </legend>
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700">
              <input
                type="radio"
                name="import-mode"
                value="append"
                checked={importMode === "append"}
                onChange={() => setImportMode("append")}
                className="h-4 w-4 accent-emerald-600"
              />
              既存データに追加する
            </label>
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700">
              <input
                type="radio"
                name="import-mode"
                value="replace"
                checked={importMode === "replace"}
                onChange={() => setImportMode("replace")}
                className="h-4 w-4 accent-emerald-600"
              />
              既存データを削除して置き換える
            </label>
          </fieldset>

          <div className="space-y-2">
            <label
              htmlFor="walk-record-csv"
              className="text-sm font-semibold text-stone-900"
            >
              CSVファイル
            </label>
            <input
              ref={fileInputRef}
              id="walk-record-csv"
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
              className="block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-700 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-bold file:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <button
            type="button"
            onClick={handleImport}
            className="min-h-12 w-full rounded-xl border border-emerald-600 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            CSVから復元する
          </button>
        </div>
      </div>
    </section>
  );
}
