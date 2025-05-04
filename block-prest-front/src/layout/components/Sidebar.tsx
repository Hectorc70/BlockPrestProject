import { NavLink } from "react-router-dom";
// import logo from '@/assets/logo.png'
import { FaHome, FaPeopleCarry, FaUsers } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaSchoolFlag } from "react-icons/fa6";
import { routeNames } from "@/router/routes";
import { IoIosCash } from "react-icons/io";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <aside
            className={`fixed sm:static top-0 left-0 ${isOpen ? "w-52" : "w-16"
                } h-screen text-onPrimary bg-background  flex  border- flex-col transform transition-all duration-300 z-50 sm:w-40`}
        >
            {/* Logo */}
            <div className={`p-6 justify-center flex`}>
                {/* <img src={logo} alt="logo" className="w-20" /> */}
            </div>

            {/* Menu Items */}
            <nav className="flex-1 space-y-4 mt-10  px-2">

                <NavLink
                    key={routeNames.initPage}
                    to={routeNames.initPage}
                    className={({ isActive }) =>
                        `flex items-center rounded-lg gap-4 p-2 py-3 text-sm text-primary bg-hintColor hover:bg-primary hover:text-onPrimary ${isActive ? "text-white bg-primary " : "text-onPrimary"
                        }`
                    }
                >
                    <IoIosCash className="text-lg" />
                    <span className={`${!isOpen && "hidden"} sm:block`}>
                        {'Prestamos'}
                    </span>
                </NavLink>
            </nav>
            {/* Botón para cerrar el Sidebar */}
            {isOpen && (
                <button
                    className="absolute top-4 right-4 text-colorText"
                    onClick={toggleSidebar}
                >
                    ✖
                </button>
            )}
        </aside>
    );
};

export default Sidebar;
