type SummaryCardProps = {
  label: string;
  value: string;
  caption?: string;
};

export function SummaryCard({ label, value, caption }: SummaryCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-4">
      <p className="text-xs font-semibold text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      {caption ? (
        <p className="mt-1 text-xs leading-5 text-stone-500">{caption}</p>
      ) : null}
    </article>
  );
}
