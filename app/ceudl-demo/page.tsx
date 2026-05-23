import Link from "next/link";
import { MobileShell } from "@/components/shell/MobileShell";
import { TopHeader } from "@/components/shell/TopHeader";
import { KPICard } from "@/components/admin/KPICard";
import { BarChartHorizontal, MiniLineChart } from "@/components/admin/Charts";
import { WipBadge, WipBanner } from "@/components/ui/WipBadge";
import { IconChevronRight, IconUsers } from "@/components/ui/icons";
import {
  assistantsByFaculty,
  kpiCards,
  peakHoursData,
  recentEventsStats,
} from "@/lib/data/ceudl-stats";

export default function CeudlDemoPage() {
  return (
    <MobileShell>
      <TopHeader
        title="Panel CEUdL"
        subtitle="Vista demo del producte final"
        backHref="/profile"
        right={<WipBadge label="DEMO" variant="solid" />}
      />

      <main className="flex-1 overflow-y-auto pb-8 animate-fade-up">
        <WipBanner
          title="Vista demo — dades fictícies"
          description="Aquesta pantalla mostra com es veurà el panel privat del CEUdL un cop tinguem dades reals d'esdeveniments connectats."
        />

        {/* Header context */}
        <div className="px-6 space-y-1 mb-4">
          <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
            Curs 2026-27 · Trimestre 1
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            Pols del campus
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Què està passant a la comunitat universitària de Lleida.
          </p>
        </div>

        {/* KPIs */}
        <section className="px-6">
          <div className="grid grid-cols-2 gap-2">
            {kpiCards.map((k) => (
              <KPICard key={k.label} {...k} />
            ))}
          </div>
        </section>

        {/* Bar chart by faculty */}
        <section className="px-6 pt-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Assistència per facultat
            </h2>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              últim trimestre
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <BarChartHorizontal data={assistantsByFaculty} />
            <p className="text-[10px] text-[var(--text-tertiary)] mt-3 pt-3 border-t border-[var(--border)]">
              Suma {assistantsByFaculty.reduce((s, f) => s + f.count, 0)} assistències úniques en esdeveniments organitzats pel CEUdL i partners.
            </p>
          </div>
        </section>

        {/* Peak hours */}
        <section className="px-6 pt-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Horari pic — Festa Major demo
            </h2>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              entrades validades
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <MiniLineChart data={peakHoursData} />
            <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[var(--border)] text-center">
              <MicroStat label="Pic" value="01:00" />
              <MicroStat label="Aforo màx." value="493" />
              <MicroStat label="Mitja" value="293" />
            </div>
          </div>
        </section>

        {/* Recent events */}
        <section className="px-6 pt-7 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Esdeveniments recents
          </h2>
          <div className="space-y-2">
            {recentEventsStats.map((e) => (
              <div
                key={e.eventName}
                className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">
                    {e.eventName}
                  </div>
                  <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5 flex items-center gap-2">
                    <span>{e.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <IconUsers size={10} />
                      {e.attendees}/{e.capacity}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold font-mono">{e.revenue}€</div>
                  <div className="text-[10px] text-[var(--text-tertiary)]">
                    facturació
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="px-6 pt-7 space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Accions
          </h2>
          <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden">
            <ActionRow
              label="Exportar a Excel"
              hint="Per a la Memòria Acadèmica"
              wip="Aviat"
            />
            <ActionRow
              label="Comunicació amb assistents"
              hint="Push + email a estudiants confirmats"
              wip="Aviat"
            />
            <ActionRow
              label="Crear nou esdeveniment"
              hint="Per al CEUdL i PromoFARRA"
              wip="Aviat"
            />
            <ActionRow
              label="Convidar promotor extern"
              hint="Onboarding amb verificació KYC"
              wip="Aviat"
            />
          </div>
        </section>

        {/* Footer note */}
        <div className="px-6 pt-7">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--primary)]/8 to-transparent border border-[var(--primary)]/20">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[var(--primary)] font-semibold">
                Idea per al CEUdL:
              </span>{" "}
              aquest panel us donaria, per primera vegada, mètriques pròpies
              de la vida estudiantil UdL — sense dependre d&apos;Instagram ni
              de plataformes externes. Tot integrable amb la vostra Memòria
              Acadèmica.
            </p>
            <Link
              href="/profile"
              className="inline-block mt-3 text-xs font-semibold text-[var(--primary)] hover:underline"
            >
              ← Tornar al perfil estudiant
            </Link>
          </div>
        </div>
      </main>
    </MobileShell>
  );
}

function MicroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-bold font-mono">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-0.5">
        {label}
      </div>
    </div>
  );
}

function ActionRow({
  label,
  hint,
  wip,
}: {
  label: string;
  hint?: string;
  wip?: string;
}) {
  return (
    <button
      type="button"
      className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-white/3 active:bg-white/5 transition text-left"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {wip && <WipBadge label={wip} variant="warning" />}
        </div>
        {hint && (
          <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
            {hint}
          </div>
        )}
      </div>
      <IconChevronRight
        size={16}
        className="text-[var(--text-tertiary)] shrink-0"
      />
    </button>
  );
}
