import { cn } from "@/lib/utils";

const styles = {
  top: "bg-emerald-100 text-emerald-800 border-emerald-300",
  mid: "bg-amber-100 text-amber-800 border-amber-300",
  low: "bg-red-100 text-red-700 border-red-300",
  nc: "bg-gray-100 text-gray-500 border-gray-200",
};

export function VerdictBadge({ level, label, className }: {
  level: "top" | "mid" | "low" | "nc";
  label: string;
  className?: string;
}) {
  return (
    <span className={cn("text-[11px] font-medium px-2.5 py-0.5 rounded-full border", styles[level], className)}>
      {label}
    </span>
  );
}
