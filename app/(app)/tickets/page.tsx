import { TopHeader } from "@/components/shell/TopHeader";
import { TicketCard } from "@/components/ticket/TicketCard";
import { WipBadge } from "@/components/ui/WipBadge";
import { IconTicket } from "@/components/ui/icons";
import { purchasedTickets } from "@/lib/data/profile";
import Link from "next/link";

export default function TicketsPage() {
  if (purchasedTickets.length === 0) {
    return (
      <>
        <TopHeader title="Les meves entrades" />
        <main className="flex-1 grid place-items-center px-8 text-center">
          <div className="space-y-4">
            <div className="size-16 rounded-full bg-[var(--surface)] border border-[var(--border)] grid place-items-center mx-auto text-[var(--text-tertiary)]">
              <IconTicket size={28} />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Encara no tens entrades</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Descobreix què passa aquesta setmana al teu campus.
              </p>
            </div>
            <Link
              href="/home"
              className="inline-block px-5 py-2.5 rounded-2xl bg-[var(--primary)] text-white text-sm font-semibold"
            >
              Explorar esdeveniments
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopHeader title="Les meves entrades" />

      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-6 space-y-5 animate-fade-up">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Properes
          </h2>
          <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
            {purchasedTickets.length} entrades
          </span>
        </div>

        <div className="space-y-3">
          {purchasedTickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>

        <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-elevated)] border border-[var(--border)]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Compartir entrada amb un amic</h3>
            <WipBadge label="Aviat" variant="warning" />
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Aviat podràs cedir les teves entrades a altres estudiants UdL sense
            haver de pagar comissions de reventa.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Calendari iCal / Google</h3>
            <WipBadge label="Aviat" variant="warning" />
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Sincronitza les teves entrades amb el teu calendari per no oblidar
            cap esdeveniment.
          </p>
        </div>
      </main>
    </>
  );
}
