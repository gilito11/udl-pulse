import Link from "next/link";
import { TopHeader } from "@/components/shell/TopHeader";
import { WipBadge } from "@/components/ui/WipBadge";
import {
  IconBell,
  IconCheckCircle,
  IconChevronRight,
  IconGlobe,
  IconHelpCircle,
  IconLogOut,
  IconSettings,
  IconUsers,
} from "@/components/ui/icons";
import { currentProfile } from "@/lib/data/profile";

export default function ProfilePage() {
  return (
    <>
      <TopHeader title="El meu perfil" />

      <main className="flex-1 overflow-y-auto pb-6 animate-fade-up">
        {/* Avatar block */}
        <div className="px-6 pt-6 pb-5 flex items-center gap-4">
          <div className="relative">
            <div
              className="size-20 rounded-full grid place-items-center text-xl font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--accent))",
              }}
            >
              {currentProfile.initials}
            </div>
            <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-[var(--success)] grid place-items-center border-2 border-[var(--bg)]">
              <IconCheckCircle size={12} strokeWidth={3} className="text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold leading-tight truncate">
              {currentProfile.displayName}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              {currentProfile.facultyName}
            </p>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
              Estudiant verificat · Promoció 2026
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 grid grid-cols-3 gap-2">
          <Stat value="2" label="Entrades" />
          <Stat value="3" label="Descomptes" />
          <Stat value="180€" label="Estalviat" />
        </div>

        {/* Verification badge */}
        <div className="px-6 pt-5">
          <div className="p-4 rounded-2xl bg-[var(--success)]/8 border border-[var(--success)]/25 flex items-start gap-3">
            <div className="shrink-0 size-9 rounded-lg bg-[var(--success)]/15 grid place-items-center text-[var(--success)]">
              <IconCheckCircle size={18} strokeWidth={2.4} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[var(--success)]">
                Email UdL verificat
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-snug">
                eric.gil@alumnes.udl.cat · Verificat fa 2 dies. Mai
                emmagatzemem el teu email institucional un cop validat.
              </p>
            </div>
          </div>
        </div>

        {/* Settings list */}
        <div className="px-6 pt-6 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-1">
            Configuració
          </h2>
          <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden">
            <SettingRow
              Icon={IconBell}
              label="Notificacions"
              hint="Push, email i recordatoris"
              wip="Aviat"
            />
            <SettingRow
              Icon={IconGlobe}
              label="Idioma"
              hint="Català"
            />
            <SettingRow
              Icon={IconUsers}
              label="Convida amics UdL"
              hint="Aconsegueix 5€ per cada amic verificat"
              wip="Aviat"
            />
            <SettingRow
              Icon={IconSettings}
              label="Preferències de privacitat"
              hint="Dades, telemetria, RGPD"
            />
          </div>
        </div>

        <div className="px-6 pt-6 space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] px-1">
            Suport
          </h2>
          <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden">
            <SettingRow Icon={IconHelpCircle} label="Ajuda & FAQ" />
            <SettingRow
              Icon={IconLogOut}
              label="Tancar sessió"
              destructive
            />
          </div>
        </div>

        {/* Build info — humanitza */}
        <div className="px-6 pt-6 pb-4 text-center">
          <Link
            href="/ceudl-demo"
            className="inline-block text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] underline-offset-2 hover:underline"
          >
            → Vista demo per al CEUdL
          </Link>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-3 font-mono">
            UDL-Pulse · v0.0.1 · build maig 2026
          </p>
          <p className="text-[10px] text-[var(--text-tertiary)] mt-1">
            Construint amb amor des de l&apos;EPS · Eric Gil
          </p>
        </div>
      </main>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center">
      <div className="text-xl font-bold font-mono">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mt-1">
        {label}
      </div>
    </div>
  );
}

function SettingRow({
  Icon,
  label,
  hint,
  wip,
  destructive,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  hint?: string;
  wip?: string;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-white/3 active:bg-white/5 transition text-left"
    >
      <div
        className={
          destructive
            ? "shrink-0 size-9 rounded-lg bg-[var(--error)]/12 grid place-items-center text-[var(--error)]"
            : "shrink-0 size-9 rounded-lg bg-white/5 grid place-items-center text-[var(--text-secondary)]"
        }
      >
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={
              destructive
                ? "text-sm font-medium text-[var(--error)]"
                : "text-sm font-medium"
            }
          >
            {label}
          </span>
          {wip && <WipBadge label={wip} variant="ghost" />}
        </div>
        {hint && (
          <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
            {hint}
          </div>
        )}
      </div>
      {!destructive && (
        <IconChevronRight
          size={16}
          className="text-[var(--text-tertiary)] shrink-0"
        />
      )}
    </button>
  );
}
