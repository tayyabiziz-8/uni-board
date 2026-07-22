import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";

export default function Header({ sidebarOpen, setSidebarOpen})
{
    const navigate = useNavigate();
    const {user, logout} = useUserContext();
    const { darkMode, toggleTheme } = useTheme();

    function handleLogout() {

        logout();
        navigate("/login");
    }

    return (

        <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-800 text-white shadow-sm z-50">

            <div className="h-full flex items-center justify-between px-5">

                <div className="flex items-center gap-4">

                    <button className="md:hidden text-xl hover:cursor-pointer active:bg-amber-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <FaBars />
                    </button>

                    <NavLink to="/admin" className="font-semibold text-lg hover:cursor-pointer ml-7 max-md:ml-0">
                        University Portal
                    </NavLink>
                </div>

                <div className="flex items-center gap-5">
                    <button onClick={toggleTheme}
                            className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition">
                        {
                            darkMode
                            ?
                            <FaSun />
                            :
                            <FaMoon />
                        }
                    </button>
                    <div className="hidden sm:block">
                        {user?.name}
                    </div>

                    <button onClick={handleLogout} 
                    className="bg-orange-700 hover:bg-orange-600 px-4 py-2 rounded transition">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}