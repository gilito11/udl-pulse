import {
  IconCalendar,
  IconClock,
  IconPin,
} from "@/components/ui/icons";
import { type AcademicItem, KIND_META } from "@/lib/data/academic";
import {
  formatEventDateShort,
  formatEventTime,
  relativeDayLabel,
} from "@/lib/utils";

export function AcademicItemCard({
  item,
  compact = false,
}: {
  item: AcademicItem;
  compact?: boolean;
}) {
  const meta = KIND_META[item.kind];

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
        <div
          className="shrink-0 size-10 rounded-xl grid place-items-center text-lg"
          style={{ background: meta.bg }}
        >
          <span aria-hidden>{meta.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold leading-tight truncate">
            {item.title}
          </div>
          <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">
            {item.subjectName}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: meta.color }}
          >
            {relativeDayLabel(item.startAt)}
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono mt-0.5">
            {formatEventTime(item.startAt)}h
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 size-11 rounded-xl grid place-items-center text-xl"
          style={{ background: meta.bg }}
        >
          <span aria-hidden>{meta.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-wider font-bold"
              style={{ color: meta.color }}
            >
              {meta.label}
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)] font-mono">
              · {item.subjectCode}
            </span>
          </div>
          <h3 className="text-sm font-semibold leading-tight mt-0.5">
            {item.title}
          </h3>
          <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
            {item.subjectName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <Chip
          Icon={IconCalendar}
          label={formatEventDateShort(item.startAt)}
          hint={relativeDayLabel(item.startAt)}
        />
        <Chip
          Icon={IconClock}
          label={`${formatEventTime(item.startAt)}h`}
          hint={item.endAt ? `Fins ${formatEventTime(item.endAt)}h` : undefined}
        />
        {item.location && (
          <Chip
            Icon={IconPin}
            label={item.location}
            className="col-span-2"
          />
        )}
      </div>

      {(item.notes || item.weight) && (
        <div className="pt-2 border-t border-[var(--border)] space-y-1">
          {item.weight && (
            <p className="text-[11px] text-[var(--text-secondary)]">
              <span className="text-[var(--text-tertiary)]">Pes:</span>{" "}
              <span className="font-medium">{item.weight}</span>
            </p>
          )}
          {item.notes && (
            <p className="text-[11px] text-[var(--text-tertiary)] leading-snug">
              {item.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Chip({
  Icon,
  label,
  hint,
  className = "",
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/3 border border-[var(--border)] ${className}`}
    >
      <Icon size={11} className="text-[var(--text-tertiary)] shrink-0" />
      <span className="text-[var(--text-primary)] font-medium truncate">
        {label}
      </span>
      {hint && (
        <span className="text-[var(--text-tertiary)] ml-auto shrink-0">
          {hint}
        </span>
      )}
    </div>
  );
}
