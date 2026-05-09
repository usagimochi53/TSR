import type { WalkRecord } from "./types";

const STORAGE_KEY = "walk_records";

export function loadWalkRecords(): WalkRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawRecords = window.localStorage.getItem(STORAGE_KEY);

  if (!rawRecords) {
    return [];
  }

  try {
    const records = JSON.parse(rawRecords) as WalkRecord[];
    return records.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    return [];
  }
}

export function saveWalkRecords(records: WalkRecord[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function updateWalkRecord(record: WalkRecord): WalkRecord[] {
  const records = loadWalkRecords();
  const hasTargetRecord = records.some((item) => item.id === record.id);

  if (!hasTargetRecord) {
    return records;
  }

  // idが一致する記録だけを差し替え、localStorageのキーは既存のwalk_recordsを使い続けます。
  const nextRecords = records.map((item) =>
    item.id === record.id ? record : item,
  );
  saveWalkRecords(nextRecords);

  return nextRecords;
}
