"use client";

import type { MouseEvent } from "react";
import type { FavoriteCourse } from "@/lib/types";

type FavoriteCourseCardProps = {
  favorite: FavoriteCourse;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  showSelectButton?: boolean;
  onSelect?: (favorite: FavoriteCourse) => void;
};

function formatSavedDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("ja-JP");
}

export function FavoriteCourseCard({
  favorite,
  onDelete,
  isSelected = false,
  showSelectButton = false,
  onSelect,
}: FavoriteCourseCardProps) {
  function handleOpenSearch(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    window.location.assign(favorite.mapUrl);
  }

  function handleOpenRoute(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (favorite.routeUrl) {
      window.location.assign(favorite.routeUrl);
    }
  }

  function handleDelete() {
    if (window.confirm("このお気に入りコースを削除しますか？")) {
      onDelete(favorite.id);
    }
  }

  return (
    <article className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-xl"
          aria-hidden="true"
        >
          {favorite.themeIcon}
        </span>
        <div className="space-y-1">
          <p className="text-xs font-bold text-emerald-700">
            {favorite.themeLabel}
          </p>
          <h3 className="text-lg font-bold leading-7 text-stone-900">
            {favorite.title}
          </h3>
        </div>
      </div>

      <div className="space-y-2 text-sm leading-6 text-stone-700">
        <p>{favorite.description}</p>
        <p className="font-semibold text-emerald-800">
          希望距離：{favorite.distanceKm}km
        </p>
        <p className="text-stone-500">
          保存日：{formatSavedDate(favorite.createdAt)}
        </p>
      </div>

      {showSelectButton && onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(favorite)}
          disabled={isSelected}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:border-emerald-600 disabled:bg-emerald-600 disabled:text-white"
        >
          {isSelected ? "選択中" : "このコースを選択"}
        </button>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={handleOpenSearch}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-600 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          周辺を検索する
        </button>
        <button
          type="button"
          onClick={handleOpenRoute}
          disabled={!favorite.routeUrl}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          徒歩ルートを開く
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
        >
          削除
        </button>
      </div>
    </article>
  );
}
