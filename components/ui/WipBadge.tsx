import { IconWrench } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function WipBadge({
  label = "En construcció",
  className,
  variant = "ghost",
}: {
  label?: string;
  className?: string;
  variant?: "ghost" | "warning" | "solid";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium",
        variant === "ghost" &&
          "bg-white/5 border border-[var(--border)] text-[var(--text-tertiary)]",
        variant === "warning" &&
          "bg-[var(--warning)]/10 border border-[var(--warning)]/30 text-[var(--warning)]",
        variant === "solid" &&
          "bg-[var(--warning)] text-black",
        className,
      )}
    >
      <IconWrench size={10} strokeWidth={2.4} />
      {label}
    </span>
  );
}

export function WipBanner({
  title = "Vista demo",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mx-5 mb-4 p-3 rounded-2xl bg-[var(--warning)]/8 border border-[var(--warning)]/25 flex items-start gap-3">
      <div className="shrink-0 size-8 rounded-lg bg-[var(--warning)]/15 grid place-items-center text-[var(--warning)]">
        <IconWrench size={16} strokeWidth={2.2} />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-[var(--warning)]">
          {title}
        </div>
        {description && (
          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
