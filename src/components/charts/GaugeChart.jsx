const ZONES = [
    { max: 0.39, label: "Red", stroke: "#dc2626", badgeBg: "bg-red-100 dark:bg-red-500/15", badgeText: "text-red-700 dark:text-red-400" },
    { max: 0.69, label: "Orange", stroke: "#d97706", badgeBg: "bg-amber-100 dark:bg-amber-500/15", badgeText: "text-amber-700 dark:text-amber-400" },
    { max: 1, label: "Green", stroke: "#16a34a", badgeBg: "bg-emerald-100 dark:bg-emerald-500/15", badgeText: "text-emerald-700 dark:text-emerald-400" },
];

function zoneFor(value) {
    return ZONES.find((z) => value <= z.max) ?? ZONES[ZONES.length - 1];
}

export default function GaugeChart({ value = 0 }) {
    const clamped = Math.min(1, Math.max(0, value));
    const zone = zoneFor(clamped);
    const cx = 150;
    const cy = 140;
    const r = 110;

    const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

    return (
        <div className="flex flex-col items-center">
            <svg viewBox="0 0 300 200" className="w-full max-w-xs">
                <path
                    d={trackPath}
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth="22"
                    strokeLinecap="round"
                    pathLength="100"
                />
                <path
                    d={trackPath}
                    fill="none"
                    stroke={zone.stroke}
                    strokeWidth="22"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray={`${clamped * 100} 100`}
                />

                <text x={cx} y={cy - r + 6} textAnchor="middle" className="font-bold fill-(--text-muted) text-[16px]">
                    0.5
                </text>
                <text x={cx - r} y={cy + 26} textAnchor="middle" className="font-semibold fill-(--text-muted) text-[16px]">
                    0
                </text>
                <text x={cx + r} y={cy + 26} textAnchor="middle" className="font-semibold fill-(--text-muted) text-[16px]">
                    1.0
                </text>

                <text x={cx} y={cy - 18} textAnchor="middle" className="fill-(--text-primary) text-[40px] font-bold">
                    {clamped.toFixed(2)}
                </text>
            </svg>

            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold -mt-2 ${zone.badgeBg} ${zone.badgeText}`}>
                {zone.label}
            </span>

            <div className="flex items-center gap-5 mt-5 flex-wrap justify-center">
                {ZONES.map((z) => (
                    <div key={z.label} className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: z.stroke }} />
                        {z.label} (
                        {z.label === "Red" ? "0-0.39" : z.label === "Orange" ? "0.4-0.69" : "0.7-1.0"})
                    </div>
                ))}
            </div>
        </div>
    );
}