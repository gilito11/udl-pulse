"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { TopHeader } from "@/components/shell/TopHeader";
import { findEventById } from "@/lib/data/events";
import {
  formatEventDateShort,
  formatEventTime,
  formatPriceCompact,
} from "@/lib/utils";
import { IconCheckCircle, IconLock } from "@/components/ui/icons";
import { Suspense } from "react";

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();
  const eventId = params.get("event");
  const tierId = params.get("tier");

  const event = eventId ? findEventById(eventId) : null;
  const tier = event?.tiers.find((t) => t.id === tierId) ?? event?.tiers[0];

  const [quantity, setQuantity] = useState(1);
  const [phase, setPhase] = useState<"select" | "processing" | "success">(
    "select",
  );

  if (!event || !tier) {
    return (
      <div className="flex-1 grid place-items-center p-10 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Esdeveniment no trobat.{" "}
          <Link
            href="/home"
            className="text-[var(--primary)] underline-offset-2 hover:underline"
          >
            Tornar a inici
          </Link>
        </p>
      </div>
    );
  }

  const subtotal = tier.priceCents * quantity;
  const serviceFee = Math.round(subtotal * 0.066) + 25; // ~6.6% + 0.25€ mock
  const total = subtotal + serviceFee;

  const startCheckout = async () => {
    setPhase("processing");
    await new Promise((r) => setTimeout(r, 1800));
    setPhase("success");
  };

  if (phase === "success") {
    return (
      <>
        <TopHeader title="Entrada confirmada" backHref="/home" />
        <main className="flex-1 grid place-items-center p-8">
          <div className="text-center space-y-5 animate-fade-up">
            <div className="size-20 rounded-full bg-[var(--success)]/15 border border-[var(--success)]/30 grid place-items-center mx-auto">
              <IconCheckCircle
                size={42}
                className="text-[var(--success)]"
                strokeWidth={2}
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Tot llest!</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                T&apos;hem enviat el QR al teu email i el trobaràs també a la pestanya{" "}
                <span className="text-[var(--text-primary)] font-medium">
                  Entrades
                </span>
                .
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-left space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                Resum
              </div>
              <div className="text-sm font-semibold">{event.title}</div>
              <div className="text-xs text-[var(--text-secondary)]">
                {formatEventDateShort(event.startAt)} ·{" "}
                {formatEventTime(event.startAt)}h
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {quantity} × {tier.name}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Link
                href="/tickets"
                className="flex-1 py-3 rounded-2xl bg-[var(--primary)] text-white font-semibold text-sm active:scale-95 transition"
              >
                Veure les meves entrades
              </Link>
            </div>
            <p className="text-[10px] text-[var(--text-tertiary)] pt-2">
              ⚠️ Mode demo — cap pagament real processat
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopHeader title="Compra" backHref={`/event/${event.id}`} />

      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-6 space-y-5 animate-fade-up">
        {/* Event summary */}
        <div className="flex gap-3 p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.coverImageUrl}
            alt=""
            className="size-16 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{event.title}</div>
            <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
              {formatEventDateShort(event.startAt)} ·{" "}
              {formatEventTime(event.startAt)}h
            </div>
            <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5 truncate">
              {event.venueName}
            </div>
          </div>
        </div>

        {/* Tier */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Entrada
          </h3>
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold flex items-center gap-1.5">
                {tier.name}
                {tier.isUdlOnly && (
                  <IconLock size={12} className="text-[var(--accent)]" />
                )}
              </div>
              {tier.description && (
                <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                  {tier.description}
                </p>
              )}
            </div>
            <div className="text-lg font-bold font-mono">
              {formatPriceCompact(tier.priceCents)}
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Quantitat
          </h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <span className="text-sm">Entrades</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="size-9 rounded-full bg-white/5 border border-[var(--border)] grid place-items-center text-lg font-bold active:scale-90 hover:bg-white/10 transition"
                aria-label="Reduir"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="text-lg font-bold w-6 text-center font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(6, q + 1))}
                className="size-9 rounded-full bg-white/5 border border-[var(--border)] grid place-items-center text-lg font-bold active:scale-90 hover:bg-white/10 transition"
                aria-label="Augmentar"
                disabled={quantity >= 6}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Resum
          </h3>
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <Row
              label={`${quantity} × ${tier.name}`}
              value={formatPriceCompact(subtotal)}
            />
            <Row
              label="Despeses de gestió"
              value={formatPriceCompact(serviceFee)}
              hint="Cobertura Stripe + comissió plataforma"
            />
            <div className="h-px bg-[var(--border)] my-1" />
            <Row label="Total" value={formatPriceCompact(total)} strong />
          </div>
        </div>

        {/* Payment method mock */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Mètode de pagament
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <PaymentChip name="Bizum" active />
            <PaymentChip name="Targeta" />
            <PaymentChip name="Apple Pay" />
            <PaymentChip name="Google Pay" />
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-[var(--text-tertiary)] text-center leading-relaxed">
          Aquest és un prototip. Cap pagament real es processarà — clica
          &quot;Pagar&quot; per veure la confirmació de demostració.
        </p>

        <div className="h-2" />
      </main>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 z-20 glass border-t border-[var(--border)] px-5 py-3">
        <button
          type="button"
          onClick={startCheckout}
          disabled={phase === "processing"}
          className="w-full py-3.5 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-70 transition-colors text-white font-semibold active:scale-[0.98] disabled:cursor-not-allowed"
        >
          {phase === "processing" ? (
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-white animate-pulse" />
              Processant…
            </span>
          ) : (
            `Pagar ${formatPriceCompact(total)}`
          )}
        </button>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  hint,
  strong,
}: {
  label: string;
  value: string;
  hint?: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div
          className={
            strong
              ? "text-sm font-bold"
              : "text-sm text-[var(--text-secondary)]"
          }
        >
          {label}
        </div>
        {hint && (
          <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
            {hint}
          </div>
        )}
      </div>
      <div
        className={
          strong
            ? "text-base font-bold font-mono"
            : "text-sm font-medium font-mono"
        }
      >
        {value}
      </div>
    </div>
  );
}

function PaymentChip({ name, active }: { name: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={
        active
          ? "py-3 rounded-2xl border-2 border-[var(--primary)] bg-[var(--primary)]/8 text-sm font-semibold"
          : "py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-secondary)]"
      }
    >
      {name}
    </button>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex-1" />}>
      <CheckoutInner />
    </Suspense>
  );
}
