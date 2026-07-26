import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const PALETTES = {
    rust: {
        badge: "bg-[var(--accent-soft)] text-[var(--accent-soft-text)]",
        stroke: "var(--accent)",
    },
    amber: {
        badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        stroke: "#d97706",
    },
    green: {
        badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        stroke: "#10b981",
    },
    blue: {
        badge: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        stroke: "#3b82f6",
    },
    purple: {
        badge: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
        stroke: "#7c3aed",
    },
    teal: {
        badge: "bg-teal-100 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400",
        stroke: "#0d9488",
    },
    red: {
        badge: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400",
        stroke: "#dc2626",
    },
};

export default function StatCard({ title, value, subtitle, icon: Icon, color = "rust", trend }) {
    const isRawClass = typeof color === "string" && color.startsWith("bg-");
    const palette = PALETTES[color] ?? PALETTES.rust;

    const sparkData = trend?.map((v, i) => ({ i, v }));

    return (
        <div
            className="bg-(--bg-card) hover:bg-(--bg-card-hover) border border-(--border-color)
            rounded-xl shadow-sm p-5 hover:shadow-md transition"
        >
            <div className="flex justify-between items-start">
                <div className="min-w-0">
                    <p className="text-sm text-(--text-secondary)">{title}</p>
                    <h2 className="text-4xl font-bold tracking-tight text-(--text-primary) mt-3">
                        {value}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-(--text-muted) mt-2">{subtitle}</p>
                    )}
                </div>

                {Icon && (
                    <div
                        className={`p-3 rounded-xl text-lg shrink-0 ${
                            isRawClass ? `${color} text-white` : palette.badge
                        }`}
                    >
                        <Icon />
                    </div>
                )}
            </div>

            {sparkData && sparkData.length > 1 && (
                <div className="h-8 mt-3 -mb-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparkData}>
                            <defs>
                                <linearGradient id={`spark-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={palette.stroke} stopOpacity={0.35} />
                                    <stop offset="100%" stopColor={palette.stroke} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="v"
                                stroke={palette.stroke}
                                strokeWidth={2}
                                fill={`url(#spark-${title})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}