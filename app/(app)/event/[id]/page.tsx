import Link from "next/link";
import { notFound } from "next/navigation";
import { TopHeader } from "@/components/shell/TopHeader";
import { CapacityBar } from "@/components/event/CapacityBar";
import {
  CategoryBadge,
  HotBadge,
  UdlOnlyBadge,
} from "@/components/event/EventBadge";
import {
  IconCalendar,
  IconClock,
  IconLock,
  IconPin,
  IconUsers,
} from "@/components/ui/icons";
import { events, findEventById } from "@/lib/data/events";
import {
  formatEventDateShort,
  formatEventTime,
  formatPrice,
} from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = findEventById(id);
  if (!event) notFound();

  const tiersAvailable = event.tiers.filter((t) => t.sold < t.capacity);
  const cheapestAvailable = tiersAvailable.sort(
    (a, b) => a.priceCents - b.priceCents,
  )[0];

  return (
    <>
      <TopHeader
        backHref="/home"
        title={event.title}
        subtitle={event.organizer.name}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Hero photo */}
        <div className="relative aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {event.isHot && <HotBadge />}
            {event.isUdlExclusive && <UdlOnlyBadge />}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-2 pb-6 space-y-6 animate-fade-up">
          {/* Title block */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Organitza:{" "}
              <span className="text-[var(--text-primary)] font-medium">
                {event.organizer.name}
              </span>
            </p>
          </div>

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((t) => (
                <CategoryBadge key={t} label={`#${t}`} />
              ))}
            </div>
          )}

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-2">
            <InfoChip
              Icon={IconCalendar}
              label="Data"
              value={formatEventDateShort(event.startAt)}
            />
            <InfoChip
              Icon={IconClock}
              label="Hora"
              value={`${formatEventTime(event.startAt)}h`}
            />
            <InfoChip
              Icon={IconPin}
              label="Lloc"
              value={event.venueName}
              hint={event.venueAddress}
            />
            <InfoChip
              Icon={IconUsers}
              label="Aforament"
              value={`${event.capacityTotal}`}
              hint={`${event.capacitySold} venudes`}
            />
          </div>

          {/* Capacity */}
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Aforament en directe
            </div>
            <CapacityBar
              sold={event.capacitySold}
              total={event.capacityTotal}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Sobre l&apos;esdeveniment
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-primary)]/90">
              {event.description}
            </p>
          </div>

          {/* Tiers */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Tipus d&apos;entrada
            </h3>
            <div className="space-y-2">
              {event.tiers.map((tier) => {
                const soldOut = tier.sold >= tier.capacity;
                return (
                  <div
                    key={tier.id}
                    className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {tier.name}
                        </span>
                        {tier.isUdlOnly && (
                          <IconLock
                            size={12}
                            className="text-[var(--accent)]"
                          />
                        )}
                      </div>
                      {tier.description && (
                        <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                          {tier.description}
                        </p>
                      )}
                      {!soldOut && (
                        <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                          {tier.capacity - tier.sold} disponibles
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {soldOut ? (
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[var(--error)]/15 text-[var(--error)]">
                          Esgotat
                        </span>
                      ) : (
                        <div className="text-lg font-bold font-mono">
                          {tier.priceCents === 0
                            ? "Gratis"
                            : formatPrice(tier.priceCents)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-2" />
        </div>

        {/* Sticky CTA */}
        <div className="sticky bottom-0 z-20 glass border-t border-[var(--border)] px-5 py-3">
          {cheapestAvailable ? (
            <Link
              href={`/checkout?event=${event.id}&tier=${cheapestAvailable.id}`}
              className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors text-white font-semibold active:scale-[0.98]"
            >
              <span>
                Comprar entrada · des de {formatPrice(cheapestAvailable.priceCents)}
              </span>
              <span className="text-xs opacity-80">→</span>
            </Link>
          ) : (
            <div className="px-5 py-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center text-sm text-[var(--text-tertiary)]">
              Totes les entrades esgotades
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function InfoChip({
  Icon,
  label,
  value,
  hint,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-1">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
        <Icon size={11} />
        {label}
      </div>
      <div className="text-sm font-semibold leading-tight">{value}</div>
      {hint && (
        <div className="text-[10px] text-[var(--text-tertiary)]">{hint}</div>
      )}
    </div>
  );
}
