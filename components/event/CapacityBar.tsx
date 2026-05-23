import { capacityPercent, remainingLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CapacityBar({
  sold,
  total,
  showLabel = true,
  className,
}: {
  sold: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}) {
  const percent = capacityPercent(sold, total);
  const isHot = percent >= 75;
  const isSoldOut = percent >= 100;

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-[11px]">
          <span
            className={cn(
              "font-medium",
              isSoldOut
                ? "text-[var(--error)]"
                : isHot
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-secondary)]",
            )}
          >
            {remainingLabel(sold, total)}
          </span>
          <span className="text-[var(--text-tertiary)] font-mono">
            {percent}%
          </span>
        </div>
      )}
      <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isSoldOut
              ? "bg-[var(--error)]"
              : isHot
                ? "bg-[var(--primary)]"
                : "bg-[var(--text-secondary)]",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
