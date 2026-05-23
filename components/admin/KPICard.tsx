import { IconTrendUp } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function KPICard({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "neutral";
}) {
  const trendColor =
    trend === "up"
      ? "text-[var(--success)]"
      : trend === "down"
        ? "text-[var(--error)]"
        : "text-[var(--text-tertiary)]";

  return (
    <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
      <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
        {label}
      </div>
      <div className="text-2xl font-bold font-mono leading-none">{value}</div>
      <div className={cn("flex items-center gap-1 text-[10px]", trendColor)}>
        {trend === "up" && <IconTrendUp size={10} strokeWidth={2.4} />}
        <span>{delta}</span>
      </div>
    </div>
  );
}
