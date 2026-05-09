import type { Candidate } from "@/lib/types";
import { CandidateCard } from "./CandidateCard";

type CandidateListProps = {
  candidates: Candidate[];
  favoriteIds?: string[];
  favoriteMessage?: string;
  onSaveFavorite?: (candidate: Candidate) => void;
};

export function CandidateList({
  candidates,
  favoriteIds = [],
  favoriteMessage = "",
  onSaveFavorite,
}: CandidateListProps) {
  if (candidates.length === 0) {
    return (
      <section className="space-y-3 px-4">
        <h2 className="text-xl font-bold text-stone-900">散歩先候補</h2>
        {favoriteMessage ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {favoriteMessage}
          </p>
        ) : null}
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          まだ散歩先が表示されていません。出発地・距離・テーマを選んで「散歩先を探す」を押してみましょう。
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3 px-4">
      <h2 className="text-xl font-bold text-stone-900">散歩先候補</h2>
      {favoriteMessage ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {favoriteMessage}
        </p>
      ) : null}
      <div className="grid gap-3">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isFavorite={favoriteIds.includes(candidate.id)}
            onSaveFavorite={onSaveFavorite}
          />
        ))}
      </div>
    </section>
  );
}
