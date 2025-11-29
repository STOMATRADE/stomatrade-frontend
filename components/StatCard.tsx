type StatCardProps = {
  title: string;
  value: string;
  change?: string;
};

export function StatCard({ title, value, change }: StatCardProps) {
  return (
    <div className="glass-panel rounded-2xl border border-[#1f1f1f] p-5 shadow-glow">
      <p className="text-sm uppercase tracking-[0.15em] text-gray-400">{title}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-white">{value}</p>
        {change ? (
          <span className="rounded-full bg-secondaryBg px-3 py-1 text-xs font-semibold text-primary">{change}</span>
        ) : null}
      </div>
    </div>
  );
}
