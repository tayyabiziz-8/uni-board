import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import { FaMoon, FaSun, FaBars, FaChevronDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";

export default function Header({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed }) {
    const navigate = useNavigate();
    const { user, logout } = useUserContext();
    const { darkMode, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header
            className={`fixed top-0 right-0 left-0 h-16 bg-(--bg-card) border-b border-(--border-color)
            text-(--text-primary) z-40 transition-all duration-300
            ${collapsed ? "md:left-20" : "md:left-64"}`}
        >
            <div className="h-full flex items-center justify-between px-5">
                <div className="flex items-center gap-2">
                    <button
                        className="md:hidden text-xl p-2 rounded-md hover:bg-(--bg-subtle) transition"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <FaBars />
                    </button>

                    <button
                        className="hidden md:inline-flex text-lg p-2 rounded-md hover:bg-(--bg-subtle) transition"
                        onClick={() => setCollapsed(!collapsed)}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <FaBars />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-(--bg-subtle) transition"
                        title="Toggle theme"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full hover:bg-(--bg-subtle) transition"
                        >
                            <FaUserCircle className="text-2xl text-(--text-secondary)" />
                            <span className="hidden sm:block text-sm font-medium">
                                {user?.name ?? "Super Admin"}
                            </span>
                            <FaChevronDown className="text-xs text-(--text-secondary)" />
                        </button>

                        {menuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 rounded-lg border border-(--border-color)
                                bg-(--bg-card) shadow-lg overflow-hidden"
                            >
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left
                                    text-(--text-primary) hover:bg-(--bg-subtle) transition"
                                >
                                    <FaSignOutAlt className="text-(--accent)" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}