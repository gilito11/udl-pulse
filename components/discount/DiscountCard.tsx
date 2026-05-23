import type { Discount, DiscountCategory } from "@/lib/types";
import {
  IconBookOpen,
  IconCoffee,
  IconDumbbell,
  IconFilm,
  IconMusic,
  IconShirt,
  IconWrench,
} from "@/components/ui/icons";
import { IconPin } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<
  DiscountCategory,
  {
    Icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    bg: string;
    label: string;
  }
> = {
  books: {
    Icon: IconBookOpen,
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.12)",
    label: "Llibres",
  },
  food: {
    Icon: IconCoffee,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    label: "Menjar",
  },
  gym: {
    Icon: IconDumbbell,
    color: "#10B981",
    bg: "rgba(16,185,129,0.12)",
    label: "Esport",
  },
  cinema: {
    Icon: IconFilm,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.12)",
    label: "Cinema",
  },
  clothing: {
    Icon: IconShirt,
    color: "#EC4899",
    bg: "rgba(236,72,153,0.12)",
    label: "Roba",
  },
  services: {
    Icon: IconWrench,
    color: "#9CA3AF",
    bg: "rgba(156,163,175,0.12)",
    label: "Serveis",
  },
  culture: {
    Icon: IconMusic,
    color: "#FF4D6D",
    bg: "rgba(255,77,109,0.12)",
    label: "Cultura",
  },
};

function discountDisplay(d: Discount): string {
  if (d.discountType === "percentage") return `-${d.discountValue}%`;
  if (d.discountType === "fixed_amount")
    return `${(d.discountValue / 100).toFixed(0)}€`;
  if (d.discountType === "bogo") return "2x1";
  if (d.discountType === "free") return "Gratis";
  return "";
}

export function DiscountCard({ discount }: { discount: Discount }) {
  const meta = CATEGORY_META[discount.merchant.category];
  const Icon = meta.Icon;

  return (
    <button
      type="button"
      className="w-full text-left rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 flex gap-3 items-start active:scale-[0.99] hover:border-white/15 transition"
    >
      <div
        className="shrink-0 size-12 rounded-xl grid place-items-center"
        style={{ background: meta.bg, color: meta.color }}
      >
        <Icon size={20} />
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight">
              {discount.merchant.name}
            </div>
            <div className="text-[11px] text-[var(--text-tertiary)] mt-0.5 flex items-center gap-1">
              <IconPin size={10} />
              <span className="truncate">{discount.merchant.neighborhood}</span>
            </div>
          </div>
          <div
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-bold shrink-0",
            )}
            style={{ background: meta.bg, color: meta.color }}
          >
            {discountDisplay(discount)}
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
          {discount.title}
        </p>

        {discount.totalRedeemed > 0 && (
          <div className="text-[10px] font-mono text-[var(--text-tertiary)] pt-0.5">
            {discount.totalRedeemed} estudiants ja l&apos;han fet servir
          </div>
        )}
      </div>
    </button>
  );
}
