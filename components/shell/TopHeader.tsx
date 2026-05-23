import Link from "next/link";
import { IconArrowLeft } from "@/components/ui/icons";

export function TopHeader({
  title,
  subtitle,
  backHref,
  right,
}: {
  title?: string;
  subtitle?: string;
  backHref?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 glass">
      <div className="px-5 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {backHref && (
            <Link
              href={backHref}
              aria-label="Tornar"
              className="size-9 -ml-2 rounded-full grid place-items-center hover:bg-white/5 active:scale-95 transition"
            >
              <IconArrowLeft size={20} />
            </Link>
          )}
          {title && (
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{title}</div>
              {subtitle && (
                <div className="text-[11px] text-[var(--text-tertiary)] truncate">
                  {subtitle}
                </div>
              )}
            </div>
          )}
        </div>
        {right && <div className="flex items-center gap-2">{right}</div>}
      </div>
    </header>
  );
}

export function BrandHeader() {
  return (
    <header className="px-6 pt-6 pb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-xl bg-[var(--primary)] grid place-items-center">
          <span className="text-white font-bold text-lg leading-none">·</span>
        </div>
        <div>
          <div className="font-semibold tracking-tight leading-none">
            UDL-Pulse
          </div>
          <div className="text-[10px] text-[var(--text-tertiary)] font-mono mt-0.5">
            beta · 2026
          </div>
        </div>
      </div>
    </header>
  );
}
