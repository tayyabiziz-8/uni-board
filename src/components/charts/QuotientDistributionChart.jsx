import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

const ZONES = [
    { key: "red", label: "Zone (0-0.39)", shortLabel: "Red", count: 2678, percent: 15, color: "#dc2626" },
    { key: "orange", label: "Orange Zone (0.4-0.69)", shortLabel: "Orange", count: 7774, percent: 44, color: "#d97706" },
    { key: "green", label: "Zone (0.7-1.0)", shortLabel: "Green", count: 7162, percent: 41, color: "#16a34a" },
];

export default function QuotientDistributionChart() {
    return (
        <div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ZONES} layout="vertical" margin={{ left: 10, right: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                        <XAxis type="number" domain={[0, 8000]} stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                        <YAxis
                            type="category"
                            dataKey="label"
                            width={130}
                            stroke="var(--text-secondary)"
                            tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={26}>
                            {ZONES.map((z) => (
                                <Cell key={z.key} fill={z.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-around mt-4 flex-wrap gap-3">
                {ZONES.map((z) => (
                    <div key={z.key} className="text-center">
                        <div className="flex items-center gap-1.5 justify-center text-sm font-medium" style={{ color: z.color }}>
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: z.color }} />
                            {z.shortLabel}
                        </div>
                        <p className="text-lg font-bold text-(--text-primary) mt-1">
                            {z.count.toLocaleString()} ({z.percent}%)
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}