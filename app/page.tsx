import Link from "next/link";

export default function Home() {
  return (
    <div className="mobile-shell flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 pt-7 pb-3">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-[var(--primary)] grid place-items-center animate-pulse-glow">
            <span className="text-white font-bold text-lg leading-none">·</span>
          </div>
          <span className="font-semibold tracking-tight">UDL-Pulse</span>
        </div>
        <span className="text-xs text-[var(--text-tertiary)] font-mono">
          beta · 2026-27
        </span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-between px-6 pt-12 pb-8">
        <div className="animate-fade-up space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
            <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse" />
            Per a estudiants UdL verificats
          </div>

          <h1 className="text-[2.6rem] leading-[1.05] font-bold tracking-tight">
            La teva vida{" "}
            <span className="text-[var(--primary)]">UdL</span>,
            <br />
            en una sola app.
          </h1>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Entrades a TETEO, Biloba o la Festa Major. Descomptes a
            Caselles, Funatic o als gimnasos de Cappont. L&apos;agenda
            del curs. Tot en un lloc, només per a la comunitat
            universitària de Lleida.
          </p>

          {/* Feature pills */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <FeaturePill emoji="🎟️" label="Entrades" />
            <FeaturePill emoji="🏷️" label="Descomptes" />
            <FeaturePill emoji="📅" label="Agenda" />
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-12 animate-fade-up [animation-delay:120ms]">
          <Link
            href="#"
            className="block w-full text-center py-4 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors font-semibold text-white shadow-lg shadow-[var(--primary)]/20"
          >
            Verifica el teu @alumnes.udl.cat
          </Link>

          <p className="text-center text-xs text-[var(--text-tertiary)]">
            Llançament: <span className="text-[var(--text-secondary)] font-mono">setembre 2026</span> · Jornada d&apos;Acollida UdL
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-[var(--border)] text-center">
        <p className="text-[11px] text-[var(--text-tertiary)] leading-relaxed">
          Prototip · Construït per Eric Gil
          <br />
          Estudiant d&apos;Enginyeria Informàtica · EPS UdL
        </p>
      </footer>
    </div>
  );
}

function FeaturePill({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
      <span className="text-2xl" aria-hidden>
        {emoji}
      </span>
      <span className="text-xs text-[var(--text-secondary)] font-medium">
        {label}
      </span>
    </div>
  );
}
