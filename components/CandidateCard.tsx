"use client";

import type { MouseEvent } from "react";
import type { Candidate } from "@/lib/types";

type CandidateCardProps = {
  candidate: Candidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
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
    <article className="space-y-4 rounded-lg border border-stone-200 bg-white p-5">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-ink">{candidate.title}</h3>
        <p className="text-sm leading-6 text-stone-700">
          {candidate.description}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm font-semibold text-moss">
          <p>希望距離：{candidate.recommendedDistance}km</p>
          <p>{candidate.routeDistanceLabel}</p>
          {candidate.routeWaypoints.length > 0 ? (
            <p className="font-medium text-stone-600">
              経由地：{candidate.routeWaypoints.join(" → ")}
            </p>
          ) : null}
        </div>
        <div className="grid gap-2 sm:min-w-56">
          <button
            type="button"
            onClick={handleOpenSearch}
            className="inline-flex justify-center rounded-md border border-leaf px-4 py-2.5 text-sm font-bold text-moss transition hover:bg-leaf hover:text-white"
          >
            周辺を検索する
          </button>
          <button
            type="button"
            onClick={handleOpenWalkingRoute}
            className="inline-flex justify-center rounded-md bg-leaf px-4 py-2.5 text-sm font-bold text-white transition hover:bg-moss"
          >
            Googleマップで徒歩ルートを開く
          </button>
        </div>
      </div>
    </article>
  );
}
