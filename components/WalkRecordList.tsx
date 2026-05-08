import type { WalkRecord } from "@/lib/types";

type WalkRecordListProps = {
  records: WalkRecord[];
  onDeleteRecord: (id: string) => void;
};

export function WalkRecordList({
  records,
  onDeleteRecord,
}: WalkRecordListProps) {
  return (
    <section className="space-y-3 px-5 pb-10 sm:px-8">
      <h2 className="text-xl font-bold text-ink">保存した記録</h2>

      {records.length === 0 ? (
        <p className="rounded-lg border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-600">
          まだ記録がありません。歩いた距離を保存するとここに表示されます。
        </p>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <article
              key={record.id}
              className="rounded-lg border border-stone-200 bg-white p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-stone-500">{record.date}</p>
                  <h3 className="text-lg font-bold text-ink">
                    {record.theme}・{record.distance}km
                  </h3>
                  {record.memo ? (
                    <p className="whitespace-pre-wrap text-sm leading-6 text-stone-700">
                      {record.memo}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => onDeleteRecord(record.id)}
                  className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  削除
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
