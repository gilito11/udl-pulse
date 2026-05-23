import { IconLock, IconSparkles } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function HotBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
        "bg-[var(--primary)] text-white",
        className,
      )}
    >
      <IconSparkles size={10} strokeWidth={2.6} />
      HOT
    </span>
  );
}

export function UdlOnlyBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
        "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30",
        className,
      )}
    >
      <IconLock size={10} strokeWidth={2.4} />
      UdL only
    </span>
  );
}

export function CategoryBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
        "bg-white/5 border border-[var(--border)] text-[var(--text-secondary)]",
        className,
      )}
    >
      {label}
    </span>
  );
}
