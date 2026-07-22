import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const data = [

    {
        month: "Jan",
        students: 180
    },
    {
        month: "Feb",
        students: 250
    },
    {
        month: "Mar",
        students: 300
    },
    {
        month: "Apr",
        students: 420
    },
    {
        month: "May",
        students: 510
    },
    {
        month: "Jun",
        students: 590
    }
];

export default function EnrollmentChart() {

    return (
        <div className="w-full h-80">

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>

                    <defs>

                        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">

                            <stop
                                offset="5%"
                                stopColor="#c65d28"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="95%"
                                stopColor="#c65d28"
                                stopOpacity={0.05}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="month"
                    />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="students" stroke="#c65d28" fill="url(#fill)"/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}