import { FaBuilding, FaUniversity, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import StatCard from "../../components/ui/StatCard";

const departments = [
    { name: "Computer Science", code: "CS", head: "Dr. Ahmed Ali", teachers: 34, students: 650, courses: 22 },
    { name: "Software Engineering", code: "SE", head: "Dr. Sarah Khan", teachers: 26, students: 520, courses: 18 },
    { name: "Artificial Intelligence", code: "AI", head: "Dr. Bilal Hassan", teachers: 21, students: 430, courses: 15 },
    { name: "Data Science", code: "DS", head: "Dr. Fatima Noor", teachers: 17, students: 320, courses: 12 },
    { name: "Information Technology", code: "IT", head: "Dr. Usman Tariq", teachers: 28, students: 620, courses: 17 },
    { name: "Electrical Engineering", code: "EE", head: "Dr. Zainab Rizvi", teachers: 19, students: 240, courses: 14 },
];

const colors = ["rust", "blue", "amber", "teal", "purple", "green"];

export default function Departments() {
    const totalTeachers = departments.reduce((sum, d) => sum + d.teachers, 0);
    const totalStudents = departments.reduce((sum, d) => sum + d.students, 0);
    const avgClassSize = Math.round(totalStudents / departments.reduce((sum, d) => sum + d.courses, 0));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-(--text-primary)">Departments</h1>
                <p className="text-(--text-secondary) mt-1">Academic departments across the university.</p>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard title="Departments" value={departments.length} subtitle="Active programs" icon={FaUniversity} color="rust" />
                <StatCard title="Total Faculty" value={totalTeachers} subtitle="Across departments" icon={FaChalkboardTeacher} color="blue" />
                <StatCard title="Total Students" value={totalStudents.toLocaleString()} subtitle="Across departments" icon={FaUserGraduate} color="amber" />
                <StatCard title="Avg. Class Size" value={avgClassSize} subtitle="Students per course" icon={FaBuilding} color="teal" />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {departments.map((dept, i) => (
                    <div
                        key={dept.code}
                        className="bg-(--bg-card) border border-(--border-color) rounded-xl shadow-sm p-5 hover:shadow-md transition"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-lg bg-(--accent-soft) text-(--accent-soft-text) flex items-center justify-center font-bold">
                                    {dept.code}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-(--text-primary) leading-tight">{dept.name}</h3>
                                    <p className="text-xs text-(--text-muted) mt-0.5">Head: {dept.head}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center border-t border-(--border-color) pt-4">
                            <div>
                                <p className="text-lg font-bold text-(--text-primary)">{dept.teachers}</p>
                                <p className="text-xs text-(--text-muted)">Faculty</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-(--text-primary)">{dept.students}</p>
                                <p className="text-xs text-(--text-muted)">Students</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-(--text-primary)">{dept.courses}</p>
                                <p className="text-xs text-(--text-muted)">Courses</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}