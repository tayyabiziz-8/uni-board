import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaUniversity } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";
import StatusBadge from "../../components/ui/StatusBadge";
import EnrollmentChart from "../../components/charts/EnrollmentChart";
import DepartmentChart from "../../components/charts/DepartmentChart";

const recentUsers = [
    { id: 1001, name: "Ali Hassan", role: "Student", department: "Computer Science", status: "Active" },
    { id: 1002, name: "Ayesha Khan", role: "Teacher", department: "Software Engineering", status: "Active" },
    { id: 1003, name: "Bilal Ahmed", role: "Student", department: "Artificial Intelligence", status: "Pending" },
    { id: 1004, name: "Fatima Noor", role: "Teacher", department: "Data Science", status: "Active" },
    { id: 1005, name: "Hamza Ali", role: "Student", department: "Information Technology", status: "Inactive" },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">Admin Dashboard</h1>
                <p className="text-(--text-secondary) mt-1">Overview of the university system.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard
                    title="Students"
                    value="2,540"
                    subtitle="+24 this month"
                    icon={FaUserGraduate}
                    color="rust"
                    trend={[2400, 2440, 2470, 2490, 2510, 2520, 2535, 2540]}
                />
                <StatCard
                    title="Teachers"
                    value="154"
                    subtitle="+3 this month"
                    icon={FaChalkboardTeacher}
                    color="blue"
                    trend={[145, 147, 148, 149, 150, 151, 153, 154]}
                />
                <StatCard
                    title="Courses"
                    value="72"
                    subtitle="6 Active Departments"
                    icon={FaBookOpen}
                    color="amber"
                    trend={[64, 65, 66, 68, 69, 70, 71, 72]}
                />
                <StatCard
                    title="Departments"
                    value="8"
                    subtitle="Engineering Faculty"
                    icon={FaUniversity}
                    color="teal"
                    trend={[8, 8, 8, 8, 8, 8, 8, 8]}
                />
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard title="Monthly Enrollment">
                    <EnrollmentChart />
                </ChartCard>
                <ChartCard title="Students by Department">
                    <DepartmentChart />
                </ChartCard>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                    <h2 className="font-semibold text-(--text-secondary)">Current Semester</h2>
                    <p className="text-2xl font-bold mt-4 text-(--text-primary)">Spring 2026</p>
                    <p className="text-(--text-muted) mt-2">Registration closes in 18 days.</p>
                </div>

                <div className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                    <h2 className="font-semibold text-(--text-secondary)">Attendance</h2>
                    <p className="text-2xl font-bold mt-4 text-(--text-primary)">91%</p>
                    <p className="text-(--text-muted) mt-2">Overall university attendance.</p>
                </div>

                <div className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                    <h2 className="font-semibold text-(--text-secondary)">Pending Requests</h2>
                    <p className="text-2xl font-bold mt-4 text-(--text-primary)">14</p>
                    <p className="text-(--text-muted) mt-2">Admissions &amp; profile approvals.</p>
                </div>
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-(--text-primary)">Recent Users</h2>
                        <p className="text-sm text-(--text-secondary)">Recently registered students and teachers</p>
                    </div>

                    <button className="bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2 rounded-lg transition text-sm font-medium">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Department</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                >
                                    <td className="px-4 py-4">{user.id}</td>
                                    <td className="px-4 py-4 font-medium">{user.name}</td>
                                    <td className="px-4 py-4">{user.role}</td>
                                    <td className="px-4 py-4">{user.department}</td>
                                    <td className="px-4 py-4">
                                        <StatusBadge status={user.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}