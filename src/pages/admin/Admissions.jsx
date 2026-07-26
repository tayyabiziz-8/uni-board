import { useState } from "react";
import { FaClock, FaCheckCircle, FaTimesCircle, FaFileAlt, FaCheck, FaTimes } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";
import StatusBadge from "../../components/ui/StatusBadge";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const initialApplications = [
    { id: 5001, name: "Zara Ahmed", program: "BS Computer Science", submitted: "18 Jul 2026", status: "Pending" },
    { id: 5002, name: "Hassan Raza", program: "BS Software Engineering", submitted: "17 Jul 2026", status: "Approved" },
    { id: 5003, name: "Mahnoor Iqbal", program: "BS Artificial Intelligence", submitted: "16 Jul 2026", status: "Pending" },
    { id: 5004, name: "Omar Farooq", program: "BS Data Science", submitted: "15 Jul 2026", status: "Rejected" },
    { id: 5005, name: "Areeba Sheikh", program: "BS Information Technology", submitted: "14 Jul 2026", status: "Approved" },
    { id: 5006, name: "Taha Malik", program: "BS Computer Science", submitted: "13 Jul 2026", status: "Pending" },
];

const byProgram = [
    { program: "CS", applications: 210 },
    { program: "SE", applications: 165 },
    { program: "AI", applications: 140 },
    { program: "DS", applications: 98 },
    { program: "IT", applications: 120 },
];

export default function Admissions() {
    const [applications, setApplications] = useState(initialApplications);

    const updateStatus = (id, status) => {
        setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    };

    const pending = applications.filter((a) => a.status === "Pending").length;
    const approved = applications.filter((a) => a.status === "Approved").length;
    const rejected = applications.filter((a) => a.status === "Rejected").length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">Admissions</h1>
                <p className="text-(--text-secondary) mt-1">Review and process incoming applications.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard title="Pending" value={pending} subtitle="Awaiting review" icon={FaClock} color="amber" />
                <StatCard title="Approved" value={approved} subtitle="This cycle" icon={FaCheckCircle} color="green" />
                <StatCard title="Rejected" value={rejected} subtitle="This cycle" icon={FaTimesCircle} color="red" />
                <StatCard title="Total Applications" value={applications.length} subtitle="All time" icon={FaFileAlt} color="rust" />
            </section>

            <ChartCard title="Applications by Program">
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={byProgram}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="program" stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} />
                            <YAxis stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} />
                            <Tooltip
                                contentStyle={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-color)",
                                    borderRadius: 8,
                                    color: "var(--text-primary)",
                                }}
                            />
                            <Bar dataKey="applications" fill="#c2622d" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ChartCard>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <h2 className="text-xl font-semibold text-(--text-primary) mb-5">Recent Applications</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">Applicant</th>
                                <th className="py-3 px-4">Program</th>
                                <th className="py-3 px-4">Submitted</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((a) => (
                                <tr
                                    key={a.id}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                >
                                    <td className="px-4 py-4">{a.id}</td>
                                    <td className="px-4 py-4 font-medium">{a.name}</td>
                                    <td className="px-4 py-4 text-(--text-secondary)">{a.program}</td>
                                    <td className="px-4 py-4">{a.submitted}</td>
                                    <td className="px-4 py-4">
                                        <StatusBadge status={a.status} />
                                    </td>
                                    <td className="px-4 py-4">
                                        {a.status === "Pending" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateStatus(a.id, "Approved")}
                                                    className="p-2 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:hover:bg-emerald-500/25 transition"
                                                    title="Approve"
                                                >
                                                    <FaCheck size={12} />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(a.id, "Rejected")}
                                                    className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/25 transition"
                                                    title="Reject"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-(--text-muted) text-xs">—</span>
                                        )}
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