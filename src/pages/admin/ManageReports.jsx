import { FaFilePdf, FaFileExcel, FaDownload, FaChartBar, FaUsers, FaGraduationCap, FaClipboardCheck } from "react-icons/fa";

const reports = [
    {
        id: 1,
        title: "Student Enrollment Report",
        description: "Enrollment statistics by department and semester.",
        category: "Students",
        updated: "20 Jul 2026",
        icon: FaGraduationCap
    },
    {
        id: 2,
        title: "Teacher Performance Report",
        description: "Teaching load, ratings and department summaries.",
        category: "Faculty",
        updated: "18 Jul 2026",
        icon: FaUsers
    },
    {
        id: 3,
        title: "Attendance Report",
        description: "Overall student attendance statistics.",
        category: "Attendance",
        updated: "17 Jul 2026",
        icon: FaClipboardCheck
    },
    {
        id: 4,
        title: "University Analytics",
        description: "Overall dashboard analytics and KPIs.",
        category: "Analytics",
        updated: "15 Jul 2026",
        icon: FaChartBar
    }
];

export default function ManageReports() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-zinc-800">
                    Manage Reports
                </h1>
                <p className="text-zinc-500 mt-2">
                    Generate, view and export university reports.
                </p>
            </div>

            <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <button 
                className="flex items-center justify-center gap-3 bg-orange-700 hover:bg-orange-600 text-white rounded-md py-5 transition">
                    <FaFilePdf size={22} />
                    Export PDF
                </button>

                <button
                className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-600 text-white rounded-md py-5 transition">
                    <FaFileExcel size={22} />
                    Export Excel
                </button>

                <button
                className="flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md py-5 transition">
                    <FaDownload size={22} />
                    Download All
                </button>
            </section>

            <section className="bg-white border border-zinc-200 rounded-md shadow-sm p-5">
                <h2 className="text-xl font-semibold mb-5">
                    Available Reports
                </h2>

                <div className="space-y-4">
                    {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                            <div
                                key={report.id}
                                className="border border-zinc-200 rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-zinc-50 transition">
                                <div className="flex gap-4">
                                    <div className="bg-orange-100 text-orange-700 p-3 rounded-md h-fit">
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <h3
                                            className="font-semibold text-lg">
                                            {report.title}
                                        </h3>
                                        <p className="text-zinc-500">

                                            {report.description}

                                        </p>
                                        <p
                                            className="text-sm text-zinc-400 mt-2">
                                            Category:
                                            {" "}
                                            {report.category}

                                            •

                                            Last Updated:
                                            {" "}
                                            {report.updated}
                                        </p>
                                    </div>
                                </div>

                                <div className=" flex gap-3">
                                    <button
                                        className="px-4 py-2 rounded-md bg-orange-700 hover:bg-orange-600 text-white">
                                        Generate
                                    </button>

                                    <button className="px-4 py-2 rounded-md border border-zinc-300 hover:bg-zinc-100">
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