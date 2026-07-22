import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaUniversity } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";
import EnrollmentChart from "../../components/charts/EnrollmentChart";
import DepartmentChart from "../../components/charts/DepartmentChart";

const recentUsers = [
    {
        id: 1001,
        name: "Ali Hassan",
        role: "Student",
        department: "Computer Science",
        status: "Active"
    },
    {
        id: 1002,
        name: "Ayesha Khan",
        role: "Teacher",
        department: "Software Engineering",
        status: "Active"
    },
    {
        id: 1003,
        name: "Bilal Ahmed",
        role: "Student",
        department: "Artificial Intelligence",
        status: "Pending"
    },
    {
        id: 1004,
        name: "Fatima Noor",
        role: "Teacher",
        department: "Data Science",
        status: "Active"
    },
    {
        id: 1005,
        name: "Hamza Ali",
        role: "Student",
        department: "Information Technology",
        status: "Inactive"
    }
];

export default function Dashboard() {

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-zinc-800">
                    Admin Dashboard
                </h1>
                <p className="text-zinc-500 mt-1">
                    Overview of the university system.
                </p>
            </div>

            <section
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard
                    title="Students"
                    value="2,540"
                    subtitle="+24 this month"
                    icon={FaUserGraduate}
                />
                <StatCard
                    title="Teachers"
                    value="154"
                    subtitle="+3 this month"
                    icon={FaChalkboardTeacher}
                />
                <StatCard
                    title="Courses"
                    value="72"
                    subtitle="6 Active Departments"
                    icon={FaBookOpen}
                />
                <StatCard
                    title="Departments"
                    value="8"
                    subtitle="Engineering Faculty"
                    icon={FaUniversity}
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

                <div className="bg-white border border-zinc-200 rounded-md shadow-sm p-5">
                    <h2 className="font-semibold text-zinc-700">
                        Current Semester
                    </h2>
                    <p className="text-2xl font-bold mt-4">
                        Spring 2026
                    </p>
                    <p className="text-zinc-500 mt-2">
                        Registration closes in 18 days.
                    </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-md shadow-sm p-5">
                    <h2 className="font-semibold text-zinc-700">
                        Attendance
                    </h2>
                    <p className="text-2xl font-bold mt-4">
                        91%
                    </p>
                    <p className="text-zinc-500 mt-2">
                        Overall university attendance.
                    </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-md shadow-sm p-5">
                    <h2 className="font-semibold text-zinc-700">
                        Pending Requests
                    </h2>
                    <p className="text-2xl font-bold mt-4">
                        14
                    </p>
                    <p className="text-zinc-500 mt-2">
                        Admissions & profile approvals.
                    </p>
                </div>
            </section>

            <section className="bg-white border border-zinc-200 rounded-md shadow-sm p-5">
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-800">
                            Recent Users
                        </h2>
                        <p className="text-sm text-zinc-500">
                            Recently registered students and teachers
                        </p>
                    </div>

                    <button className="bg-orange-700 hover:bg-orange-600 active:bg-orange-400 text-white px-4 py-2 rounded transition">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b text-left text-zinc-500 text-sm">
                                <th className="py-3 px-4">
                                    ID
                                </th>
                                <th className="py-3 px-4">
                                    Name
                                </th>
                                <th className="py-3 px-4">
                                    Role
                                </th>
                                <th className="py-3 px-4">
                                    Department
                                </th>
                                <th className="py-3 px-4">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-zinc-50 transition">

                                    <td className="px-4 py-4">
                                        {user.id}
                                    </td>
                                    <td className="px-4 py-4 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-4">
                                        {user.role}
                                    </td>
                                    <td className="px-4 py-4">
                                        {user.department}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${
                                                    user.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                    : user.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-700"
                                                }
                                            `}
                                        >
                                            {user.status}
                                        </span>
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