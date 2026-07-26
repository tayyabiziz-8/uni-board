import { FaChalkboardTeacher, FaStar, FaBookOpen, FaUserGraduate, FaChartLine, FaChartPie } from "react-icons/fa";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";

const monthlyLoad = [
    { month: "Jan", classes: 120 },
    { month: "Feb", classes: 135 },
    { month: "Mar", classes: 148 },
    { month: "Apr", classes: 162 },
    { month: "May", classes: 170 },
    { month: "Jun", classes: 181 },
];

const departments = [
    { name: "CS", value: 40 },
    { name: "SE", value: 28 },
    { name: "AI", value: 18 },
    { name: "DS", value: 14 },
];

const colors = ["#c2622d", "#cf7943", "#dc9059", "#b5541f"];

const teachers = [
    { id: 1, name: "Dr. Ahmed Ali", department: "Computer Science", courses: 4, rating: 4.8 },
    { id: 2, name: "Dr. Sarah Khan", department: "Software Engineering", courses: 3, rating: 4.6 },
    { id: 3, name: "Dr. Bilal Hassan", department: "Artificial Intelligence", courses: 5, rating: 4.9 },
    { id: 4, name: "Dr. Fatima Noor", department: "Data Science", courses: 2, rating: 4.7 },
];

export default function TeacherAnalytics() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">Teacher Analytics</h1>
                <p className="text-(--text-secondary) mt-1">Overview of teaching staff and performance.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard
                    title="Teachers"
                    value="154"
                    subtitle="Active Faculty"
                    icon={FaChalkboardTeacher}
                    color="rust"
                    trend={[145, 147, 148, 149, 150, 151, 153, 154]}
                />
                <StatCard
                    title="Average Rating"
                    value="4.7"
                    subtitle="Out of 5"
                    icon={FaStar}
                    color="amber"
                    trend={[4.5, 4.55, 4.6, 4.6, 4.65, 4.68, 4.7, 4.7]}
                />
                <StatCard
                    title="Courses"
                    value="72"
                    subtitle="Currently Offered"
                    icon={FaBookOpen}
                    color="blue"
                    trend={[64, 65, 66, 68, 69, 70, 71, 72]}
                />
                <StatCard
                    title="Students"
                    value="2,540"
                    subtitle="Currently Enrolled"
                    icon={FaUserGraduate}
                    color="teal"
                    trend={[2400, 2440, 2470, 2490, 2510, 2520, 2535, 2540]}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard title="Monthly Teaching Load" icon={FaChartLine}>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyLoad}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} />
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--bg-card)",
                                        border: "1px solid var(--border-color)",
                                        borderRadius: 8,
                                        color: "var(--text-primary)",
                                    }}
                                />
                                <Line type="monotone" dataKey="classes" stroke="#c2622d" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Teachers by Department" icon={FaChartPie}>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={departments} dataKey="value" nameKey="name" outerRadius={100} label>
                                    {departments.map((entry, index) => (
                                        <Cell key={index} fill={colors[index]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--bg-card)",
                                        border: "1px solid var(--border-color)",
                                        borderRadius: 8,
                                        color: "var(--text-primary)",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <h2 className="text-xl font-semibold text-(--text-primary) mb-4">Top Faculty Members</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary)">
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3">Courses</th>
                                <th className="px-4 py-3">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr
                                    key={teacher.id}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) text-(--text-primary)"
                                >
                                    <td className="px-4 py-4 font-medium">{teacher.name}</td>
                                    <td className="px-4 py-4">{teacher.department}</td>
                                    <td className="px-4 py-4">{teacher.courses}</td>
                                    <td className="px-4 py-4">⭐ {teacher.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}