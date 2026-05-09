"use client";

import { useState } from "react";
import { themeDisplay } from "@/lib/themeDisplay";
import type { WalkRecord } from "@/lib/types";
import { WalkRecordEditForm } from "./WalkRecordEditForm";

type WalkRecordListProps = {
  records: WalkRecord[];
  onDeleteRecord?: (id: string) => void;
  onUpdateRecord?: (record: WalkRecord) => void;
  title?: string;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
  emptyMessage?: string;
};

export function WalkRecordList({
  records,
  onDeleteRecord,
  onUpdateRecord,
  title = "保存した記録",
  showDeleteButton = true,
  showEditButton = false,
  emptyMessage = "まだ散歩記録がありません。歩いた距離やメモを残すと、ここに履歴が表示されます。",
}: WalkRecordListProps) {
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  function handleDeleteRecord(id: string) {
    if (onDeleteRecord && window.confirm("この散歩記録を削除しますか？")) {
      onDeleteRecord(id);
    }
  }

  function handleUpdateRecord(record: WalkRecord) {
    onUpdateRecord?.(record);
    setEditingRecordId(null);
    setMessage("散歩記録を更新しました。");
  }

  return (
    <section className="space-y-3 px-4 pb-10">
      <h2 className="text-xl font-bold text-stone-900">{title}</h2>
      {message ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {message}
        </p>
      ) : null}

      {records.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-3">
          {records.map((record) => {
            const display = themeDisplay[record.theme];
            const isEditing = editingRecordId === record.id;

            return (
              <article
                key={record.id}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                {isEditing ? (
                  <WalkRecordEditForm
                    record={record}
                    onCancel={() => setEditingRecordId(null)}
                    onUpdate={handleUpdateRecord}
                  />
                ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-stone-500">{record.date}</p>
                    <h3 className="text-lg font-bold text-stone-900">
                      <span className="mr-2" aria-hidden="true">
                        {display.icon}
                      </span>
                      {record.theme}・{record.distance.toFixed(1)}km
                    </h3>
                    {record.memo ? (
                      <p className="whitespace-pre-wrap rounded-xl bg-stone-50 p-3 text-sm leading-6 text-stone-700">
                        {record.memo}
                      </p>
                    ) : (
                      <p className="text-sm text-stone-500">メモなし</p>
                    )}
                  </div>
                  <div className="grid gap-2 sm:min-w-24">
                    {showEditButton && onUpdateRecord ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRecordId(record.id);
                          setMessage("");
                        }}
                        className="min-h-11 rounded-xl border border-emerald-300 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                      >
                        編集
                      </button>
                    ) : null}
                    {showDeleteButton ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(record.id)}
                        className="min-h-11 rounded-xl border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                      >
                        削除
                      </button>
                    ) : null}
                  </div>
                </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
