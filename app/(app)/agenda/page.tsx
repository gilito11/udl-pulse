import { TopHeader } from "@/components/shell/TopHeader";
import { AcademicItemCard } from "@/components/academic/AcademicItemCard";
import { WipBadge, WipBanner } from "@/components/ui/WipBadge";
import { IconBookOpen, IconCheckCircle } from "@/components/ui/icons";
import {
  enrolledSubjects,
  getUpcomingAcademicItems,
} from "@/lib/data/academic";

export default function AgendaPage() {
  const items = getUpcomingAcademicItems();

  // Agrupa per setmana per fer visual com calendari
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    const week = getWeekKey(item.startAt);
    if (!acc[week]) acc[week] = [];
    acc[week].push(item);
    return acc;
  }, {});

  const totalCredits = enrolledSubjects.reduce((s, sub) => s + sub.credits, 0);

  return (
    <>
      <TopHeader
        title="Agenda acadèmica"
        subtitle="Grau d'Enginyeria Informàtica · EPS"
        backHref="/home"
      />

      <main className="flex-1 overflow-y-auto pb-6 animate-fade-up">
        <WipBanner
          title="Integració amb Campus Virtual — en construcció"
          description="Aquesta agenda es generarà automàticament a partir de la teva matrícula a Sakai i dels PDFs públics d'exàmens que publica cada centre UdL."
        />

        {/* Course summary */}
        <div className="px-5 mb-5">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--surface-elevated)] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                  Curs 2025-26 · 2n quadrimestre
                </div>
                <div className="text-base font-bold mt-0.5">
                  Eres a la recta final
                </div>
              </div>
              <div className="size-10 rounded-xl bg-[var(--accent)]/12 border border-[var(--accent)]/25 grid place-items-center text-[var(--accent)]">
                <IconBookOpen size={18} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[var(--border)]">
              <Stat value={enrolledSubjects.length.toString()} label="Assignatures" />
              <Stat value={totalCredits.toString()} label="Crèdits" />
              <Stat value={items.length.toString()} label="Pendents" />
            </div>
          </div>
        </div>

        {/* Subjects pills */}
        <div className="px-5 mb-5 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Assignatures matriculades
          </h2>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {enrolledSubjects.map((s) => (
              <div
                key={s.code}
                className="shrink-0 px-3 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] min-w-[180px]"
              >
                <div className="text-[10px] font-mono text-[var(--text-tertiary)]">
                  {s.code}
                </div>
                <div className="text-xs font-semibold leading-tight mt-0.5 truncate">
                  {s.name}
                </div>
                <div className="text-[10px] text-[var(--text-tertiary)] mt-0.5">
                  {s.credits} crèdits
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar groups */}
        <div className="px-5 space-y-6">
          {Object.entries(grouped).map(([weekKey, weekItems]) => (
            <section key={weekKey} className="space-y-2.5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                {weekKey}
              </h2>
              <div className="space-y-3">
                {weekItems.map((item) => (
                  <AcademicItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Features WIP */}
        <div className="px-5 pt-7 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Properes funcionalitats
          </h2>
          <FutureCard
            title="Sincronització amb Google Calendar / iCal"
            description="Tots els teus exàmens i entregues directament al calendari del mòbil."
          />
          <FutureCard
            title="Avisos intel·ligents"
            description="Notificacions 7 dies abans de cada examen, amb temps de repàs suggerit segons la nota mitjana de la teva promoció."
          />
          <FutureCard
            title="Calendari d'assignatures de tots els graus UdL"
            description="Parsing automàtic dels PDFs públics que la UdL publica cada quadrimestre per a totes les facultats. Genera l'agenda segons la teva matrícula."
          />
          <FutureCard
            title="Connexió amb el Campus Virtual"
            description="Login SSO amb Sakai per importar matrícula, notes i tasques. Requereix conveni amb la UdL."
            confirmed
          />
        </div>

        {/* Footer note */}
        <div className="px-5 pt-7">
          <p className="text-[10px] text-[var(--text-tertiary)] text-center leading-relaxed">
            Dades acadèmiques de demostració. Les dates reflecteixen el
            calendari públic d&apos;exàmens del Grau d&apos;Enginyeria
            Informàtica EPS, curs 2025-26.
          </p>
        </div>
      </main>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold font-mono">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-0.5">
        {label}
      </div>
    </div>
  );
}

function FutureCard({
  title,
  description,
  confirmed,
}: {
  title: string;
  description: string;
  confirmed?: boolean;
}) {
  return (
    <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-1">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>
        {confirmed ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--success)]/10 border border-[var(--success)]/30 text-[var(--success)] shrink-0">
            <IconCheckCircle size={10} strokeWidth={2.4} />
            Plan
          </span>
        ) : (
          <WipBadge label="Aviat" variant="warning" />
        )}
      </div>
      <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
        {description}
      </p>
    </div>
  );
}

// Helper: agrupa per "Aquesta setmana", "Setmana que ve", o mes
function getWeekKey(date: Date): string {
  const refNow = new Date("2026-05-23T00:00:00");
  const diff = Math.floor(
    (date.getTime() - refNow.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diff < 7) return "Aquesta setmana";
  if (diff < 14) return "Setmana que ve";
  if (diff < 30) return "Aquest mes";

  const months = [
    "Gener",
    "Febrer",
    "Març",
    "Abril",
    "Maig",
    "Juny",
    "Juliol",
    "Agost",
    "Setembre",
    "Octubre",
    "Novembre",
    "Desembre",
  ];
  return months[date.getMonth()];
}
