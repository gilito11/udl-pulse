import Link from "next/link";
import type { EventItem } from "@/lib/types";
import {
  formatEventDateShort,
  formatEventTime,
  formatPrice,
  relativeDayLabel,
} from "@/lib/utils";
import { HotBadge, UdlOnlyBadge } from "./EventBadge";
import { CapacityBar } from "./CapacityBar";
import { IconPin, IconClock } from "@/components/ui/icons";

function getMinPrice(event: EventItem): number {
  return Math.min(...event.tiers.map((t) => t.priceCents));
}

// Featured: tarjeta gran, foto a top, info debaix.
export function EventCardFeatured({ event }: { event: EventItem }) {
  const minPrice = getMinPrice(event);
  const isFree = minPrice === 0;

  return (
    <Link
      href={`/event/${event.id}`}
      className="block rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] active:scale-[0.98] transition-transform"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.coverImageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/30 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {event.isHot && <HotBadge />}
          {event.isUdlExclusive && <UdlOnlyBadge />}
        </div>

        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[11px] font-semibold uppercase tracking-wide">
          {relativeDayLabel(event.startAt)}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-bold tracking-tight leading-tight">
            {event.title}
          </h3>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {event.organizer.name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <IconClock size={12} className="text-[var(--text-tertiary)]" />
            <span>
              {formatEventDateShort(event.startAt)} ·{" "}
              {formatEventTime(event.startAt)}h
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <IconPin size={12} className="text-[var(--text-tertiary)]" />
            <span className="truncate">{event.venueName}</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <div className="flex-1 min-w-0">
            <CapacityBar
              sold={event.capacitySold}
              total={event.capacityTotal}
            />
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wide">
              {isFree ? "" : "des de"}
            </div>
            <div className="text-base font-bold">
              {isFree ? "Gratis" : formatPrice(minPrice)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Compact: card horitzontal, mini-foto a l'esquerra.
export function EventCardCompact({ event }: { event: EventItem }) {
  const minPrice = getMinPrice(event);
  const isFree = minPrice === 0;

  return (
    <Link
      href={`/event/${event.id}`}
      className="flex gap-3 p-2.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] active:scale-[0.99] transition-transform"
    >
      <div className="relative shrink-0 size-20 rounded-xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.coverImageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {event.isHot && (
          <div className="absolute top-1 left-1">
            <HotBadge />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold leading-tight truncate">
            {event.title}
          </h4>
          <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">
            {event.venueName} ·{" "}
            <span className="text-[var(--text-secondary)]">
              {relativeDayLabel(event.startAt)}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {formatEventTime(event.startAt)}h
          </div>
          <div className="text-sm font-bold">
            {isFree ? "Gratis" : formatPrice(minPrice)}
          </div>
        </div>
      </div>
    </Link>
  );
}
