import Link from "next/link";
import {
  EventCardCompact,
  EventCardFeatured,
} from "@/components/event/EventCard";
import { BrandHeader } from "@/components/shell/TopHeader";
import { AcademicItemCard } from "@/components/academic/AcademicItemCard";
import {
  IconBell,
  IconChevronRight,
  IconSparkles,
} from "@/components/ui/icons";
import { WipBadge } from "@/components/ui/WipBadge";
import { events, getFeaturedEvents, getUpcomingEvents } from "@/lib/data/events";
import { currentProfile } from "@/lib/data/profile";
import { getUpcomingAcademicItems } from "@/lib/data/academic";

export default function HomePage() {
  const upcoming = getUpcomingEvents();
  const featured = getFeaturedEvents();
  const otherUpcoming = upcoming.filter(
    (e) => !featured.some((f) => f.id === e.id),
  );
  const udlExclusives = events.filter((e) => e.isUdlExclusive);
  const academicItems = getUpcomingAcademicItems().slice(0, 3);

  return (
    <>
      <BrandHeader />

      <div className="px-6 pt-2 pb-4 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Hola, {currentProfile.displayName.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            Aquesta setmana al teu campus
          </p>
        </div>
        <button
          type="button"
          aria-label="Notificacions"
          className="size-10 rounded-full bg-[var(--surface)] border border-[var(--border)] grid place-items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95 transition relative"
        >
          <IconBell size={18} />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-[var(--primary)] animate-pulse" />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto pb-4">
        {/* AGENDA ACADÈMICA — destacat */}
        {academicItems.length > 0 && (
          <section className="px-6 mb-6 animate-fade-up">
            <Link
              href="/agenda"
              className="block rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/8 to-transparent p-4 active:scale-[0.99] transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-bold">
                    Agenda EPS Informàtica
                  </div>
                  <div className="text-base font-bold mt-0.5">
                    Pròximes entregues i exàmens
                  </div>
                </div>
                <IconChevronRight
                  size={18}
                  className="text-[var(--text-tertiary)] shrink-0"
                />
              </div>
              <div className="space-y-2">
                {academicItems.map((item) => (
                  <AcademicItemCard key={item.id} item={item} compact />
                ))}
              </div>
            </Link>
          </section>
        )}

        {/* DESTACATS */}
        <section className="px-6 space-y-3 animate-fade-up [animation-delay:60ms]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
              <IconSparkles
                size={14}
                className="text-[var(--primary)]"
                strokeWidth={2.4}
              />
              Destacats
            </h2>
            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
              {featured.length} esdeveniments
            </span>
          </div>
          <div className="space-y-3">
            {featured.map((e) => (
              <EventCardFeatured key={e.id} event={e} />
            ))}
          </div>
        </section>

        {/* PROPERAMENT */}
        {otherUpcoming.length > 0 && (
          <section className="px-6 pt-7 space-y-3 animate-fade-up [animation-delay:80ms]">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Properament
            </h2>
            <div className="space-y-2">
              {otherUpcoming.slice(0, 4).map((e) => (
                <EventCardCompact key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}

        {/* SOLO UdL */}
        <section className="px-6 pt-7 space-y-3 animate-fade-up [animation-delay:160ms]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Només per a UdL
            </h2>
            <span className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
              Verificat
            </span>
          </div>
          <div className="space-y-2">
            {udlExclusives.slice(0, 3).map((e) => (
              <EventCardCompact key={e.id} event={e} />
            ))}
          </div>
        </section>

        {/* WIP — Personalización */}
        <section className="px-6 pt-7 animate-fade-up [animation-delay:240ms]">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/5 border border-[var(--primary)]/20 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Feed personalitzat</h3>
              <WipBadge label="Aviat" variant="warning" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Estem construint un algorisme que aprèn dels teus interessos:
              ranking d&apos;esdeveniments segons la teva facultat, gèneres
              musicals i historial. Disponible al setembre.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
