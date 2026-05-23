import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MobileShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mobile-shell flex flex-col bg-[var(--bg)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
