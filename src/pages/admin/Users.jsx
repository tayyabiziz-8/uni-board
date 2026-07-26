import { useState } from "react";
import { FaUsers, FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaPlus, FaSearch } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";

const users = [
    { id: 1001, name: "Ali Hassan", email: "ali.hassan@itu.edu", role: "Student", department: "Computer Science", status: "Active" },
    { id: 1002, name: "Ayesha Khan", email: "ayesha.khan@itu.edu", role: "Teacher", department: "Software Engineering", status: "Active" },
    { id: 1003, name: "Bilal Ahmed", email: "bilal.ahmed@itu.edu", role: "Student", department: "Artificial Intelligence", status: "Pending" },
    { id: 1004, name: "Fatima Noor", email: "fatima.noor@itu.edu", role: "Teacher", department: "Data Science", status: "Active" },
    { id: 1005, name: "Hamza Ali", email: "hamza.ali@itu.edu", role: "Student", department: "Information Technology", status: "Inactive" },
    { id: 1006, name: "Dr. Saud Ahmad", email: "saud.ahmad@itu.edu", role: "Admin", department: "Finance & Economics", status: "Active" },
    { id: 1007, name: "Sara Malik", email: "sara.malik@itu.edu", role: "Student", department: "Software Engineering", status: "Active" },
    { id: 1008, name: "Usman Tariq", email: "usman.tariq@itu.edu", role: "Teacher", department: "Computer Science", status: "Pending" },
];

const roleTabs = ["All", "Student", "Teacher", "Admin"];

export default function Users() {
    const [activeTab, setActiveTab] = useState("All");
    const [query, setQuery] = useState("");

    const filtered = users.filter((u) => {
        const matchesRole = activeTab === "All" || u.role === activeTab;
        const matchesQuery = u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
        return matchesRole && matchesQuery;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-(--text-primary)">Manage Users</h1>
                    <p className="text-(--text-secondary) mt-1">All students, teachers and admins on the portal.</p>
                </div>

                <button className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0">
                    <FaPlus size={13} />
                    Add User
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard title="Total Users" value="2,702" subtitle="All accounts" icon={FaUsers} color="rust" />
                <StatCard title="Students" value="2,540" subtitle="Enrolled accounts" icon={FaUserGraduate} color="blue" />
                <StatCard title="Teachers" value="154" subtitle="Active faculty" icon={FaChalkboardTeacher} color="amber" />
                <StatCard title="Admins" value="8" subtitle="System administrators" icon={FaUserShield} color="teal" />
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <div className="flex gap-2 flex-wrap">
                        {roleTabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    activeTab === tab
                                        ? "bg-(--accent) text-white"
                                        : "bg-(--bg-subtle) text-(--text-secondary) hover:text-(--text-primary)"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name or email..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full md:w-72"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Department</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                >
                                    <td className="px-4 py-4">{u.id}</td>
                                    <td className="px-4 py-4 font-medium">{u.name}</td>
                                    <td className="px-4 py-4 text-(--text-secondary)">{u.email}</td>
                                    <td className="px-4 py-4">{u.role}</td>
                                    <td className="px-4 py-4">{u.department}</td>
                                    <td className="px-4 py-4">
                                        <StatusBadge status={u.status} />
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-(--text-muted)">
                                        No users match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}