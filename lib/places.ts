import type { PlacesSearchParams, PlacesSearchResult } from "./types";

export function isPlacesApiEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_PLACES_API === "true";
}

export function getGoogleMapsApiKey() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || null;
}

export function getPlaceTypeByThemeId(themeId: string) {
  const placeTypes: Record<string, string> = {
    cafe: "cafe",
    park: "park",
    convenience_store: "convenience_store",
    supermarket: "supermarket",
  };

  return placeTypes[themeId] ?? null;
}

export function getSearchRadiusMeters(distanceKm: number) {
  if (distanceKm <= 5) {
    return 1500;
  }

  if (distanceKm <= 10) {
    return 3000;
  }

  return 5000;
}

export async function searchNearbyPlaces(
  params: PlacesSearchParams,
): Promise<PlacesSearchResult> {
  if (!isPlacesApiEnabled()) {
    return {
      places: [],
      errorMessage: "Places APIはまだ有効化されていません。",
    };
  }

  const apiKey = getGoogleMapsApiKey();

  if (!apiKey) {
    return {
      places: [],
      errorMessage: "Google Maps APIキーが設定されていません。",
    };
  }

  const placeType = getPlaceTypeByThemeId(params.themeId);
  const radiusMeters = getSearchRadiusMeters(params.distanceKm);

  // v1.7実装予定メモ:
  // エンドポイント: https://places.googleapis.com/v1/places:searchNearby
  // メソッド: POST
  // ヘッダー:
  // - Content-Type: application/json
  // - X-Goog-Api-Key: API_KEY
  // - X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress,places.location,places.primaryType,places.googleMapsUri
  // リクエストbody例:
  // {
  //   includedTypes: [placeType],
  //   maxResultCount: 5,
  //   locationRestriction: {
  //     circle: {
  //       center: { latitude: params.latitude, longitude: params.longitude },
  //       radius: radiusMeters
  //     }
  //   }
  // }
  // API呼び出しは検索ボタン押下時だけ行い、取得フィールドは必要最小限にします。
  void placeType;
  void radiusMeters;

  return {
    places: [],
    errorMessage: "Places API検索はv1.7で実装予定です。",
  };
}
