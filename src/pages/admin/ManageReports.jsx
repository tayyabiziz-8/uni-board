import { FaFilePdf, FaFileExcel, FaDownload, FaChartBar, FaUsers, FaGraduationCap, FaClipboardCheck } from "react-icons/fa";

const reports = [
    {
        id: 1,
        title: "Student Enrollment Report",
        description: "Enrollment statistics by department and semester.",
        category: "Students",
        updated: "20 Jul 2026",
        icon: FaGraduationCap,
    },
    {
        id: 2,
        title: "Teacher Performance Report",
        description: "Teaching load, ratings and department summaries.",
        category: "Faculty",
        updated: "18 Jul 2026",
        icon: FaUsers,
    },
    {
        id: 3,
        title: "Attendance Report",
        description: "Overall student attendance statistics.",
        category: "Attendance",
        updated: "17 Jul 2026",
        icon: FaClipboardCheck,
    },
    {
        id: 4,
        title: "University Analytics",
        description: "Overall dashboard analytics and KPIs.",
        category: "Analytics",
        updated: "15 Jul 2026",
        icon: FaChartBar,
    },
];

export default function ManageReports() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">Manage Reports</h1>
                <p className="text-(--text-secondary) mt-2">Generate, view and export university reports.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <button className="flex items-center justify-center gap-3 bg-(--accent) hover:bg-(--accent-hover) text-white rounded-xl py-5 transition font-medium">
                    <FaFilePdf size={20} />
                    Export PDF
                </button>

                <button className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-5 transition font-medium">
                    <FaFileExcel size={20} />
                    Export Excel
                </button>

                <button className="flex items-center justify-center gap-3 bg-(--bg-subtle) hover:bg-(--border-strong) text-(--text-primary) rounded-xl py-5 transition font-medium">
                    <FaDownload size={20} />
                    Download All
                </button>
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <h2 className="text-xl font-semibold text-(--text-primary) mb-5">Available Reports</h2>

                <div className="space-y-4">
                    {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                            <div
                                key={report.id}
                                className="border border-(--border-color) rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-(--bg-subtle) transition"
                            >
                                <div className="flex gap-4">
                                    <div className="bg-(--accent-soft) text-(--accent-soft-text) p-3 rounded-lg h-fit">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-(--text-primary)">{report.title}</h3>
                                        <p className="text-(--text-secondary)">{report.description}</p>
                                        <p className="text-sm text-(--text-muted) mt-2">
                                            Category: {report.category} • Last Updated: {report.updated}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 shrink-0">
                                    <button className="px-4 py-2 rounded-lg bg-(--accent) hover:[var(--accent-hover) text-white text-sm font-medium transition">
                                        Generate
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-(--border-color) hover:bg-(--bg-subtle) text-(--text-primary) text-sm font-medium transition">
                                        Preview
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}