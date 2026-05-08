import { themeDisplay } from "@/lib/themeDisplay";
import type { WalkRecord } from "@/lib/types";

type WalkRecordListProps = {
  records: WalkRecord[];
  onDeleteRecord: (id: string) => void;
};

export function WalkRecordList({
  records,
  onDeleteRecord,
}: WalkRecordListProps) {
  function handleDeleteRecord(id: string) {
    if (window.confirm("この散歩記録を削除しますか？")) {
      onDeleteRecord(id);
    }
  }

  return (
    <section className="space-y-3 px-4 pb-10">
      <h2 className="text-xl font-bold text-stone-900">保存した記録</h2>

      {records.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          まだ散歩記録がありません。歩いた距離やメモを残すと、ここに履歴が表示されます。
        </p>
      ) : (
        <div className="space-y-3">
          {records.map((record) => {
            const display = themeDisplay[record.theme];

            return (
              <article
                key={record.id}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
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
                  <button
                    type="button"
                    onClick={() => handleDeleteRecord(record.id)}
                    className="min-h-11 rounded-xl border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
                  >
                    削除
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
