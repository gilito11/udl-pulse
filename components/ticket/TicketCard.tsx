import Link from "next/link";
import type { PurchasedTicket } from "@/lib/types";
import { formatEventDateShort, formatEventTime } from "@/lib/utils";
import { IconCheckCircle, IconPin, IconClock } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

// QR mock visual — patró determinístic basat en el codi
function QrMock({ code }: { code: string }) {
  // Hash determinístic simple per a generar patró
  const cells = Array.from({ length: 14 * 14 }, (_, i) => {
    let h = 0;
    for (let j = 0; j < code.length; j++) {
      h = (h * 31 + code.charCodeAt(j) + i) & 0xffffffff;
    }
    return (h & 1) === 0;
  });

  return (
    <div className="size-32 p-2 bg-white rounded-xl">
      <div
        className="grid gap-[1px] size-full"
        style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}
      >
        {cells.map((on, i) => (
          <div
            key={i}
            className={cn(on ? "bg-black" : "bg-white")}
          />
        ))}
      </div>
    </div>
  );
}

export function TicketCard({ ticket }: { ticket: PurchasedTicket }) {
  const isConfirmed = ticket.status === "confirmed";

  return (
    <Link
      href={`/event/${ticket.event.id}`}
      className="block rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] active:scale-[0.99] transition"
    >
      <div className="relative aspect-[16/8] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ticket.event.coverImageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[var(--success)]/20 border border-[var(--success)]/40 text-[10px] font-semibold uppercase tracking-wider text-[var(--success)] flex items-center gap-1">
          <IconCheckCircle size={10} strokeWidth={2.6} />
          Confirmada
        </div>
      </div>

      <div className="p-4 flex gap-4 items-center">
        <QrMock code={ticket.qrCode} />

        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h3 className="text-sm font-bold leading-tight truncate">
              {ticket.event.title}
            </h3>
            <p className="text-[10px] text-[var(--text-tertiary)] font-mono mt-0.5">
              {ticket.qrCode}
            </p>
          </div>

          <div className="space-y-1 text-[11px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <IconClock
                size={11}
                className="text-[var(--text-tertiary)]"
              />
              {formatEventDateShort(ticket.event.startAt)} ·{" "}
              {formatEventTime(ticket.event.startAt)}h
            </div>
            <div className="flex items-center gap-1.5">
              <IconPin size={11} className="text-[var(--text-tertiary)]" />
              <span className="truncate">{ticket.event.venueName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-medium text-[var(--text-secondary)]">
              {ticket.tier.name}
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)]">
              ×{ticket.quantity}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
