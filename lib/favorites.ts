import { themeDisplay } from "./themeDisplay";
import type { Candidate, FavoriteCourse } from "./types";

const FAVORITE_COURSES_KEY = "favorite_courses";

function createFavoriteCourseId(
  origin: string,
  distanceKm: number,
  theme: string,
  destinationKeyword: string,
) {
  return [origin, distanceKm, theme, destinationKeyword]
    .map((item) => String(item).trim())
    .join("__");
}

export function getFavoriteCourses(): FavoriteCourse[] {
  const storedFavorites = window.localStorage.getItem(FAVORITE_COURSES_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    return JSON.parse(storedFavorites) as FavoriteCourse[];
  } catch {
    return [];
  }
}

export function saveFavoriteCourses(favorites: FavoriteCourse[]) {
  window.localStorage.setItem(FAVORITE_COURSES_KEY, JSON.stringify(favorites));
}

export function isFavoriteCourse(
  id: string,
  favorites: FavoriteCourse[],
) {
  return favorites.some((favorite) => favorite.id === id);
}

export function addFavoriteCourse(favorite: FavoriteCourse): FavoriteCourse[] {
  const favorites = getFavoriteCourses();

  if (isFavoriteCourse(favorite.id, favorites)) {
    return favorites;
  }

  const nextFavorites = [favorite, ...favorites];
  saveFavoriteCourses(nextFavorites);

  return nextFavorites;
}

export function deleteFavoriteCourse(id: string): FavoriteCourse[] {
  const favorites = getFavoriteCourses();
  const nextFavorites = favorites.filter((favorite) => favorite.id !== id);
  saveFavoriteCourses(nextFavorites);

  return nextFavorites;
}

export function createFavoriteCourseFromCandidate(
  candidate: Candidate,
  origin: string,
  routeOrigin: string,
): FavoriteCourse {
  const display = themeDisplay[candidate.theme];
  const originForRoute = routeOrigin || origin;

  // 同じ候補でも出発地が違う場合は別コースとして保存できるよう、originもidに含めます。
  return {
    id: createFavoriteCourseId(
      originForRoute,
      candidate.recommendedDistance,
      candidate.theme,
      candidate.destinationKeyword,
    ),
    title: candidate.title,
    description: candidate.description,
    distanceKm: candidate.recommendedDistance,
    theme: candidate.theme,
    themeLabel: display.label,
    themeIcon: display.icon,
    mapUrl: candidate.mapUrl,
    routeUrl: candidate.walkingRouteUrl,
    origin: originForRoute,
    destinationKeyword: candidate.destinationKeyword,
    createdAt: new Date().toISOString(),
  };
}
