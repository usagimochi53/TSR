import type {
  FavoriteCourse,
  FavoriteCourseFilter,
  FilterValidationResult,
  WalkTheme,
} from "./types";

function getMonthKey(dateString: string) {
  return dateString.slice(0, 7);
}

function formatMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");

  return `${year}年${Number(month)}月`;
}

function isNumberText(value: string) {
  if (!value.trim()) {
    return true;
  }

  return Number.isFinite(Number(value));
}

export function validateFavoriteCourseFilter(
  filter: FavoriteCourseFilter,
): FilterValidationResult {
  if (!isNumberText(filter.minDistanceKm)) {
    return {
      isValid: false,
      errorMessage: "最小距離は数値で入力してください。",
    };
  }

  if (!isNumberText(filter.maxDistanceKm)) {
    return {
      isValid: false,
      errorMessage: "最大距離は数値で入力してください。",
    };
  }

  const minDistance = filter.minDistanceKm.trim()
    ? Number(filter.minDistanceKm)
    : null;
  const maxDistance = filter.maxDistanceKm.trim()
    ? Number(filter.maxDistanceKm)
    : null;

  if (minDistance !== null && minDistance < 0) {
    return {
      isValid: false,
      errorMessage: "最小距離は0以上で入力してください。",
    };
  }

  if (maxDistance !== null && maxDistance < 0) {
    return {
      isValid: false,
      errorMessage: "最大距離は0以上で入力してください。",
    };
  }

  if (
    minDistance !== null &&
    maxDistance !== null &&
    minDistance > maxDistance
  ) {
    return {
      isValid: false,
      errorMessage: "最小距離は最大距離以下にしてください。",
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
}

export function filterFavoriteCourses(
  favorites: FavoriteCourse[],
  filter: FavoriteCourseFilter,
  themes: WalkTheme[],
) {
  const keyword = filter.keyword.trim().toLowerCase();
  const minDistance = filter.minDistanceKm.trim()
    ? Number(filter.minDistanceKm)
    : null;
  const maxDistance = filter.maxDistanceKm.trim()
    ? Number(filter.maxDistanceKm)
    : null;
  const themeSet = new Set<WalkTheme>(themes);

  // すべての条件をANDで評価します。空の条件は絞り込みに使いません。
  return favorites.filter((favorite) => {
    if (keyword) {
      const searchableText = [
        favorite.title,
        favorite.description,
        favorite.origin,
        favorite.destinationKeyword,
        favorite.themeLabel,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchableText.includes(keyword)) {
        return false;
      }
    }

    if (filter.themeId && themeSet.has(filter.themeId as WalkTheme)) {
      if (favorite.theme !== filter.themeId) {
        return false;
      }
    }

    if (filter.monthKey && getMonthKey(favorite.createdAt) !== filter.monthKey) {
      return false;
    }

    if (minDistance !== null && favorite.distanceKm < minDistance) {
      return false;
    }

    if (maxDistance !== null && favorite.distanceKm > maxDistance) {
      return false;
    }

    return true;
  });
}

export function getFavoriteMonthOptions(favorites: FavoriteCourse[]) {
  const monthKeys = new Set(
    favorites.map((favorite) => getMonthKey(favorite.createdAt)),
  );

  return Array.from(monthKeys)
    .sort((a, b) => b.localeCompare(a))
    .map((monthKey) => ({
      value: monthKey,
      label: formatMonthLabel(monthKey),
    }));
}
