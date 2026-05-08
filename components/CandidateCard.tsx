"use client";

import type { MouseEvent } from "react";
import type { Candidate } from "@/lib/types";

type CandidateCardProps = {
  candidate: Candidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  function handleOpenMap(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // アプリ内ブラウザでは外部リンクの新規タブが開かない場合があるため、
    // 現在のタブを直接Googleマップへ移動します。
    window.location.assign(candidate.mapUrl);
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
        <p className="text-sm font-semibold text-moss">
          推奨距離：{candidate.recommendedDistance}km
        </p>
        <button
          type="button"
          onClick={handleOpenMap}
          className="inline-flex justify-center rounded-md bg-leaf px-4 py-2.5 text-sm font-bold text-white transition hover:bg-moss"
        >
          Googleマップで開く
        </button>
      </div>
    </article>
  );
}
