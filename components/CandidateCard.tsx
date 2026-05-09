"use client";

import type { MouseEvent } from "react";
import { themeDisplay } from "@/lib/themeDisplay";
import type { Candidate } from "@/lib/types";

type CandidateCardProps = {
  candidate: Candidate;
  isFavorite?: boolean;
  onSaveFavorite?: (candidate: Candidate) => void;
};

export function CandidateCard({
  candidate,
  isFavorite = false,
  onSaveFavorite,
}: CandidateCardProps) {
  const display = themeDisplay[candidate.theme];

  function handleOpenSearch(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // アプリ内ブラウザでも動くように、現在のタブを周辺検索URLへ移動します。
    window.location.assign(candidate.mapUrl);
  }

  function handleOpenWalkingRoute(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // 徒歩ルートボタンでは、出発地から目的地までの経路URLを開きます。
    window.location.assign(candidate.walkingRouteUrl);
  }

  return (
    <article className="space-y-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xl"
          aria-hidden="true"
        >
          {display.icon}
        </span>
        <div className="space-y-2">
          <p className="text-xs font-bold text-emerald-700">{display.label}</p>
          <h3 className="text-lg font-bold leading-7 text-stone-900">
            {candidate.title}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-6 text-stone-700">
          {candidate.description}
        </p>
        <div className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          <p>推奨距離：{candidate.recommendedDistance}km</p>
          <p>{candidate.routeDistanceLabel}</p>
          {candidate.routeWaypoints.length > 0 ? (
            <p className="mt-1 font-medium text-stone-600">
              経由地：{candidate.routeWaypoints.join(" → ")}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleOpenSearch}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-600 bg-white px-4 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            周辺を検索する
          </button>
          <button
            type="button"
            onClick={handleOpenWalkingRoute}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            徒歩ルートを開く
          </button>
        </div>
        {onSaveFavorite ? (
          <button
            type="button"
            onClick={() => onSaveFavorite(candidate)}
            disabled={isFavorite}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-yellow-300 bg-white px-4 text-sm font-bold text-amber-700 transition hover:bg-yellow-50 focus:outline-none focus:ring-4 focus:ring-yellow-100 disabled:cursor-not-allowed disabled:border-emerald-200 disabled:bg-emerald-50 disabled:text-emerald-700"
          >
            {isFavorite ? "お気に入り済み" : "お気に入りに保存"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
