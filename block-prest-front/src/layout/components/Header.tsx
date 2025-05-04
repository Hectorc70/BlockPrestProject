import { lsUsername } from "@/common/constants";
import ButtonSmall from "@/components/ButtonSmall";
// import ButtonLargeSecondary from "@/components/ButtonLargeSeconday";
import { StatusButton } from "@/models/enums";
import { RootState } from "@/redux/store";
import { routeNames } from "@/router/routes";
import { FaUser, FaBars } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Definimos los tipos de las props del Header
interface HeaderProps {
    toggleSidebar: () => void; // Función para abrir/cerrar el Sidebar
}


const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const title = useSelector((state: RootState) => state.global.titleHeader);
    const navigate = useNavigate()
    const username = localStorage.getItem(lsUsername) ?? ''
    const signOut = () => {
        navigate(routeNames.initPage, { replace: true })
        localStorage.clear()
    }
    const handleGoBack = () => {

        if (window.history.length > 1) {
            navigate(-1);
        }

    };
    return (
        <header className="flex justify-between items-center pr-6 py-2 bg-light-background text-onPrimary bg-background ">
            <button
                className="sm:hidden p-2 text-colorText "
                onClick={toggleSidebar}
            >
                <FaBars className="text-xl" />
            </button>
            <div className="flex items-center justify">
                <div className="bg-primary p-1 rounded-md mr-2 hover:bg-hoverPrimary">
                    <IoChevronBackOutline className="text-xl cursor-pointer text-onPrimary" onClick={handleGoBack} />
                </div>
                <span className="text-primary font-bold text-2xl">{title}</span>
            </div>
            <div className=" flex flex-row items-center">
                <div className="flex flex-row items-center">
                    <FaUser />
                    <span className="font-bold text-primary px-3">{username}</span>
                </div>
                <div className="ml-10">
                    <ButtonSmall
                        type="button" onClick={signOut}
                        status={StatusButton.Enabled}>
                        Conectar wallet
                    </ButtonSmall>

                </div>
            </div>

        </header>
    );
};

export default Header;

