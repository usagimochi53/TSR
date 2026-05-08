import type { Candidate } from "@/lib/types";
import { CandidateCard } from "./CandidateCard";

type CandidateListProps = {
  candidates: Candidate[];
};

export function CandidateList({ candidates }: CandidateListProps) {
  if (candidates.length === 0) {
    return (
      <section className="space-y-3 px-4">
        <h2 className="text-xl font-bold text-stone-900">散歩先候補</h2>
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          まだ散歩先が表示されていません。出発地・距離・テーマを選んで「散歩先を探す」を押してみましょう。
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3 px-4">
      <h2 className="text-xl font-bold text-stone-900">散歩先候補</h2>
      <div className="grid gap-3">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
}
