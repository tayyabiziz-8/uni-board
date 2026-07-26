import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";

export default function BaseLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
    const [collapsed, setCollapsed] = useState(false); // desktop icon rail

    return (
        <div className="min-h-screen bg-(--bg-app)">
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`mt-16 min-h-[calc(100vh-4rem)] p-6 transition-all duration-300 ease-in-out
                ${collapsed ? "md:ml-20" : "md:ml-64"}`}
            >
                <Outlet />
            </main>

            <Footer collapsed={collapsed} />
        </div>
    );
}