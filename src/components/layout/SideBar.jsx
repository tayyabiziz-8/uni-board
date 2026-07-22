import { NavLink } from "react-router-dom";
import { FaHome, FaBook, FaClipboardList, FaUser, FaUsers, FaChartBar, FaCog } from "react-icons/fa";
import { useUserContext } from "../../context/UserProvider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const { user } = useUserContext();
    const [expanded, setExpanded] = useState(false);
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const role = user?.role;

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded transition-colors 
        ${
            isActive
                ? "bg-orange-700 text-white"
                : "text-zinc-200 hover:bg-zinc-700"
        }`;

    const closeSidebar = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={` fixed top-16 left-0 h-[calc(100vh-64px)] max-md:h-72 w-64
                    bg-zinc-900 border-r border-zinc-800
                    z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                    md:translate-x-0
                `}
            >
                <div className="flex flex-col p-4 gap-2">

                    {role === "student" && (
                        <>
                            <NavLink
                                to="/student"
                                end
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaHome />
                                <span>Dashboard</span>
                            </NavLink>

                            <NavLink
                                to="/student/courses"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaBook />
                                <span>Courses</span>
                            </NavLink>

                            <NavLink
                                to="/student/assignments"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaClipboardList />
                                <span>Assignments</span>
                            </NavLink>

                            <NavLink
                                to="/student/profile"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaUser />
                                <span>Profile</span>
                            </NavLink>
                        </>
                    )}

                    {role === "teacher" && (
                        <>
                            <NavLink
                                to="/teacher"
                                end
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaHome />
                                <span>Dashboard</span>
                            </NavLink>

                            <NavLink
                                to="/teacher/students"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaUsers />
                                <span>Students</span>
                            </NavLink>

                            <NavLink
                                to="/teacher/grades"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaChartBar />
                                <span>Grades</span>
                            </NavLink>

                            <NavLink
                                to="/teacher/profile"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaUser />
                                <span>Profile</span>
                            </NavLink>
                        </>
                    )}

                    {role === "admin" && (
                        <>
                            <Accordion
                                expanded={expanded === "dashboard"}
                                onChange={handleAccordionChange("dashboard")}
                                disableGutters
                                elevation={0}
                                sx={{
                                    backgroundColor: "#18181b",
                                    color: "white",
                                    "&:before": {
                                        display: "none",
                                    },
                                }}
                            >

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                                >
                                    <div className="flex items-center gap-3">
                                        <FaHome />
                                        Dashboard
                                    </div>
                                </AccordionSummary>

                                <AccordionDetails
                                    className="flex flex-col gap-2"
                                >
                                    <NavLink
                                        to="/admin/teachers"
                                        className={linkClass}
                                        onClick={closeSidebar}
                                    >
                                        Teachers
                                    </NavLink>
                                    <NavLink
                                        to="/admin/students"
                                        className={linkClass}
                                        onClick={closeSidebar}
                                    >
                                        Students
                                    </NavLink>
                                </AccordionDetails>
                            </Accordion>
                            <NavLink
                                to="/admin/users"
                                className={linkClass}
                                onClick={closeSidebar}
                            >
                                <FaUsers />
                                Manage Users
                            </NavLink>

                            <Accordion
                                expanded={expanded === "profile"}
                                onChange={handleAccordionChange("profile")}
                                disableGutters
                                elevation={0}
                                sx={{
                                    backgroundColor: "#18181b",
                                    color: "white",
                                    "&:before": {
                                        display: "none",
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                                >
                                    <div className="flex items-center gap-3">
                                        <FaUser />
                                        Profile
                                    </div>
                                </AccordionSummary>

                                <AccordionDetails
                                    className="flex flex-col gap-2"
                                >
                                    <NavLink
                                        to="/admin/settings"
                                        className={linkClass}
                                        onClick={closeSidebar}
                                    >
                                        Settings
                                    </NavLink>
                                    <NavLink
                                        to="/admin/reports"
                                        className={linkClass}
                                        onClick={closeSidebar}
                                    >
                                        Manage Reports
                                    </NavLink>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}