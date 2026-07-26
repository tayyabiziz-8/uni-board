import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaBook,
    FaClipboardList,
    FaUser,
    FaUsers,
    FaChartBar,
    FaChevronLeft,
    FaChevronRight,
    FaChalkboardTeacher,
    FaUserGraduate,
    FaCog,
    FaFileAlt,
    FaBuilding,
    FaUserPlus,
    FaBullhorn,
} from "react-icons/fa";
import { useUserContext } from "../../context/UserProvider";

export default function Sidebar({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
    const { user } = useUserContext();
    const role = user?.role;

    const navByRole = {
        student: [
            { to: "/student", end: true, label: "Dashboard", icon: FaHome },
            { to: "/student/courses", label: "Courses", icon: FaBook },
            { to: "/student/assignments", label: "Assignments", icon: FaClipboardList },
            { to: "/student/profile", label: "Profile", icon: FaUser },
        ],
        teacher: [
            { to: "/teacher", end: true, label: "Dashboard", icon: FaHome },
            { to: "/teacher/students", label: "Students", icon: FaUsers },
            { to: "/teacher/grades", label: "Grades", icon: FaChartBar },
            { to: "/teacher/profile", label: "Profile", icon: FaUser },
        ],
        admin: [
            { to: "/admin", end: true, label: "Dashboard", icon: FaHome },
            { to: "/admin/students", label: "Student Analytics", icon: FaUserGraduate },
            { to: "/admin/teachers", label: "Teacher Analytics", icon: FaChalkboardTeacher },
            { to: "/admin/courses", label: "Courses", icon: FaBook },
            { to: "/admin/departments", label: "Departments", icon: FaBuilding },
            { to: "/admin/admissions", label: "Admissions", icon: FaUserPlus },
            { to: "/admin/announcements", label: "Announcements", icon: FaBullhorn },
            { to: "/admin/users", label: "Manage Users", icon: FaUsers },
            { to: "/admin/reports", label: "Manage Reports", icon: FaFileAlt },
            { to: "/admin/settings", label: "Settings", icon: FaCog },
        ],
    };

    const items = navByRole[role] ?? [];

    const closeSidebar = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const linkClass = ({ isActive }) =>
        `group relative flex items-center gap-3 rounded-lg transition-colors
        ${collapsed ? "justify-center px-0 py-3" : "px-4 py-3"}
        ${
            isActive
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
        }`;

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-16 left-0 h-[calc(100vh-64px)] max-md:h-[calc(100vh-64px)]
                    bg-(--bg-sidebar) border-r border-(--border-color)
                    z-50 flex flex-col transform transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    ${collapsed ? "w-20" : "w-64"}
                `}
            >
                <div className={`hidden md:flex items-center p-3 ${collapsed ? "justify-center" : "justify-end"}`}>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-md text-(--text-secondary) hover:bg-(--bg-subtle) hover:text-(--text-primary) transition"
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <FaChevronRight size={14} /> : <FaChevronLeft size={14} />}
                    </button>
                </div>

                <nav className="flex flex-col gap-1.5 p-3 pt-0">
                    {items.map(({ to, end, label, icon: Icon }) => (
                        <NavLink key={to} to={to} end={end} className={linkClass} onClick={closeSidebar} title={collapsed ? label : undefined}>
                            <Icon className="text-base shrink-0" />
                            {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}

                            {collapsed && (
                                <span
                                    className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-(--bg-card)
                                    border border-(--border-color) px-2.5 py-1.5 text-xs font-medium text-(--text-primary)
                                    opacity-0 shadow-md group-hover:opacity-100 transition-opacity z-50"
                                >
                                    {label}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}