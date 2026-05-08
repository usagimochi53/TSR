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
