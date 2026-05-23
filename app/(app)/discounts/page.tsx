import { TopHeader } from "@/components/shell/TopHeader";
import { DiscountCard } from "@/components/discount/DiscountCard";
import { WipBadge, WipBanner } from "@/components/ui/WipBadge";
import { IconPin } from "@/components/ui/icons";
import { discounts } from "@/lib/data/discounts";

const NEIGHBORHOOD_FILTERS = [
  { id: "all", label: "Tots" },
  { id: "cappont", label: "Cappont" },
  { id: "centre", label: "Centre" },
  { id: "etsea", label: "ETSEA" },
];

export default function DiscountsPage() {
  // Agrupa per barrio
  const byNeighborhood = discounts.reduce<Record<string, typeof discounts>>(
    (acc, d) => {
      const key = d.merchant.neighborhood;
      if (!acc[key]) acc[key] = [];
      acc[key].push(d);
      return acc;
    },
    {},
  );

  return (
    <>
      <TopHeader title="Descomptes" subtitle="Només per a estudiants UdL" />

      <main className="flex-1 overflow-y-auto pb-6 animate-fade-up">
        {/* Map placeholder — WIP */}
        <div className="mx-5 mt-4 rounded-3xl overflow-hidden relative">
          <div
            className="aspect-[16/9] grid place-items-center relative"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(255,77,109,0.18), transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,210,63,0.10), transparent 50%), #16161D",
            }}
          >
            {/* Pins simulats */}
            <div className="absolute top-[28%] left-[22%] size-7 rounded-full bg-[var(--primary)] grid place-items-center text-white shadow-lg shadow-[var(--primary)]/30 animate-pulse-glow">
              <IconPin size={14} strokeWidth={2.4} />
            </div>
            <div className="absolute top-[55%] left-[48%] size-7 rounded-full bg-[#06B6D4] grid place-items-center text-white shadow-lg">
              <IconPin size={14} strokeWidth={2.4} />
            </div>
            <div className="absolute top-[42%] left-[72%] size-7 rounded-full bg-[#10B981] grid place-items-center text-white shadow-lg">
              <IconPin size={14} strokeWidth={2.4} />
            </div>
            <div className="absolute top-[68%] left-[28%] size-7 rounded-full bg-[#F59E0B] grid place-items-center text-white shadow-lg">
              <IconPin size={14} strokeWidth={2.4} />
            </div>

            <div className="absolute inset-x-0 bottom-3 text-center">
              <WipBadge
                label="Vista mapa interactiva — Mapbox al setembre"
                variant="warning"
              />
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="px-5 pt-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
          {NEIGHBORHOOD_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={
                f.id === "all"
                  ? "px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-white text-xs font-semibold whitespace-nowrap"
                  : "px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)] whitespace-nowrap hover:border-white/15 transition"
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Listings agrupats per barrio */}
        <div className="px-5 pt-5 space-y-6">
          {Object.entries(byNeighborhood).map(([neighborhood, items]) => (
            <section key={neighborhood} className="space-y-2.5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                <IconPin size={12} />
                {neighborhood}
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                  ({items.length})
                </span>
              </h2>
              <div className="space-y-2">
                {items.map((d) => (
                  <DiscountCard key={d.id} discount={d} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* WIP - més comerços */}
        <div className="px-5 pt-7">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--accent)]/8 to-transparent border border-[var(--accent)]/20 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                Estem onboarding +15 comerços
              </h3>
              <WipBadge label="Negociant" variant="warning" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Estem parlant amb la copisteria de Cappont, més gimnasos, una
              dotzena de bars universitaris i les llibreries del centre. Si
              coneixes algun negoci que vulgui afegir-se,{" "}
              <span className="text-[var(--accent)] font-medium">
                escriu-nos
              </span>
              .
            </p>
          </div>
        </div>

        <div className="px-5 pt-4">
          <WipBanner
            title="Dades demo"
            description="Aquests descomptes es presenten com a exemples. Els acords reals es signaran després de validar la idea amb el CEUdL."
          />
        </div>
      </main>
    </>
  );
}
