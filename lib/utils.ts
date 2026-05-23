// Utils compartits. Sense dependència externa (no clsx, no tailwind-merge)
// per mantenir bundle mínim al prototip.

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(priceCents: number): string {
  return `${(priceCents / 100).toFixed(0)}€`;
}

export function formatPriceCompact(priceCents: number): string {
  const euros = priceCents / 100;
  return Number.isInteger(euros) ? `${euros}€` : `${euros.toFixed(2)}€`;
}

const WEEKDAYS_CA = [
  "diumenge",
  "dilluns",
  "dimarts",
  "dimecres",
  "dijous",
  "divendres",
  "dissabte",
];

const MONTHS_CA = [
  "gener",
  "febrer",
  "març",
  "abril",
  "maig",
  "juny",
  "juliol",
  "agost",
  "setembre",
  "octubre",
  "novembre",
  "desembre",
];

export function formatEventDateShort(date: Date): string {
  const day = WEEKDAYS_CA[date.getDay()];
  const num = date.getDate();
  const month = MONTHS_CA[date.getMonth()].slice(0, 3);
  return `${day.charAt(0).toUpperCase() + day.slice(1)} ${num} ${month}`;
}

export function formatEventTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function relativeDayLabel(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Avui";
  if (diffDays === 1) return "Demà";
  if (diffDays > 1 && diffDays <= 6) return `En ${diffDays} dies`;
  if (diffDays < 0) return "Passat";
  return formatEventDateShort(date);
}

export function capacityPercent(sold: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, Math.round((sold / total) * 100));
}

export function remainingLabel(sold: number, total: number): string {
  const remaining = total - sold;
  if (remaining <= 0) return "Esgotat";
  if (remaining < 20) return `Queden ${remaining} entrades`;
  if (remaining < 100) return `Queden ~${Math.floor(remaining / 10) * 10}`;
  return "Disponible";
}
