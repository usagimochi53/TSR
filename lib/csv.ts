import type { WalkRecord, WalkTheme } from "./types";

const CSV_HEADERS = [
  "id",
  "date",
  "distanceKm",
  "theme",
  "memo",
  "createdAt",
  "updatedAt",
];

const themeToCsvId: Record<WalkTheme, string> = {
  喫茶店巡り: "cafe",
  公園巡り: "park",
  コンビニ巡り: "convenience_store",
  スーパー巡り: "supermarket",
  パン屋巡り: "bakery",
  "神社・お寺巡り": "temple_shrine",
  "川沿い・水辺巡り": "waterside",
  商店街巡り: "shopping_street",
  銭湯巡り: "sento",
  スーパー銭湯巡り: "super_sento",
};

const csvIdToTheme: Record<string, WalkTheme> = {
  cafe: "喫茶店巡り",
  park: "公園巡り",
  convenience_store: "コンビニ巡り",
  supermarket: "スーパー巡り",
  bakery: "パン屋巡り",
  temple_shrine: "神社・お寺巡り",
  waterside: "川沿い・水辺巡り",
  shopping_street: "商店街巡り",
  sento: "銭湯巡り",
  super_sento: "スーパー銭湯巡り",
};

function escapeCsvValue(value: string | number | undefined) {
  const text = String(value ?? "");

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

function parseCsvRows(csvText: string) {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentValue += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = "";
      continue;
    }

    currentValue += char;
  }

  if (inQuotes) {
    throw new Error("CSVの形式が正しくありません。");
  }

  currentRow.push(currentValue);

  if (currentRow.some((value) => value !== "") || rows.length === 0) {
    rows.push(currentRow);
  }

  return rows;
}

function validateHeaders(headers: string[]) {
  const requiredHeaders = CSV_HEADERS.slice(0, 6);
  const hasRequiredHeaders = requiredHeaders.every(
    (header, index) => headers[index] === header,
  );

  if (!hasRequiredHeaders) {
    throw new Error("CSVの形式が正しくありません。");
  }
}

function validateRecord(
  row: Record<string, string>,
  lineNumber: number,
  allowedThemeIds: string[],
) {
  if (!row.id) {
    throw new Error(
      `CSVの${lineNumber}行目に不正なデータがあります。idは必須です。`,
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.date)) {
    throw new Error(
      `CSVの${lineNumber}行目に不正なデータがあります。日付はyyyy-mm-dd形式で入力してください。`,
    );
  }

  const distanceKm = Number(row.distanceKm);

  if (!Number.isFinite(distanceKm)) {
    throw new Error(
      `CSVの${lineNumber}行目に不正なデータがあります。距離は数値で入力してください。`,
    );
  }

  if (distanceKm < 1) {
    throw new Error(
      `CSVの${lineNumber}行目に不正なデータがあります。距離は1km以上で入力してください。`,
    );
  }

  if (!allowedThemeIds.includes(row.theme) || !csvIdToTheme[row.theme]) {
    throw new Error(
      `CSVの${lineNumber}行目に不正なデータがあります。テーマが正しくありません。`,
    );
  }

  if (!row.createdAt) {
    throw new Error(
      `CSVの${lineNumber}行目に不正なデータがあります。createdAtは必須です。`,
    );
  }
}

export function exportWalkRecordsToCsv(records: WalkRecord[]) {
  const rows = records.map((record) =>
    [
      record.id,
      record.date,
      record.distance,
      themeToCsvId[record.theme],
      record.memo,
      record.createdAt,
      record.updatedAt ?? "",
    ]
      .map(escapeCsvValue)
      .join(","),
  );

  return [CSV_HEADERS.join(","), ...rows].join("\r\n");
}

export function downloadCsv(csvText: string, filename: string) {
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function createExportFilename() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `kyou-no-sanpomichi-records-${year}${month}${date}.csv`;
}

export function parseWalkRecordsCsv(
  csvText: string,
  allowedThemeIds: string[],
): WalkRecord[] {
  let rows: string[][];

  try {
    rows = parseCsvRows(csvText.replace(/^\uFEFF/, ""));
  } catch {
    throw new Error("CSVの形式が正しくありません。");
  }

  if (rows.length < 2) {
    throw new Error("CSVの形式が正しくありません。");
  }

  const headers = rows[0];
  validateHeaders(headers);

  const ids = new Set<string>();

  return rows.slice(1).map((values, rowIndex) => {
    const lineNumber = rowIndex + 2;
    const row = headers.reduce<Record<string, string>>((result, header, index) => {
      result[header] = values[index] ?? "";
      return result;
    }, {});

    validateRecord(row, lineNumber, allowedThemeIds);

    if (ids.has(row.id)) {
      throw new Error(
        `CSVの${lineNumber}行目に不正なデータがあります。idが重複しています。`,
      );
    }

    ids.add(row.id);

    return {
      id: row.id,
      date: row.date,
      distance: Number(row.distanceKm),
      theme: csvIdToTheme[row.theme],
      memo: row.memo ?? "",
      createdAt: row.createdAt,
      updatedAt: row.updatedAt || undefined,
    };
  });
}
