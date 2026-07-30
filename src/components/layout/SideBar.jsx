import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaBook,
    FaClipboardList,
    FaUser,
    FaUsers,
    FaChartBar,
    FaTh,
    FaCalendarAlt,
    FaBuilding,
    FaRobot,
    FaDollarSign,
    FaBookOpen,
} from "react-icons/fa";
import { useUserContext } from "../../context/UserProvider";

export default function Sidebar({ sidebarOpen, setSidebarOpen, collapsed }) {
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
            { to: "/admin", end: true, label: "Dashboard", icon: FaTh },
            { to: "/admin/enrollments", label: "Enrollments", icon: FaCalendarAlt },
            { to: "/admin/users", label: "Users", icon: FaUser },
            { to: "/admin/organizations", label: "Organizations", icon: FaBuilding },
            { to: "/admin/chatbot-access", label: "Chatbot Access", icon: FaRobot },
            { to: "/admin/stewardship-renewal", label: "Stewardship Renewal", icon: FaClipboardList },
            { to: "/admin/admins", label: "Admins", icon: FaUsers },
            { to: "/admin/coupons", label: "Coupons", icon: FaDollarSign },
            { to: "/admin/questions", label: "Questions", icon: FaBookOpen },
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
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen
                    bg-(--bg-sidebar) border-r border-(--border-color)
                    z-50 flex flex-col transform transition-all duration-300 ease-in-out overflow-x-hidden overflow-y-auto
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    ${collapsed ? "w-20" : "w-64"}
                `}
            >
                <div className={`flex items-center gap-3 px-4 pt-5 pb-4 ${collapsed ? "justify-center px-0" : ""}`}>
                    <div className="w-10 h-10 rounded-lg bg-(--accent) text-white flex items-center justify-center font-bold text-sm shrink-0">
                        MP
                    </div>
                    {!collapsed && <span className="text-lg font-bold text-(--text-primary)">Many Parts</span>}
                </div>

                {!collapsed && (
                    <div className="px-4 pb-2 text-xs font-semibold tracking-wider text-(--text-muted)">MENU</div>
                )}

                <nav className="flex flex-col gap-1.5 px-3 pb-3">
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