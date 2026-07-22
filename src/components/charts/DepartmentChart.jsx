import { ResponsiveContainer, BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Cell } from "recharts";

const data = [
    {
        department: "CS",
        students: 420
    },
    {
        department: "SE",
        students: 340
    },
    {
        department: "AI",
        students: 275
    },
    {
        department: "DS",
        students: 190
    },
    {
        department: "IT",
        students: 240
    }
];

const colors = [
    "#C65D28",
    "#D97706",
    "#EA580C",
    "#B45309",
    "#9A3412"
];

export default function DepartmentChart() {

    return (

        <div className="w-full h-80">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 0
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="department"
                    />

                    <YAxis />

                    <Tooltip
                        cursor={{
                            fill: "#f4f4f5"
                        }}
                    />
                    <Bar dataKey="students" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}