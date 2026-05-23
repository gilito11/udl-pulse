// SVG charts mínims — fets a mà per a mantenir bundle baix.
// Suficient per al prototip; quan tinguem dades reals, considerar
// Recharts o Visx.

import { cn } from "@/lib/utils";

export function BarChartHorizontal({
  data,
  className,
}: {
  data: { faculty: string; count: number; color?: string }[];
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div className={cn("space-y-2", className)}>
      {data.map((d) => {
        const width = (d.count / max) * 100;
        return (
          <div key={d.faculty} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[var(--text-secondary)] font-medium">
                {d.faculty}
              </span>
              <span className="font-mono text-[var(--text-tertiary)]">
                {d.count}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${width}%`,
                  background: d.color ?? "var(--primary)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MiniLineChart({
  data,
  className,
}: {
  data: { hour: string; attendance: number }[];
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.attendance));
  const W = 320;
  const H = 100;
  const PAD = 8;
  const stepX = (W - PAD * 2) / (data.length - 1);

  const points = data.map((d, i) => {
    const x = PAD + i * stepX;
    const y = H - PAD - ((d.attendance / max) * (H - PAD * 2));
    return { x, y, hour: d.hour, value: d.attendance };
  });

  const pathD = points
    .map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`))
    .join(" ");

  const areaD = `${pathD} L${points[points.length - 1].x},${H - PAD} L${PAD},${H - PAD} Z`;

  return (
    <div className={cn("space-y-2", className)}>
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" aria-hidden>
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaD} fill="url(#lineGradient)" />
        <path
          d={pathD}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="3"
              fill="var(--bg)"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <text
              x={p.x}
              y={H + 14}
              fontSize="9"
              textAnchor="middle"
              fill="var(--text-tertiary)"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {p.hour}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
