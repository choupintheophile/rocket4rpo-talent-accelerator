interface StatsGridProps {
  total: number;
  prioritaire: number;
  secondaire: number;
  nonRetenu: number;
}

function pct(count: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((count / total) * 100)}%`;
}

export function StatsGrid({ total, prioritaire, secondaire, nonRetenu }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div className="bg-white border border-gray-200 rounded-xl p-4 border-t-[3px] border-t-rocket-teal">
        <div className="text-2xl font-medium font-mono">{total}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">total candidats</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 border-t-[3px] border-t-emerald-500">
        <div className="text-2xl font-medium font-mono text-emerald-800">{prioritaire}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">
          vivier prioritaire
          <span className="ml-1 text-gray-400">({pct(prioritaire, total)})</span>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 border-t-[3px] border-t-amber-500">
        <div className="text-2xl font-medium font-mono text-amber-700">{secondaire}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">
          vivier secondaire
          <span className="ml-1 text-gray-400">({pct(secondaire, total)})</span>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 border-t-[3px] border-t-red-500">
        <div className="text-2xl font-medium font-mono text-red-700">{nonRetenu}</div>
        <div className="text-[11px] text-gray-500 mt-0.5">
          non retenu
          <span className="ml-1 text-gray-400">({pct(nonRetenu, total)})</span>
        </div>
      </div>
    </div>
  );
}
