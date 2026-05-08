import type { Candidate } from "@/lib/types";
import { CandidateCard } from "./CandidateCard";

type CandidateListProps = {
  candidates: Candidate[];
};

export function CandidateList({ candidates }: CandidateListProps) {
  if (candidates.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3 px-5 sm:px-8">
      <h2 className="text-xl font-bold text-ink">散歩先候補</h2>
      <div className="grid gap-3 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
}
