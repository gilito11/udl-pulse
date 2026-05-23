"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCalendar,
  IconHome,
  IconMap,
  IconTicket,
  IconUser,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/home", label: "Inici", Icon: IconHome },
  { href: "/agenda", label: "Agenda", Icon: IconCalendar },
  { href: "/discounts", label: "Mapa", Icon: IconMap },
  { href: "/tickets", label: "Entrades", Icon: IconTicket },
  { href: "/profile", label: "Perfil", Icon: IconUser },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-30 glass border-t border-[var(--border)]">
      <div className="grid grid-cols-5 px-1 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-1.5 rounded-xl transition",
                "active:scale-95",
                active
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide",
                  active && "font-semibold",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
