import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { FaBars } from "react-icons/fa";
import Header from "./components/Header";
import { Outlet } from "react-router";

const AppLayout = () => {
    const [isOpenSideBar, setIsSidebarOpen] = useState(false);

    const onOpenSideBAr = () => {
        setIsSidebarOpen(!isOpenSideBar);
    };
    return (
        <div className="flex h-screen bg-light-background  text-colorText ">
            {/* Sidebar */}
            <div className="relative">
                <button
                    className="sm:hidden p-4 text-onPrimary "
                    onClick={onOpenSideBAr}
                >
                    <FaBars className="text-xl" />
                </button>

                <Sidebar isOpen={isOpenSideBar} toggleSidebar={onOpenSideBAr} />
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header toggleSidebar={onOpenSideBAr} />

                {/* Page Content */}
                <main className="flex-1 bg-background p-1 overflow-auto w-full h-full">
                    <div className="bg-hintColor  w-full h-full p-2 rounded-lg ">
                    <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
