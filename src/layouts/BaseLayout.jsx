import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

export default function BaseLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-100 flex flex-col text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="flex flex-1 pt-16">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <main
                    className=" flex-1 p-4 md:p-6 lg:p-8 md:ml-64">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}