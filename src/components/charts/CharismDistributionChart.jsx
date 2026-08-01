import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const DATA = [
    { name: "Administration", green: 5200, orange: 9800, red: 2600 },
    { name: "Craftsmanship", green: 5800, orange: 9200, red: 2400 },
    { name: "Discernment", green: 9400, orange: 6300, red: 1600 },
    { name: "Encouragement", green: 11200, orange: 4900, red: 1400 },
    { name: "Evangelism", green: 5000, orange: 10200, red: 2200 },
    { name: "Faith", green: 9300, orange: 6100, red: 1700 },
    { name: "Giving", green: 9700, orange: 6500, red: 1600 },
    { name: "Healing", green: 5400, orange: 8300, red: 3500 },
    { name: "Helps", green: 9600, orange: 6800, red: 1300 },
    { name: "Hospitality", green: 8100, orange: 6100, red: 1700 },
    { name: "Intercession", green: 8300, orange: 6300, red: 1900 },
    { name: "Knowledge", green: 9600, orange: 5800, red: 1600 },
    { name: "Leadership", green: 7200, orange: 8100, red: 1700 },
    { name: "Mercy", green: 4900, orange: 9100, red: 1900 },
    { name: "Missionary", green: 6100, orange: 8700, red: 1800 },
    { name: "Music", green: 3600, orange: 3100, red: 7600 },
    { name: "Pastoring", green: 8500, orange: 5700, red: 2100 },
    { name: "Prophecy", green: 7900, orange: 6500, red: 2200 },
    { name: "Service", green: 8700, orange: 5900, red: 1900 },
    { name: "Teaching", green: 8200, orange: 6100, red: 2000 },
    { name: "Voluntary Poverty", green: 4400, orange: 950, red: 900 },
    { name: "Wisdom", green: 6700, orange: 8500, red: 1700 },
    { name: "Writing", green: 4700, orange: 9400, red: 2400 },
    { name: "Celibacy", green: 1700, orange: 2400, red: 1200 },
];

const COLORS = { green: "#16a34a", orange: "#d97706", red: "#dc2626" };

export default function CharismDistributionChart() {
    return (
        <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA} margin={{ bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        stroke="var(--text-secondary)"
                        tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                    />
                    <YAxis
                        domain={[0, 18000]}
                        ticks={[0, 4500, 9000, 13500, 18000]}
                        stroke="var(--text-secondary)"
                        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: 8,
                            color: "var(--text-primary)",
                        }}
                    />
                    <Bar dataKey="green" stackId="a" fill={COLORS.green} name="Green (Strong)" />
                    <Bar dataKey="orange" stackId="a" fill={COLORS.orange} name="Orange (Moderate)" />
                    <Bar dataKey="red" stackId="a" fill={COLORS.red} name="Red (Developing)" radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            <div className="flex justify-center gap-6 mt-3 flex-wrap">
                <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.green }} /> Green (Strong)
                </span>
                <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.orange }} /> Orange (Moderate)
                </span>
                <span className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.red }} /> Red (Developing)
                </span>
            </div>
        </div>
    );
}