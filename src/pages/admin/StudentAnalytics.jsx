import { FaUserGraduate, FaClipboardCheck, FaUniversity, FaAward, FaChartLine, FaLayerGroup } from "react-icons/fa";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, BarChart, Bar, Cell } from "recharts";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";

const enrollmentData = [
    { month: "Jan", admissions: 180, graduates: 95 },
    { month: "Feb", admissions: 205, graduates: 88 },
    { month: "Mar", admissions: 235, graduates: 102 },
    { month: "Apr", admissions: 250, graduates: 115 },
    { month: "May", admissions: 270, graduates: 120 },
    { month: "Jun", admissions: 295, graduates: 135 },
    { month: "Jul", admissions: 310, graduates: 142 },
    { month: "Aug", admissions: 330, graduates: 155 },
];

const departmentData = [
    { department: "CS", students: 650 },
    { department: "SE", students: 520 },
    { department: "AI", students: 430 },
    { department: "DS", students: 320 },
    { department: "IT", students: 620 },
];

const colors = ["#c2622d", "#cf7943", "#dc9059", "#b5541f", "#a84f22"];

const recentAdmissions = [
    { id: 1001, name: "Ali Hassan", department: "Computer Science", semester: 1, cgpa: "-" },
    { id: 1002, name: "Sara Khan", department: "Software Engineering", semester: 3, cgpa: "3.82" },
    { id: 1003, name: "Ahmed Bilal", department: "Artificial Intelligence", semester: 5, cgpa: "3.55" },
    { id: 1004, name: "Fatima Noor", department: "Information Technology", semester: 2, cgpa: "3.91" },
    { id: 1005, name: "Usman Ali", department: "Data Science", semester: 7, cgpa: "3.72" },
];

export default function StudentAnalytics() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-var(--text-primary)">Student Analytics</h1>
                <p className="text-var(--text-secondary) mt-1">
                    Student enrollment, attendance and academic overview.
                </p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard
                    title="Students"
                    value="2,540"
                    subtitle="Currently Enrolled"
                    icon={FaUserGraduate}
                    color="rust"
                    trend={[210, 225, 218, 240, 255, 248, 260, 254]}
                />
                <StatCard
                    title="Attendance"
                    value="91%"
                    subtitle="University Average"
                    icon={FaClipboardCheck}
                    color="green"
                    trend={[86, 88, 87, 89, 90, 89, 91, 91]}
                />
                <StatCard
                    title="Departments"
                    value="8"
                    subtitle="Active Programs"
                    icon={FaUniversity}
                    color="blue"
                    trend={[8, 8, 8, 8, 8, 8, 8, 8]}
                />
                <StatCard
                    title="Average CGPA"
                    value="3.58"
                    subtitle="Current Students"
                    icon={FaAward}
                    color="amber"
                    trend={[3.4, 3.42, 3.48, 3.5, 3.53, 3.55, 3.57, 3.58]}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard title="Admissions vs Graduations" icon={FaChartLine}>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={enrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
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
                                <Line
                                    type="monotone"
                                    dataKey="admissions"
                                    name="Admissions"
                                    stroke="#c2622d"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="graduates"
                                    name="Graduates"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Students by Department" icon={FaLayerGroup}>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                                <XAxis dataKey="department" stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} />
                                <Tooltip
                                    contentStyle={{
                                        background: "var(--bg-card)",
                                        border: "1px solid var(--border-color)",
                                        borderRadius: 8,
                                        color: "var(--text-primary)",
                                    }}
                                />
                                <Bar dataKey="students" radius={[5, 5, 0, 0]}>
                                    {departmentData.map((item, index) => (
                                        <Cell key={index} fill={colors[index]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-(--text-primary)">Recent Admissions</h2>
                        <p className="text-sm text-(--text-secondary)">Latest enrolled students</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary)">
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3">Semester</th>
                                <th className="px-4 py-3">CGPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAdmissions.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) text-(--text-primary)"
                                >
                                    <td className="px-4 py-4">{student.id}</td>
                                    <td className="px-4 py-4 font-medium">{student.name}</td>
                                    <td className="px-4 py-4">{student.department}</td>
                                    <td className="px-4 py-4">{student.semester}</td>
                                    <td className="px-4 py-4">{student.cgpa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}