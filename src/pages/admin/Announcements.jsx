import { useState } from "react";
import { FaBullhorn, FaCheckCircle, FaFileAlt, FaCalendarAlt, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";

const initialAnnouncements = [
    { id: 1, title: "Spring 2026 Registration Now Open", audience: "All", date: "20 Jul 2026", status: "Published" },
    { id: 2, title: "Mid-Term Exam Schedule Released", audience: "Students", date: "18 Jul 2026", status: "Published" },
    { id: 3, title: "Faculty Development Workshop — AI in Education", audience: "Teachers", date: "16 Jul 2026", status: "Published" },
    { id: 4, title: "Campus Wi-Fi Maintenance This Weekend", audience: "All", date: "14 Jul 2026", status: "Draft" },
    { id: 5, title: "New Data Science Lab Now Open", audience: "Students", date: "10 Jul 2026", status: "Published" },
];

const audienceColors = {
    All: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    Students: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
    Teachers: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400",
};

export default function Announcements() {
    const [announcements, setAnnouncements] = useState(initialAnnouncements);

    const removeAnnouncement = (id) => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    };

    const published = announcements.filter((a) => a.status === "Published").length;
    const drafts = announcements.filter((a) => a.status === "Draft").length;
    const thisMonth = announcements.filter((a) => a.date.includes("Jul 2026")).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-(--text-primary)">Announcements</h1>
                    <p className="text-(--text-secondary) mt-1">Post and manage university-wide announcements.</p>
                </div>
                <button className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0">
                    <FaPlus size={13} />
                    New Announcement
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard title="Total Announcements" value={announcements.length} subtitle="All time" icon={FaBullhorn} color="rust" />
                <StatCard title="Published" value={published} subtitle="Currently visible" icon={FaCheckCircle} color="green" />
                <StatCard title="Drafts" value={drafts} subtitle="Not yet posted" icon={FaFileAlt} color="amber" />
                <StatCard title="This Month" value={thisMonth} subtitle="Posted in July" icon={FaCalendarAlt} color="blue" />
            </section>

            <section className="space-y-4">
                {announcements.map((a) => (
                    <div
                        key={a.id}
                        className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5
                        flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition"
                    >
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${audienceColors[a.audience]}`}>
                                    {a.audience}
                                </span>
                                <StatusBadge status={a.status} />
                            </div>
                            <h3 className="font-semibold text-(--text-primary)">{a.title}</h3>
                            <p className="text-xs text-(--text-muted) mt-1">Posted {a.date}</p>
                        </div>

                        <div className="flex gap-2 shrink-0">
                            <button className="p-2.5 rounded-lg border border-(--border-color) hover:bg-(--bg-subtle) text-(--text-secondary) transition">
                                <FaEdit size={14} />
                            </button>
                            <button
                                onClick={() => removeAnnouncement(a.id)}
                                className="p-2.5 rounded-lg border border-(--border-color) hover:bg-red-50 dark:hover:bg-red-500/10 text-(--text-secondary) hover:text-red-600 dark:hover:text-red-400 transition"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {announcements.length === 0 && (
                    <div className="bg-(--bg-card) border border-(--border-color) rounded-xl p-10 text-center text-(--text-muted)">
                        No announcements yet.
                    </div>
                )}
            </section>
        </div>
    );
}