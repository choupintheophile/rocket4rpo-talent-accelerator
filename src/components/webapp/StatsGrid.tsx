interface StatsGridProps {
  total: number;
  prioritaire: number;
  secondaire: number;
}

export function StatsGrid({ total, prioritaire, secondaire }: StatsGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-2xl font-medium font-mono">{total}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">total candidats</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-2xl font-medium font-mono text-emerald-800">{prioritaire}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">vivier prioritaire</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-2xl font-medium font-mono text-amber-700">{secondaire}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">vivier secondaire</div>
      </div>
    </div>
  );
}
