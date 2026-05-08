type SummaryCardProps = {
  label: string;
  value: string;
  caption?: string;
};

export function SummaryCard({ label, value, caption }: SummaryCardProps) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-stone-900">{value}</p>
      {caption ? (
        <p className="mt-1 text-xs leading-5 text-stone-500">{caption}</p>
      ) : null}
    </article>
  );
}
