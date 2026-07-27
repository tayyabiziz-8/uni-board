import { useState } from "react";
import { FaBook, FaLayerGroup, FaClock, FaUserGraduate, FaPlus, FaSearch } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import useDebounce from "../../hooks/useDebounce";

const courses = [
    { code: "CS101", title: "Introduction to Programming", department: "Computer Science", credits: 3, instructor: "Dr. Ahmed Ali", enrolled: 118, capacity: 130, status: "Active" },
    { code: "CS210", title: "Data Structures & Algorithms", department: "Computer Science", credits: 4, instructor: "Dr. Ahmed Ali", enrolled: 102, capacity: 110, status: "Active" },
    { code: "CS402", title: "Distributed Systems", department: "Computer Science", credits: 4, instructor: "Dr. Ahmed Ali", enrolled: 61, capacity: 70, status: "Active" },
    { code: "CS415", title: "Compiler Construction", department: "Computer Science", credits: 3, instructor: "Dr. Hina Yousuf", enrolled: 38, capacity: 60, status: "Inactive" },
    { code: "SE204", title: "Software Requirements Engineering", department: "Software Engineering", credits: 3, instructor: "Dr. Sarah Khan", enrolled: 92, capacity: 100, status: "Active" },
    { code: "SE310", title: "Software Architecture & Design", department: "Software Engineering", credits: 3, instructor: "Dr. Sarah Khan", enrolled: 84, capacity: 95, status: "Active" },
    { code: "SE401", title: "DevOps & Continuous Delivery", department: "Software Engineering", credits: 3, instructor: "Mr. Kamran Sheikh", enrolled: 47, capacity: 80, status: "Active" },
    { code: "AI310", title: "Machine Learning Fundamentals", department: "Artificial Intelligence", credits: 4, instructor: "Dr. Bilal Hassan", enrolled: 76, capacity: 80, status: "Active" },
    { code: "AI325", title: "Neural Networks & Deep Learning", department: "Artificial Intelligence", credits: 4, instructor: "Dr. Bilal Hassan", enrolled: 69, capacity: 75, status: "Active" },
    { code: "AI440", title: "Natural Language Processing", department: "Artificial Intelligence", credits: 3, instructor: "Dr. Mariam Yasin", enrolled: 33, capacity: 60, status: "Inactive" },
    { code: "DS220", title: "Statistical Data Analysis", department: "Data Science", credits: 3, instructor: "Dr. Fatima Noor", enrolled: 54, capacity: 90, status: "Active" },
    { code: "DS330", title: "Big Data Systems", department: "Data Science", credits: 3, instructor: "Dr. Fatima Noor", enrolled: 41, capacity: 70, status: "Active" },
    { code: "IT150", title: "Networks & Infrastructure", department: "Information Technology", credits: 3, instructor: "Dr. Usman Tariq", enrolled: 40, capacity: 100, status: "Inactive" },
    { code: "IT260", title: "Cloud Computing Essentials", department: "Information Technology", credits: 3, instructor: "Dr. Usman Tariq", enrolled: 88, capacity: 100, status: "Active" },
    { code: "IT315", title: "Cybersecurity Fundamentals", department: "Information Technology", credits: 3, instructor: "Ms. Rabia Farooq", enrolled: 96, capacity: 100, status: "Active" },
];

export default function Courses() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 700);

    const filtered = courses.filter(
        (c) =>
            c.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            c.code.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            c.instructor.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const totalSeats = courses.reduce((sum, c) => sum + c.capacity, 0);
    const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
    const avgCredits = (courses.reduce((sum, c) => sum + c.credits, 0) / courses.length).toFixed(1);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-(--text-primary)">Courses</h1>
                    <p className="text-(--text-secondary) mt-1">Manage course offerings across all departments.</p>
                </div>
                <button className="flex items-center gap-2 bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2.5 rounded-lg transition text-sm font-medium shrink-0">
                    <FaPlus size={13} />
                    Add Course
                </button>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard title="Total Courses" value={courses.length} subtitle="Offered this semester" icon={FaBook} color="rust" />
                <StatCard title="Active Courses" value={courses.filter((c) => c.status === "Active").length} subtitle="Currently running" icon={FaLayerGroup} color="green" />
                <StatCard title="Avg. Credit Hours" value={avgCredits} subtitle="Per course" icon={FaClock} color="blue" />
                <StatCard title="Enrolled Seats" value={`${totalEnrolled}/${totalSeats}`} subtitle="Across all courses" icon={FaUserGraduate} color="amber" />
            </section>

            <section className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <h2 className="text-xl font-semibold text-(--text-primary)">
                        All Courses <span className="text-(--text-muted) text-sm font-normal">({filtered.length})</span>
                    </h2>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted) text-sm" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by code, title or instructor..."
                            className="pl-9 pr-4 py-2.5 rounded-lg border border-(--border-color) bg-(--bg-app)
                            text-(--text-primary) text-sm outline-none focus:ring-2 focus:ring-(--accent) w-full md:w-80"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-(--border-color) text-left text-(--text-secondary) text-sm">
                                <th className="py-3 px-4">Code</th>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Department</th>
                                <th className="py-3 px-4">Credits</th>
                                <th className="py-3 px-4">Instructor</th>
                                <th className="py-3 px-4">Enrolled</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((c) => (
                                <tr
                                    key={c.code}
                                    className="border-b border-(--border-color) hover:bg-(--bg-subtle) transition text-(--text-primary)"
                                >
                                    <td className="px-4 py-4 font-medium">{c.code}</td>
                                    <td className="px-4 py-4">{c.title}</td>
                                    <td className="px-4 py-4 text-(--text-secondary)">{c.department}</td>
                                    <td className="px-4 py-4">{c.credits}</td>
                                    <td className="px-4 py-4">{c.instructor}</td>
                                    <td className="px-4 py-4">{c.enrolled}/{c.capacity}</td>
                                    <td className="px-4 py-4">
                                        <StatusBadge status={c.status} />
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-(--text-muted)">
                                        No courses match your search.
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